import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Sidebar = ({ collapsed }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const menuItems = [
    { icon: '🏠', label: 'Home', path: '/' },
    { icon: '⚡', label: 'Shorts', path: '/shorts' },
    { icon: '📺', label: 'Subscriptions', path: '/subscriptions' },
    { icon: '📚', label: 'Library', path: '/library', divider: true },
    { icon: '📝', label: 'History', path: '/history' },
    { icon: '🎬', label: 'Your Videos', path: '/dashboard' },
    { icon: '⏰', label: 'Watch Later', path: '/watch-later' },
    { icon: '👍', label: 'Liked Videos', path: '/liked' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`fixed left-0 top-16 h-full bg-yt-black border-r border-yt-gray transition-all duration-300 z-40 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="py-4">
        {menuItems.map((item, index) => (
          <React.Fragment key={item.path}>
            {item.divider && !collapsed && (
              <hr className="border-yt-gray my-3" />
            )}
            
            <Link
              to={item.path}
              className={`flex items-center px-4 py-3 hover:bg-yt-gray transition-colors ${
                isActive(item.path) ? 'bg-yt-gray' : ''
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : ''}
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && (
                <span className="ml-6 text-sm">{item.label}</span>
              )}
            </Link>
          </React.Fragment>
        ))}
        
        {!collapsed && user && (
          <>
            <hr className="border-yt-gray my-3" />
            <div className="px-4 py-2">
              <h3 className="text-sm font-semibold text-yt-light-gray mb-2">
                Subscriptions
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 py-1">
                  <div className="w-6 h-6 bg-yt-blue rounded-full"></div>
                  <span className="text-sm">Code Academy</span>
                </div>
                <div className="flex items-center space-x-3 py-1">
                  <div className="w-6 h-6 bg-yt-red rounded-full"></div>
                  <span className="text-sm">Web Dev Simplified</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
