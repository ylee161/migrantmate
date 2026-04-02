import { useState } from 'react';
import { X, MapPin, Users, Calendar, Clock, Plus, Loader2 } from 'lucide-react';

interface CreateActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateActivity: (activity: NewActivity) => void;
  userLocation: { lat: number; lng: number } | null;
}

export interface NewActivity {
  title: string;
  description: string;
  location: string;
  lat: number;
  lng: number;
  participants: number;
  date: string;
  time: string;
  category: string;
}

const CATEGORIES = ['Sports', 'Outdoor', 'Social', 'Arts', 'Learning'];

// Singapore location database for common places
const SINGAPORE_LOCATIONS: Record<string, { lat: number; lng: number }> = {
  // West
  'jurong lake gardens': { lat: 1.3401, lng: 103.7240 },
  'jurong west sports hall': { lat: 1.3505, lng: 103.7050 },
  'jcube shopping mall': { lat: 1.3334, lng: 103.7403 },
  'jurong east stadium': { lat: 1.3338, lng: 103.7421 },
  'chinese garden': { lat: 1.3416, lng: 103.7254 },
  'jurong point': { lat: 1.3397, lng: 103.7066 },
  'westgate': { lat: 1.3337, lng: 103.7430 },
  
  // Central
  'orchard central': { lat: 1.3012, lng: 103.8390 },
  'fort canning park': { lat: 1.2935, lng: 103.8465 },
  'chinatown complex': { lat: 1.2820, lng: 103.8438 },
  'marina bay sands': { lat: 1.2834, lng: 103.8607 },
  'marina bay waterfront': { lat: 1.2800, lng: 103.8540 },
  'clarke quay': { lat: 1.2897, lng: 103.8467 },
  'raffles place': { lat: 1.2844, lng: 103.8511 },
  'bugis': { lat: 1.3000, lng: 103.8556 },
  
  // East
  'east coast park': { lat: 1.3008, lng: 103.9127 },
  'east coast park connector': { lat: 1.3058, lng: 103.9280 },
  'bedok jetty': { lat: 1.3200, lng: 103.9350 },
  'tampines mall': { lat: 1.3525, lng: 103.9447 },
  'changi airport': { lat: 1.3644, lng: 103.9915 },
  
  // North
  'woodlands waterfront park': { lat: 1.4480, lng: 103.7950 },
  'yishun sports hall': { lat: 1.4304, lng: 103.8354 },
  'sembawang shopping centre': { lat: 1.4491, lng: 103.8200 },
  'causeway point': { lat: 1.4362, lng: 103.7860 },
  
  // Northeast
  'punggol waterway park': { lat: 1.4050, lng: 103.9020 },
  'punggol point park': { lat: 1.4170, lng: 103.9080 },
  'sengkang grand mall': { lat: 1.3917, lng: 103.8951 },
  'hougang mall': { lat: 1.3712, lng: 103.8863 },
  
  // Sentosa
  'siloso beach': { lat: 1.2494, lng: 103.8090 },
  'palawan beach': { lat: 1.2503, lng: 103.8183 },
  'sentosa': { lat: 1.2494, lng: 103.8303 },
};

// Function to find coordinates for a location
function getLocationCoordinates(locationName: string, fallbackLocation: { lat: number; lng: number } | null): { lat: number; lng: number } {
  const normalizedLocation = locationName.toLowerCase().trim();
  
  // Check if location exists in our database
  if (SINGAPORE_LOCATIONS[normalizedLocation]) {
    return SINGAPORE_LOCATIONS[normalizedLocation];
  }
  
  // Check for partial matches
  for (const [key, coords] of Object.entries(SINGAPORE_LOCATIONS)) {
    if (normalizedLocation.includes(key) || key.includes(normalizedLocation)) {
      return coords;
    }
  }
  
  // If no match found, use fallback (user's current location or Singapore center)
  return fallbackLocation || { lat: 1.3521, lng: 103.8198 };
}

export function CreateActivityModal({ isOpen, onClose, onCreateActivity, userLocation }: CreateActivityModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<NewActivity>({
    title: '',
    description: '',
    location: '',
    lat: userLocation?.lat || 1.3521,
    lng: userLocation?.lng || 103.8198,
    participants: 1,
    date: '',
    time: '',
    category: 'Social'
  });

  const [errors, setErrors] = useState<Partial<Record<keyof NewActivity, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof NewActivity, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    if (formData.participants < 1) {
      newErrors.participants = 'At least 1 participant required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Get coordinates based on the location input
    const coordinates = getLocationCoordinates(formData.location, userLocation);
    
    // Create activity with the correct coordinates
    const activityToCreate = {
      ...formData,
      lat: coordinates.lat,
      lng: coordinates.lng
    };

    onCreateActivity(activityToCreate);

    // Reset form
    setFormData({
      title: '',
      description: '',
      location: '',
      lat: userLocation?.lat || 1.3521,
      lng: userLocation?.lng || 103.8198,
      participants: 1,
      date: '',
      time: '',
      category: 'Social'
    });
    setErrors({});
    setIsSubmitting(false);
    onClose();
  };

  const handleChange = (field: keyof NewActivity, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-cyan-800 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Create New Activity</h2>
                <p className="text-sm text-white/90 mt-1">Share an activity with the community</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Activity Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g., Weekend Hiking Group"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-700 transition-all ${
                  errors.title ? 'border-red-300 bg-red-50' : 'border-slate-200'
                }`}
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Category *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleChange('category', category)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                      formData.category === category
                        ? 'bg-cyan-800 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe your activity..."
                rows={4}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-700 transition-all resize-none ${
                  errors.description ? 'border-red-300 bg-red-50' : 'border-slate-200'
                }`}
              />
              {errors.description && (
                <p className="text-red-600 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-600" />
                Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="e.g., Jurong Lake Gardens, East Coast Park, Marina Bay"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-700 transition-all ${
                  errors.location ? 'border-red-300 bg-red-50' : 'border-slate-200'
                }`}
              />
              {errors.location && (
                <p className="text-red-600 text-sm mt-1">{errors.location}</p>
              )}
              <p className="text-xs text-slate-500 mt-1">
                Enter a location name in Singapore (e.g., Orchard Central, Sentosa, Punggol Waterway)
              </p>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-600" />
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-700 transition-all ${
                    errors.date ? 'border-red-300 bg-red-50' : 'border-slate-200'
                  }`}
                />
                {errors.date && (
                  <p className="text-red-600 text-sm mt-1">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-600" />
                  Time *
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleChange('time', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-700 transition-all ${
                    errors.time ? 'border-red-300 bg-red-50' : 'border-slate-200'
                  }`}
                />
                {errors.time && (
                  <p className="text-red-600 text-sm mt-1">{errors.time}</p>
                )}
              </div>
            </div>

            {/* Expected Participants */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-600" />
                Expected Participants *
              </label>
              <input
                type="number"
                value={formData.participants}
                onChange={(e) => handleChange('participants', parseInt(e.target.value) || 1)}
                min="1"
                max="100"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-700 transition-all ${
                  errors.participants ? 'border-red-300 bg-red-50' : 'border-slate-200'
                }`}
              />
              {errors.participants && (
                <p className="text-red-600 text-sm mt-1">{errors.participants}</p>
              )}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-white text-slate-700 rounded-xl font-semibold border-2 border-slate-200 hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-cyan-700 text-white rounded-xl font-semibold hover:bg-cyan-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Create Activity
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
