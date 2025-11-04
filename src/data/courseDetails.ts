interface CourseObjective {
  title: string;
  description: string;
}

interface CourseCatalog {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  courseType: 'Mini' | 'Comprehensive' | 'Full';
  price: {
    ugx: number;
    usd: number;
  };
  duration: string;
  ageGroup: string;
  image: string;
  objectives: CourseObjective[];
  prerequisites: string[];
  curriculum: string[];
  classPeriods: string[];
  tools?: string[];
  benefits?: string[];
  parentInfo?: string;
}

export const courseCategories = {
  FUNDAMENTALS: 'Computer Fundamentals',
  PROGRAMMING_KIDS: 'Programming for Kids',
  WEB_DEVELOPMENT: 'Web Development',
  PROGRAMMING: 'Programming Languages',
  AI_ML: 'AI & Machine Learning',
  PROBLEM_SOLVING: 'Problem-Solving & Critical Thinking',
  DESIGN_THINKING: 'Design & Creativity',
  MBLOCK: 'Mblock & Robotics'
} as const;

export const courseLevels = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate', 
  ADVANCED: 'Advanced'
} as const;

export const courseTypes = {
  MINI: 'Mini',
  COMPREHENSIVE: 'Comprehensive',
  FULL: 'Full'
} as const;

export const courseCatalogs: CourseCatalog[] = [
  // Mini Courses (2 months, UGX 400,000)
  {
    id: 'problem-solving',
    title: 'Problem-Solving and Critical Thinking',
    category: courseCategories.PROBLEM_SOLVING,
    level: courseLevels.BEGINNER,
    courseType: courseTypes.MINI,
    description: 'Develop essential problem-solving and critical thinking skills through puzzles, coding challenges, and collaborative projects.',
    price: { ugx: 400000, usd: 108 },
    duration: '2 months',
    ageGroup: 'Ages 8+',
    image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg',
    objectives: [
      { title: 'Logical Reasoning', description: 'Develop systematic approaches to problem analysis' },
      { title: 'Pattern Recognition', description: 'Learn to identify and use patterns in problem-solving' },
      { title: 'Algorithmic Thinking', description: 'Break down complex problems into manageable steps' },
      { title: 'Creative Solutions', description: 'Generate innovative approaches to challenges' }
    ],
    prerequisites: ['Basic reading and comprehension skills', 'Curiosity and willingness to learn'],
    curriculum: [
      'Introduction to problem-solving frameworks',
      'Logic puzzles and brain teasers',
      'Pattern recognition exercises',
      'Rubik\'s Cube solving strategies',
      'Basic coding challenges with Scratch',
      'Mathematical problem-solving',
      'Collaborative problem-solving projects',
      'Final project: Create your own puzzle'
    ],
    classPeriods: [
      'Monday & Wednesday: 10:00 AM - 12:00 PM',
      'Tuesday & Thursday: 3:00 PM - 5:00 PM',
      'Saturday: 9:00 AM - 1:00 PM'
    ],
    tools: ['Rubik\'s Cube', 'Logic Puzzles (Sudoku, KenKen)', 'Scratch Programming', 'Brain Teasers'],
    benefits: ['Enhances analytical thinking', 'Improves academic performance', 'Builds confidence in tackling challenges'],
    parentInfo: 'Problem-solving and critical thinking are fundamental skills that benefit your child in every subject and future career.'
  },
  {
    id: 'coding-puzzle-solving',
    title: 'Coding and Puzzle-Solving',
    category: courseCategories.PROBLEM_SOLVING,
    level: courseLevels.BEGINNER,
    courseType: courseTypes.MINI,
    description: 'Learn coding fundamentals through puzzle-solving activities, developing problem-solving skills and logical thinking.',
    price: { ugx: 400000, usd: 108 },
    duration: '2 months',
    ageGroup: 'Ages 10+',
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
    objectives: [
      { title: 'Programming Logic', description: 'Master fundamental programming concepts and logic' },
      { title: 'Algorithm Design', description: 'Learn to design efficient algorithms for problem-solving' },
      { title: 'Code Optimization', description: 'Understand how to write clean, efficient code' },
      { title: 'Debugging Skills', description: 'Develop systematic approaches to finding and fixing errors' }
    ],
    prerequisites: ['Basic computer skills', 'Completion of Problem-Solving course or equivalent experience'],
    curriculum: [
      'Programming fundamentals with Python',
      'Algorithm design and analysis',
      'Data structures for problem-solving',
      'Coding challenges and competitions',
      'Advanced puzzle-solving techniques',
      'Version control with Git',
      'Collaborative coding projects',
      'Final project: Algorithm visualization tool'
    ],
    classPeriods: [
      'Monday & Wednesday: 2:00 PM - 4:00 PM',
      'Tuesday & Thursday: 10:00 AM - 12:00 PM',
      'Saturday: 10:00 AM - 2:00 PM'
    ],
    tools: ['Python Programming Language', 'PyCharm IDE', 'Git/GitHub', 'Algorithm Visualization Tools'],
    benefits: ['Strong foundation for advanced programming', 'Competitive programming preparation', 'Enhanced logical thinking'],
    parentInfo: 'This course bridges the gap between basic problem-solving and advanced programming.'
  },
  {
    id: 'design-thinking',
    title: 'Design Thinking and Creativity',
    category: courseCategories.DESIGN_THINKING,
    level: courseLevels.BEGINNER,
    courseType: courseTypes.MINI,
    description: 'Human-centered approach to problem-solving emphasizing empathy, creativity, and experimentation.',
    price: { ugx: 400000, usd: 108 },
    duration: '2 months',
    ageGroup: 'Ages 12+',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
    objectives: [
      { title: 'Empathy & User Research', description: 'Understand user needs and perspectives deeply' },
      { title: 'Creative Ideation', description: 'Generate innovative solutions through structured brainstorming' },
      { title: 'Rapid Prototyping', description: 'Build and test ideas quickly and iteratively' },
      { title: 'Design Communication', description: 'Present and communicate design solutions effectively' }
    ],
    prerequisites: ['Creative mindset', 'Interest in solving real-world problems'],
    curriculum: [
      'Introduction to design thinking methodology',
      'Empathy mapping and user research',
      'Problem definition and point-of-view development',
      'Ideation techniques and brainstorming',
      'Prototyping methods (paper and digital)',
      'User testing and feedback integration',
      'Design presentation and storytelling',
      'Final project: Design solution for real problem'
    ],
    classPeriods: [
      'Monday & Wednesday: 3:00 PM - 5:00 PM',
      'Tuesday & Thursday: 1:00 PM - 3:00 PM',
      'Saturday: 1:00 PM - 5:00 PM'
    ],
    tools: ['Design Thinking Frameworks', 'Mural/Jamboard', 'Figma', 'Paper Prototyping Materials'],
    benefits: ['Human-centered problem solving', 'Innovation and creativity skills', 'Excellent for UI/UX career paths'],
    parentInfo: 'Design thinking teaches your child to solve problems by understanding people\'s needs first.'
  },
  {
    id: 'innovation-creativity',
    title: 'Innovation and Creativity',
    category: courseCategories.DESIGN_THINKING,
    level: courseLevels.INTERMEDIATE,
    courseType: courseTypes.MINI,
    description: 'Unlock your creative potential and learn innovative thinking techniques for problem-solving and idea generation.',
    price: { ugx: 400000, usd: 108 },
    duration: '2 months',
    ageGroup: 'Ages 10+',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    objectives: [
      { title: 'Creative Thinking', description: 'Develop divergent and convergent thinking skills' },
      { title: 'Innovation Methods', description: 'Learn structured approaches to innovation' },
      { title: 'Idea Generation', description: 'Master brainstorming and ideation techniques' },
      { title: 'Creative Problem-Solving', description: 'Apply creative approaches to technology challenges' }
    ],
    prerequisites: ['No prior experience required', 'Open and curious mindset'],
    curriculum: [
      'Understanding creativity and innovation',
      'Brainstorming techniques and methods',
      'Creative problem-solving frameworks',
      'Innovation in technology',
      'Collaborative creativity exercises',
      'Prototype development',
      'Presentation and pitching skills',
      'Final project: Innovative solution design'
    ],
    classPeriods: [
      'Monday & Wednesday: 4:00 PM - 6:00 PM',
      'Tuesday & Thursday: 2:00 PM - 4:00 PM',
      'Saturday: 2:00 PM - 6:00 PM'
    ],
    tools: ['Mind Mapping Tools', 'Innovation Frameworks', 'Collaboration Platforms', 'Presentation Software'],
    benefits: ['Enhanced creativity', 'Innovation skills', 'Creative confidence', 'Entrepreneurial thinking'],
    parentInfo: 'This course develops your child\'s creative and innovative thinking capabilities.'
  },
  {
    id: 'computer-basics',
    title: 'Computer Basics for Beginners',
    category: courseCategories.FUNDAMENTALS,
    level: courseLevels.BEGINNER,
    courseType: courseTypes.MINI,
    description: 'Essential computer skills and digital literacy for absolute beginners.',
    price: { ugx: 400000, usd: 108 },
    duration: '2 months',
    ageGroup: 'Ages 6+',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    objectives: [
      { title: 'Computer Basics', description: 'Learn fundamental computer operations and terminology' },
      { title: 'Digital Literacy', description: 'Develop essential digital skills for modern computing' },
      { title: 'Software Applications', description: 'Master common software applications and tools' },
      { title: 'Internet Skills', description: 'Learn safe internet usage and basic web navigation' }
    ],
    prerequisites: ['No prior experience required'],
    curriculum: [
      'Introduction to computers and operating systems',
      'Basic hardware components and their functions',
      'File management and organization',
      'Microsoft Office basics (Word, Excel, PowerPoint)',
      'Internet browsing and online safety',
      'Email communication',
      'Basic troubleshooting',
      'Final assessment project'
    ],
    classPeriods: [
      'Monday to Friday: 9:00 AM - 11:00 AM',
      'Monday to Friday: 2:00 PM - 4:00 PM',
      'Saturday: 10:00 AM - 2:00 PM'
    ],
    tools: ['Windows/Mac OS', 'Microsoft Office Suite', 'Web Browsers', 'Basic Software Applications'],
    benefits: ['Builds digital confidence', 'Essential for modern education', 'Foundation for all technology use'],
    parentInfo: 'This course gives your child the fundamental computer skills needed in today\'s digital world.'
  },
  {
    id: 'ai-for-kids',
    title: 'AI for Kids',
    category: courseCategories.AI_ML,
    level: courseLevels.BEGINNER,
    courseType: courseTypes.MINI,
    description: 'Introduction to artificial intelligence concepts through fun and interactive activities.',
    price: { ugx: 400000, usd: 108 },
    duration: '2 months',
    ageGroup: 'Ages 8-12',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    objectives: [
      { title: 'AI Awareness', description: 'Understand what AI is and how it affects daily life' },
      { title: 'Machine Learning Basics', description: 'Learn how computers can learn and make decisions' },
      { title: 'AI Ethics', description: 'Understand responsible AI use and implications' },
      { title: 'Creative AI Projects', description: 'Build simple AI-powered projects' }
    ],
    prerequisites: ['Basic computer skills', 'Curiosity about technology'],
    curriculum: [
      'What is Artificial Intelligence?',
      'AI in everyday life (Siri, recommendations, games)',
      'How machines learn from data',
      'Simple machine learning with Scratch for ML',
      'Computer vision basics with image recognition',
      'AI ethics and responsible technology use',
      'Building a simple chatbot',
      'Final project: AI-powered game or story'
    ],
    classPeriods: [
      'Monday to Friday: 10:00 AM - 12:00 PM',
      'Monday to Friday: 3:00 PM - 5:00 PM',
      'Saturday: 9:00 AM - 1:00 PM'
    ],
    tools: ['Scratch for Machine Learning', 'MIT\'s App Inventor', 'Teachable Machine by Google'],
    benefits: ['Early exposure to cutting-edge technology', 'Understanding of AI impact on society'],
    parentInfo: 'AI is reshaping our world, and early exposure helps children understand this technology responsibly.'
  },
  {
    id: 'scratch-programming',
    title: 'Scratch Programming for Beginners',
    category: courseCategories.PROGRAMMING_KIDS,
    level: courseLevels.BEGINNER,
    courseType: courseTypes.MINI,
    description: 'Learn programming fundamentals through visual block-based coding with Scratch.',
    price: { ugx: 400000, usd: 108 },
    duration: '2 months',
    ageGroup: 'Ages 6-9',
    image: 'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg',
    objectives: [
      { title: 'Basic Programming Concepts', description: 'Learn fundamental programming concepts through visual blocks' },
      { title: 'Creative Thinking', description: 'Develop problem-solving and creative thinking skills' },
      { title: 'Interactive Stories', description: 'Create interactive stories and simple animations' },
      { title: 'Game Development', description: 'Build simple games using Scratch' }
    ],
    prerequisites: ['Basic computer skills', 'Ability to read and follow instructions'],
    curriculum: [
      'Introduction to Scratch interface',
      'Working with sprites and backgrounds',
      'Basic motion and control blocks',
      'Creating animations',
      'Building interactive stories',
      'Simple game development',
      'Final project'
    ],
    classPeriods: [
      'Monday & Wednesday: 9:00 AM - 11:00 AM',
      'Tuesday & Thursday: 2:00 PM - 4:00 PM',
      'Saturday: 10:00 AM - 2:00 PM'
    ],
    tools: ['Scratch Programming Environment', 'Graphics Editor', 'Sound Editor'],
    benefits: ['Develops logical thinking', 'Enhances creativity', 'Builds confidence in technology'],
    parentInfo: 'Scratch introduces your child to programming through visual blocks, making coding fun and accessible.'
  },
  {
    id: 'html-css-beginners',
    title: 'HTML & CSS for Beginners',
    category: courseCategories.WEB_DEVELOPMENT,
    level: courseLevels.BEGINNER,
    courseType: courseTypes.MINI,
    description: 'Learn the foundation of web development with HTML and CSS.',
    price: { ugx: 400000, usd: 108 },
    duration: '2 months',
    ageGroup: 'Ages 10+',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    objectives: [
      { title: 'HTML Fundamentals', description: 'Master HTML structure and semantic elements' },
      { title: 'CSS Styling', description: 'Learn CSS styling and layout techniques' },
      { title: 'Responsive Design', description: 'Create mobile-friendly responsive layouts' },
      { title: 'Web Standards', description: 'Understand modern web development standards' }
    ],
    prerequisites: ['Basic computer skills', 'Understanding of file management'],
    curriculum: [
      'HTML structure and elements',
      'CSS styling and layouts',
      'Flexbox and Grid systems',
      'Media queries and responsive design',
      'Working with forms',
      'Web accessibility basics',
      'Final project: Personal website'
    ],
    classPeriods: [
      'Monday & Wednesday: 2:00 PM - 4:00 PM',
      'Tuesday & Thursday: 9:00 AM - 11:00 AM',
      'Saturday: 2:00 PM - 6:00 PM'
    ],
    tools: ['Visual Studio Code', 'Web Browsers', 'Developer Tools', 'HTML/CSS'],
    benefits: ['Foundation for web development', 'Creative expression', 'Portfolio development'],
    parentInfo: 'HTML and CSS are the building blocks of the web and essential for any web development career.'
  },
  {
    id: 'javascript-beginners',
    title: 'JavaScript for Beginners',
    category: courseCategories.PROGRAMMING,
    level: courseLevels.BEGINNER,
    courseType: courseTypes.MINI,
    description: 'Introduction to JavaScript programming and web interactivity.',
    price: { ugx: 400000, usd: 108 },
    duration: '2 months',
    ageGroup: 'Ages 10+',
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
    objectives: [
      { title: 'JavaScript Fundamentals', description: 'Learn JavaScript syntax and basic concepts' },
      { title: 'DOM Manipulation', description: 'Interact with web pages dynamically' },
      { title: 'Event Handling', description: 'Respond to user interactions' },
      { title: 'Basic Projects', description: 'Build interactive web applications' }
    ],
    prerequisites: ['HTML & CSS knowledge', 'Basic programming concepts'],
    curriculum: [
      'JavaScript fundamentals',
      'Variables and data types',
      'Functions and events',
      'DOM manipulation',
      'Basic algorithms',
      'Project development',
      'Final project: Interactive web app'
    ],
    classPeriods: [
      'Monday & Wednesday: 3:00 PM - 5:00 PM',
      'Tuesday & Thursday: 10:00 AM - 12:00 PM',
      'Saturday: 3:00 PM - 7:00 PM'
    ],
    tools: ['Visual Studio Code', 'Web Browsers', 'JavaScript', 'Developer Tools'],
    benefits: ['Web interactivity skills', 'Programming fundamentals', 'Career preparation'],
    parentInfo: 'JavaScript is essential for modern web development and opens doors to many programming careers.'
  },
  {
    id: 'python-beginners',
    title: 'Python for Beginners',
    category: courseCategories.PROGRAMMING,
    level: courseLevels.BEGINNER,
    courseType: courseTypes.MINI,
    description: 'Start your programming journey with Python fundamentals.',
    price: { ugx: 400000, usd: 108 },
    duration: '2 months',
    ageGroup: 'Ages 10+',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
    objectives: [
      { title: 'Python Fundamentals', description: 'Master Python syntax and basic programming concepts' },
      { title: 'Problem Solving', description: 'Apply programming to solve real problems' },
      { title: 'Data Structures', description: 'Work with lists, dictionaries, and basic data structures' },
      { title: 'Programming Projects', description: 'Build practical Python applications' }
    ],
    prerequisites: ['Basic computer skills', 'Logical thinking ability'],
    curriculum: [
      'Python basics and syntax',
      'Variables and data types',
      'Control structures and loops',
      'Functions and modules',
      'Data structures basics',
      'File handling',
      'Final project: Python application'
    ],
    classPeriods: [
      'Monday & Wednesday: 4:00 PM - 6:00 PM',
      'Tuesday & Thursday: 11:00 AM - 1:00 PM',
      'Saturday: 9:00 AM - 1:00 PM'
    ],
    tools: ['Python IDLE/PyCharm', 'Command Line Interface', 'Text Editors'],
    benefits: ['Programming fundamentals', 'Versatile language skills', 'Career preparation'],
    parentInfo: 'Python is the perfect first programming language and is used in cutting-edge fields like AI and data science.'
  },
  {
    id: 'python-data-science',
    title: 'Python for Data Science',
    category: courseCategories.AI_ML,
    level: courseLevels.INTERMEDIATE,
    courseType: courseTypes.MINI,
    description: 'Learn Python for data analysis and visualization.',
    price: { ugx: 400000, usd: 108 },
    duration: '2 months',
    ageGroup: 'Ages 14+',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg',
    objectives: [
      { title: 'Data Analysis', description: 'Learn to analyze and interpret data using Python' },
      { title: 'Data Visualization', description: 'Create compelling visualizations and charts' },
      { title: 'Statistical Analysis', description: 'Apply statistical methods to data' },
      { title: 'Data Projects', description: 'Work with real-world datasets' }
    ],
    prerequisites: ['Python programming basics', 'Basic mathematics and statistics'],
    curriculum: [
      'Introduction to data science',
      'Pandas for data manipulation',
      'NumPy for numerical computing',
      'Matplotlib and Seaborn for visualization',
      'Statistical analysis basics',
      'Data cleaning and preparation',
      'Final project: Data analysis project'
    ],
    classPeriods: [
      'Monday & Wednesday: 5:00 PM - 7:00 PM',
      'Tuesday & Thursday: 12:00 PM - 2:00 PM',
      'Saturday: 10:00 AM - 2:00 PM'
    ],
    tools: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter Notebooks'],
    benefits: ['Data analysis skills', 'High-demand career field', 'Problem-solving with data'],
    parentInfo: 'Data science is one of the fastest-growing and highest-paying fields in technology.'
  },
  {
    id: 'python-machine-learning',
    title: 'Python for Machine Learning',
    category: courseCategories.AI_ML,
    level: courseLevels.ADVANCED,
    courseType: courseTypes.MINI,
    description: 'Introduction to machine learning using Python.',
    price: { ugx: 400000, usd: 108 },
    duration: '2 months',
    ageGroup: 'Ages 16+',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    objectives: [
      { title: 'ML Fundamentals', description: 'Understand basic machine learning concepts' },
      { title: 'ML Algorithms', description: 'Learn and implement common ML algorithms' },
      { title: 'Model Training', description: 'Train and evaluate machine learning models' },
      { title: 'Practical Applications', description: 'Build real ML applications' }
    ],
    prerequisites: ['Python programming', 'Basic mathematics and statistics'],
    curriculum: [
      'Introduction to machine learning',
      'Supervised learning algorithms',
      'Unsupervised learning',
      'Model training and evaluation',
      'Feature engineering',
      'Introduction to neural networks',
      'Final project: ML application'
    ],
    classPeriods: [
      'Monday & Wednesday: 6:00 PM - 8:00 PM',
      'Tuesday & Thursday: 1:00 PM - 3:00 PM',
      'Saturday: 11:00 AM - 3:00 PM'
    ],
    tools: ['Python', 'scikit-learn', 'TensorFlow basics', 'Jupyter Notebooks'],
    benefits: ['Cutting-edge technology skills', 'High-paying career opportunities', 'Future-proof skills'],
    parentInfo: 'Machine learning is transforming every industry and offers exciting career opportunities.'
  },
  {
    id: 'react-development',
    title: 'React Development',
    category: courseCategories.WEB_DEVELOPMENT,
    level: courseLevels.ADVANCED,
    courseType: courseTypes.MINI,
    description: 'Build modern web applications with React framework.',
    price: { ugx: 400000, usd: 108 },
    duration: '2 months',
    ageGroup: 'Ages 14+',
    image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg',
    objectives: [
      { title: 'React Fundamentals', description: 'Master React components and JSX' },
      { title: 'State Management', description: 'Learn state management and hooks' },
      { title: 'Modern Development', description: 'Use modern React development practices' },
      { title: 'Real Projects', description: 'Build complete React applications' }
    ],
    prerequisites: ['JavaScript knowledge', 'HTML & CSS proficiency'],
    curriculum: [
      'React fundamentals and JSX',
      'Components and props',
      'State and lifecycle',
      'Event handling',
      'Hooks and modern React',
      'Routing and navigation',
      'Final project: React application'
    ],
    classPeriods: [
      'Monday & Wednesday: 7:00 PM - 9:00 PM',
      'Tuesday & Thursday: 2:00 PM - 4:00 PM',
      'Saturday: 12:00 PM - 4:00 PM'
    ],
    tools: ['React', 'Node.js', 'Create React App', 'Modern Development Tools'],
    benefits: ['Modern web development skills', 'High demand in job market', 'Component-based thinking'],
    parentInfo: 'React is one of the most popular frameworks for building modern web applications.'
  },
  {
    id: 'ai-fundamentals',
    title: 'AI Fundamentals',
    category: courseCategories.AI_ML,
    level: courseLevels.INTERMEDIATE,
    courseType: courseTypes.MINI,
    description: 'Introduction to artificial intelligence concepts and applications.',
    price: { ugx: 400000, usd: 108 },
    duration: '2 months',
    ageGroup: 'Ages 14+',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    objectives: [
      { title: 'AI Understanding', description: 'Understand fundamental AI concepts and terminology' },
      { title: 'AI Applications', description: 'Explore real-world AI applications and use cases' },
      { title: 'Ethical AI', description: 'Learn about AI ethics and responsible development' },
      { title: 'AI Tools', description: 'Use basic AI tools and platforms' }
    ],
    prerequisites: ['Basic programming knowledge', 'Mathematical thinking'],
    curriculum: [
      'Introduction to artificial intelligence',
      'Types of AI and machine learning',
      'AI in everyday applications',
      'Natural language processing basics',
      'Computer vision introduction',
      'AI ethics and societal impact',
      'Final project: AI application concept'
    ],
    classPeriods: [
      'Monday & Wednesday: 8:00 PM - 10:00 PM',
      'Tuesday & Thursday: 3:00 PM - 5:00 PM',
      'Saturday: 1:00 PM - 5:00 PM'
    ],
    tools: ['AI Platforms', 'Basic ML Tools', 'Conceptual Frameworks'],
    benefits: ['Understanding of AI landscape', 'Preparation for advanced AI study', 'Career awareness'],
    parentInfo: 'Understanding AI is essential for navigating the future technology landscape.'
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    category: courseCategories.PROGRAMMING,
    level: courseLevels.ADVANCED,
    courseType: courseTypes.MINI,
    description: 'Create mobile applications for Android and iOS platforms.',
    price: { ugx: 400000, usd: 108 },
    duration: '2 months',
    ageGroup: 'Ages 16+',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
    objectives: [
      { title: 'Mobile Development', description: 'Learn mobile app development fundamentals' },
      { title: 'Cross-Platform Development', description: 'Build apps for multiple platforms' },
      { title: 'UI/UX for Mobile', description: 'Design mobile user interfaces' },
      { title: 'App Deployment', description: 'Deploy apps to app stores' }
    ],
    prerequisites: ['Programming experience', 'Understanding of software development'],
    curriculum: [
      'Introduction to mobile development',
      'Cross-platform development with React Native',
      'Mobile UI/UX principles',
      'Device features and APIs',
      'App testing and debugging',
      'App store deployment',
      'Final project: Mobile application'
    ],
    classPeriods: [
      'Monday & Wednesday: 6:00 PM - 8:00 PM',
      'Tuesday & Thursday: 4:00 PM - 6:00 PM',
      'Saturday: 2:00 PM - 6:00 PM'
    ],
    tools: ['React Native', 'Android Studio', 'Xcode', 'Mobile Development Tools'],
    benefits: ['Mobile development skills', 'High-demand field', 'Entrepreneurial opportunities'],
    parentInfo: 'Mobile app development is a rapidly growing field with excellent career prospects.'
  },

  {
    id: 'story-telling-for-kids',
    title: 'Story Telling for Kids',
    category: courseCategories.DESIGN_THINKING,
    level: courseLevels.BEGINNER,
    courseType: courseTypes.MINI,
    description: 'Build confidence, creativity, and communication through engaging storytelling activities for children.',
    price: { ugx: 400000, usd: 108 },
    duration: '2 months',
    ageGroup: 'Ages 6-12',
    image: 'https://images.pexels.com/photos/256468/pexels-photo-256468.jpeg',
    objectives: [
      { title: 'Creative Expression', description: 'Express ideas and emotions clearly through stories' },
      { title: 'Narrative Structure', description: 'Understand story elements: beginning, middle, climax, and end' },
      { title: 'Public Speaking', description: 'Develop confident voice projection and presentation skills' },
      { title: 'Digital Storytelling', description: 'Use simple digital tools to create and share stories' }
    ],
    prerequisites: ['Basic reading and writing skills', 'Willingness to share and learn'],
    curriculum: [
      'Introduction: What makes a great story?',
      'Elements of a story: Characters, setting, and plot',
      'Building characters and creating worlds',
      'Plot development and sequencing events',
      'Storyboarding: Planning your story visually',
      'Voice, expression, and body language in storytelling',
      'Digital storytelling: Using Scratch and simple tools',
      'Final showcase: Present your story to the class'
    ],
    classPeriods: [
      'Monday & Wednesday: 10:00 AM - 12:00 PM',
      'Tuesday & Thursday: 3:00 PM - 5:00 PM',
      'Saturday: 9:00 AM - 1:00 PM'
    ],
    tools: ['Paper & Markers', 'Storyboarding Templates', 'Scratch (for storytelling)', 'Audio Recording Tools'],
    benefits: ['Builds confidence and communication', 'Boosts creativity and imagination', 'Enhances reading and writing skills'],
    parentInfo: 'Storytelling helps children develop communication, creativity, empathy, and confidence. This course nurtures essential language and presentation skills in a fun, supportive environment.'
  },

  // Comprehensive Courses (3 months, UGX 1,500,000)
  {
    id: 'python-comprehensive',
    title: 'Python Comprehensive Program',
    category: courseCategories.PROGRAMMING,
    level: courseLevels.INTERMEDIATE,
    courseType: courseTypes.COMPREHENSIVE,
    description: 'Comprehensive Python mastery covering fundamentals, web development, data science, and automation.',
    price: { ugx: 1500000, usd: 406 },
    duration: '3 months',
    ageGroup: 'Ages 12+',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
    objectives: [
      { title: 'Python Mastery', description: 'Complete mastery of Python programming' },
      { title: 'Web Development', description: 'Build web applications with Python' },
      { title: 'Data Science', description: 'Analyze data and create visualizations' },
      { title: 'Automation', description: 'Automate tasks and processes' }
    ],
    prerequisites: ['Basic programming concepts', 'Mathematical thinking'],
    curriculum: [
      'Advanced Python programming',
      'Web development with Django/Flask',
      'Data science with Pandas and NumPy',
      'Machine learning basics',
      'API development and integration',
      'Automation and scripting',
      'Final capstone project'
    ],
    classPeriods: [
      'Monday, Wednesday & Friday: 9:00 AM - 12:00 PM',
      'Tuesday & Thursday: 2:00 PM - 5:00 PM',
      'Saturday: 9:00 AM - 3:00 PM'
    ],
    tools: ['Python', 'Django/Flask', 'Pandas', 'NumPy', 'Git/GitHub'],
    benefits: ['Comprehensive Python skills', 'Multiple career paths', 'High earning potential'],
    parentInfo: 'This comprehensive program prepares students for multiple Python-related career paths.'
  },
  {
    id: 'fullstack-web-development',
    title: 'Full Stack Web Development',
    category: courseCategories.WEB_DEVELOPMENT,
    level: courseLevels.INTERMEDIATE,
    courseType: courseTypes.COMPREHENSIVE,
    description: 'Comprehensive full-stack development covering frontend, backend, and deployment.',
    price: { ugx: 1500000, usd: 406 },
    duration: '3 months',
    ageGroup: 'Ages 14+',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    objectives: [
      { title: 'Frontend Development', description: 'Master modern frontend technologies' },
      { title: 'Backend Development', description: 'Build robust backend systems' },
      { title: 'Database Management', description: 'Work with databases and data storage' },
      { title: 'Deployment', description: 'Deploy applications to production' }
    ],
    prerequisites: ['HTML, CSS, JavaScript knowledge', 'Basic programming experience'],
    curriculum: [
      'Advanced frontend development',
      'Backend development with Node.js',
      'Database design and management',
      'API development and integration',
      'Authentication and security',
      'Deployment and DevOps basics',
      'Final project: Full-stack application'
    ],
    classPeriods: [
      'Monday, Wednesday & Friday: 1:00 PM - 4:00 PM',
      'Tuesday & Thursday: 6:00 PM - 9:00 PM',
      'Saturday: 10:00 AM - 4:00 PM'
    ],
    tools: ['React/Vue', 'Node.js', 'Express', 'MongoDB/PostgreSQL', 'Git/GitHub'],
    benefits: ['Complete web development skills', 'High demand in job market', 'Entrepreneurial opportunities'],
    parentInfo: 'Full-stack development skills are highly valued and open doors to many opportunities.'
  },
  {
    id: 'ai-ml-comprehensive',
    title: 'AI & Machine Learning Comprehensive',
    category: courseCategories.AI_ML,
    level: courseLevels.ADVANCED,
    courseType: courseTypes.COMPREHENSIVE,
    description: 'Comprehensive AI and ML program covering theory, implementation, and real-world applications.',
    price: { ugx: 1500000, usd: 406 },
    duration: '3 months',
    ageGroup: 'Ages 16+',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    objectives: [
      { title: 'AI Theory', description: 'Understand comprehensive AI theories and concepts' },
      { title: 'ML Implementation', description: 'Implement machine learning algorithms' },
      { title: 'Deep Learning', description: 'Work with neural networks and deep learning' },
      { title: 'Real Applications', description: 'Build practical AI applications' }
    ],
    prerequisites: ['Python programming', 'Mathematics and statistics', 'Programming experience'],
    curriculum: [
      'Advanced machine learning algorithms',
      'Deep learning and neural networks',
      'Computer vision applications',
      'Natural language processing',
      'AI project development',
      'Ethics and responsible AI',
      'Final project: AI application'
    ],
    classPeriods: [
      'Monday, Wednesday & Friday: 5:00 PM - 8:00 PM',
      'Tuesday & Thursday: 10:00 AM - 1:00 PM',
      'Saturday: 11:00 AM - 5:00 PM'
    ],
    tools: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Jupyter Notebooks'],
    benefits: ['Cutting-edge AI skills', 'Research opportunities', 'High-paying career paths'],
    parentInfo: 'AI and ML skills are among the most valuable and future-proof in technology.'
  },

  // Master Programs (6 months, UGX 3,500,000)
  {
    id: 'python-fullstack-master',
    title: 'Python Full Stack Master Program',
    category: courseCategories.PROGRAMMING,
    level: courseLevels.ADVANCED,
    courseType: courseTypes.FULL,
    description: 'A compact, end-to-end “Python for Everything” track: 200+ hours, 20+ projects, 30+ assignments, 30+ quizzes, covering Python fundamentals to advanced AI, full-stack, automation, and cloud deployment.',
    price: { ugx: 3500000, usd: 948 },
    duration: '6 months',
    ageGroup: 'Ages 16+',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
    objectives: [
      { title: 'Python Mastery', description: 'Build from fundamentals to advanced programming' },
      { title: 'Full-Stack Development', description: 'Design and ship robust web apps and APIs' },
      { title: 'Data Science & ML', description: 'Analyze data and build machine learning solutions' },
      { title: 'Cloud & DevOps', description: 'Containerize and deploy applications to the cloud' }
    ],
    prerequisites: ['Solid programming foundation', 'Mathematical thinking', 'Commitment to intensive study'],
    curriculum: [
      'Introduction to Python: setup, syntax, variables, data types, and basic I/O',
      'Control structures: conditionals and loops',
      'Functions and modular programming',
      'Data structures: lists, tuples, sets, dictionaries',
      'File handling: reading and writing files',
      'Object-Oriented Programming (OOP): classes, inheritance, polymorphism, encapsulation',
      'Modules and packages: standard library, creating packages, requests and JSON',
      'Working with data: CSV, JSON, Excel; introduction to Pandas',
      'Web scraping: Beautiful Soup and requests; browser automation with Selenium',
      'Web development: Flask/Django for web apps; REST APIs and integration',
      'Database management: SQL basics; ORM with SQLAlchemy/Django ORM; connecting to databases',
      'Data science & machine learning: NumPy, Pandas, Matplotlib/Seaborn; ML with scikit-learn',
      'ML workflow: data cleaning, feature engineering, model building and evaluation',
      'Automation and scripting: OS modules, task schedulers/cron, email and file automations',
      'Advanced ML & AI: deep learning with TensorFlow/PyTorch; NLP with spaCy/BERT; time-series forecasting',
      'Advanced web development: full-stack with React/Next.js and Flask/Django',
      'Cloud & DevOps: Docker, AWS/GCP/Azure, Kubernetes',
      'API integration and deployment with Docker',
      'Capstone project: Deploy a data-driven web app to the cloud with CI/CD'
    ],
    classPeriods: [
      'Monday-Friday: 9:00 AM - 1:00 PM',
      'Evening sessions: 6:00 PM - 8:00 PM',
      'Saturday: 9:00 AM - 5:00 PM'
    ],
    tools: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'scikit-learn', 'TensorFlow', 'Keras', 'PyTorch', 'NLTK', 'spaCy', 'Dask', 'Statsmodels', 'Beautiful Soup', 'Selenium', 'Pygame', 'Flask', 'Django', 'FastAPI', 'Dash', 'Hadoop', 'Spark (PySpark)', 'Streamlit', 'Reflex (ReactPy)', 'SQLAlchemy', 'PostgreSQL/MySQL', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Hugging Face', 'ChatGPT'],
    benefits: ['Expert-level skills', 'Multiple career paths', 'Leadership preparation', 'Entrepreneurial readiness'],
    parentInfo: 'This master program prepares students for senior roles in Python development and data science.'
  },
  {
    id: 'fullstack-web-master',
    title: 'Full Stack Web Development Master',
    category: courseCategories.WEB_DEVELOPMENT,
    level: courseLevels.ADVANCED,
    courseType: courseTypes.FULL,
    description: 'Master-level full stack development covering modern frameworks, cloud technologies, and enterprise patterns.',
    price: { ugx: 3500000, usd: 948 },
    duration: '6 months',
    ageGroup: 'Ages 16+',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    objectives: [
      { title: 'Modern Frameworks', description: 'Master modern web development frameworks' },
      { title: 'Cloud Technologies', description: 'Work with cloud platforms and services' },
      { title: 'Enterprise Patterns', description: 'Implement enterprise development patterns' },
      { title: 'Team Leadership', description: 'Prepare for technical leadership roles' }
    ],
    prerequisites: ['Web development experience', 'JavaScript proficiency', 'Understanding of software development'],
    curriculum: [
      'Advanced frontend frameworks (React, Vue, Angular)',
      'Backend development with multiple technologies',
      'Microservices architecture',
      'Cloud platforms and deployment',
      'DevOps and CI/CD pipelines',
      'Security and performance optimization',
      'Final project: Enterprise web application'
    ],
    classPeriods: [
      'Monday-Friday: 1:00 PM - 5:00 PM',
      'Evening sessions: 7:00 PM - 9:00 PM',
      'Saturday: 10:00 AM - 6:00 PM'
    ],
    tools: ['Modern Web Stack', 'Cloud Platforms', 'DevOps Tools', 'Enterprise Frameworks'],
    benefits: ['Expert web development skills', 'Leadership preparation', 'High earning potential'],
    parentInfo: 'This master program prepares students for senior web development and technical leadership roles.'
  },
  {
    id: 'ai-ml-master',
    title: 'AI & Machine Learning Master Program',
    category: courseCategories.AI_ML,
    level: courseLevels.ADVANCED,
    courseType: courseTypes.FULL,
    description: 'Comprehensive AI/ML master program covering cutting-edge technologies, research, and industry applications.',
    price: { ugx: 3500000, usd: 948 },
    duration: '6 months',
    ageGroup: 'Ages 18+',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    objectives: [
      { title: 'AI Research', description: 'Understand and contribute to AI research' },
      { title: 'Advanced ML', description: 'Master advanced machine learning techniques' },
      { title: 'Industry Applications', description: 'Apply AI to real-world industry problems' },
      { title: 'Innovation Leadership', description: 'Lead AI innovation in organizations' }
    ],
    prerequisites: ['Strong programming background', 'Mathematics and statistics', 'ML fundamentals'],
    curriculum: [
      'Advanced machine learning research',
      'Deep learning architectures',
      'Computer vision and NLP mastery',
      'AI ethics and responsible development',
      'Industry case studies and applications',
      'Research methodology and publication',
      'Thesis project: Original AI research'
    ],
    classPeriods: [
      'Monday-Friday: 2:00 PM - 6:00 PM',
      'Research sessions: 8:00 PM - 10:00 PM',
      'Saturday: 11:00 AM - 7:00 PM'
    ],
    tools: ['Advanced AI Frameworks', 'Research Tools', 'Cloud ML Platforms', 'Industry Software'],
    benefits: ['Research capabilities', 'Industry leadership preparation', 'Innovation skills'],
    parentInfo: 'This master program prepares students for AI research and industry leadership positions.'
  },
  {
    id: 'mobile-development-master',
    title: 'Mobile Development Master Program',
    category: courseCategories.PROGRAMMING,
    level: courseLevels.ADVANCED,
    courseType: courseTypes.FULL,
    description: 'Complete mobile development mastery covering iOS, Android, cross-platform, and emerging technologies.',
    price: { ugx: 3500000, usd: 948 },
    duration: '6 months',
    ageGroup: 'Ages 16+',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
    objectives: [
      { title: 'Multi-Platform Mastery', description: 'Master iOS, Android, and cross-platform development' },
      { title: 'Advanced Features', description: 'Implement advanced mobile features and integrations' },
      { title: 'Performance Optimization', description: 'Optimize mobile app performance and user experience' },
      { title: 'Enterprise Mobile', description: 'Build enterprise-grade mobile solutions' }
    ],
    prerequisites: ['Programming experience', 'Mobile development basics', 'Understanding of software architecture'],
    curriculum: [
      'Native iOS development (Swift)',
      'Native Android development (Kotlin)',
      'Cross-platform development',
      'Advanced mobile UI/UX',
      'Mobile backend integration',
      'App store optimization and deployment',
      'Final project: Multi-platform mobile app'
    ],
    classPeriods: [
      'Monday-Friday: 3:00 PM - 7:00 PM',
      'Lab sessions: 6:00 PM - 8:00 PM',
      'Saturday: 12:00 PM - 8:00 PM'
    ],
    tools: ['Xcode', 'Android Studio', 'React Native', 'Flutter', 'Mobile Backend Services'],
    benefits: ['Comprehensive mobile skills', 'High demand in market', 'Entrepreneurial opportunities'],
    parentInfo: 'This master program prepares students for senior mobile development roles and mobile startup leadership.'
  }
];
