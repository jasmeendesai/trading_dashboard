import * as React from 'react';
import { styled} from '@mui/material/styles';

import {
    Box,
    AppBar as MuiAppBar,
    Toolbar,
    Typography,
    IconButton,
    MenuItem,
    Menu,
    Divider,
  } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import {useAppStore} from "../appStore"


const AppBar = styled(MuiAppBar)(({ theme}) => ({
    zIndex: theme.zIndex.drawer + 1,
  }));

export default function Navbar({Nifty, BankNifty, FinNifty}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const updateOpen = useAppStore((state) => state.updateOpen)
  const dopen = useAppStore((state) => state.dopen)

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Nifty : {Nifty}</MenuItem>
      <MenuItem onClick={handleMenuClose}>BankNifty : {BankNifty} </MenuItem>
      <MenuItem onClick={handleMenuClose}>FinNifty : {FinNifty} </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Box>
          <Typography noWrap component="div">
            Nifty : {Nifty}
          </Typography>
        </Box>
      </MenuItem>
      <Divider/>
      <MenuItem>
        <Box>
          <Typography noWrap component="div">
            BankNifty : {BankNifty}
          </Typography>
        </Box>
      </MenuItem>
      <Divider/>
      <MenuItem>
        <Box>
          <Typography noWrap component="div">
            FinNifty : {FinNifty}
          </Typography>
        </Box>
      </MenuItem>
      <Divider/>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" elevation={0} sx={{backgroundColor : "#fff", color : "#000"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={()=>updateOpen(!dopen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            TRADING-VIEW
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Box sx={{padding:"2px", marginRight: "10px", boxShadow: "0 4px 8px rgba(188, 221, 246, 0.99)", borderRadius: "5px"}}>
                <Typography
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
            >
                Nifty : {Nifty}
            </Typography>
            </Box>
            <Box sx={{padding:"2px", marginRight: "10px", boxShadow: "0 4px 8px rgba(188, 221, 246, 0.99)", borderRadius: "5px"}}>
            <Typography
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
            >
                BankNifty : {BankNifty}
            </Typography>
            </Box>
            <Box sx={{padding:"2px", marginRight: "10px", boxShadow: "0 4px 8px rgba(188, 221, 246, 0.99)", borderRadius: "5px"}}>
            <Typography
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
            >
                FinNifty : {FinNifty}
            </Typography>
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
