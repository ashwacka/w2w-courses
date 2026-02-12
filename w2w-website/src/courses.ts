/**
 * Course catalog for Write2Win online courses.
 */

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration?: string;
  order: number;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  tagline: string;
  image?: string;
  modules: CourseModule[];
  featured?: boolean;
}

export const COURSES: Course[] = [
  {
    id: '1',
    slug: 'better-handwriting-grades',
    title: 'Better Handwriting Improves Grades',
    tagline: "Singapore's leading handwriting program – now online.",
    description:
      'Result-proven program that helps students improve handwriting and build confidence. Simulates live classes with structured modules and practice exercises.',
    featured: true,
    modules: [
      { id: 'm1', title: 'Introduction to proper handwriting techniques', description: 'Foundations and posture.', duration: '15 min', order: 1 },
      { id: 'm2', title: 'Letter formation basics', description: 'Clear letter shapes and consistency.', duration: '20 min', order: 2 },
      { id: 'm3', title: 'Practice exercises', description: 'Guided drills and worksheets.', duration: '25 min', order: 3 },
      { id: 'm4', title: 'Speed and accuracy', description: 'Building fluency without sacrificing legibility.', duration: '20 min', order: 4 },
      { id: 'm5', title: 'Common mistakes and how to fix them', description: 'Troubleshooting and corrections.', duration: '15 min', order: 5 },
    ],
  },
  {
    id: '2',
    slug: 'handwriting-classes-kids',
    title: 'Handwriting Classes for Kids',
    tagline: 'Help your child develop interest and confidence in writing.',
    description:
      'Designed for parents who want to improve their kids’ writing. Ages 6–16, with small groups and one-to-one options.',
    featured: true,
    modules: [
      { id: 'm1', title: 'Getting started: tools and posture', description: 'Setting up for success.', duration: '10 min', order: 1 },
      { id: 'm2', title: 'Basic strokes and shapes', description: 'Building blocks of letters.', duration: '20 min', order: 2 },
      { id: 'm3', title: 'Lowercase letters', description: 'Formation and practice.', duration: '30 min', order: 3 },
      { id: 'm4', title: 'Uppercase letters', description: 'Capitals and when to use them.', duration: '25 min', order: 4 },
      { id: 'm5', title: 'Words and sentences', description: 'Putting it all together.', duration: '25 min', order: 5 },
    ],
  },
  {
    id: '3',
    slug: 'basic-handwriting-analysis',
    title: 'Basic Handwriting Analysis Course',
    tagline: 'Discover what handwriting reveals about the mind.',
    description:
      'Introduction to 21st-century handwriting analysis and graphology. Explore how writing reflects personality and behaviour.',
    modules: [
      { id: 'm1', title: 'What is graphology?', description: 'History and science of handwriting analysis.', duration: '20 min', order: 1 },
      { id: 'm2', title: 'Key traits in handwriting', description: 'Slant, size, pressure, spacing.', duration: '25 min', order: 2 },
      { id: 'm3', title: 'Practical analysis', description: 'Step-by-step sample analysis.', duration: '30 min', order: 3 },
    ],
  },
  {
    id: '4',
    slug: 'signature-improvement',
    title: 'Signature Improvement Program',
    tagline: 'A signature that represents who you really are.',
    description:
      'Learn to create a confident, consistent signature. Change your signature and strengthen your self-image.',
    modules: [
      { id: 'm1', title: 'What your signature says', description: 'Meaning behind signature style.', duration: '15 min', order: 1 },
      { id: 'm2', title: 'Designing your signature', description: 'Clarity, flair, and consistency.', duration: '25 min', order: 2 },
      { id: 'm3', title: 'Practice and refinement', description: 'Drills and daily habit.', duration: '20 min', order: 3 },
    ],
  },
];

export function getCourseById(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}

export function getFeaturedCourses(): Course[] {
  return COURSES.filter((c) => c.featured);
}
