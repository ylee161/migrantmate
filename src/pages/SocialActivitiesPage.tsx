import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import { ArrowLeft, MapPin, Users, Calendar, Clock, Navigation, Loader2, Filter, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LanguageCode, translations } from '../translations';
import { CreateActivityModal, NewActivity } from '../components/CreateActivityModal';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom user location icon (blue dot)
const UserLocationIcon = L.divIcon({
  className: 'custom-user-location',
  html: `
    <div style="
      width: 20px;
      height: 20px;
      background: #3b82f6;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
    "></div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

interface SocialActivitiesPageProps {
  currentLang: LanguageCode;
}

interface Activity {
  id: number;
  title: string;
  description: string;
  location: string;
  lat: number;
  lng: number;
  participants: number;
  date: string;
  time: string;
  category: string;
  distance?: number;
}

interface UserLocation {
  lat: number;
  lng: number;
}

// Activity categories
const CATEGORIES = ['All', 'Sports', 'Outdoor', 'Social', 'Arts', 'Learning'];

// Category colors for visual distinction
const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Sports: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  Outdoor: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  Social: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  Arts: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  Learning: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
};

// Mock activities data spread across Singapore
const mockActivities: Activity[] = [
  // West Region (Jurong area)
  {
    id: 1,
    title: 'Weekend Hiking Group',
    description: 'Join us for a morning hike at Jurong Lake Gardens',
    location: 'Jurong Lake Gardens',
    lat: 1.3401,
    lng: 103.7240,
    participants: 8,
    date: '2024-01-20',
    time: '07:00 AM',
    category: 'Outdoor'
  },
  {
    id: 2,
    title: 'Badminton Meetup',
    description: 'Casual badminton games, all skill levels welcome',
    location: 'Jurong West Sports Hall',
    lat: 1.3505,
    lng: 103.7050,
    participants: 12,
    date: '2024-01-21',
    time: '06:00 PM',
    category: 'Sports'
  },
  {
    id: 3,
    title: 'Language Exchange Cafe',
    description: 'Practice English, Chinese, Malay and more!',
    location: 'JCube Shopping Mall',
    lat: 1.3334,
    lng: 103.7403,
    participants: 15,
    date: '2024-01-22',
    time: '02:00 PM',
    category: 'Social'
  },
  {
    id: 4,
    title: 'Sunday Football Match',
    description: 'Friendly football game at Jurong East Stadium',
    location: 'Jurong East Stadium',
    lat: 1.3338,
    lng: 103.7421,
    participants: 20,
    date: '2024-01-23',
    time: '05:00 PM',
    category: 'Sports'
  },
  {
    id: 5,
    title: 'Photography Walk',
    description: 'Explore and capture Jurong\'s nature and architecture',
    location: 'Chinese Garden',
    lat: 1.3416,
    lng: 103.7254,
    participants: 6,
    date: '2024-01-24',
    time: '10:00 AM',
    category: 'Arts'
  },
  
  // Central Region
  {
    id: 6,
    title: 'Board Games Night',
    description: 'Fun board games and card games evening',
    location: 'Orchard Central',
    lat: 1.3012,
    lng: 103.8390,
    participants: 10,
    date: '2024-01-25',
    time: '07:30 PM',
    category: 'Social'
  },
  {
    id: 7,
    title: 'Yoga in the Park',
    description: 'Relaxing outdoor yoga session for all levels',
    location: 'Fort Canning Park',
    lat: 1.2935,
    lng: 103.8465,
    participants: 12,
    date: '2024-01-26',
    time: '08:00 AM',
    category: 'Outdoor'
  },
  {
    id: 8,
    title: 'Cooking Class',
    description: 'Learn to cook traditional Asian dishes',
    location: 'Chinatown Complex',
    lat: 1.2820,
    lng: 103.8438,
    participants: 8,
    date: '2024-01-27',
    time: '11:00 AM',
    category: 'Learning'
  },
  
  // East Region
  {
    id: 9,
    title: 'Beach Volleyball',
    description: 'Fun beach volleyball games at East Coast',
    location: 'East Coast Park',
    lat: 1.3008,
    lng: 103.9127,
    participants: 16,
    date: '2024-01-28',
    time: '05:00 PM',
    category: 'Sports'
  },
  {
    id: 10,
    title: 'Cycling Group Ride',
    description: 'Leisurely cycling along East Coast Park',
    location: 'East Coast Park Connector',
    lat: 1.3058,
    lng: 103.9280,
    participants: 14,
    date: '2024-01-29',
    time: '06:30 AM',
    category: 'Outdoor'
  },
  {
    id: 11,
    title: 'Fishing Buddies',
    description: 'Relaxing fishing session at Bedok Jetty',
    location: 'Bedok Jetty',
    lat: 1.3200,
    lng: 103.9350,
    participants: 7,
    date: '2024-01-30',
    time: '06:00 AM',
    category: 'Outdoor'
  },
  
  // North Region
  {
    id: 12,
    title: 'Nature Walk',
    description: 'Explore the beauty of Woodlands Waterfront',
    location: 'Woodlands Waterfront Park',
    lat: 1.4480,
    lng: 103.7950,
    participants: 9,
    date: '2024-01-31',
    time: '09:00 AM',
    category: 'Outdoor'
  },
  {
    id: 13,
    title: 'Basketball Pickup Game',
    description: 'Casual basketball games, all welcome',
    location: 'Yishun Sports Hall',
    lat: 1.4304,
    lng: 103.8354,
    participants: 18,
    date: '2024-02-01',
    time: '07:00 PM',
    category: 'Sports'
  },
  {
    id: 14,
    title: 'Art Jamming Session',
    description: 'Creative painting session for all skill levels',
    location: 'Sembawang Shopping Centre',
    lat: 1.4491,
    lng: 103.8200,
    participants: 10,
    date: '2024-02-02',
    time: '02:00 PM',
    category: 'Arts'
  },
  
  // Northeast Region
  {
    id: 15,
    title: 'Running Club',
    description: 'Morning run around Punggol Waterway',
    location: 'Punggol Waterway Park',
    lat: 1.4050,
    lng: 103.9020,
    participants: 15,
    date: '2024-02-03',
    time: '06:00 AM',
    category: 'Sports'
  },
  {
    id: 16,
    title: 'Kayaking Adventure',
    description: 'Kayaking session at Punggol Waterway',
    location: 'Punggol Point Park',
    lat: 1.4170,
    lng: 103.9080,
    participants: 12,
    date: '2024-02-04',
    time: '10:00 AM',
    category: 'Outdoor'
  },
  {
    id: 17,
    title: 'Movie Night',
    description: 'Watch latest movies together and discuss',
    location: 'Sengkang Grand Mall',
    lat: 1.3917,
    lng: 103.8951,
    participants: 14,
    date: '2024-02-05',
    time: '07:00 PM',
    category: 'Social'
  },
  
  // Marina Bay Area
  {
    id: 18,
    title: 'Photography Meetup',
    description: 'Capture stunning Marina Bay skyline',
    location: 'Marina Bay Sands',
    lat: 1.2834,
    lng: 103.8607,
    participants: 11,
    date: '2024-02-06',
    time: '06:30 PM',
    category: 'Arts'
  },
  {
    id: 19,
    title: 'Jogging Group',
    description: 'Evening jog around Marina Bay',
    location: 'Marina Bay Waterfront',
    lat: 1.2800,
    lng: 103.8540,
    participants: 13,
    date: '2024-02-07',
    time: '07:00 PM',
    category: 'Sports'
  },
  
  // Sentosa
  {
    id: 20,
    title: 'Beach Cleanup',
    description: 'Help keep our beaches clean!',
    location: 'Siloso Beach',
    lat: 1.2494,
    lng: 103.8090,
    participants: 20,
    date: '2024-02-08',
    time: '09:00 AM',
    category: 'Outdoor'
  }
];

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

function MapController({ userLocation }: { userLocation: UserLocation | null }) {
  const map = useMap();
  
  useEffect(() => {
    if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 12);
    } else {
      // Default to Singapore center
      map.setView([1.3521, 103.8198], 11);
    }
  }, [map, userLocation]);

  return null;
}

export function SocialActivitiesPage({ currentLang }: SocialActivitiesPageProps) {
  const t = translations[currentLang].content;
  const navigate = useNavigate();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [sortedActivities, setSortedActivities] = useState<Activity[]>(mockActivities);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [nextActivityId, setNextActivityId] = useState(21);

  const updateActivitiesWithLocation = (location: UserLocation, activities: Activity[]) => {
    // Calculate distances and sort activities
    const activitiesWithDistance = activities.map(activity => ({
      ...activity,
      distance: calculateDistance(
        location.lat,
        location.lng,
        activity.lat,
        activity.lng
      )
    }));
    
    // Sort by distance (closest first)
    const sorted = activitiesWithDistance.sort((a, b) => 
      (a.distance || 0) - (b.distance || 0)
    );
    
    setSortedActivities(sorted);
  };

  useEffect(() => {
    // Get user's current location on initial load
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          setLocationLoading(false);
          updateActivitiesWithLocation(location, sortedActivities);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Unable to get your location');
          setLocationLoading(false);
          setSortedActivities(mockActivities);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setLocationError('Geolocation not supported');
      setLocationLoading(false);
      setSortedActivities(mockActivities);
    }
  }, []);

  const handleRecenterLocation = () => {
    setLocationLoading(true);
    setLocationError(null);
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          setLocationLoading(false);
          
          // Update activities with new location
          updateActivitiesWithLocation(location, sortedActivities);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Unable to get your location');
          setLocationLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    }
  };

  const handleJoinActivity = (activityId: number) => {
    navigate(`/group-chat/${activityId}`);
  };

  const handleCreateActivity = (newActivityData: NewActivity) => {
    const newActivity: Activity = {
      id: nextActivityId,
      ...newActivityData,
      distance: userLocation 
        ? calculateDistance(userLocation.lat, userLocation.lng, newActivityData.lat, newActivityData.lng)
        : undefined
    };

    setNextActivityId(prev => prev + 1);
    
    // Add new activity to the list
    const updatedActivities = [...sortedActivities, newActivity];
    
    // Re-sort if user location is available
    if (userLocation) {
      updateActivitiesWithLocation(userLocation, updatedActivities);
    } else {
      setSortedActivities(updatedActivities);
    }

    // Show success feedback
    setSelectedActivity(newActivity);
  };

  // Filter activities by selected category
  const filteredActivities = selectedCategory === 'All' 
    ? sortedActivities 
    : sortedActivities.filter(activity => activity.category === selectedCategory);

  // Get category counts
  const getCategoryCount = (category: string) => {
    if (category === 'All') return sortedActivities.length;
    return sortedActivities.filter(activity => activity.category === category).length;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md shadow-md z-[1000] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/activities')}
              className="group flex items-center gap-2 px-4 py-2 bg-transparent text-cyan-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-semibold text-sm"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              {t.backButton}
            </button>
            
            <div className="text-center flex-1 mx-4">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
                <Users className="w-6 h-6 text-cyan-800" />
                {t.activities.socialActivities.title}
              </h1>
              <p className="text-sm text-slate-600 mt-1">{t.activities.socialActivities.description}</p>
            </div>
            
            <button
              onClick={handleRecenterLocation}
              disabled={locationLoading}
              className="group flex items-center gap-2 px-4 py-2 bg-transparent text-cyan-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh location and find nearby activities"
            >
              {locationLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Navigation className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              )}
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-4 h-4 text-slate-600 flex-shrink-0" />
            {CATEGORIES.map((category) => {
              const count = getCategoryCount(category);
              const isSelected = selectedCategory === category;
              const colors = CATEGORY_COLORS[category] || { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' };
              
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                    isSelected
                      ? `${colors.bg} ${colors.text} border-2 ${colors.border} shadow-md scale-105`
                      : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  {category}
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    isSelected ? 'bg-white/80' : 'bg-slate-100'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Location Status Banner */}
      {locationError && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2 z-[1000] relative">
          <p className="text-sm text-yellow-800 text-center">
            ⚠️ {locationError} - Showing all activities
          </p>
        </div>
      )}

      {locationLoading && !locationError && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-2 z-[1000] relative">
          <p className="text-sm text-blue-800 text-center flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Updating your location and finding nearby activities...
          </p>
        </div>
      )}

      {/* Map Container */}
      <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] relative">
        <MapContainer
          center={[1.3521, 103.8198]}
          zoom={11}
          className="h-full w-full"
          zoomControl={true}
          scrollWheelZoom={true}
        >
          <MapController userLocation={userLocation} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* User Location Marker */}
          {userLocation && (
            <>
              <Marker
                position={[userLocation.lat, userLocation.lng]}
                icon={UserLocationIcon}
              >
                <Popup>
                  <div className="p-2">
                    <p className="font-bold text-blue-600">📍 You are here</p>
                    <p className="text-xs text-slate-600 mt-1">
                      {userLocation.lat.toFixed(4)}°N, {userLocation.lng.toFixed(4)}°E
                    </p>
                  </div>
                </Popup>
              </Marker>
              
              {/* Radius circle around user */}
              <Circle
                center={[userLocation.lat, userLocation.lng]}
                radius={5000}
                pathOptions={{
                  color: '#3b82f6',
                  fillColor: '#3b82f6',
                  fillOpacity: 0.1,
                  weight: 2,
                  dashArray: '5, 5'
                }}
              />
            </>
          )}
          
          {/* Activity Markers - Only show filtered activities */}
          {filteredActivities.map((activity) => (
            <Marker
              key={activity.id}
              position={[activity.lat, activity.lng]}
              eventHandlers={{
                click: () => setSelectedActivity(activity),
              }}
            >
              <Popup>
                <div className="p-2 min-w-[250px]">
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{activity.title}</h3>
                  <p className="text-sm text-slate-600 mb-3">{activity.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <MapPin className="w-4 h-4 text-cyan-800" />
                      <span>{activity.location}</span>
                    </div>
                    
                    {activity.distance !== undefined && (
                      <div className="flex items-center gap-2 text-sm text-blue-700 font-semibold">
                        <Navigation className="w-4 h-4" />
                        <span>{activity.distance.toFixed(1)} km away</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Calendar className="w-4 h-4 text-cyan-800" />
                      <span>{activity.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Clock className="w-4 h-4 text-cyan-800" />
                      <span>{activity.time}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Users className="w-4 h-4 text-cyan-800" />
                      <span>{activity.participants} participants</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleJoinActivity(activity.id)}
                    className="mt-3 w-full px-4 py-2 bg-cyan-800 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    Join Activity
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Map Instructions - Floating overlay */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-xl shadow-lg p-3 z-[999] max-w-xs">
          <div className="space-y-2">
            <p className="text-xs text-slate-600 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-800" />
              Click on markers to see activity details
            </p>
            {userLocation && (
              <p className="text-xs text-slate-600 flex items-center gap-2">
                <Navigation className="w-4 h-4" />
                Blue dot shows your location
              </p>
            )}
            <p className="text-xs text-slate-600 flex items-center gap-2">
              <Filter className="w-4 h-4 text-cyan-800" />
              Use category filters to find activities
            </p>
          </div>
        </div>
      </div>

      {/* Activities List Section - Below Map */}
      <div className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Section Header with Create Button */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-cyan-800" />
                  {selectedCategory === 'All' 
                    ? (userLocation ? 'Nearby Activities' : 'All Activities')
                    : `${selectedCategory} Activities`
                  }
                </h2>
                <span className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full font-semibold">
                  {filteredActivities.length} {filteredActivities.length === 1 ? 'activity' : 'activities'}
                </span>
              </div>
              
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-cyan-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <Plus className="w-5 h-5" />
                Create Activity
              </button>
            </div>
            <p className="text-sm text-slate-600">
              {userLocation && 'Sorted by distance from your location'}
              {!userLocation && `Browse ${selectedCategory.toLowerCase()} activities in Singapore`}
            </p>
          </div>

          {/* Activities Grid */}
          {filteredActivities.length === 0 ? (
            <div className="text-center py-16">
              <Filter className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No activities found</h3>
              <p className="text-slate-500">Try selecting a different category or check back later</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredActivities.map((activity) => {
                const colors = CATEGORY_COLORS[activity.category] || { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' };
                
                return (
                  <div
                    key={activity.id}
                    onClick={() => setSelectedActivity(activity)}
                    className={`group p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
                      selectedActivity?.id === activity.id
                        ? 'border-slate-200 bg-white hover:border-cyan-600'
                        : 'border-slate-200 bg-white hover:border-cyan-600'
                    }`}
                  >
                    {/* Activity Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-slate-900 mb-1 group-hover:text-cyan-800 transition-colors">
                          {activity.title}
                        </h3>
                        <span className={`inline-block px-3 py-1 ${colors.bg} ${colors.text} rounded-full text-xs font-semibold`}>
                          {activity.category}
                        </span>
                      </div>
                      {activity.distance !== undefined && (
                        <div className="ml-2 flex flex-col items-end">
                          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full whitespace-nowrap">
                            {activity.distance.toFixed(1)} km
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Activity Description */}
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                      {activity.description}
                    </p>

                    {/* Activity Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <MapPin className="w-4 h-4 text-cyan-800 flex-shrink-0" />
                        <span className="truncate">{activity.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Calendar className="w-4 h-4 text-cyan-800 flex-shrink-0" />
                        <span>{activity.date}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Clock className="w-4 h-4 text-cyan-800 flex-shrink-0" />
                        <span>{activity.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Users className="w-4 h-4 text-cyan-800 flex-shrink-0" />
                        <span className="font-semibold">{activity.participants} participants</span>
                      </div>
                    </div>

                    {/* Join Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJoinActivity(activity.id);
                      }}
                      className="w-full px-4 py-2.5 bg-cyan-800 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                      Join Activity
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Create Activity Modal */}
      <CreateActivityModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateActivity={handleCreateActivity}
        userLocation={userLocation}
      />
    </div>
  );
}
