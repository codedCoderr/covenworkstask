import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';

import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToApp from '@material-ui/icons/ExitToApp';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
// import ListSubheader from '@material-ui/core/ListSubheader';
import InfoIcon from '@material-ui/icons/Info';

const Copyright = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' to='https://codedcoder.com'>
        codedcoder
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};
const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};
const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
};
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  root2: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  toolbar: {
    paddingRight: 24
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper2: {
    position: 'absolute',
    width: 400,
    height: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const Dashboard = ({ logout }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [open, setOpen] = React.useState(false);
  const [openModal1, setOpenModal1] = React.useState(false);
  const [openModal2, setOpenModal2] = React.useState(false);
  const [openModal3, setOpenModal3] = React.useState(false);
  const [openModal4, setOpenModal4] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleModalOpen1 = () => {
    setOpenModal1(true);
    
  };
  const handleModalClose1 = () => {
    setOpenModal1(false);
  
  };
  const handleModalOpen2 = () => {
    setOpenModal2(true);
    
  };
  const handleModalClose2 = () => {
    setOpenModal2(false);
    
  };
  const handleModalOpen3 = () => {
    
    setOpenModal3(true);
  };
  const handleModalClose3 = () => {
    
    setOpenModal3(false);
  };
  const handleModalOpen4 = () => {
    
    setOpenModal4(true);
  };
  const handleModalClose4 = () => {
    setOpenModal4(false);
  };
  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='absolute'
        className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}>
            <MenuIcon />
          </IconButton>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <li style={{ listStyle: 'none' }}>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItem>
          </li>
          <li
            onClick={logout}
            style={{ listStyle: 'none', color: 'rgba(0,0,0,0.87)' }}>
            <Link to='/'>
              <ListItem button>
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText
                  style={{ color: 'rgba(0,0,0,0.87)' }}
                  primary='Logout'
                />
              </ListItem>
            </Link>
          </li>
        </List>
        <Divider />
    
      </Drawer>

      <main style={{ marginTop: '80px' }} className={classes.content}>
        <div className={classes.root2}>
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile
              key='Subheader'
              cols={2}
              style={{ height: 'auto' }}></GridListTile>

            <GridListTile key='1'>
              <img
                src='https://image.shutterstock.com/image-photo/atlanta-georgia-usa-downtown-skyline-260nw-1031967217.jpg'
                alt='Atlanta'
              />
              <Modal
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                open={openModal1}
                onClose={handleModalClose1}>
                <div style={modalStyle} className={classes.paper2}>
                  <h2>Atlanta</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi accumsan odio enim, non pharetra est ultrices et.
                  </p>
                </div>
              </Modal>
              <GridListTileBar
                title='Atlanta'
                actionIcon={
                  <IconButton
                    onClick={handleModalOpen1}
                    aria-label={`info about Atlanta`}
                    className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
            <GridListTile key='2'>
              <img
                src='https://image.shutterstock.com/image-photo/new-york-city-skyline-cityscape-260nw-57571180.jpg'
                alt='New York'
              />
              <Modal
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                open={openModal2}
                onClose={handleModalClose2}>
                <div style={modalStyle} className={classes.paper2}>
                  <h2>New York</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi accumsan odio enim, non pharetra est ultrices et.
                  </p>
                </div>
              </Modal>
              <GridListTileBar
                title='New York'
                actionIcon={
                  <IconButton
                    onClick={handleModalOpen2}
                    aria-label={`info about New York`}
                    className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
            <GridListTile key='3'>
              <img
                src='https://image.shutterstock.com/image-photo/amsterdam-skyline-shortly-after-sunset-260nw-128463995.jpg'
                alt='Amsterdam'
              />
              <Modal
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                open={openModal3}
                onClose={handleModalClose3}>
                <div style={modalStyle} className={classes.paper2}>
                  <h2>Amsterdam</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi accumsan odio enim, non pharetra est ultrices et.
                  </p>
                </div>
              </Modal>
              <GridListTileBar
                title='Amsterdam'
                actionIcon={
                  <IconButton
                    onClick={handleModalOpen3}
                    aria-label={`info about Amsterdam`}
                    className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
            <GridListTile key='4'>
              <img
                src='https://image.shutterstock.com/image-photo/big-ben-houses-parliament-london-260nw-107597459.jpg'
                alt='London'
              />
              <Modal
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                open={openModal4}
                onClose={handleModalClose4}>
                <div style={modalStyle} className={classes.paper2}>
                  <h2>London</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi accumsan odio enim, non pharetra est ultrices et.
                  </p>
                </div>
              </Modal>
              <GridListTileBar
                title='London'
                actionIcon={
                  <IconButton
                    onClick={handleModalOpen4}
                    aria-label={`info about London`}
                    className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          </GridList>
        </div>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
         
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
};
export default connect(
  null,
  { logout }
)(Dashboard);
