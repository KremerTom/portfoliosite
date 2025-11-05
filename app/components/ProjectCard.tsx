'use client';

import { Box, Stack, Text, Anchor, Group, Modal, ActionIcon } from '@mantine/core';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  projectId: string;
  href: string;
  screenshots?: string[];
}

export function ProjectCard({ title, description, projectId, href, screenshots = [] }: ProjectCardProps) {
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState<number | null>(null);
  const logoSrc = `/${projectId}/logo.png`;

  useEffect(() => {
    if (selectedScreenshotIndex === null) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setSelectedScreenshotIndex(prev =>
          prev === null || prev === 0 ? screenshots.length - 1 : prev - 1
        );
      } else if (e.key === 'ArrowRight') {
        setSelectedScreenshotIndex(prev =>
          prev === null || prev === screenshots.length - 1 ? 0 : prev + 1
        );
      } else if (e.key === 'Escape') {
        setSelectedScreenshotIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedScreenshotIndex, screenshots.length]);

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
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <Image
                  src={logoSrc}
                  alt={`${title} Logo`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="60px"
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
                      setSelectedScreenshotIndex(index);
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
                    <Image
                      src={`/${projectId}/${screenshot}`}
                      alt={`${title} Screenshot ${index + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="300px"
                      quality={75}
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
        opened={selectedScreenshotIndex !== null}
        onClose={() => setSelectedScreenshotIndex(null)}
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
        onClick={() => setSelectedScreenshotIndex(null)}
      >
        {selectedScreenshotIndex !== null && (
          <Box
            style={{
              position: 'relative',
              width: '90vw',
              height: '90vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Image
              src={`/${projectId}/${screenshots[selectedScreenshotIndex]}`}
              alt="Screenshot Preview"
              fill
              style={{
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
              quality={90}
              sizes="90vw"
            />

            {/* Navigation Arrows */}
            {screenshots.length > 1 && (
              <>
                <ActionIcon
                  size="xl"
                  variant="filled"
                  color="dark"
                  style={{
                    position: 'absolute',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    opacity: 0.8,
                    transition: 'opacity 0.2s'
                  }}
                  styles={{
                    root: {
                      '&:hover': {
                        opacity: 1
                      }
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedScreenshotIndex(prev =>
                      prev === null || prev === 0 ? screenshots.length - 1 : prev - 1
                    );
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </ActionIcon>

                <ActionIcon
                  size="xl"
                  variant="filled"
                  color="dark"
                  style={{
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    opacity: 0.8,
                    transition: 'opacity 0.2s'
                  }}
                  styles={{
                    root: {
                      '&:hover': {
                        opacity: 1
                      }
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedScreenshotIndex(prev =>
                      prev === null || prev === screenshots.length - 1 ? 0 : prev + 1
                    );
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </ActionIcon>

                {/* Image Counter */}
                <Box
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                >
                  {selectedScreenshotIndex + 1} / {screenshots.length}
                </Box>
              </>
            )}
          </Box>
        )}
      </Modal>
    </>
  );
}
