
import { useState, useEffect } from 'react';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';
import LazyImage from '@/components/LazyImage';
import AnimeModal from '@/components/AnimeModal';
import { AnimeDetails, AnimeSearchResult } from '@/types/anime';
import { toast } from 'sonner';

// Local anime data for initial display
const animeData = [
  {
    id: 1,
    title: 'Solo Leveling',
    image: 'https://m.media-amazon.com/images/M/MV5BMmQyMWRhZmUtYjRmNC00Mjg5LWFkYmYtNzUwMjIyZGNkMDJjXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg',
    coverImage: 'https://wallpapercave.com/wp/wp11840556.jpg',
    genres: ['Action', 'Adventure', 'Fantasy'],
    rating: 4.9,
    episodes: 8,
    studio: 'A-1 Pictures',
    description: 'In a world where hunters must battle deadly monsters to protect humanity, Sung Jin-Woo, the weakest hunter of all mankind, finds himself in a mysterious dungeon which grants him an extraordinary power.',
    trailerUrl: 'https://www.youtube.com/embed/0IlRr3hNQEw?autoplay=1',
    year: 2024,
    status: 'Airing' as const
  },
  {
    id: 2,
    title: 'Demon Slayer',
    image: 'https://m.media-amazon.com/images/M/MV5BZjZjNzI5MDctY2Y4YS00NmM4LTljMmItZTFkOTExNGI3ODRhXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_.jpg',
    coverImage: 'https://c4.wallpaperflare.com/wallpaper/734/45/313/anime-demon-slayer-kimetsu-no-yaiba-tanjirou-kamado-hd-wallpaper-preview.jpg',
    genres: ['Action', 'Fantasy', 'Historic'],
    rating: 4.8,
    episodes: 44,
    studio: 'ufotable',
    description: 'A youth begins a quest to fight demons and save his sister after finding his family slaughtered and his sister turned into a demon.',
    trailerUrl: 'https://www.youtube.com/embed/VQGCKyvzIM4?autoplay=1',
    year: 2019,
    status: 'Airing' as const
  },
  {
    id: 3,
    title: 'Jujutsu Kaisen',
    image: 'https://m.media-amazon.com/images/M/MV5BNGY4MTg3NzgtMmFkZi00NTg5LWExMmEtMWI3YzI1ODdmMWQ1XkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg',
    coverImage: 'https://c4.wallpaperflare.com/wallpaper/295/163/719/anime-anime-boys-jujutsu-kaisen-yuji-itadori-hd-wallpaper-preview.jpg',
    genres: ['Action', 'Supernatural'],
    rating: 4.7,
    episodes: 48,
    studio: 'MAPPA',
    description: "A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself. He enters a shaman school to be able to locate the demon's other body parts and thus exorcise himself.",
    trailerUrl: 'https://www.youtube.com/embed/eGSL-l95VXw?autoplay=1',
    year: 2020,
    status: 'Airing' as const
  },
  {
    id: 4,
    title: 'Attack on Titan',
    image: 'https://flxt.tmsimg.com/assets/p10701949_b_v9_ah.jpg',
    coverImage: 'https://c4.wallpaperflare.com/wallpaper/109/220/11/shingeki-no-kyojin-anime-attack-on-titan-eren-yeager-wallpaper-preview.jpg',
    genres: ['Action', 'Drama', 'Fantasy'],
    rating: 4.9,
    episodes: 87,
    studio: 'Wit Studio, MAPPA',
    description: 'After his hometown is destroyed and his mother is killed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.',
    trailerUrl: 'https://www.youtube.com/embed/LHtdKWJdif4?autoplay=1',
    year: 2013,
    status: 'Finished' as const
  },
  {
    id: 5,
    title: 'My Hero Academia',
    image: 'https://m.media-amazon.com/images/M/MV5BOGZmYjdjN2UtNjAwZi00YmEyLWFhNTEtNjM1MTFmYzFmNDRhXkEyXkFqcGdeQXVyMTA1NjE5MTAz._V1_.jpg',
    coverImage: 'https://c4.wallpaperflare.com/wallpaper/500/442/354/anime-my-hero-academia-izuku-midoriya-katsuki-bakugou-wallpaper-preview.jpg',
    genres: ['Action', 'Comedy', 'Superhero'],
    rating: 4.6,
    episodes: 138,
    studio: 'Bones',
    description: 'A superhero-loving boy without any powers is determined to enroll in a prestigious hero academy and learn what it really means to be a hero.',
    trailerUrl: 'https://www.youtube.com/embed/EPVkcwyLQQ8?autoplay=1',
    year: 2016,
    status: 'Airing' as const
  },
  {
    id: 6,
    title: 'Chainsaw Man',
    image: 'https://m.media-amazon.com/images/M/MV5BZjY5MDFhZTgtOGVhMi00NTUzLTk5NjktNmRlMjI2NzI3NzdlXkEyXkFqcGdeQXVyMTMzNDExODE5._V1_FMjpg_UX1000_.jpg',
    coverImage: 'https://c4.wallpaperflare.com/wallpaper/944/480/39/chainsaw-man-anime-boys-denji-chainsaw-man-hd-wallpaper-preview.jpg',
    genres: ['Action', 'Horror', 'Supernatural'],
    rating: 4.7,
    episodes: 12,
    studio: 'MAPPA',
    description: 'Following a betrayal, a young man left for dead is reborn as a powerful devil-human hybrid after merging with his pet devil and is soon enlisted into an organization dedicated to hunting devils.',
    trailerUrl: 'https://www.youtube.com/embed/q15CRdE5Bv0?autoplay=1',
    year: 2022,
    status: 'Finished' as const
  }
];

// Mock API function to fetch anime data (simulating backend)
const searchAnime = async (query: string, genre?: string): Promise<AnimeSearchResult[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // If no query, return local anime data
  if (!query.trim()) {
    return animeData.map(anime => ({
      id: anime.id,
      title: anime.title,
      image: anime.image,
      genres: anime.genres,
      rating: anime.rating,
      year: anime.year
    }));
  }
  
  // For demo purposes, we'll simulate an API search with our local data and add some extra results
  // In a real app, this would fetch from an actual API
  const extraResults: AnimeSearchResult[] = [
    {
      id: 101,
      title: 'Naruto',
      image: 'https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
      genres: ['Action', 'Adventure', 'Fantasy'],
      rating: 4.7,
      year: 2002
    },
    {
      id: 102,
      title: 'One Piece',
      image: 'https://m.media-amazon.com/images/M/MV5BODcwNWE3OTMtMDc3MS00NDFjLWE1OTAtNDU3NjgxODMxY2UyXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg',
      genres: ['Action', 'Adventure', 'Comedy'],
      rating: 4.8,
      year: 1999
    },
    {
      id: 103,
      title: 'Dragon Ball Z',
      image: 'https://m.media-amazon.com/images/M/MV5BNGM5MTEyZDItZWNhOS00NzNkLTgwZTAtNWIzY2IzZmExOWMxXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
      genres: ['Action', 'Adventure', 'Fantasy'],
      rating: 4.7,
      year: 1989
    },
    {
      id: 104,
      title: 'Death Note',
      image: 'https://m.media-amazon.com/images/M/MV5BNjRiNmNjMmMtN2U2Yi00ODgxLTk3OTMtMmI1MTI1NjYyZTEzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
      genres: ['Mystery', 'Psychological', 'Supernatural'],
      rating: 4.9,
      year: 2006
    },
    {
      id: 105,
      title: 'Fullmetal Alchemist: Brotherhood',
      image: 'https://m.media-amazon.com/images/M/MV5BZmEzN2YzOTItMDI5MS00MGU4LWI1NWQtOTg5ZThhNGQwYTEzXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
      genres: ['Action', 'Adventure', 'Drama'],
      rating: 4.9,
      year: 2009
    }
  ];
  
  // Combine local data with extra results and filter based on query
  const allResults = [...animeData, ...extraResults];
  const queryLower = query.toLowerCase();
  let results = allResults.filter(anime => 
    anime.title.toLowerCase().includes(queryLower)
  );
  
  // Apply genre filter if specified
  if (genre) {
    results = results.filter(anime => 
      anime.genres.some(g => g.toLowerCase() === genre.toLowerCase())
    );
  }
  
  return results;
};

// Helper function to get anime details by ID
const getAnimeById = async (id: number): Promise<AnimeDetails | null> => {
  // First check local data
  const localAnime = animeData.find(anime => anime.id === id);
  if (localAnime) return localAnime;
  
  // Simulate fetching from API for other IDs
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Additional anime details (in a real app, this would come from an API)
  const additionalAnimeDetails: Record<number, AnimeDetails> = {
    101: {
      id: 101,
      title: 'Naruto',
      image: 'https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
      coverImage: 'https://c4.wallpaperflare.com/wallpaper/553/115/681/anime-naruto-team-7-naruto-wallpaper-preview.jpg',
      genres: ['Action', 'Adventure', 'Fantasy'],
      rating: 4.7,
      episodes: 220,
      studio: 'Pierrot',
      description: 'Naruto Uzumaki, a mischievous adolescent ninja, struggles as he searches for recognition and dreams of becoming the Hokage, the village\'s leader and strongest ninja.',
      trailerUrl: 'https://www.youtube.com/embed/j2hiC9BmJlQ?autoplay=1',
      year: 2002,
      status: 'Finished'
    },
    102: {
      id: 102,
      title: 'One Piece',
      image: 'https://m.media-amazon.com/images/M/MV5BODcwNWE3OTMtMDc3MS00NDFjLWE1OTAtNDU3NjgxODMxY2UyXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg',
      coverImage: 'https://c4.wallpaperflare.com/wallpaper/728/226/575/one-piece-monkey-d-luffy-wallpaper-preview.jpg',
      genres: ['Action', 'Adventure', 'Comedy'],
      rating: 4.8,
      episodes: 1000,
      studio: 'Toei Animation',
      description: 'Follows the adventures of Monkey D. Luffy and his pirate crew in order to find the greatest treasure ever left by the legendary Pirate, Gold Roger. The famous mystery treasure named "One Piece".',
      trailerUrl: 'https://www.youtube.com/embed/S8_YwFLCh4U?autoplay=1',
      year: 1999,
      status: 'Airing'
    },
    103: {
      id: 103,
      title: 'Dragon Ball Z',
      image: 'https://m.media-amazon.com/images/M/MV5BNGM5MTEyZDItZWNhOS00NzNkLTgwZTAtNWIzY2IzZmExOWMxXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
      coverImage: 'https://c4.wallpaperflare.com/wallpaper/621/113/189/dragon-ball-goku-dragon-ball-z-super-saiyan-wallpaper-preview.jpg',
      genres: ['Action', 'Adventure', 'Fantasy'],
      rating: 4.7,
      episodes: 291,
      studio: 'Toei Animation',
      description: 'After learning that he is from another planet, a warrior named Goku and his friends are prompted to defend it from an onslaught of extraterrestrial enemies.',
      trailerUrl: 'https://www.youtube.com/embed/sF8D3OziGsc?autoplay=1',
      year: 1989,
      status: 'Finished'
    },
    104: {
      id: 104,
      title: 'Death Note',
      image: 'https://m.media-amazon.com/images/M/MV5BNjRiNmNjMmMtN2U2Yi00ODgxLTk3OTMtMmI1MTI1NjYyZTEzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
      coverImage: 'https://c4.wallpaperflare.com/wallpaper/626/971/640/death-note-yagami-light-anime-wallpaper-preview.jpg',
      genres: ['Mystery', 'Psychological', 'Supernatural'],
      rating: 4.9,
      episodes: 37,
      studio: 'Madhouse',
      description: 'An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone whose name is written into it.',
      trailerUrl: 'https://www.youtube.com/embed/NlJZ-YgAt-c?autoplay=1',
      year: 2006,
      status: 'Finished'
    },
    105: {
      id: 105,
      title: 'Fullmetal Alchemist: Brotherhood',
      image: 'https://m.media-amazon.com/images/M/MV5BZmEzN2YzOTItMDI5MS00MGU4LWI1NWQtOTg5ZThhNGQwYTEzXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
      coverImage: 'https://c4.wallpaperflare.com/wallpaper/295/319/632/fullmetal-alchemist-alphonse-elric-anime-edward-elric-wallpaper-preview.jpg',
      genres: ['Action', 'Adventure', 'Drama'],
      rating: 4.9,
      episodes: 64,
      studio: 'Bones',
      description: 'Two brothers search for a Philosopher\'s Stone after an attempt to revive their deceased mother goes wrong and leaves them in damaged physical forms.',
      trailerUrl: 'https://www.youtube.com/embed/--IcmZkvL0Q?autoplay=1',
      year: 2009,
      status: 'Finished'
    }
  };
  
  return additionalAnimeDetails[id] || null;
};

// Helper component for anime card
const AnimeCard = ({ anime, onClick }: { anime: AnimeSearchResult, onClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-[2/3] relative">
        <LazyImage 
          src={anime.image} 
          alt={anime.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-anime-purple text-white px-2 py-1 rounded-md text-sm font-medium">
          ★ {anime.rating}
        </div>
        {anime.year && (
          <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded-md text-xs">
            {anime.year}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 text-gray-800 dark:text-white">{anime.title}</h3>
        <div className="flex flex-wrap gap-1 mb-2">
          {anime.genres.slice(0, 3).map(genre => (
            <span key={genre} className="text-xs bg-anime-purple/10 text-anime-purple px-2 py-0.5 rounded-full">
              {genre}
            </span>
          ))}
        </div>
        <div className="mt-2 text-center">
          <button className="w-full bg-anime-purple hover:bg-anime-purple/90 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const AnimeSource = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<AnimeSearchResult[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<AnimeDetails | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Available genres from data
  const allGenres = Array.from(
    new Set([
      ...animeData.flatMap(anime => anime.genres),
      'Mystery', 'Psychological', 'Comedy', 'Drama', 'Romance', 'Sci-Fi', 'Slice of Life'
    ])
  ).sort();
  
  // Handle search
  const handleSearch = async () => {
    setSearchTerm(searchInput);
    setLoading(true);
    
    try {
      const results = await searchAnime(searchInput, selectedGenre || undefined);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching anime:', error);
      toast.error('Failed to search anime. Please try again.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const initialResults = await searchAnime('');
        setSearchResults(initialResults);
      } catch (error) {
        console.error('Error loading initial data:', error);
        toast.error('Failed to load anime data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialData();
  }, []);
  
  // Handle genre filter change
  useEffect(() => {
    handleSearch();
  }, [selectedGenre]);
  
  // Open anime details modal
  const openAnimeDetails = async (animeId: number) => {
    setLoading(true);
    
    try {
      const details = await getAnimeById(animeId);
      if (details) {
        setSelectedAnime(details);
        setModalOpen(true);
      } else {
        toast.error('Anime details not found');
      }
    } catch (error) {
      console.error('Error fetching anime details:', error);
      toast.error('Failed to load anime details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <main className="pt-24 pb-16">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-3 py-1 bg-anime-purple/10 text-anime-purple rounded-full text-sm font-medium mb-3">
                  Discover
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">Anime Source</h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                  Explore popular anime series and find your next favorite show
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-10"
            >
              <div className="glass-card p-6 rounded-xl">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  {/* Enhanced Search Bar */}
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search for any anime..."
                      className="pl-10 py-3 pr-4 w-full rounded-lg border border-gray-300 focus:border-anime-purple focus:ring-0 transition-colors text-gray-800 bg-white"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearch();
                      }}
                    />
                  </div>
                  
                  {/* Search Button */}
                  <button
                    className="bg-anime-purple text-white px-6 py-3 rounded-lg hover:bg-anime-purple/90 transition-colors flex items-center justify-center"
                    onClick={handleSearch}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      'Search'
                    )}
                  </button>
                </div>
                
                {/* Genre Filter Chips */}
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedGenre === null 
                        ? 'bg-anime-purple text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => setSelectedGenre(null)}
                  >
                    All Genres
                  </button>
                  {allGenres.map(genre => (
                    <button
                      key={genre}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedGenre === genre 
                          ? 'bg-anime-purple text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => setSelectedGenre(genre)}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Results count and loading state */}
              <div className="flex items-center justify-between mt-4 mb-6">
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  {loading ? (
                    <span className="flex items-center">
                      <Loader2 size={16} className="animate-spin mr-2" />
                      Searching...
                    </span>
                  ) : (
                    `Showing ${searchResults.length} anime series`
                  )}
                </p>
                
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSearchInput('');
                      setSelectedGenre(null);
                      handleSearch();
                    }}
                    className="text-anime-purple hover:underline text-sm"
                  >
                    Clear search
                  </button>
                )}
              </div>
            </motion.div>
            
            {/* Anime Grid */}
            {loading && searchResults.length === 0 ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <Loader2 size={40} className="animate-spin mx-auto mb-4 text-anime-purple" />
                  <p className="text-gray-700 dark:text-gray-300">Loading anime series...</p>
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {searchResults.map((anime) => (
                  <AnimeCard 
                    key={anime.id} 
                    anime={anime} 
                    onClick={() => openAnimeDetails(anime.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 glass-card rounded-xl">
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">No anime found matching your criteria</p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search terms or filters</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSearchInput('');
                    setSelectedGenre(null);
                    handleSearch();
                  }}
                  className="bg-anime-purple text-white px-6 py-2 rounded-full hover:bg-anime-purple/90 transition-colors"
                >
                  Reset Search
                </button>
              </div>
            )}
            
            {/* Resources Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="glass-card rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Legal Streaming Platforms</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Support the anime industry by watching on these official platforms:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Crunchyroll', 'Funimation', 'Netflix', 'Hulu'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="glass-effect p-4 rounded-lg text-center hover:bg-anime-purple/5 transition-colors text-gray-800 dark:text-white"
                  >
                    <span className="block font-medium">{platform}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Anime Details Modal */}
        <AnimeModal 
          anime={selectedAnime} 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
        />
      </main>
    </PageTransition>
  );
};

export default AnimeSource;
