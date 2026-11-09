import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Marquee, Story } from './components/Story';
import { Services } from './components/Services';
import { Grit } from './components/Grit';
import { GrowthCompass } from './components/GrowthCompass';
import { LeadershipLens } from './components/LeadershipLens';
import { Contact, Footer, Government, Impact, Insights, Testimonials } from './components/Sections';
import { useSmoothScroll } from './components/ui';
import { Assessments } from './components/Assessments';

export default function App() {
  useSmoothScroll();
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
        <Testimonials />
        <Government />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
