import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  Button,
  Avatar
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Games as GamesIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon,
  MenuBook as MenuBookIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { currentUser, signOut } = useAuth();

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Games', icon: <GamesIcon />, path: '/games' },
    { text: 'Learning', icon: <SchoolIcon />, path: '/learning' },
    { text: 'Stories', icon: <MenuBookIcon />, path: '/stories' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' }
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        {currentUser?.photoURL ? (
          <Avatar src={currentUser.photoURL} alt={currentUser.displayName || 'User'} />
        ) : (
          <Avatar>{currentUser?.displayName?.[0] || 'U'}</Avatar>
        )}
        <Typography variant="subtitle1">
          {currentUser?.displayName || 'User'}
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => {
              navigate(item.path);
              setDrawerOpen(false);
            }}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem 
          button 
          onClick={handleLogout}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
          >
            TN Happy Kids
          </Typography>
          {!isMobile && currentUser && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body1">
                {currentUser.displayName}
              </Typography>
              <Avatar 
                src={currentUser.photoURL || undefined}
                alt={currentUser.displayName || 'User'}
              />
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {drawer}
      </Drawer>
      <Toolbar /> {/* This creates space below the AppBar */}
    </>
  );
};

export default Navbar; 