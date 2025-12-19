'use client';

import { Container, Title, Text, Stack, Anchor, Divider, Box, Group, TextInput, Textarea, Button, Burger, Drawer } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
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
  const [mobileMenuOpened, { toggle: toggleMobileMenu, close: closeMobileMenu }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTabletOrMobile = useMediaQuery('(max-width: 992px)'); // md breakpoint

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
    <Box bg="warmBeige.1" style={{ minHeight: '100vh' }}>
      {/* Sticky Header */}
      <Box
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: isScrolled ? (isHeaderHovered ? '#FFFFFF' : 'var(--mantine-color-warmBeige-0)') : 'transparent',
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
          <Container size="xl" style={{ paddingLeft: isMobile ? '20px' : isTabletOrMobile ? '40px' : '60px', paddingRight: isMobile ? '20px' : isTabletOrMobile ? '40px' : '60px' }}>
            <Group justify="space-between" align="center">
              {/* Left side - Name and LinkedIn */}
              <Group gap="md" align="center">
                <Title
                  order={1}
                  c="warmBeige.9"
                  style={{
                    fontSize: isMobile ? '24px' : isTabletOrMobile ? '28px' : '32px',
                    fontWeight: isMobile ? 700 : isTabletOrMobile ? 700 : 400,
                    letterSpacing: '0.05em',
                    transition: 'all 0.3s ease'
                  }}
                >
                  TOM KREMER
                </Title>
                {!isMobile && (
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
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--mantine-color-warmBeige-8)">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </Anchor>
                )}
              </Group>

              {/* Right side - Navigation */}
              {isMobile ? (
                <Group gap="sm">
                  <Button
                    onClick={() => {
                      scrollToSection('contact');
                    }}
                    color="accent.7"
                    size="compact-sm"
                    radius="md"
                  >
                    Say Hi
                  </Button>
                  <Burger
                    opened={mobileMenuOpened}
                    onClick={toggleMobileMenu}
                    size="sm"
                    color="var(--mantine-color-warmBeige-9)"
                  />
                </Group>
              ) : (
                <Group gap="xl">
                  <Anchor
                    component="button"
                    onClick={() => scrollToSection('projects')}
                    c="warmBeige.9"
                    style={{
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
                    c="warmBeige.9"
                    style={{
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
                  <Button
                    onClick={() => scrollToSection('contact')}
                    color="accent.7"
                    size="sm"
                    radius="md"
                  >
                    Say Hi
                  </Button>
                </Group>
              )}
            </Group>
          </Container>
        )}
      </Box>

      {/* Mobile Menu Drawer */}
      <Drawer
        opened={mobileMenuOpened}
        onClose={closeMobileMenu}
        position="right"
        size="75%"
        styles={{
          content: {
            backgroundColor: 'var(--mantine-color-warmBeige-0)',
          },
        }}
      >
        <Stack gap="xl" p="md">
          <Anchor
            component="button"
            onClick={() => {
              scrollToSection('projects');
              closeMobileMenu();
            }}
            c="warmBeige.9"
            style={{
              fontSize: '20px',
              fontWeight: 500,
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
              border: 'none',
              background: 'none',
              padding: '12px 0',
              textAlign: 'left'
            }}
          >
            Projects
          </Anchor>
          <Anchor
            component="button"
            onClick={() => {
              scrollToSection('other');
              closeMobileMenu();
            }}
            c="warmBeige.9"
            style={{
              fontSize: '20px',
              fontWeight: 500,
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
              border: 'none',
              background: 'none',
              padding: '12px 0',
              textAlign: 'left'
            }}
          >
            Other
          </Anchor>
          <Button
            onClick={() => {
              scrollToSection('contact');
              closeMobileMenu();
            }}
            color="accent.7"
            size="md"
            radius="md"
            fullWidth
          >
            Say Hi
          </Button>
          <Divider color="warmBeige.9" opacity={0.1} />
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
              gap: '8px'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--mantine-color-warmBeige-8)">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <Text size="sm">LinkedIn</Text>
          </Anchor>
        </Stack>
      </Drawer>

      <Container size="xl" style={{ paddingTop: isTabletOrMobile ? '40px' : '80px', paddingBottom: isTabletOrMobile ? '40px' : '80px', paddingLeft: isMobile ? '20px' : isTabletOrMobile ? '40px' : '60px', paddingRight: isMobile ? '20px' : isTabletOrMobile ? '40px' : '60px' }}>
        <Stack gap={isTabletOrMobile ? '40px' : '80px'}>
          {/* Header with Navigation */}
          {isMobile ? (
            <Stack gap="sm" style={{ width: '100%' }}>
              {/* First row: Name and Hamburger */}
              <Group justify="space-between" align="center">
                <Title
                  order={1}
                  fw={700}
                  c="warmBeige.9"
                  style={{
                    fontSize: 'clamp(32px, 10vw, 64px)',
                    letterSpacing: '0.08em',
                    lineHeight: 1,
                    whiteSpace: 'nowrap'
                  }}
                >
                  TOM KREMER
                </Title>
                <Burger
                  opened={mobileMenuOpened}
                  onClick={toggleMobileMenu}
                  size="sm"
                  color="var(--mantine-color-warmBeige-9)"
                />
              </Group>
              {/* Second row: Say Hi and LinkedIn */}
              <Group gap="sm" align="center">
                <Button
                  onClick={() => scrollToSection('contact')}
                  color="accent.7"
                  size="compact-sm"
                  radius="md"
                >
                  Say Hi
                </Button>
                <Anchor
                  href="https://www.linkedin.com/in/kremertom/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    opacity: 0.6,
                    transition: 'opacity 0.2s',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  styles={{
                    root: {
                      '&:hover': {
                        opacity: 1
                      }
                    }
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--mantine-color-warmBeige-8)">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Anchor>
              </Group>
            </Stack>
          ) : (
            <Group justify="space-between" align="flex-end" wrap="wrap">
              {/* Left side - Name and LinkedIn */}
              <Group gap={isTabletOrMobile ? 'sm' : 'xl'} align="flex-end" wrap="wrap">
                <Title
                  order={1}
                  fw={400}
                  c="warmBeige.9"
                  style={{
                    fontSize: 'clamp(32px, 10vw, 64px)',
                    letterSpacing: '0.08em',
                    lineHeight: 1,
                    whiteSpace: 'nowrap'
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
                    marginBottom: '2px'
                  }}
                  styles={{
                    root: {
                      '&:hover': {
                        opacity: 1
                      }
                    }
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--mantine-color-warmBeige-8)">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Anchor>
              </Group>

              {/* Right side - Navigation */}
              <Group gap="xl" style={{ marginBottom: '8px' }}>
                <Anchor
                  component="button"
                  onClick={() => scrollToSection('projects')}
                  c="warmBeige.9"
                  style={{
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
                  c="warmBeige.9"
                  style={{
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
                <Button
                  onClick={() => scrollToSection('contact')}
                  color="accent.7"
                  size="sm"
                  radius="md"
                >
                  Say Hi
                </Button>
              </Group>
            </Group>
          )}

          <Divider color="warmBeige.9" opacity={0.1} />

          {/* Background Section */}
          <Stack
            gap="xl"
            id="background"
            style={{
              scrollMarginTop: '20px',
              textAlign: isTabletOrMobile ? 'center' : 'left',
              paddingTop: isTabletOrMobile ? '0' : '80px',
              paddingBottom: isTabletOrMobile ? '0' : '80px'
            }}
          >
            <Text c="warmBeige.8" style={{ fontSize: isTabletOrMobile ? '16px' : '20px', lineHeight: 1.8, maxWidth: isTabletOrMobile ? '100%' : '800px' }}>
              I design and build fullstack web apps with machine learning capabilities for SMBs and Enterprise.
              <br /><br />
              I focus on building tools that are actually used - ones that unlock real value and fit into existing workflows.
            </Text>
          </Stack>

          <Divider color="warmBeige.9" opacity={0.1} />

          {/* Projects Section */}
          <Stack
            gap="xl"
            id="projects"
            style={{
              scrollMarginTop: '80px',
              paddingTop: '0',
              paddingBottom: isTabletOrMobile ? '0' : '80px'
            }}
          >
            <Title
              order={2}
              c="warmBeige.9"
              style={{
                fontSize: isMobile ? '28px' : isTabletOrMobile ? '36px' : '56px',
                letterSpacing: '0.1em',
                textAlign: isTabletOrMobile ? 'center' : 'left'
              }}
            >
              PROJECTS
            </Title>

            <Stack gap="lg">
              <ProjectCard
                title="JMBO.link"
                description="Platform for creating custom, branded link previews that stand out on messaging and social media platforms."
                projectId="jmbo-link"
                href="https://jmbo.link"
                date="November 2025"
                screenshots={['just-message.png', 'editor.png']}
              />

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

          <Divider color="warmBeige.9" opacity={0.1} />

          {/* Other Section */}
          <Stack
            gap="xl"
            id="other"
            style={{
              scrollMarginTop: '80px',
              textAlign: isTabletOrMobile ? 'center' : 'left',
              paddingTop: isTabletOrMobile ? '0' : '80px',
              paddingBottom: isTabletOrMobile ? '0' : '80px'
            }}
          >
            <Title
              order={2}
              c="warmBeige.9"
              style={{
                fontSize: isMobile ? '28px' : isTabletOrMobile ? '36px' : '56px',
                letterSpacing: '0.1em'
              }}
            >
              OTHER
            </Title>
            <Text c="warmBeige.8" style={{ fontSize: isTabletOrMobile ? '16px' : '20px', lineHeight: 1.8, maxWidth: isTabletOrMobile ? '100%' : '800px' }}>
              22 time All-American from Stanford, Captain senior year.{' '}
              <Anchor
                href="https://gostanford.com/sports/mens-swimming-diving/roster/player/tom-kremer"
                target="_blank"
                rel="noopener noreferrer"
                c="warmBeige.9"
                style={{
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

          <Divider color="warmBeige.9" opacity={0.1} />

          {/* Contact Section */}
          <Stack
            gap="xl"
            id="contact"
            style={{
              scrollMarginTop: '100px',
              alignItems: 'center',
              textAlign: 'center',
              paddingTop: isTabletOrMobile ? '0' : '80px',
              paddingBottom: '40vh'
            }}
          >
            <Title
              order={2}
              c="warmBeige.9"
              style={{
                fontSize: isMobile ? '28px' : isTabletOrMobile ? '36px' : '56px',
                letterSpacing: '0.1em'
              }}
            >
              SAY HI
            </Title>
            <Text c="warmBeige.8" style={{ fontSize: isTabletOrMobile ? '16px' : '20px', lineHeight: 1.8 }}>
              Have a project in mind or just want to chat?
            </Text>

            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px' }}>
              <Stack gap="md">
                <TextInput
                  label="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  styles={{
                    input: {
                      backgroundColor: 'var(--mantine-color-warmBeige-0)',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      '&:focus': {
                        borderColor: 'var(--mantine-color-warmBeige-9)',
                      },
                    },
                    label: {
                      color: 'var(--mantine-color-warmBeige-9)',
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
                      backgroundColor: 'var(--mantine-color-warmBeige-0)',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      '&:focus': {
                        borderColor: 'var(--mantine-color-warmBeige-9)',
                      },
                    },
                    label: {
                      color: 'var(--mantine-color-warmBeige-9)',
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
                      backgroundColor: 'var(--mantine-color-warmBeige-0)',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      '&:focus': {
                        borderColor: 'var(--mantine-color-warmBeige-9)',
                      },
                    },
                    label: {
                      color: 'var(--mantine-color-warmBeige-9)',
                      fontWeight: 500,
                      marginBottom: '8px',
                    },
                  }}
                />
                <Button
                  type="submit"
                  loading={isSubmitting}
                  color="warmBeige.9"
                  size="lg"
                  radius="md"
                >
                  Send
                </Button>
                {submitStatus === 'success' && (
                  <Text c="warmBeige.9">Thanks for reaching out! I'll get back to you soon.</Text>
                )}
                {submitStatus === 'error' && (
                  <Text c="red">Something went wrong. Please try again or email me directly.</Text>
                )}
              </Stack>
            </form>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
