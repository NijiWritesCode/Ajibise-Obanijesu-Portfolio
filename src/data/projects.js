/**
 * Centralized Projects Data
 * FlowDesk, Auriel, Hoteliers Association, and Interview Prep App
 * Each project includes verified links, authentic home screen assets, and technical contributions.
 */

export const PROJECTS = [
  {
    id: 'flowdesk',
    title: 'FlowDesk',
    subtitle: 'Modern Freelance & Agency Workspace OS',
    category: 'SaaS Web Application',
    year: '2026',
    platform: 'React SPA / Framer Motion / Vite',
    status: 'Production Deployed',
    featured: true,
    isPinned: true,
    image: '/projects/flowdesk.png',
    liveUrl: 'https://flow-desk-woad-alpha.vercel.app/',
    repoUrl: 'https://github.com/NijiWritesCode/Flow-Desk',
    summary: 'A modern, all-in-one productivity and business operations platform engineered for independent freelancers, creative studios, and boutique agencies to effortlessly orchestrate projects, task boards, clients, and revenue invoicing.',
    contribution: 'Architected the responsive application hierarchy, interactive Kanban pipeline with drag-and-drop task mechanics (@dnd-kit), reactive revenue analytics dashboard, invoice tracker, and custom dark sidebar navigation.',
    technologies: [
      'React',
      'Framer Motion',
      '@dnd-kit',
      'Tailwind CSS',
      'Vite',
      'Lucide React'
    ],
    highlights: [
      'Interactive Kanban task board with fluid drag-and-drop sorting and status updates',
      'Real-time financial telemetry dashboard tracking active projects and monthly revenue',
      'Comprehensive client CRM directory with project status breakdowns',
      'Fully responsive, production-deployed on Vercel with zero layout shift'
    ],
    metrics: [
      { label: 'Deployment', value: 'Vercel Live' },
      { label: 'Architecture', value: 'Component-Driven' },
      { label: 'Interactivity', value: '@dnd-kit Drag & Drop' },
      { label: 'Design System', value: 'Modern SaaS' }
    ],
    previewData: {
      url: 'flow-desk-woad-alpha.vercel.app',
      badgeTop: 'SaaS Workspace • Live',
      badgeBottom: 'Revenue Telemetry • $38,421',
      tag: 'Production Web App'
    }
  },
  {
    id: 'auriel',
    title: 'Auriel',
    subtitle: 'Luxury Boutique Hotel & Experience Portal',
    category: 'Hospitality & Web Experience',
    year: '2026',
    platform: 'React / Framer Motion / Vite',
    status: 'Interactive Experience Prototype',
    featured: false,
    isPinned: false,
    image: '/projects/auriel.png',
    liveUrl: null,
    repoUrl: 'https://github.com/NijiWritesCode/Auriel',
    summary: 'An editorial luxury boutique hotel web platform designed for sophisticated hospitality storytelling, featuring immersive room booking showcases, curated dining galleries, and reservation flows.',
    contribution: 'Engineered the smooth editorial transitions, multi-parameter reservation booking widget (check-in/check-out dates, room tiers, guest selector), luxury typography system, and responsive showcase architecture.',
    technologies: [
      'React',
      'Framer Motion',
      'Tailwind CSS',
      'Vite',
      'Modern CSS'
    ],
    highlights: [
      'Refined editorial typography pairing Cormorant Garamond and Jost',
      'Interactive reservation calculator for rooms, suites, and guest counts',
      'Curated dining menu and boutique amenity showcase galleries',
      'Fluid page transitions powered by Framer Motion motion primitives'
    ],
    metrics: [
      { label: 'Category', value: 'Boutique Hotel' },
      { label: 'Typography', value: 'Editorial Serif' },
      { label: 'Motion', value: 'Framer Motion' }
    ]
  },
  {
    id: 'hoteliers',
    title: 'Hoteliers Association',
    subtitle: 'Ado-Odo/Ota Regional Hospitality & Tourism Portal',
    category: 'Institutional & Community Web',
    year: '2026',
    platform: 'Responsive Web Architecture',
    status: 'Official Live Website',
    featured: false,
    isPinned: false,
    image: '/projects/hoteliers.png',
    liveUrl: 'https://www.adoodootahoteliersassociation.name.ng/',
    repoUrl: null,
    summary: 'The official digital portal for the Ado-Odo/Ota Hoteliers Association in Ogun State, Nigeria. Engineered to showcase accredited regional hospitality establishments, promote tourism initiatives, and facilitate official association affairs.',
    contribution: 'Designed and implemented the official public home screen, accredited hotel directory, leadership profiles, hospitality standards registry, and membership contact channels with an accessible, mobile-first layout.',
    technologies: [
      'Semantic HTML5',
      'Modern CSS & Grid',
      'Responsive Web',
      'SEO & Performance',
      'Cross-Device UI'
    ],
    highlights: [
      'Official public web presence for accredited regional hospitality businesses',
      'Structured event, tourism, and executive leadership directory',
      'High-impact hero visual design optimized for Nigerian mobile networks',
      'Accessible, clean navigation connecting visitors to regional hotel partners'
    ],
    metrics: [
      { label: 'Territory', value: 'Ado-Odo/Ota, Ogun' },
      { label: 'Domain', value: 'Official Association' },
      { label: 'Deployment', value: 'Live Portal' }
    ]
  },
  {
    id: 'interview-prep',
    title: 'Interview Prep',
    subtitle: 'AI-Powered Role-Tailored Interview Simulator',
    category: 'AI Developer Tool',
    year: '2026',
    platform: 'Next.js / React 19 / AI LLMs',
    status: 'Full-Stack Engineering Prototype',
    featured: false,
    isPinned: false,
    image: '/projects/interview-prep.png',
    liveUrl: null,
    repoUrl: 'https://github.com/NijiWritesCode/Interview-Prep',
    summary: 'An intelligent career-preparation application that transforms job descriptions and target role criteria into tailored technical, behavioral, and architectural interview simulations with automated response critique.',
    contribution: 'Developed the prompt input console, pre-populated role suggestion triggers, LLM inference pipeline supporting both OpenAI and local Ollama models, and rate-limiting session control using Upstash Redis.',
    technologies: [
      'Next.js (App Router)',
      'React 19',
      'Tailwind CSS',
      'OpenAI API',
      'Ollama LLM',
      'Upstash Redis'
    ],
    highlights: [
      'Context-aware question generation directly from pasted job descriptions',
      'Dual AI engine supporting cloud OpenAI API and local Ollama model execution',
      'Token rate-limiting and quota preservation with Upstash Redis',
      'Distraction-free preparation interface with instant feedback mechanics'
    ],
    metrics: [
      { label: 'Framework', value: 'Next.js 16' },
      { label: 'AI Layer', value: 'OpenAI + Ollama' },
      { label: 'Rate Limiting', value: 'Upstash Redis' }
    ]
  }
];

export const FEATURED_PROJECT = PROJECTS.find((p) => p.isPinned) || PROJECTS[0];
export const SECONDARY_PROJECTS = PROJECTS.filter((p) => !p.isPinned);
