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

  // Special handling for Python Full Stack Master Program
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

  // Default generation for other course types
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