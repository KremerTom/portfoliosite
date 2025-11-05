# Portfolio Site Context

This is Tom Kremer's personal portfolio website showcasing projects and professional links.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: Mantine v8
- **Styling**: Custom theme with Mantine
- **Language**: TypeScript
- **Deployment**: Vercel
- **Image Optimization**: Next.js Image component with automatic WebP/AVIF conversion

## Color Palette

```
Background: #F4EAE0 (warm peach)
Cards: #FAF6F0 (light cream)
Card hover: #FFFFFF (white)
Text primary: #000000 (black)
Text secondary: #666666 (gray)
Borders: rgba(0, 0, 0, 0.1)
```

## Project Structure

```
/app
  /components
    ProjectCard.tsx     - Reusable project card component
  page.tsx              - Main portfolio page
  layout.tsx            - Root layout with Mantine provider
  globals.css           - Global styles

/public
  /{projectId}/         - Each project has its own folder
    logo.png            - Required: Project logo
    screenshot1.png     - Optional: Screenshot files
    screenshot2.png
    ...
```

## Key Features

### ProjectCard Component

**Props:**
- `title` - Project name
- `description` - Project description
- `projectId` - Folder name in public/ (e.g., "cfit")
- `href` - Live project URL
- `screenshots` - Array of screenshot filenames (e.g., ['dashboard.png', 'portfolio.png'])

**Features:**
- Hover effect: Card lifts 4px with enhanced shadow
- Logo: Automatically loads from `public/{projectId}/logo.png`
- Screenshots: Display as 300x195px thumbnails
- Modal preview: Click thumbnail to view full-size (90vw x 90vh)
- Navigation: Arrow keys or on-screen buttons to cycle through screenshots
- External link icon: Indicates clickable link to live site

### Image Optimization

All images use Next.js Image component:
- Thumbnails: 75% quality, auto-optimized
- Modal: 90% quality, full resolution
- Formats: Automatic WebP/AVIF conversion
- Lazy loading: Images load on scroll

## Adding New Projects

1. Create folder in `public/` with project name (e.g., `public/myproject/`)
2. Add `logo.png` to the folder (required)
3. Add screenshot images (optional)
4. Add ProjectCard to `app/page.tsx`:

```tsx
<ProjectCard
  title="My Project"
  description="Project description"
  projectId="myproject"
  href="https://myproject.com"
  screenshots={['screenshot1.png', 'screenshot2.png']}
/>
```

## Development

- **Dev server**: `npm run dev` at http://localhost:3000
- **Build**: `npm run build`
- **Deploy**: Push to GitHub, auto-deploys via Vercel

## Design Philosophy

- Minimalist and clean (inspired by zachjordan.io)
- Generous whitespace
- Subtle animations and hover effects
- Focus on content over decoration
- Accessible color contrast
- Fast loading with optimized images
