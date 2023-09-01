import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [city, setCity] = React.useState('City');
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        // id="basic-button"
        // aria-controls={open ? 'basic-menu' : undefined}
        // aria-haspopup="true"
        // aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ backgroundColor: 'white',
                borderColor: '#900c3f',
                color:"#e3e4e6",
                fontSize:"18px",
                fontFamily: 'Sans-serif',
                // fontWeight: 'bold',
                // borderRadius: '5px',
                // width: '100%',
                height: '100%',
                justifyContent: 'left',
                transition: 'none',
            }}
      >
        <span style={{ color:'black', fontWeight:'bold' }}>{city}</span>
        <ArrowDropDownIcon style={{color:'black'}}/>        
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {setAnchorEl(null); setCity('Dhaka')}}>Dhaka</MenuItem>
        <MenuItem onClick={handleClose}>Chattogram</MenuItem>
        <MenuItem onClick={handleClose}>Khulna</MenuItem>
      </Menu>
    </div>
  );
}