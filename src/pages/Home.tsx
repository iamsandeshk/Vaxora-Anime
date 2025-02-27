
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { formatTime, getTimeRemaining } from '@/lib/countdownUtil';
import { toast } from 'sonner';
import PageTransition from '@/components/PageTransition';

const Home = () => {
  // Countdown timer state
  const soloLevelingDate = new Date('2024-03-01T22:00:00');
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(soloLevelingDate));

  // Poll state - using localStorage to persist votes
  const [selectedOption, setSelectedOption] = useState<string | null>(
    localStorage.getItem('poll-vote') || null
  );
  const [pollResults, setPollResults] = useState({
    'Possible': parseInt(localStorage.getItem('poll-possible') || '65'),
    'Not Possible': parseInt(localStorage.getItem('poll-not-possible') || '35')
  });
  
  const totalVotes = Object.values(pollResults).reduce((a, b) => a + b, 0);
  
  // Video player ref
  const videoRef = useRef<HTMLIFrameElement>(null);

  // Update countdown timer
  useEffect(() => {
    const timerInterval = setInterval(() => {
      const time = getTimeRemaining(soloLevelingDate);
      setTimeRemaining(time);
      
      if (time.total <= 0) {
        clearInterval(timerInterval);
      }
    }, 1000);
    
    return () => clearInterval(timerInterval);
  }, []);

  // Handle poll vote
  const handleVote = (option: string) => {
    if (selectedOption) return; // Already voted
    
    setSelectedOption(option);
    localStorage.setItem('poll-vote', option);
    
    // Update results
    const newResults = { ...pollResults };
    const key = option === 'Possible' ? 'Possible' : 'Not Possible';
    newResults[key] += 1;
    setPollResults(newResults);
    
    // Save to localStorage (simulating backend)
    localStorage.setItem(`poll-${key.toLowerCase().replace(' ', '-')}`, newResults[key].toString());
    
    toast.success(`You voted: ${option}`);
  };

  // Calculate percentage
  const getPercentage = (value: number) => {
    return Math.round((value / totalVotes) * 100);
  };

  return (
    <PageTransition>
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
          {/* Background with gradient overlay */}
          <div className="absolute inset-0 bg-anime-dark">
            <div className="absolute inset-0 bg-gradient-to-t from-anime-dark via-anime-dark/90 to-transparent"></div>
          </div>
          
          <div className="container pt-28 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  Solo Leveling
                </h1>
                <p className="text-lg md:text-xl text-anime-gray mb-8">
                  The journey of Sung Jin-Woo, the weakest hunter who becomes the strongest
                </p>
              </motion.div>
              
              {/* Video Player */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="rounded-xl overflow-hidden shadow-2xl mx-auto mb-10 glass-card p-1 max-w-3xl"
              >
                <iframe 
                  id="teaser-video" 
                  className="video-player w-full aspect-video rounded-lg"
                  src="https://drive.google.com/file/d/1tptZ3Uiwnrj0QXXcZJljAmyi7TtyPUFP/preview" 
                  allow="autoplay"
                  ref={videoRef}
                ></iframe>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Countdown Section */}
        <section className="py-16 bg-white dark:bg-anime-dark">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Next Episode Countdown</h2>
                <p className="text-anime-gray">
                  Solo Leveling Episode 9 - Premiering Saturday, March 1st at 10:00 PM
                </p>
              </div>
              
              {/* Countdown Timer */}
              <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                {[
                  { label: 'Days', value: timeRemaining.days },
                  { label: 'Hours', value: timeRemaining.hours },
                  { label: 'Minutes', value: timeRemaining.minutes },
                  { label: 'Seconds', value: timeRemaining.seconds },
                ].map((item, index) => (
                  <div 
                    key={item.label}
                    className="glass-card rounded-lg p-6 text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-anime-purple">
                      {formatTime(item.value)}
                    </div>
                    <div className="text-sm text-anime-gray mt-2">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Poll Section */}
        <section className="py-16 bg-gray-50 dark:bg-anime-dark/70">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Community Poll</h2>
                <p className="text-anime-gray">
                  Do you think Sung Jin-Woo will defeat the Architect in the next episode?
                </p>
              </div>
              
              <div className="space-y-4">
                {['Possible', 'Not Possible'].map(option => {
                  const percentage = getPercentage(pollResults[option as keyof typeof pollResults]);
                  const isSelected = selectedOption === option;
                  
                  return (
                    <motion.div
                      key={option}
                      className={`
                        relative overflow-hidden rounded-lg cursor-pointer border 
                        transition-all duration-300 glass-effect hover:shadow-md
                        ${isSelected ? 'border-anime-purple shadow-md' : 'border-transparent'}
                      `}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleVote(option)}
                    >
                      <div className="relative z-10 p-4 flex justify-between items-center">
                        <span className={`font-medium ${isSelected ? 'text-anime-purple' : ''}`}>
                          {option}
                        </span>
                        <span className="font-medium">
                          {percentage}%
                        </span>
                      </div>
                      
                      {/* Progress bar */}
                      <div 
                        className="absolute top-0 left-0 h-full bg-anime-purple/20"
                        style={{ width: `${percentage}%`, transition: 'width 0.5s ease-out' }}
                      ></div>
                    </motion.div>
                  );
                })}
                
                <div className="text-center text-sm text-anime-gray mt-4">
                  {selectedOption 
                    ? `You voted: ${selectedOption}`
                    : "Click an option to vote"
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default Home;
