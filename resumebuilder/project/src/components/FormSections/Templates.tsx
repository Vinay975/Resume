import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Palette, Check } from 'lucide-react';
import { resumeTemplates, getTemplatesByCategory } from '../../data/templates';
import { ResumeTemplate } from '../../types/resume';

const categories = [
  { key: 'modern' as const, label: 'Modern', description: 'Contemporary and sleek designs' },
  { key: 'classic' as const, label: 'Classic', description: 'Timeless and traditional layouts' },
  { key: 'creative' as const, label: 'Creative', description: 'Bold and artistic designs' },
  { key: 'minimal' as const, label: 'Minimal', description: 'Clean and simple layouts' },
  { key: 'executive' as const, label: 'Executive', description: 'Professional and sophisticated' },
];

export default function Templates() {
  const { state, dispatch } = useResume();
  const [selectedCategory, setSelectedCategory] = React.useState<ResumeTemplate['category']>('modern');

  const handleTemplateSelect = (templateId: string) => {
    dispatch({ type: 'SET_TEMPLATE', payload: templateId });
  };

  const filteredTemplates = getTemplatesByCategory(selectedCategory);

  return (
    <div className="form-section">
      <div className="form-header">
        <Palette className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-800">Choose Template</h2>
        <p className="text-gray-600">Select a professional template for your resume</p>
      </div>

      {/* Category Filter */}
      <div className="template-categories">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`
                template-category-btn
                ${selectedCategory === category.key
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <div className="text-center">
                <h3 className="font-semibold text-sm">{category.label}</h3>
                <p className="text-xs opacity-80 mt-1">{category.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="template-grid">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className={`
              template-card
              ${state.selectedTemplate === template.id ? 'template-selected' : ''}
            `}
            onClick={() => handleTemplateSelect(template.id)}
          >
            {/* Template Preview */}
            <div className="template-preview">
              <div 
                className="template-preview-content"
                style={{
                  background: `linear-gradient(135deg, ${template.colors.primary}20, ${template.colors.accent}20)`,
                  borderColor: template.colors.primary
                }}
              >
                {/* Mini Resume Preview */}
                <div className="mini-resume">
                  <div 
                    className="mini-header"
                    style={{ backgroundColor: template.colors.primary }}
                  />
                  <div className="mini-content">
                    <div className="mini-section">
                      <div 
                        className="mini-line long"
                        style={{ backgroundColor: template.colors.text }}
                      />
                      <div 
                        className="mini-line medium"
                        style={{ backgroundColor: template.colors.secondary }}
                      />
                    </div>
                    <div className="mini-section">
                      <div 
                        className="mini-line short"
                        style={{ backgroundColor: template.colors.accent }}
                      />
                      <div 
                        className="mini-line medium"
                        style={{ backgroundColor: template.colors.text }}
                      />
                      <div 
                        className="mini-line long"
                        style={{ backgroundColor: template.colors.text }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Selection Indicator */}
              {state.selectedTemplate === template.id && (
                <div className="template-selected-indicator">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}
            </div>

            {/* Template Info */}
            <div className="template-info">
              <h3 className="template-name">{template.name}</h3>
              <p className="template-description">{template.description}</p>
              
              {/* Color Palette */}
              <div className="template-colors">
                <div 
                  className="color-dot"
                  style={{ backgroundColor: template.colors.primary }}
                />
                <div 
                  className="color-dot"
                  style={{ backgroundColor: template.colors.secondary }}
                />
                <div 
                  className="color-dot"
                  style={{ backgroundColor: template.colors.accent }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Template Stats */}
      <div className="template-stats">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">{resumeTemplates.length}</span>
            <span className="stat-label">Total Templates</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{filteredTemplates.length}</span>
            <span className="stat-label">{categories.find(c => c.key === selectedCategory)?.label} Templates</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">5</span>
            <span className="stat-label">Categories</span>
          </div>
        </div>
      </div>
    </div>
  );
}