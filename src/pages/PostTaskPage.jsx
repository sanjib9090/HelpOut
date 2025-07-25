import React, { useState } from 'react';
import { ArrowLeft, Upload, X } from 'lucide-react';
import Header from '../components/Header';

const PostTaskPage = ({ navigateTo }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    duration: '',
    location: '',
    date: '',
    time: '',
    budget: 'custom',
    customBudget: '',
    negotiable: false,
    tags: [],
    requirements: '',
    photos: []
  });

  const [selectedTags, setSelectedTags] = useState([]);

  const availableTags = [
    'Physical Work', 'Tech Skills', 'Vehicle Required', 'Tools Needed',
    'Indoor', 'Outdoor', 'Urgent', 'Flexible', 'Weekend', 'Weekday'
  ];

  const categories = [
    'Cleaning', 'Delivery', 'Tech Support', 'Moving', 'Pet Care',
    'Handyman', 'Tutoring', 'Shopping', 'Yard Work', 'Other'
  ];

  const durations = [
    '30 minutes', '1 hour', '2 hours', 'Half-day', 'Full-day', 'Multiple days'
  ];

  const budgetOptions = [
    { value: '15', label: '$15 Quick Task' },
    { value: '35', label: '$35 Most Popular' },
    { value: '75', label: '$75 Premium' },
    { value: 'custom', label: 'Custom Amount' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, submit to backend
    console.log('Submitting task:', { ...formData, tags: selectedTags });
    navigateTo('home');
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    // In real app, handle file upload
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files.slice(0, 5 - prev.photos.length)]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showNav={false} navigateTo={navigateTo} currentPage="post-task" />
      
      <main className="container py-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigateTo('home')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Post a New Task</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Task Details */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">1. Task Details</h2>
              
              <div className="mb-5">
                <label className="form-label">Task Title *</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Help me move furniture to my new apartment"
                  className="form-input"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-5">
                <label className="form-label">Detailed Description *</label>
                <textarea
                  name="description"
                  placeholder="Provide a detailed description of what you need help with..."
                  className="form-textarea"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="mb-5">
                  <label className="form-label">Category *</label>
                  <select
                    name="category"
                    className="form-input"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-5">
                  <label className="form-label">Estimated Duration</label>
                  <select
                    name="duration"
                    className="form-input"
                    value={formData.duration}
                    onChange={handleInputChange}
                  >
                    <option value="">Select duration</option>
                    {durations.map(duration => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Location & Timing */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">2. Location & Timing</h2>
              
              <div className="mb-5">
                <label className="form-label">Task Location *</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter address or neighborhood"
                  className="form-input"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="mb-5">
                  <label className="form-label">Preferred Date</label>
                  <input
                    type="date"
                    name="date"
                    className="form-input"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-5">
                  <label className="form-label">Preferred Time</label>
                  <input
                    type="time"
                    name="time"
                    className="form-input"
                    value={formData.time}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Payment */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">3. Pricing & Payment</h2>
              
              <div className="mb-5">
                <label className="form-label">Budget Options</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {budgetOptions.map(option => (
                    <label key={option.value} className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="budget"
                        value={option.value}
                        checked={formData.budget === option.value}
                        onChange={handleInputChange}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span className="font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.budget === 'custom' && (
                <div className="mb-5">
                  <label className="form-label">Custom Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">$</span>
                    <input
                      type="number"
                      name="customBudget"
                      placeholder="0"
                      className="form-input pl-8"
                      value={formData.customBudget}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

              <div className="mb-5">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="negotiable"
                    checked={formData.negotiable}
                    onChange={handleInputChange}
                    className="text-primary-600 focus:ring-primary-500 rounded"
                  />
                  <span>Yes, the price is negotiable</span>
                </label>
              </div>
            </div>

            {/* Additional Details */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">4. Additional Details</h2>
              
              <div className="mb-5">
                <label className="form-label">Add Tags (select all that apply)</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableTags.map(tag => (
                    <label key={tag} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => handleTagToggle(tag)}
                        className="text-primary-600 focus:ring-primary-500 rounded"
                      />
                      <span className="text-sm">{tag}</span>
                    </label>
                  ))}
                </div>

                {selectedTags.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Selected Tags:</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map(tag => (
                        <span key={tag} className="tag flex items-center gap-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleTagToggle(tag)}
                            className="text-current hover:text-red-600 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-5">
                <label className="form-label">Special Requirements (optional)</label>
                <textarea
                  name="requirements"
                  placeholder="Any specific skills, tools, or requirements..."
                  className="form-textarea"
                  value={formData.requirements}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-5">
                <label className="form-label">Add Photos (optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-2">
                    Drag and drop photos here, or click to select
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Accepted formats: PNG, JPG — up to 10MB each
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="btn btn-secondary cursor-pointer">
                    Choose Files
                  </label>
                </div>

                {formData.photos.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Selected Photos ({formData.photos.length}/5):
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="relative">
                          <div className="w-16 h-16 bg-gray-100 rounded border flex items-center justify-center">
                            <span className="text-xs text-gray-500 text-center px-1">{photo.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                photos: prev.photos.filter((_, i) => i !== index)
                              }));
                            }}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                onClick={() => navigateTo('home')}
                className="btn btn-secondary flex-1"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary flex-1">
                Post Task
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PostTaskPage;