
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import LazyImage from '@/components/LazyImage';

const About = () => {
  return (
    <PageTransition>
      <main className="pt-24 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-3 py-1 bg-anime-purple/10 text-anime-purple rounded-full text-sm font-medium mb-3">
                  Our Story
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About Vexora</h1>
                <p className="text-lg text-anime-gray max-w-2xl mx-auto">
                  Your ultimate destination for anime content, updates, and the latest information on your favorite shows.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="aspect-video mb-12 rounded-2xl overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1542866391-d2661d62dcbc?q=80&w=2148&auto=format&fit=crop" 
                alt="Vexora Office" 
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-anime-gray mb-4">
                  At Vexora, we're dedicated to bringing anime fans together through a shared passion for exceptional storytelling, artistry, and cultural appreciation. Our platform serves as a comprehensive resource for anime enthusiasts of all levels, from newcomers exploring their first series to seasoned fans seeking deeper insights.
                </p>
                <p className="text-anime-gray">
                  We believe in the power of anime to inspire, educate, and connect people across diverse backgrounds and experiences. Through thoughtful curation, timely updates, and community engagement, we aim to enhance your anime journey in meaningful ways.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">Our Values</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="bg-anime-purple/20 text-anime-purple rounded-full p-1 mr-3 mt-0.5">•</span>
                    <div>
                      <h3 className="font-semibold">Authenticity</h3>
                      <p className="text-anime-gray">We honor the cultural roots and creative vision behind every anime we feature.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-anime-purple/20 text-anime-purple rounded-full p-1 mr-3 mt-0.5">•</span>
                    <div>
                      <h3 className="font-semibold">Community</h3>
                      <p className="text-anime-gray">We foster a welcoming space where fans can connect, discuss, and share their passion.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-anime-purple/20 text-anime-purple rounded-full p-1 mr-3 mt-0.5">•</span>
                    <div>
                      <h3 className="font-semibold">Quality</h3>
                      <p className="text-anime-gray">We curate content that celebrates artistic excellence and compelling storytelling.</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="glass-card rounded-2xl p-8 mb-16"
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/3 mb-6 md:mb-0">
                  <div className="w-40 h-40 rounded-full overflow-hidden mx-auto">
                    <LazyImage 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                      alt="Sandesh K" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-2/3 md:pl-8">
                  <h2 className="text-2xl font-bold mb-2">Meet Our Founder</h2>
                  <h3 className="text-xl font-semibold text-anime-purple mb-2">Sandesh K</h3>
                  <p className="text-anime-gray mb-4">
                    Driven by a lifelong passion for anime and a vision to create a premier destination for fans, Sandesh founded Vexora to share the artistry and storytelling of anime with the world.
                  </p>
                  <div>
                    <h4 className="font-semibold mb-1">Contact:</h4>
                    <a href="mailto:try.sandeshk@gmail.com" className="text-anime-purple hover:underline">
                      try.sandeshk@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
              <p className="text-anime-gray mb-6 max-w-2xl mx-auto">
                Connect with fellow anime enthusiasts, participate in discussions, and stay updated with the latest releases and news.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="#" 
                  className="bg-anime-purple text-white px-6 py-3 rounded-full hover:bg-anime-purple/90 transition-colors"
                >
                  Discord Community
                </a>
                <a 
                  href="#" 
                  className="border border-anime-purple text-anime-purple px-6 py-3 rounded-full hover:bg-anime-purple/10 transition-colors"
                >
                  Newsletter
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default About;
