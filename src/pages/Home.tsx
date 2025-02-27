
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { formatTime, getTimeRemaining } from '@/lib/countdownUtil';
import { toast } from 'sonner';
import PageTransition from '@/components/PageTransition';
import { Bell, Check } from 'lucide-react';

const Home = () => {
  // Countdown timer state - Updated to March 1, 2025
  const soloLevelingDate = new Date('2025-03-01T22:00:00');
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(soloLevelingDate));
  const [reminderSet, setReminderSet] = useState(false);

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

  // Set reminder function
  const handleSetReminder = () => {
    if (!reminderSet) {
      // In a real app, this would integrate with a notification API
      // For now, we'll just simulate it with localStorage
      localStorage.setItem('reminder-solo-leveling', 'true');
      setReminderSet(true);
      toast.success("Reminder set for Solo Leveling Season 2!");
    } else {
      localStorage.removeItem('reminder-solo-leveling');
      setReminderSet(false);
      toast.success("Reminder removed");
    }
  };

  // Check if reminder is already set
  useEffect(() => {
    const reminderStatus = localStorage.getItem('reminder-solo-leveling') === 'true';
    setReminderSet(reminderStatus);
  }, []);

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
                <p className="text-lg md:text-xl text-white mb-8">
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
                  allow="autoplay; fullscreen"
                  ref={videoRef}
                ></iframe>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Countdown Section - Updated design for better visibility */}
        <section className="py-16 bg-white dark:bg-anime-dark">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2 text-black dark:text-white">Next Episode Countdown</h2>
                <p className="text-lg font-medium text-anime-purple">
                  Solo Leveling Season 2 - Premiering Saturday, March 1st, 2025 at 10:00 PM
                </p>
              </div>
              
              {/* Enhanced Countdown Timer */}
              <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                {[
                  { label: 'Days', value: timeRemaining.days },
                  { label: 'Hours', value: timeRemaining.hours },
                  { label: 'Minutes', value: timeRemaining.minutes },
                  { label: 'Seconds', value: timeRemaining.seconds },
                ].map((item, index) => (
                  <div 
                    key={item.label}
                    className="glass-card rounded-lg p-6 text-center shadow-lg border-2 border-anime-purple/30 hover:border-anime-purple/50 transition-all"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-anime-purple">
                      {formatTime(item.value)}
                    </div>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-2">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Added season information with working reminder button */}
              <div className="mt-10 text-center">
                <p className="text-lg text-gray-800 dark:text-gray-200">
                  Join millions of fans awaiting the return of the Shadow Monarch in Season 2!
                </p>
                <div className="flex justify-center mt-4">
                  <button 
                    className={`flex items-center px-6 py-2.5 rounded-full transition-colors ${
                      reminderSet 
                        ? 'bg-green-500 hover:bg-green-600 text-white' 
                        : 'bg-anime-purple hover:bg-anime-purple/90 text-white'
                    }`}
                    onClick={handleSetReminder}
                  >
                    {reminderSet ? (
                      <>
                        <Check size={18} className="mr-2" />
                        Reminder Set
                      </>
                    ) : (
                      <>
                        <Bell size={18} className="mr-2" />
                        Set Reminder
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Poll Section - Improved visibility and contrast */}
        <section className="py-16 bg-gray-100 dark:bg-anime-dark/80">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2 text-black dark:text-white">Community Poll</h2>
                <p className="text-lg text-gray-800 dark:text-gray-200 font-medium">
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
                        relative overflow-hidden rounded-lg cursor-pointer border-2
                        transition-all duration-300 glass-effect hover:shadow-md
                        ${isSelected ? 'border-anime-purple shadow-md' : 'border-transparent hover:border-anime-purple/30'}
                      `}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleVote(option)}
                    >
                      <div className="relative z-10 p-4 flex justify-between items-center">
                        <span className={`font-medium text-lg ${isSelected ? 'text-anime-purple' : 'text-gray-800 dark:text-white'}`}>
                          {option}
                        </span>
                        <span className="font-bold text-lg text-gray-800 dark:text-white">
                          {percentage}%
                        </span>
                      </div>
                      
                      {/* Progress bar - Enhanced */}
                      <div 
                        className={`absolute top-0 left-0 h-full ${isSelected ? 'bg-anime-purple/30' : 'bg-anime-purple/20'}`}
                        style={{ width: `${percentage}%`, transition: 'width 0.5s ease-out' }}
                      ></div>
                    </motion.div>
                  );
                })}
                
                <div className="text-center text-base font-medium text-gray-800 dark:text-gray-200 mt-4">
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
