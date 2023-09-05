import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem style={{fontSize:'3rem'}} key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem 
   
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'white',
          
          fontSize:'1.5rem',
          fontWeight: 'fontWeightBold',
          backgroundColor:'red'
          
        },
      }}
    >
      <StyledNavItemIcon style={{ fontSize:'1.5rem',
         color: 'white',
         fontSize:'1.5rem',}}>{icon && icon}</StyledNavItemIcon>

      <ListItemText style={{ fontSize:'1.5rem',
         color: 'white',
         fontSize:'1.5rem',}} disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
