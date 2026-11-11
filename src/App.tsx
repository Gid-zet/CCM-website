import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Marquee, Story } from './components/Story';
import { Services } from './components/Services';
import { Grit } from './components/Grit';
import { GrowthCompass } from './components/GrowthCompass';
import { LeadershipLens } from './components/LeadershipLens';
import { Contact, Footer, Government, HowWeWork, Impact, Insights, Testimonials } from './components/Sections';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { useSmoothScroll } from './components/ui';
import { track } from './lib/analytics';
import { Assessments } from './components/Assessments';

export default function App() {
  useSmoothScroll();
  // One listener tracks every "book a call" link and outbound sample/service link, wherever it sits on the page.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      const section = a.closest('section')?.id || (a.closest('header') ? 'nav' : a.closest('footer') ? 'footer' : 'page');
      if (href.includes('widget/booking') || href === '#contact') track('Book Call Click', { section });
      else if (href.endsWith('.pdf')) track('Sample Download', { file: href.split('/').pop() || href });
      else if (/^https?:/.test(href) && !href.includes(location.host)) track('Outbound Link', { url: href.slice(0, 200), section });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Story />
        <Services />
        <Impact />
        <Grit />
        <Assessments />
        <GrowthCompass />
        <LeadershipLens />
        <HowWeWork />
        <Testimonials />
        <Government />
        <Insights />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </>
  );
}
