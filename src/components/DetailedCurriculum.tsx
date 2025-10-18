import React, { useMemo, useState } from 'react';
import { Download, X, Code, BarChart3, Brain, Zap, Clock, Users, Award, Target } from 'lucide-react';
import { courseCatalogs, courseCategories } from '../data/courseDetails';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface DetailedCurriculumProps {
  courseId: string;
  onClose: () => void;
}

type Course = typeof courseCatalogs[number];
type IconComponent = React.ComponentType<{ className?: string }>;

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

interface CareerPath {
  title: string;
  description: string;
  icon: IconComponent;
  keySkills: string[];
}

interface PhaseTemplate {
  title: string;
  weeks: string;
}

interface CareerTemplate {
  title: string;
  description: string;
  icon: IconComponent;
  defaultSkills: string[];
}

const finalProjectRegex = /(final|capstone|showcase|presentation).*(project|presentation|showcase|assessment)/i;

const learningHoursMap: Record<Course['courseType'], string> = {
  Mini: '60+ Guided Learning Hours',
  Comprehensive: '140+ Guided Learning Hours',
  Full: '220+ Guided Learning Hours'
};

const phaseTemplatesByType: Record<Course['courseType'], PhaseTemplate[]> = {
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

const categoryCareerTemplates: Record<string, CareerTemplate[]> = {
  [courseCategories.FUNDAMENTALS]: [
    {
      title: 'Digital Literacy Champion',
      description: 'Support learners and families with essential computer use.',
      icon: Users,
      defaultSkills: ['Device setup', 'Productivity tools', 'Safe browsing', 'Troubleshooting']
    },
    {
      title: 'Junior IT Support Assistant',
      description: 'Help communities solve everyday technology challenges.',
      icon: Code,
      defaultSkills: ['Problem diagnosis', 'Customer support', 'Documentation', 'Communication']
    },
    {
      title: 'Learning Lab Facilitator',
      description: 'Guide beginners through hands-on computer training sessions.',
      icon: Award,
      defaultSkills: ['Workshop facilitation', 'Instructional design', 'Patience', 'Mentorship']
    }
  ],
  [courseCategories.PROGRAMMING_KIDS]: [
    {
      title: 'Junior Game Creator',
      description: 'Design playful interactive games and animations.',
      icon: Code,
      defaultSkills: ['Scratch logic', 'Animation timing', 'Creative coding', 'Testing']
    },
    {
      title: 'Interactive Story Designer',
      description: 'Bring stories to life with characters, voice, and visuals.',
      icon: Users,
      defaultSkills: ['Narrative structure', 'Presentation', 'Voice control', 'Audience engagement']
    },
    {
      title: 'STEM Club Mentor',
      description: 'Lead peers through coding puzzles and challenges.',
      icon: Award,
      defaultSkills: ['Peer coaching', 'Problem solving', 'Team leadership', 'Confidence building']
    }
  ],
  [courseCategories.WEB_DEVELOPMENT]: [
    {
      title: 'Junior Frontend Developer',
      description: 'Transform designs into responsive, accessible web pages.',
      icon: Code,
      defaultSkills: ['Semantic HTML', 'Responsive CSS', 'Accessibility', 'Version control']
    },
    {
      title: 'Web Content Designer',
      description: 'Craft user-friendly layouts and micro-interactions.',
      icon: Target,
      defaultSkills: ['Layout design', 'Component thinking', 'User empathy', 'Visual polish']
    },
    {
      title: 'Website Care Specialist',
      description: 'Maintain and improve sites for small businesses or schools.',
      icon: Users,
      defaultSkills: ['Content updates', 'Performance tuning', 'Quality assurance', 'Client communication']
    }
  ],
  [courseCategories.PROGRAMMING]: [
    {
      title: 'Junior Software Developer',
      description: 'Build scripts and applications that solve real problems.',
      icon: Code,
      defaultSkills: ['Clean coding', 'Debugging', 'Version control', 'Testing routines']
    },
    {
      title: 'Automation Explorer',
      description: 'Automate repetitive tasks for classrooms or offices.',
      icon: Zap,
      defaultSkills: ['Workflow design', 'APIs', 'Task automation', 'Documentation']
    },
    {
      title: 'STEM Tutor',
      description: 'Teach programming concepts to other students and clubs.',
      icon: Users,
      defaultSkills: ['Concept explanation', 'Patience', 'Curriculum planning', 'Coaching']
    }
  ],
  [courseCategories.AI_ML]: [
    {
      title: 'AI Explorer',
      description: 'Experiment with intelligent systems and prototypes.',
      icon: Brain,
      defaultSkills: ['Model thinking', 'Data literacy', 'Ethical awareness', 'Prototyping']
    },
    {
      title: 'Data Apprentice',
      description: 'Prepare and analyze data for smart decision-making.',
      icon: BarChart3,
      defaultSkills: ['Data cleaning', 'Visualization', 'Pattern recognition', 'Insights storytelling']
    },
    {
      title: 'Responsible AI Advocate',
      description: 'Guide peers on ethical and inclusive AI use.',
      icon: Target,
      defaultSkills: ['Policy awareness', 'Communication', 'Critical thinking', 'Community impact']
    }
  ],
  [courseCategories.PROBLEM_SOLVING]: [
    {
      title: 'Logic Strategist',
      description: 'Solve complex challenges with systematic approaches.',
      icon: Brain,
      defaultSkills: ['Analytical reasoning', 'Pattern spotting', 'Hypothesis testing', 'Reflection']
    },
    {
      title: 'Challenge Facilitator',
      description: 'Organize puzzle clubs and collaborative problem hunts.',
      icon: Users,
      defaultSkills: ['Workshop facilitation', 'Team motivation', 'Feedback loops', 'Gamification']
    },
    {
      title: 'Innovation Sprint Lead',
      description: 'Guide teams to prototype and iterate rapid solutions.',
      icon: Zap,
      defaultSkills: ['Design sprints', 'Brainstorming', 'Iteration', 'Presentation']
    }
  ],
  [courseCategories.DESIGN_THINKING]: [
    {
      title: 'Creative Storyteller',
      description: 'Craft narratives that educate, inspire, and entertain.',
      icon: Users,
      defaultSkills: ['Narrative design', 'Character development', 'Audience engagement', 'Expression']
    },
    {
      title: 'Design Thinking Facilitator',
      description: 'Lead empathy-driven innovation workshops.',
      icon: Target,
      defaultSkills: ['Empathy mapping', 'Ideation methods', 'Prototype testing', 'Feedback synthesis']
    },
    {
      title: 'Presentation Coach',
      description: 'Help teams communicate ideas with clarity and confidence.',
      icon: Award,
      defaultSkills: ['Voice control', 'Body language', 'Storyboarding', 'Confidence building']
    }
  ]
};

const unique = (values: string[]): string[] =>
  Array.from(new Set(values.map(value => value.trim()).filter(Boolean)));

const sanitizeTopic = (text: string): string =>
  text.replace(/^[•\-\d\.]+\s*/g, '').replace(/\s+/g, ' ').trim();

// Expand composite topics like "Data science & ML: NumPy, Pandas, Matplotlib/Seaborn; ML with scikit-learn"
// into granular items: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "scikit-learn", ...]
const expandTopic = (topic: string): string[] => {
  const cleaned = sanitizeTopic(topic);
  const tail = cleaned.includes(':') ? cleaned.split(':').slice(1).join(':') : cleaned;
  // First split by semicolons or commas
  const primary = tail.split(/[;,]/);
  // Further split segments by '/' and ' and '
  const pieces = primary.flatMap(seg => seg
    .split('/')
    .flatMap(p => p.split(/\band\b/i))
    .map(s => sanitizeTopic(s))
    .filter(Boolean)
  );

  // If expansion produced multiple items, return them; else return the cleaned topic
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

const formatFinalProject = (text: string, courseTitle: string): string => {
  const cleaned = sanitizeTopic(text);
  const remainder = cleaned.replace(/final\s+(project|showcase|presentation|assessment)\s*:?\s*/i, '').trim();

  if (!remainder) {
    return `Final Project: Demonstrate your ${courseTitle} mastery.`;
  }

  return `Final Project: ${remainder.charAt(0).toUpperCase()}${remainder.slice(1)}`;
};

const buildProjectDescription = (
  courseTitle: string,
  moduleTopics: string[],
  finalProject: string,
  isFinalPhase: boolean
): string => {
  if (isFinalPhase) {
    return finalProject ? formatFinalProject(finalProject, courseTitle) : `Final Showcase: Present your ${courseTitle} capstone to peers and mentors.`;
  }

  const focus = moduleTopics[moduleTopics.length - 1] ?? moduleTopics[0];

  if (focus && /project/i.test(focus)) {
    return focus;
  }

  const highlight = focus ?? courseTitle;
  return `Project: Apply ${highlight.toLowerCase()} in a real-world mini challenge.`;
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

const generatePhases = (course: Course): PhaseData[] => {
  const phaseTemplates = phaseTemplatesByType[course.courseType] ?? phaseTemplatesByType.Mini;
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

    // Break down composite topics into granular, easy-to-read items
    const granularTopics = moduleTopics.length ? expandTopics(moduleTopics) : [];
    const keyTopics = granularTopics.length ? granularTopics : [sanitizeTopic(course.description)];

    if (isFinalPhase && finalProject) {
      keyTopics.push(formatFinalProject(finalProject, course.title));
    }

    return {
      title: phase.title,
      weeks: phase.weeks,
      modules: [
        {
          week: `${phase.weeks} Focus`,
          keyTopics: unique(keyTopics),
          project: buildProjectDescription(course.title, moduleTopics, finalProject, isFinalPhase),
          resources: buildModuleResources(course.title, granularTopics.length ? granularTopics : moduleTopics, isFinalPhase)
        }
      ]
    };
  });
};

const generateCareerPaths = (course: Course): CareerPath[] => {
  const templates = categoryCareerTemplates[course.category] ?? [
    {
      title: `${course.title} Explorer`,
      description: `Discover how ${course.title} skills create opportunities in your community.`,
      icon: Award,
      defaultSkills: []
    }
  ];

  const objectiveSkills = unique(course.objectives.map(obj => obj.title));

  return templates.map(template => ({
    title: template.title,
    description: template.description,
    icon: template.icon,
    keySkills: unique([...template.defaultSkills, ...objectiveSkills]).slice(0, 4)
  }));
};

const generateCurriculumData = (course: Course) => ({
  duration: course.duration,
  learningHours: learningHoursMap[course.courseType] ?? 'Guided Learning Hours',
  phases: generatePhases(course),
  careerPaths: generateCareerPaths(course)
});

const masteryTagMap: Record<Course['courseType'], string> = {
  Mini: 'discovery journey',
  Comprehensive: 'implementation roadmap',
  Full: 'professional mastery path'
};

const DetailedCurriculum: React.FC<DetailedCurriculumProps> = ({ courseId, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const course = courseCatalogs.find(c => c.id === courseId);

  if (!course) return null;

  const curriculumData = useMemo(() => generateCurriculumData(course), [course]);

  const programTabs = [
    `${course.title} Program`,
    'Career Paths',
    'Resources & Support'
  ];

  const masteryLabel = masteryTagMap[course.courseType];

  const handleDownloadPDF = async () => {
    const element = document.getElementById('curriculum-content');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#1a1a2e',
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      const scale = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const scaledWidth = imgWidth * scale;
      const scaledHeight = imgHeight * scale;
      
      const marginX = (pdfWidth - scaledWidth) / 2;
      const marginY = (pdfHeight - scaledHeight) / 2;

      pdf.addImage(imgData, 'PNG', marginX, marginY, scaledWidth, scaledHeight);
      pdf.save(`${course.title}_Curriculum.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto bg-gradient-to-b from-dark to-dark-light rounded-2xl overflow-hidden opacity-0 scale-95 animate-[fadeInScale_0.3s_ease-out_forwards]">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-b border-gray-700">
            {/* Program Tabs */}
            <div className="px-6 py-4">
              <div className="flex gap-2 mb-4">
                {programTabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeTab === index
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                    }`}
                  >
                    {index === 0 && <Code className="inline h-4 w-4 mr-2" />}
                    {index === 1 && <Target className="inline h-4 w-4 mr-2" />}
                    {index === 2 && <Award className="inline h-4 w-4 mr-2" />}
                    {tab}
                  </button>
                ))}
              </div>
              
              {/* Course Header */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Code className="h-8 w-8 text-blue-400" />
                    <h1 className="text-3xl font-bold text-white">{course.title}</h1>
                  </div>
                  <p className="text-gray-300 text-lg mb-4">
                    Master {course.title} with our {masteryLabel} tailored to {course.level.toLowerCase()} learners.
                  </p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
                      <Clock className="h-4 w-4 text-indigo-400" />
                      <span className="text-sm text-gray-300">Duration: {curriculumData.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
                      <Users className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-gray-300">{curriculumData.learningHours}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
                      <Award className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-gray-300">Beginner Friendly</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
                      <Target className="h-4 w-4 text-purple-400" />
                      <span className="text-sm text-gray-300">Career Ready</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div id="curriculum-content" className="p-6">
            {activeTab === 0 && (
              <div className="space-y-8">
                {curriculumData.phases.map((phase, phaseIndex) => (
                  <div key={phaseIndex} className="bg-dark-light rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center gap-3 mb-6">
                      <Code className="h-6 w-6 text-blue-400" />
                      <div>
                        <h2 className="text-2xl font-bold text-blue-400">{phase.title}</h2>
                        <p className="text-gray-400">{phase.weeks}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {phase.modules.map((module, moduleIndex) => (
                        <div key={moduleIndex} className="bg-gray-800/30 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-white mb-4">{module.week}</h3>
                          
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Key Topics:</h4>
                            <ul className="space-y-1">
                              {module.keyTopics.map((topic, topicIndex) => (
                                <li key={topicIndex} className="flex items-start gap-2 text-gray-300">
                                  <div className="w-1 h-1 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Project:</h4>
                            <p className="text-gray-300">{module.project}</p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Resources:</h4>
                            <ul className="space-y-1">
                              {module.resources.map((resource, resourceIndex) => (
                                <li key={resourceIndex} className="flex items-center gap-2 text-gray-300">
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

            {activeTab === 1 && (
              <div>
                <h2 className="text-3xl font-bold text-blue-400 mb-8">Career Paths</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {curriculumData.careerPaths.map((career, index) => (
                    <div key={index} className="bg-dark-light rounded-xl p-6 border border-gray-700">
                      <div className="flex items-center gap-3 mb-4">
                        <career.icon className="h-8 w-8 text-blue-400" />
                        <div>
                          <h3 className="text-xl font-bold text-white">{career.title}</h3>
                          <p className="text-gray-400">{career.description}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Key Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {career.keySkills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div>
                <h2 className="text-3xl font-bold text-blue-400 mb-8">Resources & Support</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-dark-light rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4">Learning Resources</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Interactive coding exercises</li>
                      <li>• Video lectures and tutorials</li>
                      <li>• Real-world project templates</li>
                      <li>• Code review and feedback</li>
                      <li>• Community forums and discussions</li>
                    </ul>
                  </div>
                  
                  <div className="bg-dark-light rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4">Support System</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• 1-on-1 mentorship sessions</li>
                      <li>• Live Q&A sessions</li>
                      <li>• Career guidance and counseling</li>
                      <li>• Industry expert guest lectures</li>
                      <li>• Job placement assistance</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedCurriculum;
