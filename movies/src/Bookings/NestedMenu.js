import React, { useState } from 'react';
import './MultiLevelDropdownMenu.css'; // You need to define your CSS styles
import { Box } from '@mui/material';

const MenuItem = ({ title, subItems }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <li className="menu-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {title}
      {isHovered && subItems && (
        <ul className="sub-menu">
          {subItems.map((subItem, index) => (
            <li key={index} className="sub-menu-item">
              {subItem.title}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const MultiLevelDropdownMenu = () => {
  const menuData = [
    {
      title: 'Main Item 1',
      subItems: [
        { title: 'Sub Item 1' },
        { title: 'Sub Item 2' },
      ],
    },
    {
      title: 'Main Item 2',
      subItems: [
        { title: 'Sub Item 3' },
        { title: 'Sub Item 4' },
      ],
    },
    // Add more menu items here
  ];

  return (
    <Box 
        className="multi-level-dropdown"
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        flexWrap={"wrap"}
    >
        <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            flexWrap={"wrap"}
        >
            <ul 
                className="menu"
                display={"flex"}
                flexDirection={"column"}
            >
                {menuData.map((menuItem, index) => (
                <MenuItem key={index} title={menuItem.title} subItems={menuItem.subItems} />
                ))}
            </ul>
        </Box>      
    </Box>
  );
};

export default MultiLevelDropdownMenu;