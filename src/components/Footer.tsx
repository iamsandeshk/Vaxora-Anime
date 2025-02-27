
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-anime-dark text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-display font-bold text-anime-purple">
              Vexora
            </Link>
            <p className="text-anime-gray text-sm max-w-xs">
              Your ultimate destination for anime content, updates, and the latest information on your favorite shows.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-anime-gray hover:text-anime-purple transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-anime-gray hover:text-anime-purple transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/anime-source" className="text-anime-gray hover:text-anime-purple transition-colors text-sm">
                  Anime Source
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-anime-gray hover:text-anime-purple transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-anime-gray hover:text-anime-purple transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-anime-gray hover:text-anime-purple transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-anime-gray text-sm">
                Owner: Sandesh K
              </li>
              <li>
                <a 
                  href="mailto:try.sandeshk@gmail.com" 
                  className="text-anime-gray hover:text-anime-purple transition-colors text-sm"
                >
                  try.sandeshk@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-anime-gray text-sm">
            &copy; {currentYear} Vexora. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            {/* Social Media Icons - Using text for simplicity */}
            <a href="#" className="text-anime-gray hover:text-anime-purple transition-colors">
              Twitter
            </a>
            <a href="#" className="text-anime-gray hover:text-anime-purple transition-colors">
              Instagram
            </a>
            <a href="#" className="text-anime-gray hover:text-anime-purple transition-colors">
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
