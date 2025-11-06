'use client';

import { Container, Title, Text, Stack, Anchor, Divider, Box, Group } from '@mantine/core';
import { useState, useEffect } from 'react';
import { ProjectCard } from './components/ProjectCard';

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box style={{ backgroundColor: '#F4EAE0', minHeight: '100vh' }}>
      {/* Sticky Header */}
      <Box
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: isScrolled ? (isHeaderHovered ? '#FFFFFF' : '#FAF6F0') : 'transparent',
          borderBottom: isScrolled ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
          boxShadow: isScrolled ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
          zIndex: 100,
          transition: 'all 0.3s ease',
          padding: isScrolled ? '16px 0' : '0',
        }}
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
      >
        {isScrolled && (
          <Container size="xl" px={60}>
            <Group justify="space-between" align="center">
              {/* Left side - Name and LinkedIn */}
              <Group gap="md" align="center">
                <Title
                  order={1}
                  size={32}
                  style={{
                    color: '#000000',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Tom Kremer
                </Title>
                <Anchor
                  href="https://www.linkedin.com/in/kremertom/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    opacity: 0.6,
                    transition: 'opacity 0.2s',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '5px'
                  }}
                  styles={{
                    root: {
                      '&:hover': {
                        opacity: 1
                      }
                    }
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#666666">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Anchor>
              </Group>

              {/* Right side - Navigation */}
              <Group gap="xl">
                <Anchor
                  component="button"
                  onClick={() => scrollToSection('background')}
                  style={{
                    color: '#000000',
                    fontSize: '16px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s',
                    border: 'none',
                    background: 'none',
                    padding: 0
                  }}
                  styles={{
                    root: {
                      '&:hover': {
                        opacity: 0.6
                      }
                    }
                  }}
                >
                  Background
                </Anchor>
                <Anchor
                  component="button"
                  onClick={() => scrollToSection('projects')}
                  style={{
                    color: '#000000',
                    fontSize: '16px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s',
                    border: 'none',
                    background: 'none',
                    padding: 0
                  }}
                  styles={{
                    root: {
                      '&:hover': {
                        opacity: 0.6
                      }
                    }
                  }}
                >
                  Projects
                </Anchor>
                <Anchor
                  component="button"
                  onClick={() => scrollToSection('other')}
                  style={{
                    color: '#000000',
                    fontSize: '16px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s',
                    border: 'none',
                    background: 'none',
                    padding: 0
                  }}
                  styles={{
                    root: {
                      '&:hover': {
                        opacity: 0.6
                      }
                    }
                  }}
                >
                  Other
                </Anchor>
              </Group>
            </Group>
          </Container>
        )}
      </Box>

      <Container size="xl" py={80} px={60}>
        <Stack gap={80}>
          {/* Header with Navigation */}
          <Group justify="space-between" align="flex-end">
            {/* Left side - Name and LinkedIn */}
            <Group gap="xl" align="center">
              <Title
                order={1}
                size={64}
                style={{
                  color: '#000000',
                  fontWeight: 700,
                  letterSpacing: '-0.03em'
                }}
              >
                Tom Kremer
              </Title>
              <Anchor
                href="https://www.linkedin.com/in/kremertom/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  opacity: 0.6,
                  transition: 'opacity 0.2s',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '20px'
                }}
                styles={{
                  root: {
                    '&:hover': {
                      opacity: 1
                    }
                  }
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#666666">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Anchor>
            </Group>

            {/* Right side - Navigation */}
            <Group gap="xl" style={{ marginBottom: '8px' }}>
              <Anchor
                component="button"
                onClick={() => scrollToSection('background')}
                style={{
                  color: '#000000',
                  fontSize: '16px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                  border: 'none',
                  background: 'none',
                  padding: 0
                }}
                styles={{
                  root: {
                    '&:hover': {
                      opacity: 0.6
                    }
                  }
                }}
              >
                Background
              </Anchor>
              <Anchor
                component="button"
                onClick={() => scrollToSection('projects')}
                style={{
                  color: '#000000',
                  fontSize: '16px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                  border: 'none',
                  background: 'none',
                  padding: 0
                }}
                styles={{
                  root: {
                    '&:hover': {
                      opacity: 0.6
                    }
                  }
                }}
              >
                Projects
              </Anchor>
              <Anchor
                component="button"
                onClick={() => scrollToSection('other')}
                style={{
                  color: '#000000',
                  fontSize: '16px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                  border: 'none',
                  background: 'none',
                  padding: 0
                }}
                styles={{
                  root: {
                    '&:hover': {
                      opacity: 0.6
                    }
                  }
                }}
              >
                Other
              </Anchor>
            </Group>
          </Group>

          <Divider color="#000000" opacity={0.1} />

          {/* Background Section */}
          <Stack gap="xl" id="background" style={{ scrollMarginTop: '20px' }}>
            <Title
              order={2}
              size={48}
              style={{
                color: '#000000',
                fontWeight: 700,
                letterSpacing: '-0.02em'
              }}
            >
              Background
            </Title>
            <Text size="lg" style={{ color: '#666666', lineHeight: 1.6 }}>
              My name's Tom Kremer, and I build fullstack web apps with machine learning capabilities for SMBs and Enterprise.
              <br /><br />
              I focus on building tools that are actually used - ones that unlock real value and fit into existing workflows.
              {/* <br /><br /> */}
              {/* Needfinding. UX Design. Data modelling. Full stack development. Production deployment. */}
            </Text>
          </Stack>

          <Divider color="#000000" opacity={0.1} />

          {/* Projects Section */}
          <Stack gap="xl" id="projects" style={{ scrollMarginTop: '20px' }}>
            <Title
              order={2}
              size={48}
              style={{
                color: '#000000',
                fontWeight: 700,
                letterSpacing: '-0.02em'
              }}
            >
              Projects
            </Title>

            <Stack gap="lg">
              <ProjectCard
                title="C.F.I.T."
                description="Get daily recommended stock picks based on federal investments, congressional trades, political news sources, and other live indicators."
                projectId="cfit"
                href="https://cfit-green.vercel.app/"
                date="October 2025"
                screenshots={['dashboard.png', 'portfolio.png']}
              />

              <ProjectCard
                title="Goin' Electric"
                description="A site to help people find their first EVs. Matched gas cars with the closest driving experience in EV, taking into account local charger availability and government incentives."
                projectId="goin-electric"
                href="#"
                date="November 2022"
                screenshots={['page1.png', 'page2.png']}
              />
            </Stack>
          </Stack>

          <Divider color="#000000" opacity={0.1} />

          {/* Other Section */}
          <Stack gap="xl" id="other" style={{ scrollMarginTop: '20px' }}>
            <Title
              order={2}
              size={48}
              style={{
                color: '#000000',
                fontWeight: 700,
                letterSpacing: '-0.02em'
              }}
            >
              Other
            </Title>
            <Text size="lg" style={{ color: '#666666', lineHeight: 1.6 }}>
              22 time All-American from Stanford, Captain senior year.{' '}
              <Anchor
                href="https://gostanford.com/sports/mens-swimming-diving/roster/player/tom-kremer"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#000000',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s'
                }}
                styles={{
                  root: {
                    '&:hover': {
                      opacity: 0.6
                    }
                  }
                }}
              >
                View Stanford profile
              </Anchor>
              <br/><br/>
              Competed internationally for Israeli national swim team. 
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
