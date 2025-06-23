import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ResumeData, FormStep } from '../types/resume';

interface ResumeState extends ResumeData {
  currentStep: FormStep;
  isPreviewMode: boolean;
  selectedTemplate: string;
}

type ResumeAction =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<ResumeData['personalInfo']> }
  | { type: 'ADD_EDUCATION'; payload: ResumeData['education'][0] }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<ResumeData['education'][0]> } }
  | { type: 'REMOVE_EDUCATION'; payload: string }
  | { type: 'ADD_EXPERIENCE'; payload: ResumeData['experience'][0] }
  | { type: 'UPDATE_EXPERIENCE'; payload: { id: string; data: Partial<ResumeData['experience'][0]> } }
  | { type: 'REMOVE_EXPERIENCE'; payload: string }
  | { type: 'ADD_PROJECT'; payload: ResumeData['projects'][0] }
  | { type: 'UPDATE_PROJECT'; payload: { id: string; data: Partial<ResumeData['projects'][0]> } }
  | { type: 'REMOVE_PROJECT'; payload: string }
  | { type: 'ADD_SKILL'; payload: ResumeData['skills'][0] }
  | { type: 'UPDATE_SKILL'; payload: { id: string; data: Partial<ResumeData['skills'][0]> } }
  | { type: 'REMOVE_SKILL'; payload: string }
  | { type: 'SET_STEP'; payload: FormStep }
  | { type: 'TOGGLE_PREVIEW'; payload?: boolean }
  | { type: 'SET_TEMPLATE'; payload: string };

const initialState: ResumeState = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    linkedIn: '',
    website: '',
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
  currentStep: 'personal',
  isPreviewMode: false,
  selectedTemplate: 'modern-blue',
};

function resumeReducer(state: ResumeState, action: ResumeAction): ResumeState {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
      };
    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [...state.education, action.payload],
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map(edu =>
          edu.id === action.payload.id ? { ...edu, ...action.payload.data } : edu
        ),
      };
    case 'REMOVE_EDUCATION':
      return {
        ...state,
        education: state.education.filter(edu => edu.id !== action.payload),
      };
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        experience: [...state.experience, action.payload],
      };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.map(exp =>
          exp.id === action.payload.id ? { ...exp, ...action.payload.data } : exp
        ),
      };
    case 'REMOVE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.filter(exp => exp.id !== action.payload),
      };
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(proj =>
          proj.id === action.payload.id ? { ...proj, ...action.payload.data } : proj
        ),
      };
    case 'REMOVE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(proj => proj.id !== action.payload),
      };
    case 'ADD_SKILL':
      return {
        ...state,
        skills: [...state.skills, action.payload],
      };
    case 'UPDATE_SKILL':
      return {
        ...state,
        skills: state.skills.map(skill =>
          skill.id === action.payload.id ? { ...skill, ...action.payload.data } : skill
        ),
      };
    case 'REMOVE_SKILL':
      return {
        ...state,
        skills: state.skills.filter(skill => skill.id !== action.payload),
      };
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload,
      };
    case 'TOGGLE_PREVIEW':
      return {
        ...state,
        isPreviewMode: action.payload ?? !state.isPreviewMode,
      };
    case 'SET_TEMPLATE':
      return {
        ...state,
        selectedTemplate: action.payload,
      };
    default:
      return state;
  }
}

const ResumeContext = createContext<{
  state: ResumeState;
  dispatch: React.Dispatch<ResumeAction>;
} | null>(null);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}