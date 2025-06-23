import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Table, 
  FileEdit, 
  FileText, 
  BarChart, 
  Menu, 
  X,
  User
} from 'lucide-react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Avatar, 
  Menu as MuiMenu, 
  MenuItem, 
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Box
} from '@mui/material';

const drawerWidth = 240;

function Layout() {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Tables', path: '/tables', icon: <Table size={20} /> },
    { name: 'Forms', path: '/forms', icon: <FileEdit size={20} /> },
    { name: 'PDF Generator', path: '/pdf', icon: <FileText size={20} /> },
    { name: 'Charts', path: '/charts', icon: <BarChart size={20} /> },
  ];
  
  const drawer = (
    <div className="h-full bg-white">
      <div className="p-4 flex items-center justify-between">
        <Typography variant="h6" className="font-bold text-primary-600">
          ResiSmart
        </Typography>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            <X size={20} />
          </IconButton>
        )}
      </div>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <Link to={item.path} key={item.name} className="text-gray-700 hover:no-underline">
            <ListItem 
              button 
              className={`my-1 mx-2 rounded-lg transition-colors ${
                location.pathname === item.path ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'
              }`}
            >
              <ListItemIcon className={location.pathname === item.path ? 'text-blue-600' : ''}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ 
          width: { md: drawerWidth }, 
          flexShrink: { md: 0 },
          '& .MuiDrawer-paper': { 
            width: drawerWidth, 
            boxSizing: 'border-box',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)'
          }
        }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer variant="permanent" open={drawerOpen}>
            {drawer}
          </Drawer>
        )}
      </Box>
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AppBar position="static" color="default" elevation={0} className="border-b border-gray-200">
          <Toolbar>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <Menu />
              </IconButton>
            )}
            <Typography variant="h6" className="flex-grow font-medium">
              {menuItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
            </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleProfileMenu}
                color="inherit"
              >
                <Avatar className="bg-blue-500">
                  <User size={20} />
                </Avatar>
              </IconButton>
              <MuiMenu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </MuiMenu>
            </div>
          </Toolbar>
        </AppBar>
        
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;