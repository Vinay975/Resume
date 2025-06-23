import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Briefcase, Plus, Trash2, Calendar, MapPin } from 'lucide-react';
import { Experience as ExperienceType } from '../../types/resume';

export default function Experience() {
  const { state, dispatch } = useResume();
  const [isAdding, setIsAdding] = useState(false);

  const addExperience = () => {
    const newExperience: ExperienceType = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    dispatch({ type: 'ADD_EXPERIENCE', payload: newExperience });
    setIsAdding(true);
  };

  const updateExperience = (id: string, field: keyof ExperienceType, value: string | boolean) => {
    dispatch({
      type: 'UPDATE_EXPERIENCE',
      payload: { id, data: { [field]: value } },
    });
  };

  const removeExperience = (id: string) => {
    dispatch({ type: 'REMOVE_EXPERIENCE', payload: id });
  };

  return (
    <div className="form-section">
      <div className="form-header">
        <Briefcase className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-800">Work Experience</h2>
        <p className="text-gray-600">Add your professional experience</p>
      </div>

      <div className="space-y-6">
        {state.experience.map((exp) => (
          <div key={exp.id} className="experience-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Experience Entry</h3>
              <button
                onClick={() => removeExperience(exp.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  className="form-input"
                  placeholder="Tech Corp Inc."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Position</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  className="form-input"
                  placeholder="Software Engineer"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                  className="form-input"
                  placeholder="San Francisco, CA"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Calendar className="w-4 h-4" />
                  Start Date
                </label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
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
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  className="form-input"
                  disabled={exp.current}
                />
              </div>

              <div className="form-group">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => {
                      updateExperience(exp.id, 'current', e.target.checked);
                      if (e.target.checked) {
                        updateExperience(exp.id, 'endDate', '');
                      }
                    }}
                    className="form-checkbox"
                  />
                  <span className="text-sm font-medium text-gray-700">Current Position</span>
                </label>
              </div>

              <div className="form-group col-span-full">
                <label className="form-label">Job Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  className="form-textarea"
                  rows={4}
                  placeholder="• Developed and maintained web applications using React and Node.js&#10;• Collaborated with cross-functional teams to deliver high-quality software&#10;• Implemented automated testing reducing bugs by 40%"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addExperience}
          className="add-button"
        >
          <Plus className="w-5 h-5" />
          Add Experience
        </button>
      </div>
    </div>
  );
}