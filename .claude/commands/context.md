# Portfolio Site Context

This is Tom Kremer's personal portfolio website showcasing projects and professional links.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: Mantine v8 (https://mantine.dev/llms.txt)
- **Styling**: Custom theme with Mantine
- **Typography**: Inter font family (Google Fonts)
- **Language**: TypeScript
- **Deployment**: Vercel
- **Image Optimization**: Next.js Image component with automatic WebP/AVIF conversion

**Note**: When working with Mantine components, reference the Mantine v8 documentation at https://mantine.dev/llms.txt

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
  page.tsx              - Main portfolio page with sections
  layout.tsx            - Root layout with Mantine provider
  globals.css           - Global styles

/public
  /{projectId}/         - Each project has its own folder
    logo.png            - Required: Project logo
    screenshot1.png     - Optional: Screenshot files
    screenshot2.png
    ...
```

## Page Structure

The portfolio is organized as a single-page site with smooth-scrolling navigation:

**Header Layout:**
- Initial state: Full header with name (64px), subtitle, and LinkedIn on left; navigation on right
- Scrolled state (>100px): Sticky collapsed header appears at top
  - Background color: #FAF6F0 (unhovered) → #FFFFFF (hovered), matching project cards
  - Name shrinks to 32px with LinkedIn icon inline next to it
  - Navigation links remain on the right
  - All clickable elements show pointer cursor
  - Smooth transitions (0.3s ease) between states
- Built with Mantine Group component using `justify="space-between"`
- Smooth scrolling to each section on click

**Sections:**
1. **Background** - Bio and about me information
2. **Projects** - Project cards showcasing work
3. **Other** - Additional content (contact, links, etc.)

Each section has:
- Unique ID for scroll navigation (`id="background"`, `id="projects"`, `id="other"`)
- `scrollMarginTop: '20px'` for smooth scrolling offset
- Dividers between sections for visual separation

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
