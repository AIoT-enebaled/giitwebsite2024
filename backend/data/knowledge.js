const knowledgeData = {
  python: {
    overview: 'Python is a versatile, beginner-friendly programming language known for its clean syntax and powerful libraries. Used in web development, data science, AI, automation, and more.',
    estimatedHours: 40,
    content: [
      {
        title: 'Python Basics',
        level: 'beginner',
        duration: '2 weeks',
        description: 'Introduction to Python fundamentals',
        content: `Python basics include understanding variables, data types, and basic operations. Python uses simple syntax making it ideal for beginners. You'll learn about numbers (int, float), strings, booleans, and how to perform operations on them.`,
        relatedTopics: ['Variables and Data Types', 'Basic Operations', 'Input and Output']
      },
      {
        title: 'Variables and Data Types',
        level: 'beginner',
        duration: '1 week',
        description: 'Understanding variables and different data types in Python',
        content: `Variables are containers for storing data values. Python has various data types: int (integers), float (decimals), str (text), bool (True/False), list (ordered collection), dict (key-value pairs), tuple (immutable sequence). Python automatically determines the type based on the value assigned.`,
        relatedTopics: ['Python Basics', 'Type Conversion', 'String Manipulation']
      },
      {
        title: 'Control Structures',
        level: 'beginner',
        duration: '2 weeks',
        description: 'If statements, loops, and conditional logic',
        content: `Control structures allow you to control the flow of your program. If statements execute code based on conditions. Loops (for and while) repeat code multiple times. You can combine conditions using and, or, not operators to create complex logic.`,
        relatedTopics: ['Conditional Logic', 'For Loops', 'While Loops', 'Break and Continue']
      },
      {
        title: 'Functions',
        level: 'beginner',
        duration: '2 weeks',
        description: 'Creating and using functions in Python',
        content: `Functions are reusable blocks of code that perform specific tasks. You define functions using the 'def' keyword. Functions can accept parameters (input), return values (output), and help organize code into logical modules. Using functions makes code cleaner, more maintainable, and reusable.`,
        relatedTopics: ['Function Definition', 'Parameters and Arguments', 'Return Values', 'Scope']
      },
      {
        title: 'Data Structures',
        level: 'intermediate',
        duration: '2 weeks',
        description: 'Lists, dictionaries, sets, and tuples',
        content: `Data structures organize and store data efficiently. Lists are ordered, mutable collections. Dictionaries store key-value pairs for fast lookup. Tuples are immutable (unchangeable) sequences. Sets store unique values. Each has different use cases and performance characteristics.`,
        relatedTopics: ['Lists', 'Dictionaries', 'Tuples', 'Sets', 'List Comprehension']
      },
      {
        title: 'File Handling',
        level: 'intermediate',
        duration: '1 week',
        description: 'Reading and writing files in Python',
        content: `File handling allows you to work with text and data files. You can open files in different modes: 'r' (read), 'w' (write), 'a' (append). The 'with' statement ensures files are properly closed. You can read entire files, line by line, or write data to files.`,
        relatedTopics: ['Opening and Closing Files', 'Reading Files', 'Writing Files', 'CSV and JSON']
      },
      {
        title: 'Object-Oriented Programming',
        level: 'advanced',
        duration: '3 weeks',
        description: 'Classes, objects, inheritance, and polymorphism',
        content: `OOP is a programming paradigm using objects and classes. Classes define blueprints for objects. Inheritance allows classes to inherit properties from parent classes. Polymorphism enables objects to take multiple forms. This approach organizes large programs effectively.`,
        relatedTopics: ['Classes and Objects', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Decorators']
      },
      {
        title: 'Libraries and Modules',
        level: 'intermediate',
        duration: '2 weeks',
        description: 'Using and creating Python modules and libraries',
        content: `Modules are files containing Python code. Libraries are collections of modules. Python has a rich standard library (os, sys, math, random, datetime). External libraries like NumPy, Pandas, and Requests provide powerful functionality. Use 'import' to include modules in your code.`,
        relatedTopics: ['Standard Library', 'External Libraries', 'Creating Modules', 'Package Management']
      },
      {
        title: 'Web Development with Flask',
        level: 'advanced',
        duration: '3 weeks',
        description: 'Building web applications with Python and Flask',
        content: `Flask is a lightweight web framework for Python. It helps you build web applications with routes, templates, and databases. You'll learn about request handling, response generation, session management, and deploying web apps. Flask is great for learning web development.`,
        relatedTopics: ['Routes and Views', 'Templates', 'Form Handling', 'Databases with Flask']
      },
      {
        title: 'Data Science with Python',
        level: 'advanced',
        duration: '4 weeks',
        description: 'Data analysis and visualization using Python',
        content: `Python is popular for data science. Libraries like NumPy provide numerical computing, Pandas for data manipulation, Matplotlib for visualization, and scikit-learn for machine learning. You learn to load, clean, analyze, and visualize data to extract insights.`,
        relatedTopics: ['NumPy', 'Pandas', 'Matplotlib', 'Data Cleaning', 'Statistical Analysis']
      }
    ]
  },

  ai: {
    overview: 'Artificial Intelligence (AI) is the simulation of human intelligence by machines. It includes machine learning, deep learning, natural language processing, and computer vision.',
    estimatedHours: 50,
    content: [
      {
        title: 'What is AI',
        level: 'beginner',
        duration: '1 week',
        description: 'Introduction to artificial intelligence concepts',
        content: `AI is technology that enables machines to perform tasks that typically require human intelligence. This includes learning from experience, recognizing patterns, understanding language, and making decisions. AI powers voice assistants, recommendation systems, facial recognition, autonomous vehicles, and more.`,
        relatedTopics: ['Machine Learning', 'Deep Learning', 'AI Applications', 'AI Ethics']
      },
      {
        title: 'Machine Learning Basics',
        level: 'beginner',
        duration: '2 weeks',
        description: 'Introduction to machine learning concepts',
        content: `Machine Learning (ML) is a subset of AI where computers learn from data without explicit programming. Types include supervised learning (labeled data), unsupervised learning (unlabeled data), and reinforcement learning (rewards). ML algorithms find patterns in data to make predictions.`,
        relatedTopics: ['Supervised Learning', 'Unsupervised Learning', 'Algorithms', 'Model Training']
      },
      {
        title: 'Deep Learning',
        level: 'advanced',
        duration: '3 weeks',
        description: 'Neural networks and deep learning',
        content: `Deep Learning uses artificial neural networks with multiple layers (hence "deep"). Inspired by the human brain, neural networks learn complex patterns. Applications include image recognition, natural language processing, game playing (like AlphaGo), and more. Frameworks like TensorFlow and PyTorch make deep learning accessible.`,
        relatedTopics: ['Neural Networks', 'Convolutional Networks', 'Recurrent Networks', 'Transformers']
      },
      {
        title: 'Natural Language Processing',
        level: 'advanced',
        duration: '2 weeks',
        description: 'AI systems understanding and generating human language',
        content: `NLP enables computers to understand, interpret, and generate human language. Applications include chatbots, translation, sentiment analysis, text classification, and question answering. Techniques include tokenization, embedding, attention mechanisms, and transformers.`,
        relatedTopics: ['Text Processing', 'Word Embeddings', 'Language Models', 'Chatbots']
      },
      {
        title: 'Computer Vision',
        level: 'advanced',
        duration: '2 weeks',
        description: 'AI systems interpreting visual information',
        content: `Computer Vision enables machines to interpret visual data from images and videos. Applications include facial recognition, object detection, image classification, autonomous driving, and medical imaging. CNNs (Convolutional Neural Networks) are primary tool for computer vision tasks.`,
        relatedTopics: ['Image Processing', 'Object Detection', 'Facial Recognition', 'CNN Architectures']
      },
      {
        title: 'AI Ethics and Responsible AI',
        level: 'intermediate',
        duration: '2 weeks',
        description: 'Ethical considerations in AI development',
        content: `As AI becomes more powerful, ethical considerations are crucial. Issues include bias in training data, privacy concerns, transparency (explainability), accountability, and societal impact. Responsible AI focuses on fairness, safety, and ensuring AI benefits everyone.`,
        relatedTopics: ['Bias and Fairness', 'Privacy', 'Explainability', 'AI Safety']
      },
      {
        title: 'Supervised Learning',
        level: 'intermediate',
        duration: '2 weeks',
        description: 'Learning from labeled training data',
        content: `In supervised learning, algorithms learn from labeled examples (input-output pairs). Common algorithms include linear regression (predicting continuous values), logistic regression (classification), decision trees, and support vector machines. The model learns to map inputs to outputs.`,
        relatedTopics: ['Regression', 'Classification', 'Model Evaluation', 'Cross Validation']
      },
      {
        title: 'Unsupervised Learning',
        level: 'intermediate',
        duration: '2 weeks',
        description: 'Finding patterns in unlabeled data',
        content: `Unsupervised learning finds hidden patterns in unlabeled data. Clustering groups similar data points together (k-means, hierarchical). Dimensionality reduction reduces data complexity while preserving important information (PCA, t-SNE). No labeled training data needed.`,
        relatedTopics: ['Clustering', 'Dimensionality Reduction', 'Anomaly Detection']
      },
      {
        title: 'Neural Networks',
        level: 'advanced',
        duration: '3 weeks',
        description: 'Artificial neural networks and deep learning fundamentals',
        content: `Neural networks are inspired by biological neurons. They consist of interconnected nodes (neurons) organized in layers. Forward propagation processes input, backward propagation learns from errors (backpropagation). Modern architectures include CNNs, RNNs, Transformers, and more.`,
        relatedTopics: ['Activation Functions', 'Loss Functions', 'Optimization', 'Regularization']
      }
    ]
  },

  'critical-thinking': {
    overview: 'Critical thinking is the ability to analyze, evaluate, and reason logically. It involves questioning assumptions, identifying biases, and making sound decisions based on evidence.',
    estimatedHours: 35,
    content: [
      {
        title: 'What is Critical Thinking',
        level: 'beginner',
        duration: '1 week',
        description: 'Understanding critical thinking fundamentals',
        content: `Critical thinking is logical reasoning and objective analysis. It means questioning claims, examining evidence, recognizing bias, and making sound judgments. Critical thinking helps in problem-solving, decision-making, and understanding complex issues. It's essential in science, business, law, and everyday life.`,
        relatedTopics: ['Logical Reasoning', 'Bias Recognition', 'Evidence Evaluation']
      },
      {
        title: 'Logical Reasoning',
        level: 'beginner',
        duration: '2 weeks',
        description: 'Understanding logic and valid arguments',
        content: `Logic is the study of valid reasoning. Deductive reasoning starts with general principles to reach specific conclusions. Inductive reasoning uses specific examples to form general conclusions. Valid arguments follow logical structure. Understanding logical fallacies helps identify faulty reasoning.`,
        relatedTopics: ['Deductive Reasoning', 'Inductive Reasoning', 'Logical Fallacies', 'Argument Structure']
      },
      {
        title: 'Problem-Solving Strategies',
        level: 'intermediate',
        duration: '2 weeks',
        description: 'Systematic approaches to solving problems',
        content: `Problem-solving involves understanding the problem, generating solutions, evaluating options, and implementing the best solution. Techniques include breaking problems into smaller parts, brainstorming, prototyping, and iterating. Different problems need different strategies.`,
        relatedTopics: ['Brainstorming', 'Root Cause Analysis', 'Decision Making', 'Prototyping']
      },
      {
        title: 'Bias Recognition',
        level: 'intermediate',
        duration: '2 weeks',
        description: 'Identifying and mitigating biases',
        content: `Bias is systematic error in thinking. Cognitive biases include confirmation bias (seeking confirming evidence), availability bias (relying on easily recalled information), and groupthink. Recognizing biases in yourself and others improves decision-making and critical thinking.`,
        relatedTopics: ['Cognitive Biases', 'Confirmation Bias', 'Selective Perception']
      },
      {
        title: 'Evidence Evaluation',
        level: 'intermediate',
        duration: '2 weeks',
        description: 'Assessing the quality and reliability of information',
        content: `Evaluating evidence means assessing source credibility, methodology, sample size, and potential bias. Strong evidence is based on multiple reliable sources, controlled studies, and peer review. Understanding evidence hierarchy helps distinguish scientific claims from opinions.`,
        relatedTopics: ['Source Credibility', 'Statistical Significance', 'Correlation vs Causation']
      },
      {
        title: 'Decision Making',
        level: 'intermediate',
        duration: '2 weeks',
        description: 'Making sound decisions based on analysis',
        content: `Good decisions involve defining the problem, gathering information, evaluating options, and considering consequences. Decision-making frameworks help structure complex choices. Knowing when to decide quickly versus when to deliberate is important.`,
        relatedTopics: ['Decision Frameworks', 'Risk Assessment', 'Consequences Analysis']
      },
      {
        title: 'Creativity and Innovation',
        level: 'intermediate',
        duration: '2 weeks',
        description: 'Generating and evaluating creative solutions',
        content: `Creativity is generating novel ideas. Innovation is implementing creative ideas. Techniques include lateral thinking (unconventional approaches), analogy (finding similar problems), and random input (introducing unexpected elements). Creative thinking and critical analysis work together.`,
        relatedTopics: ['Lateral Thinking', 'Brainstorming Techniques', 'Idea Evaluation']
      },
      {
        title: 'Systems Thinking',
        level: 'advanced',
        duration: '2 weeks',
        description: 'Understanding complex systems and relationships',
        content: `Systems thinking views problems within their context, understanding relationships and feedback loops. It recognizes that changing one part affects others. Systems thinking is essential for understanding complex issues like climate change, economics, and organizations.`,
        relatedTopics: ['Cause and Effect', 'Feedback Loops', 'Interconnections']
      }
    ]
  },

  'web-development': {
    overview: 'Web development involves creating websites and web applications. It includes frontend (user interface), backend (server logic), and databases.',
    estimatedHours: 60,
    content: [
      {
        title: 'Web Development Basics',
        level: 'beginner',
        duration: '1 week',
        description: 'Introduction to web development',
        content: `Web development creates websites and web applications. Frontend uses HTML, CSS, JavaScript to create user interfaces. Backend uses servers and databases to process data. Clients (browsers) communicate with servers via HTTP. Understanding this client-server architecture is fundamental.`,
        relatedTopics: ['Client-Server Model', 'HTTP Protocol', 'Web Architecture']
      },
      {
        title: 'HTML Basics',
        level: 'beginner',
        duration: '1 week',
        description: 'HyperText Markup Language - structure of web pages',
        content: `HTML provides the structure and content of web pages. It uses tags like <html>, <head>, <body>, <h1>, <p>, <a>, <img>. Semantic HTML uses meaningful tags like <article>, <section>, <nav>. HTML forms enable user input. HTML5 is the current standard with new features.`,
        relatedTopics: ['HTML Tags', 'Forms and Input', 'Semantic HTML', 'Accessibility']
      },
      {
        title: 'CSS Styling',
        level: 'beginner',
        duration: '2 weeks',
        description: 'Cascading Style Sheets - styling and layout',
        content: `CSS controls the appearance of web pages. Selectors target HTML elements, properties define styling. Layout techniques include flexbox (flexible layouts) and CSS Grid (two-dimensional layouts). Responsive design makes sites work on all devices using media queries.`,
        relatedTopics: ['Selectors', 'Flexbox', 'CSS Grid', 'Responsive Design', 'Animations']
      },
      {
        title: 'JavaScript Fundamentals',
        level: 'beginner',
        duration: '3 weeks',
        description: 'Programming language for web interactivity',
        content: `JavaScript enables interactivity in browsers. It's a programming language with variables, functions, objects, and events. DOM manipulation changes page content dynamically. Event listeners respond to user actions. Modern JavaScript (ES6+) includes classes, arrow functions, promises.`,
        relatedTopics: ['Variables and Types', 'Functions', 'DOM Manipulation', 'Events', 'Async JavaScript']
      },
      {
        title: 'Frontend Frameworks',
        level: 'intermediate',
        duration: '3 weeks',
        description: 'React, Vue, and Angular frameworks',
        content: `Frontend frameworks simplify building complex UIs. React uses components and states to build dynamic interfaces. Vue offers simpler syntax than React. Angular is a complete framework for large applications. These frameworks improve code organization and reusability.`,
        relatedTopics: ['React Basics', 'Vue Basics', 'Angular Basics', 'Component Architecture']
      },
      {
        title: 'Backend Development',
        level: 'intermediate',
        duration: '3 weeks',
        description: 'Server-side programming and databases',
        content: `Backend handles server logic, databases, and APIs. Common languages include Python (Flask, Django), JavaScript (Node.js), Java, and Go. Databases store data (SQL like PostgreSQL, or NoSQL like MongoDB). RESTful APIs enable frontend-backend communication.`,
        relatedTopics: ['REST APIs', 'Node.js', 'Databases', 'Authentication', 'Server Security']
      }
    ]
  },

  'data-science': {
    overview: 'Data science combines statistics, programming, and domain knowledge to extract insights from data. It involves collection, cleaning, analysis, and visualization.',
    estimatedHours: 50,
    content: [
      {
        title: 'Data Science Fundamentals',
        level: 'beginner',
        duration: '2 weeks',
        description: 'Introduction to data science concepts',
        content: `Data science is extracting knowledge from data. The process includes defining questions, collecting data, cleaning data (data wrangling), analyzing (statistics and ML), and communicating findings. Data-driven decision making is increasingly important in business.`,
        relatedTopics: ['Data Collection', 'Data Cleaning', 'Analysis', 'Visualization']
      },
      {
        title: 'Statistical Analysis',
        level: 'intermediate',
        duration: '2 weeks',
        description: 'Understanding statistics for data analysis',
        content: `Statistics provides tools for analyzing data. Descriptive statistics summarize data (mean, median, std dev). Inferential statistics make predictions about populations from samples. Hypothesis testing determines if findings are significant. Understanding statistics is crucial for data science.`,
        relatedTopics: ['Descriptive Statistics', 'Probability', 'Hypothesis Testing', 'Regression']
      },
      {
        title: 'Data Visualization',
        level: 'intermediate',
        duration: '2 weeks',
        description: 'Creating visual representations of data',
        content: `Visualization helps communicate data insights. Tools include Matplotlib, Seaborn (Python), Plotly, and Tableau. Visualization types include line charts (trends), bar charts (comparisons), scatter plots (relationships), and heatmaps (patterns). Good visualization clarifies complex data.`,
        relatedTopics: ['Chart Types', 'Matplotlib', 'Seaborn', 'Plotly', 'Dashboard Design']
      },
      {
        title: 'Exploratory Data Analysis',
        level: 'intermediate',
        duration: '2 weeks',
        description: 'Understanding data through investigation',
        content: `EDA is the initial exploration of data. It involves understanding data shape, distributions, missing values, outliers, and relationships. EDA informs decisions about preprocessing and modeling. Tools like Pandas help explore data efficiently.`,
        relatedTopics: ['Data Profiling', 'Distribution Analysis', 'Outlier Detection']
      },
      {
        title: 'Machine Learning for Data Science',
        level: 'advanced',
        duration: '3 weeks',
        description: 'Applying machine learning to real-world problems',
        content: `ML models learn from data to make predictions. Supervised learning predicts outcomes (regression/classification). Unsupervised learning finds patterns (clustering). Feature engineering creates useful input variables. Model evaluation assesses performance. Libraries like scikit-learn implement ML algorithms.`,
        relatedTopics: ['Feature Engineering', 'Model Selection', 'Hyperparameter Tuning', 'Cross Validation']
      }
    ]
  }
};

export default knowledgeData;
