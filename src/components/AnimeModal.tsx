
import { useState, useEffect } from 'react';
import { X, Play, Star, Calendar, Clock, User, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimeDetails } from '@/types/anime';

interface AnimeModalProps {
  anime: AnimeDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

const AnimeModal = ({ anime, isOpen, onClose }: AnimeModalProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'trailer' | 'episodes'>('overview');
  
  // Close modal with escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!anime) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, type: 'spring', damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4 sm:p-6"
          >
            <div className="bg-white dark:bg-anime-dark/95 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] pointer-events-auto flex flex-col shadow-2xl border border-white/20">
              {/* Header with cover image */}
              <div className="relative h-48 md:h-64 overflow-hidden">
                <div className="absolute inset-0">
                  <img 
                    src={anime.coverImage || anime.image} 
                    alt={anime.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                </div>
                
                {/* Close button */}
                <button 
                  className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
                  onClick={onClose}
                >
                  <X size={20} />
                </button>
                
                {/* Anime title */}
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{anime.title}</h2>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center text-yellow-400 mr-4">
                      <Star size={16} className="mr-1" />
                      <span className="text-white text-sm">{anime.rating}/5</span>
                    </div>
                    <span className="text-white/80 text-sm">{anime.studio}</span>
                  </div>
                </div>
              </div>
              
              {/* Tabs navigation */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex">
                  {[
                    { id: 'overview', label: 'Overview', icon: Info },
                    { id: 'trailer', label: 'Trailer', icon: Play },
                    { id: 'episodes', label: 'Episodes', icon: Calendar },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center px-4 py-3 font-medium text-sm relative ${
                        activeTab === tab.id 
                          ? 'text-anime-purple' 
                          : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                      }`}
                    >
                      <tab.icon size={16} className="mr-2" />
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div 
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-anime-purple"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Content area */}
              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Synopsis</h3>
                      <p className="text-gray-700 dark:text-gray-300">{anime.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Details</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center text-gray-700 dark:text-gray-300">
                            <Clock size={16} className="mr-2 text-anime-purple" />
                            <span>{anime.episodes} Episodes</span>
                          </li>
                          <li className="flex items-center text-gray-700 dark:text-gray-300">
                            <Calendar size={16} className="mr-2 text-anime-purple" />
                            <span>{anime.year || 'Unknown'}</span>
                          </li>
                          <li className="flex items-center text-gray-700 dark:text-gray-300">
                            <User size={16} className="mr-2 text-anime-purple" />
                            <span>{anime.studio}</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Genres</h3>
                        <div className="flex flex-wrap gap-2">
                          {anime.genres.map(genre => (
                            <span 
                              key={genre} 
                              className="bg-anime-purple/10 text-anime-purple px-3 py-1 rounded-full text-xs"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'trailer' && (
                  <div className="aspect-video rounded-lg overflow-hidden bg-black">
                    {anime.trailerUrl ? (
                      <iframe
                        src={anime.trailerUrl}
                        className="w-full h-full"
                        allowFullScreen
                        title={`${anime.title} trailer`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      ></iframe>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white">
                        <div className="text-center">
                          <Play size={48} className="mx-auto mb-2 opacity-50" />
                          <p>Trailer not available</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'episodes' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Episode List</h3>
                    {anime.episodes > 0 ? (
                      <div className="space-y-3">
                        {Array.from({ length: Math.min(anime.episodes, 10) }, (_, i) => (
                          <div 
                            key={i}
                            className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-anime-purple transition-colors"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="font-medium text-gray-800 dark:text-white">Episode {i + 1}</span>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Title unavailable</p>
                              </div>
                              <button className="bg-anime-purple hover:bg-anime-purple/90 text-white px-3 py-1 rounded-full text-sm">
                                Watch
                              </button>
                            </div>
                          </div>
                        ))}
                        
                        {anime.episodes > 10 && (
                          <div className="text-center py-2">
                            <button className="text-anime-purple hover:underline">
                              View all {anime.episodes} episodes
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">
                        No episode information available at this time.
                      </p>
                    )}
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-end">
                <button 
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AnimeModal;
