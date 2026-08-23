import { Cre8Main, Cre8Heading, Cre8Card, Cre8TextPassage, Cre8Badge } from '@tmorrow/cre8-react';

// Negative control for the render+DOM-audit path itself (not a task solution -
// mcp-freecode-portfolio is an open brief with no single reference answer).
// Every mistake here is one TypeScript can't catch: the react-wrappers'
// generator falls back to `status?: any` / `variant?: any` for enum-typed
// props rather than a real union, and `slot` is just a bare HTML attribute
// with no type at all - so both of these compile and build cleanly, and only
// reach the scorer via a live DOM read. That's deliberate: it's proof the
// enum_validity and slot_validity dimensions are still live checks for real
// code, not just for hand-authored A2UI JSON. (component_validity and
// prop_validity, by contrast, are naturally caught at compile time for
// honestly-typed code - an unknown import or an unknown JSX prop is a build
// error before this ever runs - which selftest.sh's build-failure case
// already covers.)
export default function App() {
  return (
    <Cre8Main>
      <Cre8Heading tagVariant="h1">Test</Cre8Heading>
      <Cre8Card>
        {/* "sidebar" isn't one of cre8-card's real slots (default/header/footer) */}
        <div slot="sidebar">
          <Cre8TextPassage>
            <p>Body</p>
          </Cre8TextPassage>
        </div>
        {/* "urgent" isn't one of cre8-badge's real status values */}
        <Cre8Badge text="Oops" status="urgent" />
      </Cre8Card>
    </Cre8Main>
  );
}
