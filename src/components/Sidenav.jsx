import * as React from 'react';
import { styled} from '@mui/material/styles';
import {
  Box,
  Drawer as MuiDrawer,
  List,
  CssBaseline,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

import { compData } from '../dummyData';
import { useAppStore } from '../appStore';
import MainDiv from './MainDiv';



const drawerWidth = 240;


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',

    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidenav({Nifty}) {
  // const theme = useTheme();
  // const [open, setOpen] = React.useState(true);
  // const updateOpen = useAppStore((state) => state.updateOpen)
  const open = useAppStore((state) => state.dopen)
  const [value, setValue] = React.useState({
    symbol : "IBM",
    name : "International Business Machines Corporation",
    sector : "Technology"
  })

  const [interval, setInterval] = React.useState(1)

  const handleClick = (ele)=>{
    setValue(
      {
        symbol : ele.symbol,
        name : ele.name,
        sector : ele.sector
      }
    )
  }

  const handleChange = (e)=>{
    setInterval(e.target.value)
   
  }
  // console.log(interval)
  return (
    
    <Box sx={{ display: 'flex'}}>
      <CssBaseline  />

      <Drawer variant="permanent" open={open}  >
        {/* <DrawerHeader>
          <IconButton onClick={()=>setOpen(!open)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader> */}
        {/* <Divider /> */}
        <DrawerHeader/>
        <List>
          <ListItem >
          {open && <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Interval</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={interval}
          label="Interval"
          onChange={handleChange}
        >
          <MenuItem value={1}>1 Min</MenuItem>
          <MenuItem value={5}>5 Min</MenuItem>
          <MenuItem value={15}>15 Min</MenuItem>
        </Select>
      </FormControl>}
          </ListItem>
        {
          compData.map((ele,index)=>{
            return (
              <>
              <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }} onClick={()=> handleClick(ele)}>
                  <ListItemText primary={ele.symbol} secondary={ele.name}  sx={{ opacity: open ? 1 : 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }} />
            </ListItemButton>

            </ListItem>
              <Divider />
                    </>
            )
          })
        }
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
          <MainDiv Nifty={Nifty} sym={value.symbol} name={value.name} sector={value.sector} interval={interval}/>
      </Box>
    </Box>
  );
}



