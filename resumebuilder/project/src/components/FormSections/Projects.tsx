import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Code, Plus, Trash2, Calendar, ExternalLink, Tag } from 'lucide-react';
import { Project as ProjectType } from '../../types/resume';

export default function Projects() {
  const { state, dispatch } = useResume();
  const [isAdding, setIsAdding] = useState(false);

  const addProject = () => {
    const newProject: ProjectType = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: '',
      startDate: '',
      endDate: '',
    };
    dispatch({ type: 'ADD_PROJECT', payload: newProject });
    setIsAdding(true);
  };

  const updateProject = (id: string, field: keyof ProjectType, value: string | string[]) => {
    dispatch({
      type: 'UPDATE_PROJECT',
      payload: { id, data: { [field]: value } },
    });
  };

  const removeProject = (id: string) => {
    dispatch({ type: 'REMOVE_PROJECT', payload: id });
  };

  const handleTechnologiesChange = (id: string, value: string) => {
    const technologies = value.split(',').map(tech => tech.trim()).filter(tech => tech);
    updateProject(id, 'technologies', technologies);
  };

  return (
    <div className="form-section">
      <div className="form-header">
        <Code className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
        <p className="text-gray-600">Showcase your notable projects</p>
      </div>

      <div className="space-y-6">
        {state.projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Project Entry</h3>
              <button
                onClick={() => removeProject(project.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Project Name</label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                  className="form-input"
                  placeholder="E-commerce Platform"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <ExternalLink className="w-4 h-4" />
                  Project Link (Optional)
                </label>
                <input
                  type="url"
                  value={project.link || ''}
                  onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                  className="form-input"
                  placeholder="https://github.com/username/project"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Calendar className="w-4 h-4" />
                  Start Date
                </label>
                <input
                  type="month"
                  value={project.startDate}
                  onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Calendar className="w-4 h-4" />
                  End Date
                </label>
                <input
                  type="month"
                  value={project.endDate}
                  onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group col-span-full">
                <label className="form-label">
                  <Tag className="w-4 h-4" />
                  Technologies Used
                </label>
                <input
                  type="text"
                  value={project.technologies.join(', ')}
                  onChange={(e) => handleTechnologiesChange(project.id, e.target.value)}
                  className="form-input"
                  placeholder="React, Node.js, MongoDB, TypeScript (separate with commas)"
                />
                <p className="text-xs text-gray-500 mt-1">Separate technologies with commas</p>
              </div>

              <div className="form-group col-span-full">
                <label className="form-label">Project Description</label>
                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  className="form-textarea"
                  rows={4}
                  placeholder="Describe your project, its purpose, key features, and your role in its development..."
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addProject}
          className="add-button"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>
    </div>
  );
}