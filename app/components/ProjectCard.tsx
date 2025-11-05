'use client';

import { Box, Stack, Text, Anchor, Group, Modal } from '@mantine/core';
import { useState } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  projectId: string;
  href: string;
  screenshots?: string[];
}

export function ProjectCard({ title, description, projectId, href, screenshots = [] }: ProjectCardProps) {
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);
  const logoSrc = `/${projectId}/logo.png`;

  return (
    <>
      <Anchor
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: 'none',
          width: '100%'
        }}
      >
        <Box
          p="xl"
          style={{
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            cursor: 'pointer',
            backgroundColor: '#FAF6F0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
            e.currentTarget.style.backgroundColor = '#FAF6F0';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Group gap="xl" align="flex-start" wrap="nowrap">
            {/* Left side - Logo and text */}
            <Stack gap="md" style={{ flex: 1 }}>
              <Box
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                <img
                  src={logoSrc}
                  alt={`${title} Logo`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
              <Stack gap={4}>
                <Group gap="xs" align="center">
                  <Text
                    size="lg"
                    fw={500}
                    style={{ color: '#000000' }}
                  >
                    {title}
                  </Text>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#666666"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0 }}
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </Group>
                <Text
                  size="sm"
                  style={{ color: '#666666', lineHeight: 1.5 }}
                >
                  {description}
                </Text>
              </Stack>
            </Stack>

            {/* Right side - Screenshot Thumbnails */}
            {screenshots.length > 0 && (
              <Group gap="md" wrap="nowrap">
                {screenshots.map((screenshot, index) => (
                  <Box
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedScreenshot(`/${projectId}/${screenshot}`);
                    }}
                    style={{
                      width: '300px',
                      height: '195px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      flexShrink: 0,
                      cursor: 'pointer',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      position: 'relative'
                    }}
                    styles={{
                      root: {
                        '&:hover': {
                          transform: 'scale(1.02)',
                          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)'
                        }
                      }
                    }}
                  >
                    <img
                      src={`/${projectId}/${screenshot}`}
                      alt={`${title} Screenshot ${index + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                ))}
              </Group>
            )}
          </Group>
        </Box>
      </Anchor>

      {/* Screenshot Preview Modal */}
      <Modal
        opened={selectedScreenshot !== null}
        onClose={() => setSelectedScreenshot(null)}
        size="90vw"
        padding={0}
        withCloseButton={false}
        centered
        styles={{
          content: {
            backgroundColor: 'transparent',
            boxShadow: 'none'
          },
          body: {
            padding: 0
          }
        }}
        onClick={() => setSelectedScreenshot(null)}
      >
        {selectedScreenshot && (
          <Box
            style={{
              width: '100%',
              maxHeight: '90vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src={selectedScreenshot}
              alt="Screenshot Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
            />
          </Box>
        )}
      </Modal>
    </>
  );
}
