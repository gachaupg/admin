import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// mock
import account from '../../../_mock/account';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import navConfig from './config';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,

}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const user = useSelector((state) => state.auth);

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
      <div>
              <Link to="/">
                <img
                  className="logo-text"
                  style={{
                    margin: ".2rem",
                    width: "3.5rem",
                    height: "3.5rem",
                    border: "none",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  src="https://res.cloudinary.com/pitz/image/upload/v1693046138/Capture01_hyu8ub.png"
                  alt=""
                />
              </Link>
            </div>
      </Box>

      <Box sx={{ mb: 4, mx: 2.5 }}>
        <Link underline="none">
          
          <StyledAccount className='accounts-name' >
            <Avatar src="https://res.cloudinary.com/pitz/image/upload/v1693412492/223223f5-5488-48db-a3e4-0e218c8022d8_ntr7dl.jpg" style={{objectFit:'contain'}} alt="photoURL" />

            <Box sx={{ ml: 1 }}>
              <Typography style={{fontSize:'1.3rem'}} variant="subtitle2" sx={{ color: 'black' }}>
              {user.name}
              </Typography>

              <Typography style={{fontSize:'1.2rem'}} variant="body2" sx={{ color: 'text.primary' }}>
                {user.email}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

      {/* <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
          <Box
            component="img"
            src="/assets/illustrations/illustration_avatar.png"
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6">
              Get more?
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              From only $69
            </Typography>
          </Box>

          <Button href="https://material-ui.com/store/items/minimal-dashboard/" target="_blank" variant="contained">
            Upgrade to Pro
          </Button>
        </Stack>
      </Box> */}
    </Scrollbar>
  );

  return (
    <Box
    style={{fontSize:'1.5rem'}} 
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
        style={{fontSize:'1.5rem'}} 
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              // bgcolor: 'background.default',
              borderRightStyle: 'dashed',
              fontSize:'1.5rem'
            },
          }}
        >
         <p  style={{fontSize:'1.5rem'}}  > {renderContent }</p>
        </Drawer>
      ) : (
        <Drawer
        style={{fontSize:'1.5rem'}} 
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH ,  fontSize:'1.3rem'},
          
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
