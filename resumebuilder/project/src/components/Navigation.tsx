import React from 'react';
import { FormStep } from '../types/resume';
import { useResume } from '../context/ResumeContext';
import { User, GraduationCap, Briefcase, Code, Award, Eye, Download, Palette } from 'lucide-react';

const steps: { key: FormStep; label: string; icon: React.ReactNode }[] = [
  { key: 'personal', label: 'Personal Info', icon: <User className="w-5 h-5" /> },
  { key: 'education', label: 'Education', icon: <GraduationCap className="w-5 h-5" /> },
  { key: 'experience', label: 'Experience', icon: <Briefcase className="w-5 h-5" /> },
  { key: 'projects', label: 'Projects', icon: <Code className="w-5 h-5" /> },
  { key: 'skills', label: 'Skills', icon: <Award className="w-5 h-5" /> },
  { key: 'templates', label: 'Templates', icon: <Palette className="w-5 h-5" /> },
];

export default function Navigation() {
  const { state, dispatch } = useResume();

  const handleDownload = async () => {
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.getElementById('resume-preview');
    if (element) {
      const opt = {
        margin: 0.5,
        filename: `${state.personalInfo.firstName}_${state.personalInfo.lastName}_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Resume Builder
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {steps.map((step, index) => (
              <button
                key={step.key}
                onClick={() => dispatch({ type: 'SET_STEP', payload: step.key })}
                className={`
                  relative px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105
                  ${state.currentStep === step.key
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  {step.icon}
                  <span className="text-sm font-medium">{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-0.5 bg-gray-300" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => dispatch({ type: 'TOGGLE_PREVIEW' })}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 transform hover:scale-105"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">
                {state.isPreviewMode ? 'Edit' : 'Preview'}
              </span>
            </button>
            
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 transform hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden px-4 pb-4">
        <div className="flex space-x-1 overflow-x-auto">
          {steps.map((step) => (
            <button
              key={step.key}
              onClick={() => dispatch({ type: 'SET_STEP', payload: step.key })}
              className={`
                flex-shrink-0 px-3 py-2 rounded-lg transition-all duration-300
                ${state.currentStep === step.key
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              <div className="flex items-center space-x-1">
                {step.icon}
                <span className="text-xs font-medium">{step.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}