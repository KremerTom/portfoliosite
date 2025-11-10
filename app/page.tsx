'use client';

import { Container, Title, Text, Stack, Anchor, Divider, Box, Group, TextInput, Textarea, Button } from '@mantine/core';
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
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                    letterSpacing: '0.05em',
                    transition: 'all 0.3s ease'
                  }}
                >
                  TOM KREMER
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
                <Box
                  component="button"
                  onClick={() => scrollToSection('contact')}
                  style={{
                    backgroundColor: '#4A7C9E',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    transition: 'all 0.2s',
                  }}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#5A8CAE',
                      transform: 'translateY(-1px)',
                    }
                  }}
                >
                  Say Hi
                </Box>
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
                  letterSpacing: '0.08em'
                }}
              >
                TOM KREMER
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
              <Box
                component="button"
                onClick={() => scrollToSection('contact')}
                style={{
                  backgroundColor: '#4A7C9E',
                  color: '#FFFFFF',
                  fontSize: '16px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  transition: 'all 0.2s',
                }}
                sx={{
                  '&:hover': {
                    backgroundColor: '#5A8CAE',
                    transform: 'translateY(-1px)',
                  }
                }}
              >
                Say Hi
              </Box>
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
                letterSpacing: '0.1em'
              }}
            >
              BACKGROUND
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
                letterSpacing: '0.1em'
              }}
            >
              PROJECTS
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
                letterSpacing: '0.1em'
              }}
            >
              OTHER
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

          <Divider color="#000000" opacity={0.1} />

          {/* Contact Section */}
          <Stack gap="xl" id="contact" style={{ scrollMarginTop: '20px' }}>
            <Title
              order={2}
              size={48}
              style={{
                color: '#000000',
                letterSpacing: '0.1em'
              }}
            >
              SAY HI
            </Title>
            <Text size="lg" style={{ color: '#666666', lineHeight: 1.6 }}>
              Have a project in mind or just want to chat?
            </Text>

            <form onSubmit={handleSubmit}>
              <Stack gap="md" style={{ maxWidth: '600px' }}>
                <TextInput
                  label="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  styles={{
                    input: {
                      backgroundColor: '#FAF6F0',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      '&:focus': {
                        borderColor: '#000000',
                      },
                    },
                    label: {
                      color: '#000000',
                      fontWeight: 500,
                      marginBottom: '8px',
                    },
                  }}
                />
                <TextInput
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  styles={{
                    input: {
                      backgroundColor: '#FAF6F0',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      '&:focus': {
                        borderColor: '#000000',
                      },
                    },
                    label: {
                      color: '#000000',
                      fontWeight: 500,
                      marginBottom: '8px',
                    },
                  }}
                />
                <Textarea
                  label="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  minRows={4}
                  styles={{
                    input: {
                      backgroundColor: '#FAF6F0',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      '&:focus': {
                        borderColor: '#000000',
                      },
                    },
                    label: {
                      color: '#000000',
                      fontWeight: 500,
                      marginBottom: '8px',
                    },
                  }}
                />
                <Button
                  type="submit"
                  loading={isSubmitting}
                  style={{
                    backgroundColor: '#000000',
                    color: '#FFFFFF',
                    padding: '16px 32px',
                    fontSize: '16px',
                    fontWeight: 500,
                    transition: 'all 0.2s',
                    height: 'auto',
                    minHeight: '48px',
                  }}
                  styles={{
                    root: {
                      '&:hover': {
                        backgroundColor: '#333333',
                      },
                    },
                    label: {
                      lineHeight: '1.5',
                    },
                  }}
                >
                  Send
                </Button>
                {submitStatus === 'success' && (
                  <Text style={{ color: '#000000' }}>Thanks for reaching out! I'll get back to you soon.</Text>
                )}
                {submitStatus === 'error' && (
                  <Text style={{ color: '#FF0000' }}>Something went wrong. Please try again or email me directly.</Text>
                )}
              </Stack>
            </form>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
