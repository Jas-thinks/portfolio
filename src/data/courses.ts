export type Group = { id: string; title: string; blurb: string; courses: string[] }

export const groups: Group[] = [
  {
    id: 'core',
    title: 'Core Computer Science',
    blurb: 'The spine: how programs are organised, run, stored and connected.',
    courses: [
      'Data Structures',
      'Design and Analysis of Algorithms',
      'Operating Systems',
      'Database Management Systems',
      'Computer Networks',
      'Compiler Design',
      'Computer Organization and Architecture',
      'Theory of Computation',
      'Discrete Mathematics',
    ],
  },
  {
    id: 'systems',
    title: 'Systems & Advanced Computing',
    blurb: 'Design under constraints, and what it takes to trust a system.',
    courses: [
      'Computer Systems Design',
      'Introduction to Formal Verification and Its Applications',
      'Cryptography',
      'Information Security',
      'Network Science',
    ],
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    blurb: 'Learning from data, and working with language.',
    courses: ['Artificial Intelligence', 'Natural Language Processing', 'AI-Augmented Software Development'],
  },
  {
    id: 'math',
    title: 'Mathematical Foundation',
    blurb: 'The vocabulary for uncertainty.',
    courses: ['Probability and Statistics'],
  },
]
