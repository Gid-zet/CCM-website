import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Marquee, Story } from './components/Story';
import { Services } from './components/Services';
import { Grit } from './components/Grit';
import { GrowthCompass } from './components/GrowthCompass';
import { LeadershipLens } from './components/LeadershipLens';
import { Contact, Footer, Government, HowWeWork, Impact, Insights, Testimonials } from './components/Sections';
import { Cursor, LiquidFilter, useSmoothScroll } from './components/ui';

export default function App() {
  useSmoothScroll();
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <LiquidFilter />
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Story />
        <Services />
        <Impact />
        <Grit />
        <GrowthCompass />
        <LeadershipLens />
        <HowWeWork />
        <Testimonials />
        <Government />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
