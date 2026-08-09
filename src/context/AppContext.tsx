import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Tin6Topic, 
  Tin6Lesson, 
  Question, 
  Assignment, 
  Submission, 
  SystemNotification 
} from '../types';
import { 
  TIN6_TOPICS, 
  INITIAL_QUESTIONS, 
  INITIAL_ASSIGNMENTS, 
  INITIAL_SUBMISSIONS, 
  INITIAL_NOTIFICATIONS 
} from '../lib/mockData';
import { sound } from '../lib/soundFx';

interface AppContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  topics: Tin6Topic[];
  selectedLessonId: string;
  setSelectedLessonId: (id: string) => void;
  activeLesson: Tin6Lesson;
  questions: Question[];
  assignments: Assignment[];
  submissions: Submission[];
  notifications: SystemNotification[];
  
  // Audio Greeting
  playCoDoMungGreeting: () => void;
  isGreetingModalOpen: boolean;
  setIsGreetingModalOpen: (open: boolean) => void;

  // Modals
  isPracticeModalOpen: boolean;
  setIsPracticeModalOpen: (open: boolean) => void;
  isQuizModalOpen: boolean;
  setIsQuizModalOpen: (open: boolean) => void;
  isAssignmentModalOpen: boolean;
  setIsAssignmentModalOpen: (open: boolean) => void;
  activeAssignment: Assignment | null;
  setActiveAssignment: (assign: Assignment | null) => void;
  
  // Actions
  toggleCompleteLesson: (lessonId: string) => void;
  submitAssignment: (assignmentId: string, content: string, studentId: string, studentName: string, studentAvatar: string) => void;
  gradeSubmission: (submissionId: string, score: number, feedback: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('lessons');
  const [topics, setTopics] = useState<Tin6Topic[]>(() => {
    const saved = localStorage.getItem('tinhoc6_topics');
    return saved ? JSON.parse(saved) : TIN6_TOPICS;
  });

  const [selectedLessonId, setSelectedLessonId] = useState<string>('lesson-1');
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [submissions, setSubmissions] = useState<Submission[]>(INITIAL_SUBMISSIONS);
  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);

  // Modals state
  const [isGreetingModalOpen, setIsGreetingModalOpen] = useState<boolean>(false);
  const [isPracticeModalOpen, setIsPracticeModalOpen] = useState<boolean>(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState<boolean>(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState<boolean>(false);
  const [activeAssignment, setActiveAssignment] = useState<Assignment | null>(null);

  useEffect(() => {
    localStorage.setItem('tinhoc6_topics', JSON.stringify(topics));
  }, [topics]);

  // Find active lesson across all topics
  let activeLesson: Tin6Lesson = topics[0].lessons[0];
  for (const topic of topics) {
    const found = topic.lessons.find(l => l.id === selectedLessonId);
    if (found) {
      activeLesson = found;
      break;
    }
  }

  // Voice greeting synthesis
  const playCoDoMungGreeting = () => {
    sound.click();
    setIsGreetingModalOpen(true);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = 'Chào các em học sinh thân yêu! Cô Đỗ Mừng chúc các em có một buổi học Tin học 6 thật vui, bổ ích và đầy sáng tạo nhé!';
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = 1.0;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleCompleteLesson = (lessonId: string) => {
    sound.click();
    setTopics(prev => prev.map(topic => ({
      ...topic,
      lessons: topic.lessons.map(l => l.id === lessonId ? { ...l, isCompleted: !l.isCompleted } : l)
    })));
  };

  const submitAssignment = (assignmentId: string, content: string, studentId: string, studentName: string, studentAvatar: string) => {
    const assign = assignments.find(a => a.id === assignmentId);
    const newSub: Submission = {
      id: 'sub-' + Date.now(),
      assignment_id: assignmentId,
      assignment_title: assign?.title || 'Bài nộp',
      student_id: studentId,
      student_name: studentName,
      student_avatar: studentAvatar,
      content,
      score: null,
      max_score: assign?.max_score || 100,
      feedback: null,
      status: 'submitted',
      submitted_at: new Date().toISOString()
    };
    setSubmissions(prev => [newSub, ...prev]);
    sound.correct();
  };

  const gradeSubmission = (submissionId: string, score: number, feedback: string) => {
    setSubmissions(prev => prev.map(s => s.id === submissionId ? {
      ...s,
      score,
      feedback,
      status: 'graded'
    } : s));
    sound.correct();
  };

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      topics,
      selectedLessonId,
      setSelectedLessonId,
      activeLesson,
      questions,
      assignments,
      submissions,
      notifications,
      playCoDoMungGreeting,
      isGreetingModalOpen,
      setIsGreetingModalOpen,
      isPracticeModalOpen,
      setIsPracticeModalOpen,
      isQuizModalOpen,
      setIsQuizModalOpen,
      isAssignmentModalOpen,
      setIsAssignmentModalOpen,
      activeAssignment,
      setActiveAssignment,
      toggleCompleteLesson,
      submitAssignment,
      gradeSubmission
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
