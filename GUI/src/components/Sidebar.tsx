import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.scss';

const sidebarNavItems = [
  { display: 'Home', icon: <i className='bx bx-home'></i>, to: '/', section: '' },
  { display: 'About', icon: <i className='bx bx-info-circle'></i>, to: '/about', section: 'about' },
  { display: 'Services', icon: <i className='bx bx-cog'></i>, to: '/services', section: 'services' },
  { display: 'Contact', icon: <i className='bx bx-envelope'></i>, to: '/contact', section: 'contact' },
];

const Sidebar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const curPath = window.location.pathname.split('/')[1];
    const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  return (
    <div className='sidebar'>
      <div className="sidebar__logo">Menu</div>
      <div className="sidebar__menu">
        <div
          className="sidebar__menu__indicator"
          style={{
            transform: `translateY(${activeIndex * 60}px)`,
          }}
        ></div>
        {sidebarNavItems.map((item, index) => (
          <Link to={item.to} key={index} className="sidebar__menu__item">
            <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
