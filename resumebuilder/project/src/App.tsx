import React from 'react';
import { ResumeProvider, useResume } from './context/ResumeContext';
import Navigation from './components/Navigation';
import PersonalInfo from './components/FormSections/PersonalInfo';
import Education from './components/FormSections/Education';
import Experience from './components/FormSections/Experience';
import Projects from './components/FormSections/Projects';
import Skills from './components/FormSections/Skills';
import Templates from './components/FormSections/Templates';
import ResumePreview from './components/ResumePreview';

function AppContent() {
  const { state } = useResume();

  const renderCurrentStep = () => {
    if (state.isPreviewMode) {
      return (
        <div className="preview-container">
          <ResumePreview />
        </div>
      );
    }

    switch (state.currentStep) {
      case 'personal':
        return <PersonalInfo />;
      case 'education':
        return <Education />;
      case 'experience':
        return <Experience />;
      case 'projects':
        return <Projects />;
      case 'skills':
        return <Skills />;
      case 'templates':
        return <Templates />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid gap-8 ${state.isPreviewMode ? 'grid-cols-1' : 'lg:grid-cols-2'}`}>
          {/* Form Section */}
          {!state.isPreviewMode && (
            <div className="form-container">
              {renderCurrentStep()}
            </div>
          )}
          
          {/* Preview Section */}
          <div className={`preview-sidebar ${state.isPreviewMode ? 'preview-full' : ''}`}>
            <div className="sticky top-24">
              <div className="preview-header">
                <h3 className="text-lg font-semibold text-gray-800">Live Preview</h3>
                <p className="text-sm text-gray-600">See your resume update in real-time</p>
              </div>
              <ResumePreview />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ResumeProvider>
      <AppContent />
    </ResumeProvider>
  );
}

export default App;