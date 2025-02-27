
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Anime Source', path: '/anime-source' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-card py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <NavLink 
          to="/" 
          className="text-2xl font-display font-bold text-anime-purple"
        >
          Vexora
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded after:transition-all after:duration-300 ${
                  isActive 
                    ? 'text-anime-purple after:bg-anime-purple after:w-full' 
                    : 'text-foreground hover:text-anime-purple after:bg-anime-purple after:w-0 hover:after:w-full'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`fixed inset-0 z-40 bg-white dark:bg-anime-dark glass-effect backdrop-blur-xl md:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '60px' }}
      >
        <div className="flex flex-col space-y-6 p-8 pt-12">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `text-xl font-medium transition-colors ${
                  isActive 
                    ? 'text-anime-purple' 
                    : 'text-foreground hover:text-anime-purple'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
