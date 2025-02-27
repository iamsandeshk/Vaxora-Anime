
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageTransition>
      <main className="min-h-screen flex items-center justify-center py-20">
        <div className="container">
          <div className="max-w-md mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-anime-purple to-purple-400">
                404
              </span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-6 space-y-6"
            >
              <h1 className="text-2xl md:text-3xl font-bold">Page Not Found</h1>
              <p className="text-anime-gray">
                The page you're looking for doesn't exist or has been moved.
              </p>
              
              <div className="pt-4">
                <Link 
                  to="/" 
                  className="bg-anime-purple text-white px-6 py-3 rounded-full hover:bg-anime-purple/90 transition-colors inline-block"
                >
                  Return to Home
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default NotFound;
