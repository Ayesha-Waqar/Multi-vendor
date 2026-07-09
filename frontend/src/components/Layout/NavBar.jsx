import React from 'react';
import { navItems } from '../../static/data';
import { Link } from 'react-router-dom';

const Navbar = ({ active, onLinkClick }) => {
  return (
    <nav className="flex flex-col md:flex-row items-stretch md:items-center w-full md:w-auto">
      {navItems && navItems.map((item, index) => {
        const isActive = active === index + 1;
        return (
          <Link
            key={index}
            to={item.url}
            onClick={onLinkClick}
            className="group relative flex items-center w-full md:w-auto px-6 md:px-4 whitespace-nowrap
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-inset
                       transition-colors duration-200"
            style={{ height: '48px' }}
          >
            {/* Mobile: left accent bar for active/hover state */}
            <span
              aria-hidden="true"
              className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full bg-teal-700 transition-all duration-200"
              style={{
                width: '3px',
                height: isActive ? '60%' : '0%',
              }}
            />

            {/* Desktop: animated bottom indicator */}
            <span
              aria-hidden="true"
              className="hidden md:block absolute left-1/2 -translate-x-1/2 bottom-0 rounded-t-[3px] bg-white
                         transition-all duration-300 ease-out group-hover:w-[40%]"
              style={{
                height: '3px',
                width: isActive ? '40%' : '0%',
              }}
            />

            <span
              className="text-sm transition-colors duration-200 group-hover:text-white font-medium text-teal-700 md:text-white/80
                "
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {item.title}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;