import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


export default function BasicMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  
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
                color: "#e3e4e6",
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
        <span style={{ color: props.variant==1 ? 'black' : '#7c4699', fontWeight:'bold' }}>{props.selection}</span>
        <ArrowDropDownIcon style={{color: props.variant==1 ? 'black' : '#7c4699'}}/>        
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
        {
          props.option && props.option.map((city,index) => {
              return(
              <MenuItem 
                key={index} 
                onClick={() => {
                  setAnchorEl(null);
                  if(props.variant==2) {props.setTheatre(city.T_ID); props.setIsLocationSelected(true);} 
                  props.variant==1 ? props.setSelection(city?.NAME) : props.setSelection(city?.LOCATION)
                }}>
                  {props.variant == 1? city?.NAME : city?.LOCATION}
              </MenuItem>
              )
          })
        }
        {/* <MenuItem onClick={() => {setAnchorEl(null); setCity('Dhaka')}}>Dhaka</MenuItem>
        <MenuItem onClick={handleClose}>Chattogram</MenuItem>
        <MenuItem onClick={handleClose}>Khulna</MenuItem> */}
      </Menu>
    </div>
  );
}