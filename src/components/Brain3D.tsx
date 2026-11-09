/**
 * Interactive 3D brain for the Leadership Lens.
 * A procedurally sculpted, translucent brain (two hemispheres, cerebellum, brainstem) with glowing regions
 * and neural pulses that travel the pathways involved in each step of "how your brain creates your reality".
 * Drag to rotate; tap a region to learn what it does.
 */
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

import { REGIONS, type Region } from './brainData';
export type { Region };

type PathKey = 'in-thal' | 'thal-pfc' | 'thal-amy' | 'hip-pfc' | 'hip-amy' | 'amy-stem' | 'pfc-amy' | 'pfc-stem';
const INPUT: [number, number, number] = [0, -0.1, 1.8];

/** Brain state for each moment of the Lens flow (0–5 stages, 6 pause, 7 autopilot, 8 with a pause). */
export const STEPS: { regions: Region[]; paths: PathKey[]; tone: 'warm' | 'alarm' | 'calm' }[] = [
  { regions: ['thalamus'], paths: ['in-thal'], tone: 'warm' },
  { regions: ['thalamus', 'pfc'], paths: ['in-thal', 'thal-pfc'], tone: 'calm' },
  { regions: ['hippocampus'], paths: ['hip-pfc', 'hip-amy'], tone: 'warm' },
  { regions: ['pfc', 'hippocampus'], paths: ['hip-pfc'], tone: 'warm' },
  { regions: ['amygdala'], paths: ['thal-amy', 'hip-amy'], tone: 'alarm' },
  { regions: ['amygdala', 'brainstem'], paths: ['amy-stem'], tone: 'alarm' },
  { regions: ['pfc', 'amygdala'], paths: ['pfc-amy'], tone: 'calm' },
  { regions: ['amygdala', 'brainstem'], paths: ['thal-amy', 'amy-stem'], tone: 'alarm' },
  { regions: ['pfc'], paths: ['thal-pfc', 'pfc-amy', 'pfc-stem'], tone: 'calm' },
];

/* ——— tiny 3D value noise for the cortical folds ——— */
function hash(x: number, y: number, z: number) {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return s - Math.floor(s);
}
function noise(x: number, y: number, z: number) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
  const l = (a: number, b: number, t: number) => a + (b - a) * t;
  const c = (dx: number, dy: number, dz: number) => hash(xi + dx, yi + dy, zi + dz);
  return l(
    l(l(c(0, 0, 0), c(1, 0, 0), u), l(c(0, 1, 0), c(1, 1, 0), u), v),
    l(l(c(0, 0, 1), c(1, 0, 1), u), l(c(0, 1, 1), c(1, 1, 1), u), v), w) * 2 - 1;
}
const ridged = (x: number, y: number, z: number) => {
  let s = 0, a = 0.6, f = 1;
  for (let o = 0; o < 3; o++) { s += a * (1 - Math.abs(noise(x * f, y * f, z * f))) ** 2; a *= 0.5; f *= 2.1; }
  return s;
};

function hemisphere(side: 1 | -1) {
  const g = new THREE.SphereGeometry(1, 180, 140);
  const p = g.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3(), n = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const medial = v.x * side < 0;
    if (medial) v.x *= 0.12; // flat inner wall where the hemispheres meet
    // proportions: long front-to-back, rounded top, flatter underneath
    v.x *= 0.66; v.y *= 0.74; v.z *= 1.16;
    if (v.y < -0.1) v.y = -0.1 + (v.y + 0.1) * 0.7;
    // frontal lobe a touch taller, occipital slightly narrower
    if (v.z > 0.3) v.y *= 1 + (v.z - 0.3) * 0.08;
    if (v.z < -0.6) v.x *= 0.92;
    // temporal lobe bulge low on the outer side
    if (!medial && v.y < 0.02 && v.z > -0.45 && v.z < 0.75) v.x *= 1 + 0.16 * Math.sin(((v.z + 0.45) / 1.2) * Math.PI) * Math.min(1, (0.02 - v.y) * 4);
    n.copy(v).normalize();
    // cortical folds: sharp ridged noise, softer on the medial wall
    const f = ridged(v.x * 5.2 + side * 11, v.y * 5.2, v.z * 4.6);
    v.addScaledVector(n, (f * f) * (medial ? 0.025 : 0.06));
    v.x += side * 0.035;
    p.setXYZ(i, v.x, v.y + 0.14, v.z);
  }
  g.computeVertexNormals();
  return g;
}

function cerebellum() {
  const g = new THREE.SphereGeometry(1, 96, 64);
  const p = g.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const n = v.clone();
    v.multiply(new THREE.Vector3(0.6, 0.3, 0.38));
    v.addScaledVector(n, Math.abs(Math.sin(v.y * 70)) * 0.018);
    p.setXYZ(i, v.x, v.y - 0.42, v.z - 0.78);
  }
  g.computeVertexNormals();
  return g;
}

const shellMat = (color: string, rim: string) => new THREE.ShaderMaterial({
  transparent: true, depthWrite: false, side: THREE.DoubleSide,
  uniforms: { uColor: { value: new THREE.Color(color) }, uRim: { value: new THREE.Color(rim) } },
  vertexShader: `varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix * normal); vV = -mv.xyz; gl_Position = projectionMatrix * mv; }`,
  fragmentShader: `uniform vec3 uColor; uniform vec3 uRim; varying vec3 vN; varying vec3 vV;
    void main(){ vec3 n = normalize(vN); float f = pow(1.0 - abs(dot(n, normalize(vV))), 2.2);
      float l = 0.45 + 0.55 * max(dot(n, normalize(vec3(0.4,0.8,0.6))), 0.0);
      vec3 c = mix(uColor * l, uRim, f); gl_FragColor = vec4(c, 0.16 + 0.62 * f); }`,
});

function curve(a: number[], b: number[], lift = 0.35) {
  const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b);
  const M = A.clone().lerp(B, 0.5); M.y += lift;
  return new THREE.QuadraticBezierCurve3(A, M, B);
}

function Pathway({ c, active, color }: { c: THREE.Curve<THREE.Vector3>; active: boolean; color: string }) {
  const pulses = useRef<THREE.Mesh[]>([]);
  const lineObj = useMemo(() => new THREE.Line(new THREE.BufferGeometry().setFromPoints(c.getPoints(40)), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.08, depthWrite: false })), [c, color]);
  const mat = useRef(lineObj.material as THREE.LineBasicMaterial);
  mat.current = lineObj.material as THREE.LineBasicMaterial;
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mat.current) mat.current.opacity = THREE.MathUtils.lerp(mat.current.opacity, active ? 0.75 : 0.08, 0.08);
    pulses.current.forEach((m, i) => {
      if (!m) return;
      const k = (t * 0.55 + i / 3) % 1;
      m.position.copy(c.getPoint(k));
      const s = active ? 0.045 * Math.sin(k * Math.PI) + 0.01 : 0;
      m.scale.setScalar(s / 0.05);
    });
  });
  return (
    <group>
      <primitive object={lineObj} />
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(m) => { if (m) pulses.current[i] = m; }}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color={color} transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

function RegionNode({ k, pos, active, selected, onSelect }: { k: Region; pos: [number, number, number]; active: boolean; selected: boolean; onSelect: (r: Region) => void }) {
  const core = useRef<THREE.Mesh>(null), halo = useRef<THREE.Mesh>(null);
  const [hover, setHover] = useState(false);
  const r = REGIONS[k];
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const on = active || selected || hover;
    const target = on ? 1 + Math.sin(t * 4) * 0.12 : 0.55;
    if (core.current) core.current.scale.lerp(new THREE.Vector3(target, target, target), 0.12);
    if (halo.current) {
      const hm = halo.current.material as THREE.MeshBasicMaterial;
      hm.opacity = THREE.MathUtils.lerp(hm.opacity, on ? 0.35 + Math.sin(t * 4) * 0.12 : 0.06, 0.1);
      halo.current.scale.setScalar(on ? 2.4 + Math.sin(t * 2) * 0.3 : 1.6);
    }
  });
  return (
    <group position={pos}>
      <mesh ref={core} onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onSelect(k); }}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = ''; }}>
        <sphereGeometry args={[0.085, 24, 24]} />
        <meshBasicMaterial color={r.color} />
      </mesh>
      <mesh ref={halo}>
        <sphereGeometry args={[0.085, 24, 24]} />
        <meshBasicMaterial color={r.color} transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {(hover || selected) && (
        <Html center position={[0, 0.22, 0]} style={{ pointerEvents: 'none' }}>
          <span className="brain-tag" style={{ ['--c' as string]: r.color }}>{r.name}</span>
        </Html>
      )}
    </group>
  );
}

function Brain({ step, selected, onSelect }: { step: number; selected: Region | null; onSelect: (r: Region) => void }) {
  const left = useMemo(() => hemisphere(-1), []), right = useMemo(() => hemisphere(1), []), cb = useMemo(() => cerebellum(), []);
  const tone = STEPS[step]?.tone ?? 'warm';
  const shell = useMemo(() => shellMat('#c98bb6', '#ffd9f0'), []);
  const cbMat = useMemo(() => shellMat('#a86a96', '#f5c9e6'), []);
  useEffect(() => {
    const rim = tone === 'alarm' ? '#ffb38a' : tone === 'calm' ? '#bfe9ff' : '#ffd9f0';
    shell.uniforms.uRim.value.set(rim);
  }, [tone, shell]);
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => { if (g.current) g.current.position.y = Math.sin(clock.getElapsedTime() * 0.8) * 0.03; });

  const P = REGIONS;
  const paths = useMemo(() => {
    const L = (r: Region, i = 0) => P[r].pos[Math.min(i, P[r].pos.length - 1)];
    const both = (a: Region, b: Region, lift?: number) => [curve(L(a, 0), L(b, 0), lift), curve(L(a, 1), L(b, 1), lift)];
    return {
      'in-thal': [curve(INPUT, L('thalamus'), 0.1)],
      'thal-pfc': [curve(L('thalamus'), L('pfc', 0), 0.45), curve(L('thalamus'), L('pfc', 1), 0.45)],
      'thal-amy': [curve(L('thalamus'), L('amygdala', 0), 0.05), curve(L('thalamus'), L('amygdala', 1), 0.05)],
      'hip-pfc': both('hippocampus', 'pfc', 0.6),
      'hip-amy': both('hippocampus', 'amygdala', 0.08),
      'amy-stem': [curve(L('amygdala', 0), L('brainstem'), -0.1), curve(L('amygdala', 1), L('brainstem'), -0.1)],
      'pfc-amy': both('pfc', 'amygdala', 0.2),
      'pfc-stem': [curve(L('pfc', 0), L('brainstem'), 0.3), curve(L('pfc', 1), L('brainstem'), 0.3)],
    } as Record<PathKey, THREE.Curve<THREE.Vector3>[]>;
  }, [P]);
  const PATH_COLOR: Record<PathKey, string> = { 'in-thal': '#d56bb4', 'thal-pfc': '#8dd8f7', 'thal-amy': '#fca927', 'hip-pfc': '#9ecb3c', 'hip-amy': '#9ecb3c', 'amy-stem': '#ff7a70', 'pfc-amy': '#8dd8f7', 'pfc-stem': '#8dd8f7' };
  const s = STEPS[step] || STEPS[0];

  return (
    <group ref={g} rotation={[0.18, -0.95, 0]}>
      <mesh geometry={left} material={shell} renderOrder={2} />
      <mesh geometry={right} material={shell} renderOrder={2} />
      <mesh geometry={cb} material={cbMat} renderOrder={2} />
      <mesh position={[0, -0.62, -0.38]} rotation={[0.3, 0, 0]} material={cbMat} renderOrder={2}>
        <cylinderGeometry args={[0.15, 0.1, 0.7, 24]} />
      </mesh>
      {(Object.keys(paths) as PathKey[]).map((k) => paths[k].map((c, i) => <Pathway key={k + i} c={c} active={s.paths.includes(k)} color={PATH_COLOR[k]} />))}
      {(Object.keys(REGIONS) as Region[]).map((k) => REGIONS[k].pos.map((p, i) => (
        <RegionNode key={k + i} k={k} pos={p} active={s.regions.includes(k)} selected={selected === k} onSelect={onSelect} />
      )))}
      {step === 0 && (
        <Html position={INPUT} center style={{ pointerEvents: 'none' }}><span className="brain-tag" style={{ ['--c' as string]: '#d56bb4' }}>The event</span></Html>
      )}
    </group>
  );
}

export default function Brain3D({ step, selected, onSelect }: { step: number; selected: Region | null; onSelect: (r: Region) => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);
  const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  return (
    <div ref={wrap} className="brain-canvas">
      <Canvas frameloop={visible ? 'always' : 'never'} dpr={[1, 2]} camera={{ position: [0, 0.3, 3.9], fov: 38 }} gl={{ antialias: true, alpha: true }}>
        <Brain step={step} selected={selected} onSelect={onSelect} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={!reduce} autoRotateSpeed={0.6} minPolarAngle={Math.PI * 0.25} maxPolarAngle={Math.PI * 0.75} />
      </Canvas>
    </div>
  );
}
