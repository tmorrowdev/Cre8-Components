import { LandingPage } from '@tmorrow/cre9-react';

function App() {
  return (
    <LandingPage
      logoText="CRE8"
      heroTitle="Build Beautiful Interfaces in Record Time"
      heroSubtitle="CRE8 is the design system and component library that helps teams ship production-ready interfaces 10x faster."
      onPrimaryCtaClick={() => console.log('Primary CTA clicked')}
      onSecondaryCtaClick={() => console.log('Secondary CTA clicked')}
    />
  );
}

export default App;
