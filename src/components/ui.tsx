import { motion, useInView, useMotionValue, useReducedMotion, useSpring, animate, type MotionValue } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode, type CSSProperties, type PointerEvent } from 'react';
import Lenis from 'lenis';
import { MARK_PATHS } from '../assets/markPaths';

/* ——— Smooth scroll (Lenis) shared with anchor links ——— */
let lenis: Lenis | null = null;
export function useSmoothScroll() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    let id = 0;
    const raf = (t: number) => { lenis?.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis?.destroy(); lenis = null; };
  }, [reduce]);
}
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -20 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
export function onAnchor(e: React.MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute('href') || '';
  if (href.startsWith('#')) { e.preventDefault(); scrollToId(href.slice(1)); history.replaceState(null, '', href); }
}

/* ——— CCM pinwheel mark ——— */
interface PinwheelProps { size?: number | string; spread?: MotionValue<number> | number; rotate?: MotionValue<number> | number; className?: string; fill?: number; title?: string }
const DIRS = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
export function Pinwheel({ size = '100%', spread = 0, rotate = 0, className, fill = 4, title }: PinwheelProps) {
  return (
    <motion.svg viewBox="0 0 146 146" width={size} height={size} className={className} style={{ rotate, overflow: 'visible' }} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {MARK_PATHS.map((p, i) => <Petal key={i} d={p.d} fill={p.fill} dir={DIRS[i]} spread={spread} opacity={0.18 + 0.82 * Math.max(0, Math.min(1, fill - i))} />)}
    </motion.svg>
  );
}
function Petal({ d, fill, dir, spread, opacity }: { d: string; fill: string; dir: number[]; spread: MotionValue<number> | number; opacity: number }) {
  const s = typeof spread === 'number' ? null : spread;
  const x = useMotionValue(0), y = useMotionValue(0);
  useEffect(() => {
    if (!s) { x.set(dir[0] * (spread as number)); y.set(dir[1] * (spread as number)); return; }
    const up = (v: number) => { x.set(dir[0] * v); y.set(dir[1] * v); };
    up(s.get());
    return s.on('change', up);
  }, [s, spread, dir, x, y]);
  return <motion.path d={d} fill={fill} fillRule="evenodd" style={{ x, y }} initial={false} animate={{ opacity }} transition={{ duration: 0.5 }} />;
}

/* ——— Reveal on scroll ——— */
export function Reveal({ children, delay = 0, y = 40, className, as = 'div', style }: { children: ReactNode; delay?: number; y?: number; className?: string; as?: 'div' | 'li' | 'p' | 'span'; style?: CSSProperties }) {
  const reduce = useReducedMotion();
  const M = motion[as] as typeof motion.div;
  return (
    <M className={className} style={style} initial={reduce ? false : { opacity: 0, y, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-12% 0px' }} transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </M>
  );
}

/** Splits a heading into words that rise in, staggered. The parent is observed (the words start clipped, so they can't be). */
export function SplitWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span className={className} aria-label={text} initial={reduce ? false : 'hide'} whileInView="show" viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ staggerChildren: 0.05, delayChildren: delay }}>
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden="true" style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '.1em', marginBottom: '-.1em' }}>
          <motion.span style={{ display: 'inline-block' }} variants={{ hide: { y: '110%' }, show: { y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } }}>
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* ——— Magnetic wrapper ——— */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 16 }), y = useSpring(0, { stiffness: 220, damping: 16 });
  const reduce = useReducedMotion();
  const move = (e: PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength); y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  return (
    <motion.span ref={ref} style={{ x, y, display: 'inline-flex' }} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.span>
  );
}

/* ——— Cursor-follow spotlight on glass cards ——— */
export function spotlight(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget, r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}

/* ——— 3D tilt ——— */
export function Tilt({ children, className, max = 8, style }: { children: ReactNode; className?: string; max?: number; style?: CSSProperties }) {
  const rx = useSpring(0, { stiffness: 150, damping: 18 }), ry = useSpring(0, { stiffness: 150, damping: 18 });
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} style={{ ...style, rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2); rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
        spotlight(e);
      }}
      onPointerLeave={() => { rx.set(0); ry.set(0); }}>
      {children}
    </motion.div>
  );
}

/* ——— Count-up number ——— */
export function CountUp({ to, suffix = '', duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [v, setV] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView) return;
    if (reduce) { setV(to); return; }
    const c = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to, duration, reduce]);
  return <span ref={ref}>{v.toLocaleString('en-US')}{suffix}</span>;
}

/* ——— Petal confetti burst (fun!) ——— */
export function burst(x: number, y: number, n = 36) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const colors = ['#88326f', '#fca927', '#8dd8f7', '#9ecb3c', '#d56bb4', '#f7862a'];
  for (let i = 0; i < n; i++) {
    const el = document.createElement('i');
    const s = 8 + Math.random() * 10;
    Object.assign(el.style, { position: 'fixed', left: `${x}px`, top: `${y}px`, width: `${s}px`, height: `${s}px`, zIndex: '99', pointerEvents: 'none',
      background: colors[i % colors.length], borderRadius: '50% 50% 50% 0' });
    document.body.appendChild(el);
    const a = Math.random() * Math.PI * 2, d = 120 + Math.random() * 260;
    el.animate([
      { transform: 'translate(-50%,-50%) rotate(0deg) scale(1)', opacity: 1 },
      { transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d + 200}px) rotate(${Math.random() * 720}deg) scale(.4)`, opacity: 0 },
    ], { duration: 1200 + Math.random() * 900, easing: 'cubic-bezier(.2,.8,.3,1)' }).onfinish = () => el.remove();
  }
}
