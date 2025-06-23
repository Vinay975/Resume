import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Award, Plus, Trash2, Star } from 'lucide-react';
import { Skill as SkillType } from '../../types/resume';

const skillLevels: SkillType['level'][] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export default function Skills() {
  const { state, dispatch } = useResume();
  const [isAdding, setIsAdding] = useState(false);

  const addSkill = () => {
    const newSkill: SkillType = {
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate',
      category: '',
    };
    dispatch({ type: 'ADD_SKILL', payload: newSkill });
    setIsAdding(true);
  };

  const updateSkill = (id: string, field: keyof SkillType, value: string | SkillType['level']) => {
    dispatch({
      type: 'UPDATE_SKILL',
      payload: { id, data: { [field]: value } },
    });
  };

  const removeSkill = (id: string) => {
    dispatch({ type: 'REMOVE_SKILL', payload: id });
  };

  const getLevelStars = (level: SkillType['level']) => {
    const stars = {
      'Beginner': 1,
      'Intermediate': 2,
      'Advanced': 3,
      'Expert': 4,
    };
    return stars[level];
  };

  return (
    <div className="form-section">
      <div className="form-header">
        <Award className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
        <p className="text-gray-600">Add your technical and soft skills</p>
      </div>

      <div className="space-y-6">
        {state.skills.map((skill) => (
          <div key={skill.id} className="skill-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Skill Entry</h3>
              <button
                onClick={() => removeSkill(skill.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Skill Name</label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                  className="form-input"
                  placeholder="JavaScript"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  value={skill.category}
                  onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                  className="form-input"
                  placeholder="Programming Languages"
                />
              </div>

              <div className="form-group col-span-full">
                <label className="form-label">Proficiency Level</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {skillLevels.map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => updateSkill(skill.id, 'level', level)}
                      className={`
                        p-3 rounded-lg border-2 transition-all duration-200 text-center
                        ${skill.level === level
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }
                      `}
                    >
                      <div className="flex items-center justify-center mb-1">
                        {[...Array(4)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < getLevelStars(level)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{level}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addSkill}
          className="add-button"
        >
          <Plus className="w-5 h-5" />
          Add Skill
        </button>
      </div>
    </div>
  );
}