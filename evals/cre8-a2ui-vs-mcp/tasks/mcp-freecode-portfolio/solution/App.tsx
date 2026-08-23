import {
  Cre8Main,
  Cre8Grid,
  Cre8GridItem,
  Cre8Card,
  Cre8Heading,
  Cre8TextPassage,
  Cre8Badge,
  Cre8Button,
} from '@tmorrow/cre8-react';

const projects = [
  {
    name: 'Latency Lens',
    summary: 'Real-time p99 tracing across a 400-service mesh, cut MTTR by 60%.',
    status: 'success' as const,
    tag: 'Shipped',
  },
  {
    name: 'Signal Router',
    summary: 'Adaptive request routing that learns per-tenant traffic shape.',
    status: 'info' as const,
    tag: 'In Production',
  },
  {
    name: 'Drift Watch',
    summary: 'Continuous eval harness catching model regressions before release.',
    status: 'attention' as const,
    tag: 'Open Source',
  },
];

export default function App() {
  return (
    <Cre8Main>
      <Cre8Heading type="display-small" tagVariant="h1">
        Priya Natarajan
      </Cre8Heading>
      <Cre8TextPassage size="large">
        <p>AI engineer building the infrastructure that keeps large agent systems fast, observable, and honest.</p>
      </Cre8TextPassage>

      <Cre8Grid variant="3up" gap="lg">
        {projects.map((project) => (
          <Cre8GridItem key={project.name}>
            <Cre8Card fullHeight>
              <div slot="header">
                <Cre8Heading type="title-default" tagVariant="h2">
                  {project.name}
                </Cre8Heading>
              </div>
              <Cre8TextPassage>
                <p>{project.summary}</p>
              </Cre8TextPassage>
              <div slot="footer">
                <Cre8Badge text={project.tag} status={project.status} />
              </div>
            </Cre8Card>
          </Cre8GridItem>
        ))}
      </Cre8Grid>

      <Cre8Button text="View résumé" variant="primary" href="#resume" />
    </Cre8Main>
  );
}
