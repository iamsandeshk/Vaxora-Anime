
import { useState } from 'react';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import LazyImage from '@/components/LazyImage';

// Anime data
const animeData = [
  {
    id: 1,
    title: 'Solo Leveling',
    image: 'https://m.media-amazon.com/images/M/MV5BMmQyMWRhZmUtYjRmNC00Mjg5LWFkYmYtNzUwMjIyZGNkMDJjXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg',
    genres: ['Action', 'Adventure', 'Fantasy'],
    rating: 4.9,
    episodes: 8,
    studio: 'A-1 Pictures',
    description: 'In a world where hunters must battle deadly monsters to protect humanity, Sung Jin-Woo, the weakest hunter of all mankind, finds himself in a mysterious dungeon which grants him an extraordinary power.'
  },
  {
    id: 2,
    title: 'Demon Slayer',
    image: 'https://m.media-amazon.com/images/M/MV5BZjZjNzI5MDctY2Y4YS00NmM4LTljMmItZTFkOTExNGI3ODRhXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_.jpg',
    genres: ['Action', 'Fantasy', 'Historic'],
    rating: 4.8,
    episodes: 44,
    studio: 'ufotable',
    description: 'A youth begins a quest to fight demons and save his sister after finding his family slaughtered and his sister turned into a demon.'
  },
  {
    id: 3,
    title: 'Jujutsu Kaisen',
    image: 'https://m.media-amazon.com/images/M/MV5BNGY4MTg3NzgtMmFkZi00NTg5LWExMmEtMWI3YzI1ODdmMWQ1XkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg',
    genres: ['Action', 'Supernatural'],
    rating: 4.7,
    episodes: 48,
    studio: 'MAPPA',
    description: "A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself. He enters a shaman school to be able to locate the demon's other body parts and thus exorcise himself."
  },
  {
    id: 4,
    title: 'Attack on Titan',
    image: 'https://flxt.tmsimg.com/assets/p10701949_b_v9_ah.jpg',
    genres: ['Action', 'Drama', 'Fantasy'],
    rating: 4.9,
    episodes: 87,
    studio: 'Wit Studio, MAPPA',
    description: 'After his hometown is destroyed and his mother is killed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.'
  },
  {
    id: 5,
    title: 'My Hero Academia',
    image: 'https://m.media-amazon.com/images/M/MV5BOGZmYjdjN2UtNjAwZi00YmEyLWFhNTEtNjM1MTFmYzFmNDRhXkEyXkFqcGdeQXVyMTA1NjE5MTAz._V1_.jpg',
    genres: ['Action', 'Comedy', 'Superhero'],
    rating: 4.6,
    episodes: 138,
    studio: 'Bones',
    description: 'A superhero-loving boy without any powers is determined to enroll in a prestigious hero academy and learn what it really means to be a hero.'
  },
  {
    id: 6,
    title: 'Chainsaw Man',
    image: 'https://m.media-amazon.com/images/M/MV5BZjY5MDFhZTgtOGVhMi00NTUzLTk5NjktNmRlMjI2NzI3NzdlXkEyXkFqcGdeQXVyMTMzNDExODE5._V1_FMjpg_UX1000_.jpg',
    genres: ['Action', 'Horror', 'Supernatural'],
    rating: 4.7,
    episodes: 12,
    studio: 'MAPPA',
    description: 'Following a betrayal, a young man left for dead is reborn as a powerful devil-human hybrid after merging with his pet devil and is soon enlisted into an organization dedicated to hunting devils.'
  }
];

// Helper component for anime card
const AnimeCard = ({ anime, index }: { anime: typeof animeData[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
      className="glass-card rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
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
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{anime.title}</h3>
        <p className="text-xs text-anime-gray mb-2">{anime.studio} • {anime.episodes} Episodes</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {anime.genres.map(genre => (
            <span key={genre} className="text-xs bg-anime-purple/10 text-anime-purple px-2 py-0.5 rounded-full">
              {genre}
            </span>
          ))}
        </div>
        <p className="text-sm text-anime-gray line-clamp-3">{anime.description}</p>
      </div>
    </motion.div>
  );
};

const AnimeSource = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  
  // Available genres from data
  const allGenres = Array.from(
    new Set(animeData.flatMap(anime => anime.genres))
  );
  
  // Filter anime based on search and genre
  const filteredAnime = animeData.filter(anime => {
    const matchesSearch = anime.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         anime.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre ? anime.genres.includes(selectedGenre) : true;
    
    return matchesSearch && matchesGenre;
  });

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
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Anime Source</h1>
                <p className="text-lg text-anime-gray max-w-2xl mx-auto">
                  Explore popular anime series and find your next favorite show
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Search Bar */}
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-anime-gray" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search anime by title or description..."
                    className="pl-10 py-3 pr-4 w-full rounded-lg border border-gray-200 focus:border-anime-purple focus:ring-0 transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {/* Genre Filter */}
                <select
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:border-anime-purple focus:ring-0 transition-colors"
                  value={selectedGenre || ''}
                  onChange={(e) => setSelectedGenre(e.target.value || null)}
                >
                  <option value="">All Genres</option>
                  {allGenres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
              
              {/* Results count */}
              <p className="text-anime-gray">
                Showing {filteredAnime.length} of {animeData.length} anime series
              </p>
            </motion.div>
            
            {/* Anime Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredAnime.length > 0 ? (
                filteredAnime.map((anime, index) => (
                  <AnimeCard key={anime.id} anime={anime} index={index} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-anime-gray">No anime found matching your search criteria.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedGenre(null);
                    }}
                    className="mt-4 text-anime-purple underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
            
            {/* Resources Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="glass-card rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold mb-4">Legal Streaming Platforms</h2>
              <p className="text-anime-gray mb-6">
                Support the anime industry by watching on these official platforms:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Crunchyroll', 'Funimation', 'Netflix', 'Hulu'].map((platform, index) => (
                  <a
                    key={platform}
                    href="#"
                    className="glass-effect p-4 rounded-lg text-center hover:bg-anime-purple/5 transition-colors"
                  >
                    <span className="block font-medium">{platform}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default AnimeSource;
