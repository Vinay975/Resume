import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { GraduationCap, Plus, Trash2, Calendar } from 'lucide-react';
import { Education as EducationType } from '../../types/resume';

export default function Education() {
  const { state, dispatch } = useResume();
  const [isAdding, setIsAdding] = useState(false);

  const addEducation = () => {
    const newEducation: EducationType = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
    };
    dispatch({ type: 'ADD_EDUCATION', payload: newEducation });
    setIsAdding(true);
  };

  const updateEducation = (id: string, field: keyof EducationType, value: string) => {
    dispatch({
      type: 'UPDATE_EDUCATION',
      payload: { id, data: { [field]: value } },
    });
  };

  const removeEducation = (id: string) => {
    dispatch({ type: 'REMOVE_EDUCATION', payload: id });
  };

  return (
    <div className="form-section">
      <div className="form-header">
        <GraduationCap className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-800">Education</h2>
        <p className="text-gray-600">Add your educational background</p>
      </div>

      <div className="space-y-6">
        {state.education.map((edu) => (
          <div key={edu.id} className="education-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Education Entry</h3>
              <button
                onClick={() => removeEducation(edu.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Institution</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  className="form-input"
                  placeholder="University of Example"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  className="form-input"
                  placeholder="Bachelor of Science"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Field of Study</label>
                <input
                  type="text"
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                  className="form-input"
                  placeholder="Computer Science"
                />
              </div>

              <div className="form-group">
                <label className="form-label">GPA (Optional)</label>
                <input
                  type="text"
                  value={edu.gpa || ''}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                  className="form-input"
                  placeholder="3.8/4.0"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Calendar className="w-4 h-4" />
                  Start Date
                </label>
                <input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
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
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group col-span-full">
                <label className="form-label">Description (Optional)</label>
                <textarea
                  value={edu.description || ''}
                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                  className="form-textarea"
                  rows={3}
                  placeholder="Relevant coursework, achievements, honors..."
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addEducation}
          className="add-button"
        >
          <Plus className="w-5 h-5" />
          Add Education
        </button>
      </div>
    </div>
  );
}