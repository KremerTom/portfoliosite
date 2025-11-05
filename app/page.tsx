'use client';

import { Container, Title, Text, Stack, Anchor, Divider, Box, Group } from '@mantine/core';
import { ProjectCard } from './components/ProjectCard';

export default function Home() {
  return (
    <Box style={{ backgroundColor: '#F4EAE0', minHeight: '100vh' }}>
      <Container size="xl" py={80} px={60}>
        <Stack gap={60}>
          {/* Header */}
          <Stack gap="md">
            <Title
              order={1}
              size={64}
              style={{
                color: '#000000',
                fontWeight: 600,
                letterSpacing: '-0.02em'
              }}
            >
              Tom Kremer
            </Title>
            <Text
              size="xl"
              style={{ color: '#666666' }}
            >
              Developer & Builder
            </Text>
            <Group gap="sm" mt={8}>
              <Anchor
                href="https://www.linkedin.com/in/kremertom/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  opacity: 0.6,
                  transition: 'opacity 0.2s'
                }}
                styles={{
                  root: {
                    '&:hover': {
                      opacity: 1
                    }
                  }
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#666666">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Anchor>
            </Group>
          </Stack>

          <Divider color="#000000" opacity={0.1} />

          {/* Projects Section */}
          <Stack gap="xl">
            <Title
              order={2}
              size="h3"
              style={{ color: '#000000', fontWeight: 600 }}
            >
              Projects
            </Title>

            <Stack gap="lg">
              <ProjectCard
                title="C.F.I.T."
                description="Track congressional and federal investment activities"
                projectId="cfit"
                href="https://cfit-green.vercel.app/"
                screenshots={['dashboard.png', 'portfolio.png']}
              />
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
