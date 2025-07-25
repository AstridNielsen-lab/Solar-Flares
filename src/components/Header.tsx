import React, { useState } from 'react';
import { Sun, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '#home', label: 'Início', type: 'anchor' },
    { href: '/analise-dados', label: 'Análise de Dados', type: 'route' },
    { href: '#physics', label: 'Física', type: 'anchor' },
    { href: '#simulations', label: 'Simulações', type: 'anchor' },
    { href: '#realtime-data', label: 'Dados Reais', type: 'anchor' },
    { href: '#effects', label: 'Efeitos', type: 'anchor' },
    { href: '#history', label: 'História', type: 'anchor' },
    { href: '#future', label: 'Futuro', type: 'anchor' },
  ];

  return (
    <header className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm z-50 border-b border-orange-500/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <Sun className="w-8 h-8 text-orange-500" />
            <h1 className="text-xl font-bold text-white">Explosões Solares</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              item.type === 'route' ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                >
                  {item.label}
                </a>
              )
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            {navItems.map((item) => (
              item.type === 'route' ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block py-2 text-gray-300 hover:text-orange-400 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-gray-300 hover:text-orange-400 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              )
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;