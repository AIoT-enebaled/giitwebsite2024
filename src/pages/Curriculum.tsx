import React, { useState, useMemo } from 'react';
import { BookOpen, Code, Brain, Palette, Users, Target, Clock, Trophy, CheckCircle, Star, ChevronDown, ChevronUp } from 'lucide-react';
import FloatingLogo from '../components/FloatingLogo';
import { courseCatalogs, courseCategories } from '../data/courseDetails';
import ElegantAnimatedBackground from '../components/CrazyAnimatedBackground';
import NeuralNetwork from '../components/NeuralNetwork';

type Course = typeof courseCatalogs[number];

interface ModuleData {
  week: string;
  keyTopics: string[];
  project: string;
  resources: string[];
}

interface PhaseData {
  title: string;
  weeks: string;
  modules: ModuleData[];
}

const unique = (values: string[]): string[] =>
  Array.from(new Set(values.map(value => value.trim()).filter(Boolean)));

const sanitizeTopic = (text: string): string =>
  text.replace(/^[•\-\d\.]+\s*/g, '').replace(/\s+/g, ' ').trim();

const expandTopic = (topic: string): string[] => {
  const cleaned = sanitizeTopic(topic);
  const tail = cleaned.includes(':') ? cleaned.split(':').slice(1).join(':') : cleaned;
  const primary = tail.split(/[;,]/);
  const pieces = primary.flatMap(seg => seg
    .split('/')
    .flatMap(p => p.split(/\band\b/i))
    .map(s => sanitizeTopic(s))
    .filter(Boolean)
  );
  if (pieces.length > 1) return pieces;
  return [cleaned];
};

const expandTopics = (topics: string[], maxItems = 12): string[] => {
  const flat = topics.flatMap(t => expandTopic(t));
  return unique(flat).slice(0, maxItems);
};

const extractFinalProject = (topics: string[]) => {
  let finalProject = '';
  const filteredTopics: string[] = [];
  const finalProjectRegex = /(final|capstone|showcase|presentation).*(project|presentation|showcase|assessment)/i;

  topics.forEach(topic => {
    if (!finalProject && finalProjectRegex.test(topic)) {
      finalProject = topic;
    } else {
      filteredTopics.push(topic);
    }
  });

  return { filteredTopics, finalProject };
};

const chunkTopics = (topics: string[], chunkCount: number): string[][] => {
  if (chunkCount <= 0) {
    return [];
  }

  const chunks: string[][] = [];
  let index = 0;

  for (let remaining = chunkCount; remaining > 0; remaining -= 1) {
    const size = Math.ceil((topics.length - index) / remaining);
    chunks.push(topics.slice(index, index + Math.max(size, 0)));
    index += size;
  }

  return chunks;
};

const buildModuleResources = (courseTitle: string, moduleTopics: string[], isFinalPhase: boolean): string[] => {
  if (isFinalPhase) {
    return [
      'Capstone planning checklist',
      'Presentation coaching clinic',
      'Peer review and rehearsal sessions'
    ];
  }

  const focus = moduleTopics[0] ?? courseTitle;

  return unique([
    `${focus} practice kit`,
    `${courseTitle} guided workshop`,
    'Mentor feedback and reflection journal'
  ]);
};

type PythonProject = { num: number; title: string; level: 'Beginner' | 'Intermediate' | 'Advanced'; weeks: string };

const pythonFullStackProjects: PythonProject[] = [
  { num: 1, title: 'Hello World & CLI Calculator', level: 'Beginner', weeks: '1-2' },
  { num: 2, title: 'Unit Converter CLI', level: 'Beginner', weeks: '1-2' },
  { num: 3, title: 'Number Guessing Game', level: 'Beginner', weeks: '3-4' },
  { num: 4, title: 'To-Do Manager (File-Based)', level: 'Beginner', weeks: '3-4' },
  { num: 5, title: 'Contact Book (CSV)', level: 'Beginner', weeks: '5-6' },
  { num: 6, title: 'Password Generator', level: 'Beginner', weeks: '5-6' },
  { num: 7, title: 'Text Analyzer', level: 'Beginner', weeks: '7-8' },
  { num: 8, title: 'Expense Tracker (CSV)', level: 'Beginner', weeks: '7-8' },
  { num: 9, title: 'Job Listings Web Scraper', level: 'Intermediate', weeks: '9-10' },
  { num: 10, title: 'Weather Dashboard (API)', level: 'Intermediate', weeks: '9-10' },
  { num: 11, title: 'Flask Blog (CRUD)', level: 'Intermediate', weeks: '11-12' },
  { num: 12, title: 'FastAPI REST Service', level: 'Intermediate', weeks: '11-12' },
  { num: 13, title: 'ORM App with SQLAlchemy', level: 'Intermediate', weeks: '13-14' },
  { num: 14, title: 'Automation: Email/SMS Notifier', level: 'Intermediate', weeks: '13-14' },
  { num: 15, title: 'Pandas Data Report', level: 'Intermediate', weeks: '15-16' },
  { num: 16, title: 'Movie Recommender (ML)', level: 'Intermediate', weeks: '15-16' },
  { num: 17, title: 'Image Classifier (CNN)', level: 'Intermediate', weeks: '17-18' },
  { num: 18, title: 'NLP Sentiment Analyzer', level: 'Intermediate', weeks: '17-18' },
  { num: 19, title: 'Real-time Chat (Flask-SocketIO)', level: 'Advanced', weeks: '19-20' },
  { num: 20, title: 'Django E-commerce Backend', level: 'Advanced', weeks: '19-20' },
  { num: 21, title: 'ETL Pipeline', level: 'Advanced', weeks: '21-22' },
  { num: 22, title: 'MLOps: Train & Deploy', level: 'Advanced', weeks: '21-22' },
  { num: 23, title: 'PySpark Analytics', level: 'Advanced', weeks: '23-24' },
  { num: 24, title: 'Full-Stack App (Next.js + Flask)', level: 'Advanced', weeks: '23-24' },
  { num: 25, title: 'Capstone: Cloud-Deployed Data App', level: 'Advanced', weeks: '25-26' }
];

const getProjectsForWeeks = (startWeek: number, endWeek: number): PythonProject[] => {
  return pythonFullStackProjects.filter(p => {
    const [pStart, pEnd] = p.weeks.split('-').map(w => parseInt(w, 10));
    return pStart <= endWeek && pEnd >= startWeek;
  });
};

const generateCurriculumPhases = (course: Course): PhaseData[] => {
  const phaseTemplatesByType: Record<Course['courseType'], Array<{ title: string; weeks: string }>> = {
    Mini: [
      { title: 'Phase 1: Discover & Foundations', weeks: 'Weeks 1-2' },
      { title: 'Phase 2: Build & Practice', weeks: 'Weeks 3-5' },
      { title: 'Phase 3: Create & Present', weeks: 'Weeks 6-8' }
    ],
    Comprehensive: [
      { title: 'Phase 1: Core Foundations', weeks: 'Weeks 1-4' },
      { title: 'Phase 2: Applied Projects', weeks: 'Weeks 5-8' },
      { title: 'Phase 3: Professional Portfolio', weeks: 'Weeks 9-12' }
    ],
    Full: [
      { title: 'Phase 1: Intensive Foundations', weeks: 'Weeks 1-6' },
      { title: 'Phase 2: Advanced Specialization', weeks: 'Weeks 7-14' },
      { title: 'Phase 3: Professional Launch', weeks: 'Weeks 15-24' }
    ]
  };

  const phaseTemplates = phaseTemplatesByType[course.courseType] ?? phaseTemplatesByType.Mini;

  if (course.id === 'python-fullstack-master') {
    const { filteredTopics, finalProject } = extractFinalProject(course.curriculum);
    const sanitizedTopics = filteredTopics.map(sanitizeTopic).filter(Boolean);
    const topicsPerModule = chunkTopics(sanitizedTopics, 13);

    const modules: ModuleData[] = [];
    let weekStart = 1;

    for (let i = 0; i < 13; i++) {
      const weekEnd = weekStart + 1;
      const moduleTopics = topicsPerModule[i] ?? [];
      const granularTopics = expandTopics(moduleTopics.map(sanitizeTopic), 8);
      const projects = getProjectsForWeeks(weekStart, weekEnd);
      const projectList = projects.length > 0
        ? projects.map(p => `• Project ${p.num}: ${p.title} (${p.level})`).join('\n')
        : `Apply ${moduleTopics[0] || 'course concepts'} in practice.`;

      modules.push({
        week: `Weeks ${weekStart}–${weekEnd}`,
        keyTopics: unique(granularTopics),
        project: projectList,
        resources: buildModuleResources(course.title, granularTopics, false)
      });

      weekStart = weekEnd + 1;
    }

    return [
      {
        title: 'Phase 1: Intensive Foundations',
        weeks: 'Weeks 1-6',
        modules: modules.slice(0, 3)
      },
      {
        title: 'Phase 2: Advanced Specialization',
        weeks: 'Weeks 7-14',
        modules: modules.slice(3, 10)
      },
      {
        title: 'Phase 3: Professional Launch',
        weeks: 'Weeks 15-26',
        modules: modules.slice(10)
      }
    ];
  }

  const { filteredTopics, finalProject } = extractFinalProject(course.curriculum);
  const sanitizedTopics = filteredTopics.map(sanitizeTopic).filter(Boolean);
  const topicChunks = chunkTopics(sanitizedTopics, phaseTemplates.length);
  const objectiveSummaries = course.objectives.map(obj => sanitizeTopic(`${obj.title}: ${obj.description}`));

  return phaseTemplates.map((phase, index) => {
    const chunk = topicChunks[index] ?? [];
    const fallback = objectiveSummaries.slice(index * 2, index * 2 + 2);
    const rawModuleTopics = chunk.length ? chunk : fallback;
    const moduleTopics = rawModuleTopics.map(sanitizeTopic).filter(Boolean);
    const isFinalPhase = index === phaseTemplates.length - 1;

    const granularTopics = moduleTopics.length ? expandTopics(moduleTopics) : [];
    const keyTopics = granularTopics.length ? granularTopics : [sanitizeTopic(course.description)];

    if (isFinalPhase && finalProject) {
      keyTopics.push(sanitizeTopic(finalProject));
    }

    return {
      title: phase.title,
      weeks: phase.weeks,
      modules: [
        {
          week: `${phase.weeks} Focus`,
          keyTopics: unique(keyTopics),
          project: isFinalPhase ? `Final Project: ${finalProject || course.title} Capstone` : `Apply ${moduleTopics[0] || course.title} concepts`,
          resources: buildModuleResources(course.title, granularTopics.length ? granularTopics : moduleTopics, isFinalPhase)
        }
      ]
    };
  });
};

const Curriculum = () => {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const groupedCourses = useMemo(() =>
    courseCatalogs.reduce((acc, course) => {
      if (!acc[course.category]) {
        acc[course.category] = [];
      }
      acc[course.category].push(course);
      return acc;
    }, {} as Record<string, typeof courseCatalogs>),
    []
  );

  const getCategoryColor = (index: number) => {
    const colors = [
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-indigo-500",
      "from-green-500 to-emerald-500",
      "from-orange-500 to-red-500",
      "from-pink-500 to-rose-500",
      "from-yellow-500 to-orange-500",
      "from-teal-500 to-cyan-500"
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-dark-light relative">
      <NeuralNetwork />
      <ElegantAnimatedBackground />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20">
          {[...Array(20)].map((_, i) => {
            const duration = 3 + Math.random() * 2;
            const delay = Math.random() * 2;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            return (
              <div
                key={i}
                className="absolute w-2 h-2 bg-indigo-400/40 rounded-full"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animation: `floatY ${duration}s ease-in-out ${delay}s infinite`,
                  opacity: 0.8
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="relative pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 opacity-0 translate-y-5 animate-[fadeInUp_0.6s_ease-out_forwards]">
            <div className="flex justify-center mb-8">
              <FloatingLogo size="large" showText={true} showTypewriter={false} className="justify-center" />
            </div>
            <div className="mb-6">
              <span className="text-gray-400 text-lg">Genius Institute of IT</span>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              Technology Excellence
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A comprehensive, age-appropriate curriculum designed to build strong foundations in
              computer science, programming, and 21st-century digital skills.
            </p>
          </div>

          {Object.entries(groupedCourses).map(([categoryName, courses], categoryIndex) => (
            <div key={categoryName} className="mb-20 opacity-0 translate-y-5 animate-[fadeInUp_0.6s_ease-out_forwards]" style={{ animationDelay: `${0.2 * categoryIndex}s` }}>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">{categoryName}</h2>
                <p className="text-indigo-400 text-lg">{courses.length} courses available in this category</p>
              </div>

              <div className="space-y-8">
                {courses.map((course, courseIndex) => {
                  const phases = generateCurriculumPhases(course);
                  const isExpanded = expandedCourse === course.id;

                  return (
                    <div key={course.id} className="bg-dark-light rounded-2xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-300 opacity-0 translate-y-5 animate-[fadeInUp_0.6s_ease-out_forwards]" style={{ animationDelay: `${0.1 * courseIndex}s` }}>
                      <div className={`h-40 bg-gradient-to-r ${getCategoryColor(categoryIndex)} relative overflow-hidden cursor-pointer`} onClick={() => setExpandedCourse(isExpanded ? null : course.id)}>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute inset-0 p-6 flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <BookOpen className="h-6 w-6 text-white" />
                              <h3 className="text-2xl font-bold text-white line-clamp-2">{course.title}</h3>
                            </div>
                            <div className="flex items-center gap-2 text-white/90 text-sm">
                              <span className="bg-white/20 px-2 py-1 rounded-full">{course.level}</span>
                              <span className="bg-white/20 px-2 py-1 rounded-full">{course.courseType}</span>
                            </div>
                          </div>
                          <div className="text-right text-white/90 text-sm">
                            <div className="flex items-center gap-1 mb-1 justify-end">
                              <Clock className="h-4 w-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1 justify-end">
                              <BookOpen className="h-4 w-4" />
                              <span>{phases.length} Phases</span>
                            </div>
                            <button className="mt-3 flex items-center gap-1 ml-auto text-indigo-300">
                              {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="p-8 space-y-8 bg-gradient-to-b from-dark-light to-dark">
                          {phases.map((phase, phaseIndex) => (
                            <div key={phaseIndex} className="bg-dark rounded-xl p-6 border border-gray-700">
                              <div className="flex items-center gap-3 mb-6">
                                <Code className="h-6 w-6 text-blue-400" />
                                <div>
                                  <h3 className="text-xl font-bold text-blue-400">{phase.title}</h3>
                                  <p className="text-gray-400 text-sm">{phase.weeks}</p>
                                </div>
                              </div>

                              <div className="space-y-6">
                                {phase.modules.map((module, moduleIndex) => (
                                  <div key={moduleIndex} className="bg-gray-800/30 rounded-lg p-6">
                                    <h4 className="text-lg font-semibold text-white mb-4">{module.week}</h4>

                                    <div className="mb-4">
                                      <h5 className="text-sm font-medium text-gray-400 mb-2">Key Topics:</h5>
                                      <ul className="space-y-1">
                                        {module.keyTopics.map((topic, idx) => (
                                          <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                                            <div className="w-1 h-1 bg-indigo-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                            <span>{topic}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div className="mb-4">
                                      <h5 className="text-sm font-medium text-gray-400 mb-2">Project:</h5>
                                      <p className="text-gray-300 text-sm whitespace-pre-line">{module.project}</p>
                                    </div>

                                    <div>
                                      <h5 className="text-sm font-medium text-gray-400 mb-2">Resources:</h5>
                                      <ul className="space-y-1">
                                        {module.resources.map((resource, idx) => (
                                          <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                                            <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                                            <span>{resource}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 opacity-0 translate-y-5 animate-[fadeInUp_0.6s_ease-out_forwards]" style={{ animationDelay: '0.8s' }}>
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl text-indigo-100 mb-6">
              Join thousands of students who have transformed their futures with GiiT
            </p>
            <button className="transform transition-transform duration-200 hover:scale-105 active:scale-95 bg-white text-indigo-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              Explore Our Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
