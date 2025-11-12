'use client';

import { Box, Stack, Text, Anchor, Group, Modal, ActionIcon } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  projectId: string;
  href: string;
  date: string;
  logoExtension?: string;
  screenshots?: string[];
}

export function ProjectCard({ title, description, projectId, href, date, logoExtension = 'png', screenshots = [] }: ProjectCardProps) {
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState<number | null>(null);
  const logoSrc = `/${projectId}/logo.${logoExtension}`;
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTabletOrMobile = useMediaQuery('(max-width: 992px)');
  const hasExternalLink = href && href !== '#';

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

  const cardContent = (
        <Box
          p={{ base: 'lg', md: 'xl' }}
          bg="warmBeige.0"
          style={{
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            cursor: 'pointer',
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
            e.currentTarget.style.backgroundColor = 'var(--mantine-color-warmBeige-0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {isTabletOrMobile ? (
            // Mobile/Tablet: Vertical layout (logo + text on top, screenshots below)
            <Stack gap="md" style={{ alignItems: 'center' }}>
              {/* Logo, title and date - center aligned row */}
              <Group gap="md" align="center" style={{ width: '100%', justifyContent: 'center' }}>
                <Box
                  style={{
                    width: isMobile ? '50px' : '60px',
                    height: isMobile ? '50px' : '60px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative',
                    flexShrink: 0
                  }}
                >
                  <Image
                    src={logoSrc}
                    alt={`${title} Logo`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes={isMobile ? '50px' : '60px'}
                  />
                </Box>
                <Stack gap={4} style={{ alignItems: 'center' }}>
                  <Group gap="xs" align="center">
                    <Text
                      size={isMobile ? 'md' : 'lg'}
                      fw={500}
                      c="warmBeige.9"
                    >
                      {title}
                    </Text>
                    {hasExternalLink && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--mantine-color-warmBeige-8)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flexShrink: 0 }}
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    )}
                  </Group>
                  <Text
                    size="xs"
                    c="gray.6"
                  >
                    {date}
                  </Text>
                </Stack>
              </Group>

              {/* Description - center aligned below */}
              <Text
                size="sm"
                c="warmBeige.8"
                style={{ lineHeight: 1.5, textAlign: 'center', width: '100%' }}
              >
                {description}
              </Text>

              {/* Screenshot Thumbnails */}
              {screenshots.length > 0 && (
                <Box style={{ width: '100%' }}>
                  <Group gap="md" wrap="wrap" style={{ width: '100%' }}>
                    {(isMobile ? [screenshots[0]] : screenshots).map((screenshot, index) => (
                      <Box
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedScreenshotIndex(isMobile ? 0 : index);
                        }}
                        style={{
                          width: isMobile ? '100%' : '300px',
                          minHeight: isMobile ? '220px' : '195px',
                          height: isMobile ? 'auto' : '195px',
                          aspectRatio: isMobile ? '16/10' : 'auto',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: '1px solid rgba(0, 0, 0, 0.1)',
                          flexShrink: 0,
                          cursor: 'pointer',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          position: 'relative',
                          backgroundColor: '#f0f0f0'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.02)';
                          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <Image
                          src={`/${projectId}/${screenshot}`}
                          alt={`${title} Screenshot ${index + 1}`}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes={isMobile ? '100vw' : '300px'}
                          quality={75}
                          priority={index === 0}
                        />
                        {isMobile && screenshots.length > 1 && (
                          <Box
                            style={{
                              position: 'absolute',
                              bottom: '8px',
                              right: '8px',
                              backgroundColor: 'rgba(0, 0, 0, 0.7)',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '12px',
                              fontWeight: 500
                            }}
                          >
                            +{screenshots.length - 1} more
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Group>
                </Box>
              )}
            </Stack>
          ) : (
            // Desktop: Horizontal layout (text on left, screenshots on right)
            <Group gap="xl" align="flex-start" wrap="nowrap" style={{ width: '100%' }}>
              {/* Left side: Logo and text */}
              <Stack gap="md" style={{ flex: 1, minWidth: 0 }}>
                <Group gap="md" align="flex-start">
                  <Box
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      position: 'relative',
                      flexShrink: 0
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
                  <Stack gap={4} style={{ flex: 1 }}>
                    <Group gap="xs" align="center">
                      <Text
                        size="lg"
                        fw={500}
                        c="warmBeige.9"
                      >
                        {title}
                      </Text>
                      {hasExternalLink && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--mantine-color-warmBeige-8)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ flexShrink: 0 }}
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      )}
                    </Group>
                    <Text
                      size="xs"
                      c="gray.6"
                      style={{ marginTop: '2px' }}
                    >
                      {date}
                    </Text>
                    <Text
                      size="sm"
                      c="warmBeige.8"
                      style={{ lineHeight: 1.5 }}
                    >
                      {description}
                    </Text>
                  </Stack>
                </Group>
              </Stack>

              {/* Right side: Screenshot Thumbnails */}
              {screenshots.length > 0 && (
                <Group gap="md" wrap="nowrap" style={{ flexShrink: 0 }}>
                  {screenshots.map((screenshot, index) => (
                    <Box
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedScreenshotIndex(index);
                      }}
                      style={{
                        width: '200px',
                        height: '130px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        flexShrink: 0,
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        position: 'relative',
                        backgroundColor: '#f0f0f0'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <Image
                        src={`/${projectId}/${screenshot}`}
                        alt={`${title} Screenshot ${index + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="200px"
                        quality={75}
                        priority={index === 0}
                      />
                    </Box>
                  ))}
                </Group>
              )}
            </Group>
          )}
        </Box>
  );

  return (
    <>
      {hasExternalLink ? (
        <Anchor
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'none',
            width: '100%'
          }}
        >
          {cardContent}
        </Anchor>
      ) : (
        cardContent
      )}

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
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
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
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
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
