/**
 * Centralized Developer Identity and Portfolio Data
 * Ajibise Obanijesu Solomon — Frontend Developer & Software Engineer
 */

export const PERSONAL_INFO = {
  name: 'Ajibise Obanijesu Solomon',
  shortName: 'Obanijesu Solomon',
  role: 'Frontend Developer & Software Engineer',
  tagline: 'Crafting intentional digital products with cinematic motion, responsive architecture, and deep interaction design.',
  status: 'Available for opportunities',
  location: 'Nigeria',
  
  // Configurable email placeholder (Update when final production inbox is ready)
  email: 'obanijesu.solomon.dev@gmail.com',
  phone: '09011263971',
  whatsapp: 'https://wa.me/2349011263971',
  
  socials: {
    github: 'https://github.com/NijiWritesCode',
    x: 'https://x.com/NijiWritesCode',
    whatsapp: 'https://wa.me/2349011263971',
  },
  
  bio: {
    heroIntro: 'Software engineering student and frontend-focused developer creating visually compelling, functional web and mobile applications.',
    paragraphs: [
      'I am a software engineering student and frontend developer dedicated to bridging robust software engineering with thoughtful interaction design. I believe software should not merely function—it should feel refined, responsive, and intuitive.',
      'My technical work centers on JavaScript, React, and React Native with Expo. I focus on developing clean component hierarchies, predictable state flows, responsive cross-device layouts, and expressive motion timelines using GSAP.',
      'Whether building high-frequency transit booking flows or editorial web interfaces, I prioritize accessible markup, smooth frame rates, and resilient architectures tailored for real people.'
    ],
    principles: [
      {
        title: 'Precision & Motion',
        description: 'Animations should inform and orient the user, transforming static layouts into natural spatial experiences.'
      },
      {
        title: 'Performance by Default',
        description: 'Smooth 60fps interactions achieved through transform-based rendering, minimal layout churn, and clean memory lifecycles.'
      },
      {
        title: 'Practical Software',
        description: 'Building usable solutions that address real regional problems—from transit in Lagos to localized service marketplaces.'
      }
    ]
  }
};

export const SKILL_GROUPS = [
  {
    category: 'Frontend Engineering',
    description: 'Primary technical focus: building performant, responsive, component-driven user interfaces.',
    highlight: true,
    skills: [
      { name: 'JavaScript (ES6+)', primary: true, tag: 'Language' },
      { name: 'React', primary: true, tag: 'Library' },
      { name: 'HTML5 & Semantics', primary: false, tag: 'Markup' },
      { name: 'Modern CSS & Flexbox/Grid', primary: false, tag: 'Styling' },
      { name: 'Tailwind CSS', primary: false, tag: 'Styling' }
    ]
  },
  {
    category: 'Mobile Development',
    description: 'Developing cross-platform mobile experiences with native-like fluidity and responsive interaction.',
    highlight: false,
    skills: [
      { name: 'React Native', primary: true, tag: 'Framework' },
      { name: 'Expo', primary: true, tag: 'Toolchain' }
    ]
  },
  {
    category: 'Backend & Databases',
    description: 'Foundational backend engineering for APIs, relational schemas, and data persistence.',
    highlight: false,
    skills: [
      { name: 'Java', primary: false, tag: 'Language' },
      { name: 'Spring Boot', primary: false, tag: 'Framework' },
      { name: 'Node.js', primary: false, tag: 'Runtime' },
      { name: 'MySQL', primary: false, tag: 'Database' },
      { name: 'MongoDB', primary: false, tag: 'Database' }
    ]
  },
  {
    category: 'Development Tools & Workflow',
    description: 'Version control, developer toolchains, and collaborative workflows.',
    highlight: false,
    skills: [
      { name: 'Git', primary: false, tag: 'VCS' },
      { name: 'GitHub', primary: false, tag: 'Platform' }
    ]
  }
];

export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];
