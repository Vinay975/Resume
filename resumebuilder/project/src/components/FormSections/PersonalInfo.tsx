import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { User, Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

export default function PersonalInfo() {
  const { state, dispatch } = useResume();
  const { personalInfo } = state;

  const handleChange = (field: string, value: string) => {
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { [field]: value },
    });
  };

  return (
    <div className="form-section">
      <div className="form-header">
        <User className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
        <p className="text-gray-600">Tell us about yourself</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">
            <User className="w-4 h-4" />
            First Name
          </label>
          <input
            type="text"
            value={personalInfo.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="form-input"
            placeholder="John"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <User className="w-4 h-4" />
            Last Name
          </label>
          <input
            type="text"
            value={personalInfo.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="form-input"
            placeholder="Doe"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <Mail className="w-4 h-4" />
            Email
          </label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="form-input"
            placeholder="john.doe@email.com"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <Phone className="w-4 h-4" />
            Phone
          </label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="form-input"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <MapPin className="w-4 h-4" />
            Location
          </label>
          <input
            type="text"
            value={personalInfo.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="form-input"
            placeholder="New York, NY"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <Linkedin className="w-4 h-4" />
            LinkedIn (Optional)
          </label>
          <input
            type="url"
            value={personalInfo.linkedIn || ''}
            onChange={(e) => handleChange('linkedIn', e.target.value)}
            className="form-input"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>

        <div className="form-group col-span-full">
          <label className="form-label">
            <Globe className="w-4 h-4" />
            Website (Optional)
          </label>
          <input
            type="url"
            value={personalInfo.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            className="form-input"
            placeholder="https://johndoe.com"
          />
        </div>

        <div className="form-group col-span-full">
          <label className="form-label">
            Professional Summary
          </label>
          <textarea
            value={personalInfo.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
            className="form-textarea"
            rows={4}
            placeholder="Write a brief summary of your professional background and career goals..."
          />
        </div>
      </div>
    </div>
  );
}