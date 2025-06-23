import React from 'react';
import { useResume } from '../context/ResumeContext';
import { getTemplateById } from '../data/templates';
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar, ExternalLink, Star } from 'lucide-react';

export default function ResumePreview() {
  const { state } = useResume();
  const { personalInfo, education, experience, projects, skills, selectedTemplate } = state;
  
  const template = getTemplateById(selectedTemplate);
  const colors = template?.colors || {
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#3b82f6',
    text: '#1f2937',
    background: '#ffffff'
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getLevelStars = (level: string) => {
    const stars = {
      'Beginner': 1,
      'Intermediate': 2,
      'Advanced': 3,
      'Expert': 4,
    };
    return stars[level as keyof typeof stars] || 2;
  };

  const templateStyles = {
    '--primary-color': colors.primary,
    '--secondary-color': colors.secondary,
    '--accent-color': colors.accent,
    '--text-color': colors.text,
    '--background-color': colors.background,
  } as React.CSSProperties;

  return (
    <div 
      id="resume-preview" 
      className={`resume-preview template-${selectedTemplate}`}
      style={templateStyles}
    >
      {/* Header */}
      <div className="resume-header" style={{ borderColor: colors.primary }}>
        <div className="resume-name">
          <h1 style={{ color: colors.text }}>{personalInfo.firstName} {personalInfo.lastName}</h1>
        </div>
        
        <div className="resume-contact">
          {personalInfo.email && (
            <div className="contact-item" style={{ color: colors.text }}>
              <Mail className="w-4 h-4" style={{ color: colors.primary }} />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="contact-item" style={{ color: colors.text }}>
              <Phone className="w-4 h-4" style={{ color: colors.primary }} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="contact-item" style={{ color: colors.text }}>
              <MapPin className="w-4 h-4" style={{ color: colors.primary }} />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="contact-item" style={{ color: colors.text }}>
              <Globe className="w-4 h-4" style={{ color: colors.primary }} />
              <span>{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedIn && (
            <div className="contact-item" style={{ color: colors.text }}>
              <Linkedin className="w-4 h-4" style={{ color: colors.primary }} />
              <span>{personalInfo.linkedIn}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="resume-section">
          <h2 className="resume-section-title" style={{ color: colors.primary, borderColor: colors.accent }}>
            Professional Summary
          </h2>
          <p className="resume-summary" style={{ color: colors.text }}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="resume-section">
          <h2 className="resume-section-title" style={{ color: colors.primary, borderColor: colors.accent }}>
            Work Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="resume-entry">
                <div className="resume-entry-header">
                  <div>
                    <h3 className="resume-entry-title" style={{ color: colors.text }}>{exp.position}</h3>
                    <h4 className="resume-entry-company" style={{ color: colors.secondary }}>{exp.company}</h4>
                  </div>
                  <div className="resume-entry-meta">
                    <div className="resume-date" style={{ color: colors.accent }}>
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <div className="resume-location" style={{ color: colors.accent }}>
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
                {exp.description && (
                  <div className="resume-description" style={{ color: colors.text }}>
                    {exp.description.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="resume-section">
          <h2 className="resume-section-title" style={{ color: colors.primary, borderColor: colors.accent }}>
            Projects
          </h2>
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id} className="resume-entry">
                <div className="resume-entry-header">
                  <div>
                    <h3 className="resume-entry-title" style={{ color: colors.text }}>
                      {project.name}
                      {project.link && (
                        <a href={project.link} className="resume-link" style={{ color: colors.primary }}>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </h3>
                  </div>
                  <div className="resume-entry-meta">
                    <div className="resume-date" style={{ color: colors.accent }}>
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatDate(project.startDate)} - {formatDate(project.endDate)}
                      </span>
                    </div>
                  </div>
                </div>
                {project.technologies.length > 0 && (
                  <div className="resume-technologies">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="resume-tech-tag"
                        style={{ 
                          backgroundColor: `${colors.primary}20`, 
                          color: colors.primary,
                          borderColor: colors.primary
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.description && (
                  <div className="resume-description" style={{ color: colors.text }}>
                    <p>{project.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="resume-section">
          <h2 className="resume-section-title" style={{ color: colors.primary, borderColor: colors.accent }}>
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="resume-entry">
                <div className="resume-entry-header">
                  <div>
                    <h3 className="resume-entry-title" style={{ color: colors.text }}>
                      {edu.degree} in {edu.field}
                    </h3>
                    <h4 className="resume-entry-company" style={{ color: colors.secondary }}>{edu.institution}</h4>
                  </div>
                  <div className="resume-entry-meta">
                    <div className="resume-date" style={{ color: colors.accent }}>
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                    </div>
                    {edu.gpa && (
                      <div className="resume-gpa" style={{ color: colors.primary }}>
                        GPA: {edu.gpa}
                      </div>
                    )}
                  </div>
                </div>
                {edu.description && (
                  <div className="resume-description" style={{ color: colors.text }}>
                    <p>{edu.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="resume-section">
          <h2 className="resume-section-title" style={{ color: colors.primary, borderColor: colors.accent }}>
            Skills
          </h2>
          <div className="resume-skills">
            {Object.entries(
              skills.reduce((acc: { [key: string]: typeof skills }, skill) => {
                const category = skill.category || 'Other';
                if (!acc[category]) acc[category] = [];
                acc[category].push(skill);
                return acc;
              }, {})
            ).map(([category, categorySkills]) => (
              <div key={category} className="resume-skill-category">
                <h3 className="resume-skill-category-title" style={{ color: colors.secondary }}>
                  {category}
                </h3>
                <div className="resume-skill-list">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="resume-skill-item">
                      <span className="resume-skill-name" style={{ color: colors.text }}>
                        {skill.name}
                      </span>
                      <div className="resume-skill-level">
                        {[...Array(4)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3`}
                            style={{
                              color: i < getLevelStars(skill.level) ? colors.primary : '#d1d5db'
                            }}
                            fill={i < getLevelStars(skill.level) ? colors.primary : 'none'}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}