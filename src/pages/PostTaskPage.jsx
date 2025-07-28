import React, { useState } from 'react';
import { ArrowLeft, Upload, X, FileText, MapPin, DollarSign, Tag } from 'lucide-react';
import Header from '../components/Header';
import { Button } from '../components/ui/Button';
import { Input } from '../components/Input';

const PostTaskPage = ({ navigateTo, theme, toggleTheme, isLoggedIn }) => {
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
    requirements: '',
    photos: [],
  });

  const [selectedTags, setSelectedTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);

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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Task title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.location) newErrors.location = 'Location is required';
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
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
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log('Submitting task:', { ...formData, tags: selectedTags });
    navigateTo('home');
  };

  const handlePhotoUpload = async (e) => {
    setUploading(true);
    const files = Array.from(e.target.files).slice(0, 5 - formData.photos.length);
    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate upload
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos]
    }));
    setUploading(false);
  };

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header
        navigateTo={navigateTo}
        currentPage="post-task"
        isLoggedIn={isLoggedIn}
        theme={theme}
        toggleTheme={toggleTheme}
        showNav={false}
      />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pb-24 sm:pb-8 scroll-pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigateTo('home')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Back to home"
            >
              <ArrowLeft size={24} className="text-gray-600 dark:text-gray-300" />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Post a New Task</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Task Details */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText size={20} />
                1. Task Details
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Task Title *</label>
                <Input
                  type="text"
                  name="title"
                  placeholder="e.g., Help me move furniture to my new apartment"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-blue-400 focus:ring focus:ring-emerald-500/10 dark:focus:ring-blue-400/10 min-h-14"
                  aria-invalid={!!errors.title}
                  aria-describedby={errors.title ? 'title-error' : undefined}
                />
                {errors.title && (
                  <p id="title-error" className="text-sm text-red-600 dark:text-red-400 mt-1 animate-pulse">{errors.title}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Detailed Description *</label>
                <textarea
                  name="description"
                  placeholder="Provide a detailed description of what you need help with..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-blue-400 focus:ring focus:ring-emerald-500/10 dark:focus:ring-blue-400/10 min-h-[140px]"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  aria-invalid={!!errors.description}
                  aria-describedby={errors.description ? 'description-error' : undefined}
                />
                {errors.description && (
                  <p id="description-error" className="text-sm text-red-600 dark:text-red-400 mt-1 animate-pulse">{errors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Category *</label>
                  <select
                    name="category"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-blue-400 focus:ring focus:ring-emerald-500/10 dark:focus:ring-blue-400/10 min-h-14"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    aria-invalid={!!errors.category}
                    aria-describedby={errors.category ? 'category-error' : undefined}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p id="category-error" className="text-sm text-red-600 dark:text-red-400 mt-1 animate-pulse">{errors.category}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Estimated Duration</label>
                  <select
                    name="duration"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-blue-400 focus:ring focus:ring-emerald-500/10 dark:focus:ring-blue-400/10 min-h-14"
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
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <MapPin size={20} />
                2. Location & Timing
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Task Location *</label>
                <Input
                  type="text"
                  name="location"
                  placeholder="Enter address or neighborhood"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-blue-400 focus:ring focus:ring-emerald-500/10 dark:focus:ring-blue-400/10 min-h-14"
                  aria-invalid={!!errors.location}
                  aria-describedby={errors.location ? 'location-error' : undefined}
                />
                {errors.location && (
                  <p id="location-error" className="text-sm text-red-600 dark:text-red-400 mt-1 animate-pulse">{errors.location}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Preferred Date</label>
                  <Input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-blue-400 focus:ring focus:ring-emerald-500/10 dark:focus:ring-blue-400/10 min-h-14"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Preferred Time</label>
                  <Input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-blue-400 focus:ring focus:ring-emerald-500/10 dark:focus:ring-blue-400/10 min-h-14"
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Payment */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <DollarSign size={20} />
                3. Pricing & Payment
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Budget Options</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {budgetOptions.map(option => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer transition-colors duration-200 ${
                        formData.budget === option.value
                          ? 'border-emerald-500 bg-emerald-50 dark:border-blue-600 dark:bg-gray-700'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="budget"
                        value={option.value}
                        checked={formData.budget === option.value}
                        onChange={handleInputChange}
                        className="text-emerald-600 focus:ring-emerald-500 dark:focus:ring-blue-400"
                      />
                      <span className="font-medium text-gray-900 dark:text-white">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.budget === 'custom' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Custom Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3.5 text-gray-500 dark:text-gray-400">$</span>
                    <Input
                      type="number"
                      name="customBudget"
                      placeholder="0"
                      value={formData.customBudget}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-blue-400 focus:ring focus:ring-emerald-500/10 dark:focus:ring-blue-400/10 min-h-14 pl-8"
                    />
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="negotiable"
                    checked={formData.negotiable}
                    onChange={handleInputChange}
                    className="text-emerald-600 focus:ring-emerald-500 dark:focus:ring-blue-400 rounded"
                  />
                  <span className="text-gray-900 dark:text-white">Price is negotiable</span>
                </label>
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Tag size={20} />
                4. Additional Details
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Add Tags (select all that apply)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {availableTags.map(tag => (
                    <label
                      key={tag}
                      className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                        selectedTags.includes(tag)
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-300'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => handleTagToggle(tag)}
                        className="text-emerald-600 focus:ring-emerald-500 dark:focus:ring-blue-400 rounded"
                      />
                      <span className="text-sm text-gray-900 dark:text-white">{tag}</span>
                    </label>
                  ))}
                </div>

                {selectedTags.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selected Tags:</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleTagToggle(tag)}
                            className="ml-1 text-current hover:text-red-600 dark:hover:text-red-400 transition-colors"
                            aria-label={`Remove ${tag} tag`}
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Special Requirements (optional)</label>
                <textarea
                  name="requirements"
                  placeholder="Any specific skills, tools, or requirements..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-blue-400 focus:ring focus:ring-emerald-500/10 dark:focus:ring-blue-400/10 min-h-[140px]"
                  value={formData.requirements}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Add Photos (optional, max 5)</label>
                <div
                  className={`border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center transition-colors duration-200 ${
                    uploading ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    handlePhotoUpload({ target: { files: e.dataTransfer.files } });
                  }}
                >
                  <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {uploading ? 'Uploading...' : 'Drag and drop photos here, or click to select'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Accepted formats: PNG, JPG — up to 10MB each
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                    disabled={formData.photos.length >= 5 || uploading}
                  />
                  <label htmlFor="photo-upload">
                    <Button
                      variant="secondary"
                      as="span"
                      className="cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-md px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:bg-gray-100 disabled:text-gray-400 dark:disabled:bg-gray-700 dark:disabled:text-gray-500"
                      disabled={formData.photos.length >= 5 || uploading}
                    >
                      Choose Files
                    </Button>
                  </label>
                </div>

                {formData.photos.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Selected Photos ({formData.photos.length}/5):
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={photo.preview}
                            alt={`Uploaded photo ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-md border border-gray-200 dark:border-gray-600 transition-transform duration-200 group-hover:scale-105"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                            aria-label={`Remove photo ${index + 1}`}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 sm:static sm:bg-transparent sm:dark:bg-transparent sm:border-0 sm:p-0 sm:mt-6 z-30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-4 max-w-5xl">
                <Button
                  variant="secondary"
                  onClick={() => navigateTo('home')}
                  className="flex-1 min-h-14 sm:min-h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-md px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:bg-gray-100 disabled:text-gray-400 dark:disabled:bg-gray-700 dark:disabled:text-gray-500"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 min-h-14 sm:min-h-10 bg-gradient-to-r from-emerald-500 to-blue-500 dark:from-emerald-600 dark:to-blue-600 text-white font-medium rounded-md px-6 py-3 hover:from-emerald-600 hover:to-blue-600 dark:hover:from-emerald-700 dark:hover:to-blue-700 disabled:from-gray-500 disabled:to-gray-500 disabled:cursor-not-allowed"
                  disabled={Object.keys(errors).length > 0 || uploading}
                >
                  Post Task
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>

    </div>
  );
};

export default PostTaskPage;