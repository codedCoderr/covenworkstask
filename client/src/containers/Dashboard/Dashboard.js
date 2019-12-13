import React, { useState, Fragment } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';

import uuid from 'uuid/v4';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TextField from '@material-ui/core/TextField';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import moment from 'moment';
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
import { fetchArrivals, fetchDepartures } from '../../actions/flightInfo';
import Container from '@material-ui/core/Container';
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
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const useStyles2 = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: 'auto',
    maxHeight: 400,
    overflow: 'auto'
  }
}));

const getModalStyle = () => {
  const top = 50;
  const left = 50;
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
    // overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: '85vw',
    height: 557
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
    height: '100vh'
    // overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  try: {
    width: 'auto',
    fontSize: '2px'
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
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginLeft: '10px'
  },
  submitt: {
    cursor:'pointer',
    marginLeft: '10px',
    border: '1px solid black',
    borderRadius: '10%',
    backgroundColor: 'lightgrey'
  },
  submittt: {
    margin: '10px'
  },
  paper2: {
    position: 'absolute',
    width: '90vw',
    height: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

const Dashboard = ({
  logout,
  arrivals,
  departures,
  fetchArrivals,
  fetchDepartures,
  loading
}) => {
  const [formData, setFormData] = useState({
    days1: 'Select',
    days1b: 'Select',
    days2: 'Select',
    days2b: 'Select',
    days3: 'Select',
    days3b: 'Select',
    days4: 'Select',
    days4b: 'Select',
    days5: 'Select',
    days5b: 'Select',
    days6: 'Select',
    days6b: 'Select',
    days7: 'Select',
    days7b: 'Select',
    days8: 'Select',
    days8b: 'Select',
    days9: 'Select',
    days9b: 'Select',
    days10: 'Select',
    days10b: 'Select'
  });
  const {
    days1,
    days1b,
    days2,
    days2b,
    days3,
    days3b,
    days4,
    days4b,
    days5,
    days5b,
    days6,
    days6b,
    days7,
    days7b,
    days8,
    days8b,
    days9,
    days9b,
    days10,
    days10b
  } = formData;
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const classes2 = useStyles2();
  const [open, setOpen] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [openModal4, setOpenModal4] = useState(false);
  const [openModal5, setOpenModal5] = useState(false);
  const [openModal6, setOpenModal6] = useState(false);
  const [openModal7, setOpenModal7] = useState(false);
  const [openModal8, setOpenModal8] = useState(false);
  const [openModal9, setOpenModal9] = useState(false);
  const [openModal10, setOpenModal10] = useState(false);
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
    window.location.reload();
    setOpenModal1(false);
  };
  const handleModalOpen2 = () => {
    setOpenModal2(true);
  };
  const handleModalClose2 = () => {
    window.location.reload();

    setOpenModal2(false);
  };
  const handleModalOpen3 = () => {
    setOpenModal3(true);
  };
  const handleModalClose3 = () => {
    window.location.reload();

    setOpenModal3(false);
  };

  const handleModalOpen4 = () => {
    setOpenModal4(true);
  };
  const handleModalClose4 = () => {
    window.location.reload();
    setOpenModal4(false);
  };
  const handleModalOpen5 = () => {
    setOpenModal5(true);
  };
  const handleModalClose5 = () => {
    window.location.reload();
    setOpenModal5(false);
  };
  const handleModalOpen6 = () => {
    setOpenModal6(true);
  };
  const handleModalClose6 = () => {
    window.location.reload();
    setOpenModal6(false);
  };
  const handleModalOpen7 = () => {
    setOpenModal7(true);
  };
  const handleModalClose7 = () => {
    window.location.reload();
    setOpenModal7(false);
  };
  const handleModalOpen8 = () => {
    setOpenModal8(true);
  };
  const handleModalClose8 = () => {
    window.location.reload();
    setOpenModal8(false);
  };
  const handleModalOpen9 = () => {
    setOpenModal9(true);
  };
  const handleModalClose9 = () => {
    window.location.reload();
    setOpenModal9(false);
  };
  const handleModalOpen10 = () => {
    setOpenModal10(true);
  };
  const handleModalClose10 = () => {
    window.location.reload();
    setOpenModal10(false);
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
          <GridList cols={4} cellHeight={180} className={classes.gridList}>
            <GridListTile
              key='Subheader'
              cols={4}
              style={{ height: 'auto' }}></GridListTile>
            <GridListTile
              style={{ cursor: 'pointer' }}
              onClick={handleModalOpen1}
              key='1'>
              <img
                src='https://image.shutterstock.com/image-photo/atlanta-georgia-usa-downtown-skyline-260nw-1031967217.jpg'
                alt='Hartsfield–Jackson Atlanta International Airport'
              />
              <Modal
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                open={openModal1}
                onClose={handleModalClose1}>
                <div style={modalStyle} className={classes.paper2}>
                  <h2>Hartsfield–Jackson Atlanta International Airport</h2>
                  <Paper className={classes2.root}>
                    <div className={classes2.tableWrapper}>
                      <div className=''>
                        <h6>
                          <strong>Arriving flights in the last</strong>{' '}
                          <select
                            variant='contained'
                            color='primary'
                            className={classes.submitt}
                            name='days1'
                            value={days1}
                            onChange={e => {
                              onChange(e);
                            }}>
                            <option  value='Select'>
                              Select
                            </option>
                            <option value='1'>1 day</option>
                            <option value='3'> 3 days</option>
                            <option value='7'>7 days</option>
                          </select>{' '}
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={() => fetchArrivals('KATL', days1)}>
                            Search
                          </Button>
                        </h6>
                        {/* <div className='col s12 m6' style={{ marginTop: 10 }}>
                          
                        </div> */}
                        {arrivals.length <= 0 ? (
                          'No records found'
                        ) : (
                          <Fragment>
                            <Table
                              stickyHeader
                              className={classes2.table}
                              aria-label='custom pagination sticky table'>
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell>icao24</StyledTableCell>

                                  <StyledTableCell align='right'>
                                    Departure Airport
                                  </StyledTableCell>
                                  <StyledTableCell align='right'>
                                    Time of Arrival
                                  </StyledTableCell>
                                  <StyledTableCell align='right'>
                                    Time of Departure
                                  </StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {arrivals.data.map(row => (
                                  <TableRow key={uuid()}>
                                    <TableCell component='th' scope='row'>
                                      {row.icao24}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {row.estDepartureAirport === null
                                        ? 'N/A'
                                        : row.estDepartureAirport}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {moment
                                        .unix(row.firstSeen)
                                        .format('MMMM Do YYYY, hh:mm:ss a')}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {moment
                                        .unix(row.lastSeen)
                                        .format('MMMM Do YYYY, hh:mm:ss a')}
                                    </TableCell>
                                  </TableRow>
                                ))}
                                }
                              </TableBody>
                            </Table>
                          </Fragment>
                        )}
                        <h6>
                          {' '}
                          <strong>Departing flights in the last </strong>
                          <select
                            variant='contained'
                            color='primary'
                            className={classes.submitt}
                            name='days1b'
                            value={days1b}
                            onChange={e => {
                              onChange(e);
                            }}>
                            <option value='Select'>Select</option>
                            <option value='1'>1 day</option>
                            <option value='3'> 3 days</option>
                            <option value='7'>7 days</option>
                          </select>
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={() => fetchDepartures('KATL', days1b)}>
                            Search
                          </Button>
                        </h6>
                        {/* <div className='col s12 m6' style={{ marginTop: 10 }}>
                          
                        </div> */}
                      </div>

                      {departures.length <= 0 ? (
                        'No records found'
                      ) : (
                        <Fragment>
                          <Table
                            stickyHeader
                            className={classes2.table}
                            aria-label='custom pagination sticky table'>
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>icao24</StyledTableCell>

                                <StyledTableCell align='right'>
                                  Arrival Airport
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                  Time of Departure
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                  Time of Arrival
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {departures.data.map(row => (
                                <TableRow key={uuid()}>
                                  <TableCell component='th' scope='row'>
                                    {row.icao24}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {row.estArrivalAirport === null
                                      ? 'N/A'
                                      : row.estArrivalAirport}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {moment
                                      .unix(row.firstSeen)
                                      .format('MMMM Do YYYY, hh:mm:ss a')}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {moment
                                      .unix(row.lastSeen)
                                      .format('MMMM Do YYYY, hh:mm:ss a')}
                                  </TableCell>
                                </TableRow>
                              ))}
                              }
                            </TableBody>
                          </Table>
                        </Fragment>
                      )}
                    </div>
                  </Paper>
                </div>
              </Modal>
              <GridListTileBar
                title='Hartsfield–Jackson Atlanta International Airport'
                actionIcon={
                  <IconButton
                    onClick={handleModalOpen1}
                    aria-label={`info about Hartsfield–Jackson Atlanta International Airport`}
                    className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
            <GridListTile
              style={{ cursor: 'pointer' }}
              onClick={handleModalOpen2}
              key='2'>
              <img
                src='https://image.shutterstock.com/image-photo/new-york-city-skyline-cityscape-260nw-57571180.jpg'
                alt='Denver International Airport'
              />
              <Modal
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                open={openModal2}
                onClose={handleModalClose2}>
                <div style={modalStyle} className={classes.paper2}>
                  <h2>Denver International Airport</h2>
                  <Paper className={classes2.root}>
                    <div className={classes2.tableWrapper}>
                      <div className=''>
                        <h6>
                          <strong>Arriving flights in the last</strong>{' '}
                          <select
                            variant='contained'
                            color='primary'
                            className={classes.submitt}
                            name='days2'
                            value={days2}
                            onChange={e => {
                              onChange(e);
                            }}>
                            <option value='Select'>Select</option>
                            <option value='1'>1 day</option>
                            <option value='3'> 3 days</option>
                            <option value='7'>7 days</option>
                          </select>{' '}
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={() => fetchArrivals('KDEN', days2)}>
                            Search
                          </Button>
                        </h6>
                        {/* <div className='col s12 m6' style={{ marginTop: 10 }}>
                          
                        </div> */}
                        {arrivals.length <= 0 ? (
                          'No records found'
                        ) : (
                          <Fragment>
                            <Table
                              stickyHeader
                              className={classes2.table}
                              aria-label='custom pagination sticky table'>
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell>icao24</StyledTableCell>

                                  <StyledTableCell align='right'>
                                    Departure Airport
                                  </StyledTableCell>
                                  <StyledTableCell align='right'>
                                    Time of Arrival
                                  </StyledTableCell>
                                  <StyledTableCell align='right'>
                                    Time of Departure
                                  </StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {arrivals.data.map(row => (
                                  <TableRow key={uuid()}>
                                    <TableCell component='th' scope='row'>
                                      {row.icao24}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {row.estDepartureAirport === null
                                        ? 'N/A'
                                        : row.estDepartureAirport}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {moment
                                        .unix(row.firstSeen)
                                        .format('MMMM Do YYYY, hh:mm:ss a')}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {moment
                                        .unix(row.lastSeen)
                                        .format('MMMM Do YYYY, hh:mm:ss a')}
                                    </TableCell>
                                  </TableRow>
                                ))}
                                }
                              </TableBody>
                            </Table>
                          </Fragment>
                        )}
                        <h6>
                          {' '}
                          <strong>Departing flights in the last </strong>
                          <select
                            variant='contained'
                            color='primary'
                            className={classes.submitt}
                            name='days2b'
                            value={days2b}
                            onChange={e => {
                              onChange(e);
                            }}>
                            <option value='Select'>Select</option>
                            <option value='1'>1 day</option>
                            <option value='3'> 3 days</option>
                            <option value='7'>7 days</option>
                          </select>
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={() => fetchDepartures('KDEN', days2b)}>
                            Search
                          </Button>
                        </h6>
                        {/* <div className='col s12 m6' style={{ marginTop: 10 }}>
                          
                        </div> */}
                      </div>

                      {departures.length <= 0 ? (
                        'No records found'
                      ) : (
                        <Fragment>
                          <Table
                            stickyHeader
                            className={classes2.table}
                            aria-label='custom pagination sticky table'>
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>icao24</StyledTableCell>

                                <StyledTableCell align='right'>
                                  Arrival Airport
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                  Time of Departure
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                  Time of Arrival
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {departures.data.map(row => (
                                <TableRow key={uuid()}>
                                  <TableCell component='th' scope='row'>
                                    {row.icao24}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {row.estArrivalAirport === null
                                      ? 'N/A'
                                      : row.estArrivalAirport}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {moment
                                      .unix(row.firstSeen)
                                      .format('MMMM Do YYYY, hh:mm:ss a')}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {moment
                                      .unix(row.lastSeen)
                                      .format('MMMM Do YYYY, hh:mm:ss a')}
                                  </TableCell>
                                </TableRow>
                              ))}
                              }
                            </TableBody>
                          </Table>
                        </Fragment>
                      )}
                    </div>
                  </Paper>
                </div>
              </Modal>

              <GridListTileBar
                title='Denver International Airport'
                actionIcon={
                  <IconButton
                    onClick={handleModalOpen2}
                    aria-label={`info about Denver International Airport`}
                    className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
            <GridListTile
              style={{ cursor: 'pointer' }}
              onClick={handleModalOpen3}
              key='3'>
              <img
                src='https://image.shutterstock.com/image-photo/amsterdam-skyline-shortly-after-sunset-260nw-128463995.jpg'
                alt='Dubai International Airport'
              />
              <Modal
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                open={openModal3}
                onClose={handleModalClose3}>
                <div style={modalStyle} className={classes.paper2}>
                  <h2>Dubai International Airport</h2>
                  <Paper className={classes2.root}>
                    <div className={classes2.tableWrapper}>
                      <div className=''>
                        <h6>
                          <strong>Arriving flights in the last</strong>{' '}
                          <select
                            variant='contained'
                            color='primary'
                            className={classes.submitt}
                            name='days3'
                            value={days3}
                            onChange={e => {
                              onChange(e);
                            }}>
                            <option value='Select'>Select</option>
                            <option value='1'>1 day</option>
                            <option value='3'> 3 days</option>
                            <option value='7'>7 days</option>
                          </select>{' '}
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={() => fetchArrivals('OMDB', days3)}>
                            Search
                          </Button>
                        </h6>
                        {/* <div className='col s12 m6' style={{ marginTop: 10 }}>
                          
                        </div> */}
                        {arrivals.length <= 0 ? (
                          'No records found'
                        ) : (
                          <Fragment>
                            <Table
                              stickyHeader
                              className={classes2.table}
                              aria-label='custom pagination sticky table'>
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell>icao24</StyledTableCell>

                                  <StyledTableCell align='right'>
                                    Departure Airport
                                  </StyledTableCell>
                                  <StyledTableCell align='right'>
                                    Time of Arrival
                                  </StyledTableCell>
                                  <StyledTableCell align='right'>
                                    Time of Departure
                                  </StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {arrivals.data.map(row => (
                                  <TableRow key={uuid()}>
                                    <TableCell component='th' scope='row'>
                                      {row.icao24}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {row.estDepartureAirport === null
                                        ? 'N/A'
                                        : row.estDepartureAirport}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {moment
                                        .unix(row.firstSeen)
                                        .format('MMMM Do YYYY, hh:mm:ss a')}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {moment
                                        .unix(row.lastSeen)
                                        .format('MMMM Do YYYY, hh:mm:ss a')}
                                    </TableCell>
                                  </TableRow>
                                ))}
                                }
                              </TableBody>
                            </Table>
                          </Fragment>
                        )}
                        <h6>
                          {' '}
                          <strong>Departing flights in the last </strong>
                          <select
                            variant='contained'
                            color='primary'
                            className={classes.submitt}
                            name='days3b'
                            value={days3b}
                            onChange={e => {
                              onChange(e);
                            }}>
                            <option value='Select'>Select</option>
                            <option value='1'>1 day</option>
                            <option value='3'> 3 days</option>
                            <option value='7'>7 days</option>
                          </select>
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={() => fetchDepartures('OMDB', days3b)}>
                            Search
                          </Button>
                        </h6>
                        {/* <div className='col s12 m6' style={{ marginTop: 10 }}>
                          
                        </div> */}
                      </div>

                      {departures.length <= 0 ? (
                        'No records found'
                      ) : (
                        <Fragment>
                          <Table
                            stickyHeader
                            className={classes2.table}
                            aria-label='custom pagination sticky table'>
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>icao24</StyledTableCell>

                                <StyledTableCell align='right'>
                                  Arrival Airport
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                  Time of Departure
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                  Time of Arrival
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {departures.data.map(row => (
                                <TableRow key={uuid()}>
                                  <TableCell component='th' scope='row'>
                                    {row.icao24}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {row.estArrivalAirport === null
                                      ? 'N/A'
                                      : row.estArrivalAirport}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {moment
                                      .unix(row.firstSeen)
                                      .format('MMMM Do YYYY, hh:mm:ss a')}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {moment
                                      .unix(row.lastSeen)
                                      .format('MMMM Do YYYY, hh:mm:ss a')}
                                  </TableCell>
                                </TableRow>
                              ))}
                              }
                            </TableBody>
                          </Table>
                        </Fragment>
                      )}
                    </div>
                  </Paper>
                </div>
              </Modal>

              <GridListTileBar
                title='Dubai International Airport'
                actionIcon={
                  <IconButton
                    onClick={handleModalOpen3}
                    aria-label={`info about Dubai International Airport`}
                    className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>

            <GridListTile
              style={{ cursor: 'pointer' }}
              onClick={handleModalOpen4}
              key='4'>
              <img
                src='https://image.shutterstock.com/image-photo/big-ben-houses-parliament-london-260nw-107597459.jpg'
                alt='Los Angeles International Airport'
              />
              <Modal
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                open={openModal4}
                onClose={handleModalClose4}>
                <div style={modalStyle} className={classes.paper2}>
                  <h2>Los Angeles International Airport</h2>
                  <Paper className={classes2.root}>
                    <div className={classes2.tableWrapper}>
                      <div className=''>
                        <h6>
                          <strong>Arriving flights in the last</strong>{' '}
                          <select
                            variant='contained'
                            color='primary'
                            className={classes.submitt}
                            name='days4'
                            value={days4}
                            onChange={e => {
                              onChange(e);
                            }}>
                            <option value='Select'>Select</option>
                            <option value='1'>1 day</option>
                            <option value='3'> 3 days</option>
                            <option value='7'>7 days</option>
                          </select>{' '}
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={() => fetchArrivals('KLAX', days4)}>
                            Search
                          </Button>
                        </h6>
                        {/* <div className='col s12 m6' style={{ marginTop: 10 }}>
                          
                        </div> */}
                        {arrivals.length <= 0 ? (
                          'No records found'
                        ) : (
                          <Fragment>
                            <Table
                              stickyHeader
                              className={classes2.table}
                              aria-label='custom pagination sticky table'>
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell>icao24</StyledTableCell>

                                  <StyledTableCell align='right'>
                                    Departure Airport
                                  </StyledTableCell>
                                  <StyledTableCell align='right'>
                                    Time of Arrival
                                  </StyledTableCell>
                                  <StyledTableCell align='right'>
                                    Time of Departure
                                  </StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {arrivals.data.map(row => (
                                  <TableRow key={uuid()}>
                                    <TableCell component='th' scope='row'>
                                      {row.icao24}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {row.estDepartureAirport === null
                                        ? 'N/A'
                                        : row.estDepartureAirport}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {moment
                                        .unix(row.firstSeen)
                                        .format('MMMM Do YYYY, hh:mm:ss a')}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {moment
                                        .unix(row.lastSeen)
                                        .format('MMMM Do YYYY, hh:mm:ss a')}
                                    </TableCell>
                                  </TableRow>
                                ))}
                                }
                              </TableBody>
                            </Table>
                          </Fragment>
                        )}
                        <h6>
                          {' '}
                          <strong>Departing flights in the last </strong>
                          <select
                            variant='contained'
                            color='primary'
                            className={classes.submitt}
                            name='days4b'
                            value={days4b}
                            onChange={e => {
                              onChange(e);
                            }}>
                            <option value='Select'>Select</option>
                            <option value='1'>1 day</option>
                            <option value='3'> 3 days</option>
                            <option value='7'>7 days</option>
                          </select>
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={() => fetchDepartures('KLAX', days4b)}>
                            Search
                          </Button>
                        </h6>
                        {/* <div className='col s12 m6' style={{ marginTop: 10 }}>
                          
                        </div> */}
                      </div>

                      {departures.length <= 0 ? (
                        'No records found'
                      ) : (
                        <Fragment>
                          <Table
                            stickyHeader
                            className={classes2.table}
                            aria-label='custom pagination sticky table'>
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>icao24</StyledTableCell>

                                <StyledTableCell align='right'>
                                  Arrival Airport
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                  Time of Departure
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                  Time of Arrival
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {departures.data.map(row => (
                                <TableRow key={uuid()}>
                                  <TableCell component='th' scope='row'>
                                    {row.icao24}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {row.estArrivalAirport === null
                                      ? 'N/A'
                                      : row.estArrivalAirport}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {moment
                                      .unix(row.firstSeen)
                                      .format('MMMM Do YYYY, hh:mm:ss a')}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {moment
                                      .unix(row.lastSeen)
                                      .format('MMMM Do YYYY, hh:mm:ss a')}
                                  </TableCell>
                                </TableRow>
                              ))}
                              }
                            </TableBody>
                          </Table>
                        </Fragment>
                      )}
                    </div>
                  </Paper>
                </div>
              </Modal>

              <GridListTileBar
                title='Los Angeles International Airport'
                actionIcon={
                  <IconButton
                    onClick={handleModalOpen4}
                    aria-label={`info about Los Angeles International Airport`}
                    className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
            <GridListTile
              style={{ cursor: 'pointer' }}
              onClick={handleModalOpen5}
              key='5'>
              <img
                src='https://image.shutterstock.com/image-photo/tokyo-november-13-billboards-shinjukus-600w-1012724596.jpg'
                alt='Tokyo Haneda Airport'
                
              />
              <Modal
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                open={openModal5}
                onClose={handleModalClose5}>
                <div style={modalStyle} className={classes.paper2}>
                  <h2>Tokyo Haneda Airport</h2>
                  <Paper className={classes2.root}>
                    <div className={classes2.tableWrapper}>
                      <div className=''>
                        <h6>
                          <strong>Arriving flights in the last</strong>{' '}
                          <select
                            variant='contained'
                            color='primary'
                            className={classes.submitt}
                            name='days5'
                            value={days5}
                            onChange={e => {
                              onChange(e);
                            }}>
                            <option value='Select'>Select</option>
                            <option value='1'>1 day</option>
                            <option value='3'> 3 days</option>
                            <option value='7'>7 days</option>
                          </select>{' '}
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={() => fetchArrivals('RJTT', days5)}>
                            Search
                          </Button>
                        </h6>
                        {/* <div className='col s12 m6' style={{ marginTop: 10 }}>
                          
                        </div> */}
                        {arrivals.length <= 0 ? (
                          'No records found'
                        ) : (
                          <Fragment>
                            <Table
                              stickyHeader
                              className={classes2.table}
                              aria-label='custom pagination sticky table'>
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell>icao24</StyledTableCell>

                                  <StyledTableCell align='right'>
                                    Departure Airport
                                  </StyledTableCell>
                                  <StyledTableCell align='right'>
                                    Time of Arrival
                                  </StyledTableCell>
                                  <StyledTableCell align='right'>
                                    Time of Departure
                                  </StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {arrivals.data.map(row => (
                                  <TableRow key={uuid()}>
                                    <TableCell component='th' scope='row'>
                                      {row.icao24}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {row.estDepartureAirport === null
                                        ? 'N/A'
                                        : row.estDepartureAirport}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {moment
                                        .unix(row.firstSeen)
                                        .format('MMMM Do YYYY, hh:mm:ss a')}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {moment
                                        .unix(row.lastSeen)
                                        .format('MMMM Do YYYY, hh:mm:ss a')}
                                    </TableCell>
                                  </TableRow>
                                ))}
                                }
                              </TableBody>
                            </Table>
                          </Fragment>
                        )}
                        <h6>
                          {' '}
                          <strong>Departing flights in the last </strong>
                          <select
                            variant='contained'
                            color='primary'
                            className={classes.submitt}
                            name='days5b'
                            value={days5b}
                            onChange={e => {
                              onChange(e);
                            }}>
                            <option value='Select'>Select</option>
                            <option value='1'>1 day</option>
                            <option value='3'> 3 days</option>
                            <option value='7'>7 days</option>
                          </select>
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={() => fetchDepartures('RJTT', days5b)}>
                            Search
                          </Button>
                        </h6>
                        {/* <div className='col s12 m6' style={{ marginTop: 10 }}>
                          
                        </div> */}
                      </div>

                      {departures.length <= 0 ? (
                        'No records found'
                      ) : (
                        <Fragment>
                          <Table
                            stickyHeader
                            className={classes2.table}
                            aria-label='custom pagination sticky table'>
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>icao24</StyledTableCell>

                                <StyledTableCell align='right'>
                                  Arrival Airport
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                  Time of Departure
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                  Time of Arrival
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {departures.data.map(row => (
                                <TableRow key={uuid()}>
                                  <TableCell component='th' scope='row'>
                                    {row.icao24}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {row.estArrivalAirport === null
                                      ? 'N/A'
                                      : row.estArrivalAirport}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {moment
                                      .unix(row.firstSeen)
                                      .format('MMMM Do YYYY, hh:mm:ss a')}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {moment
                                      .unix(row.lastSeen)
                                      .format('MMMM Do YYYY, hh:mm:ss a')}
                                  </TableCell>
                                </TableRow>
                              ))}
                              }
                            </TableBody>
                          </Table>
                        </Fragment>
                      )}
                    </div>
                  </Paper>
                </div>
              </Modal>

              <GridListTileBar
                title='Tokyo Haneda Airport'
                actionIcon={
                  <IconButton
                    onClick={handleModalOpen5}
                    aria-label={`info about Tokyo Haneda Airport`}
                    className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
            <GridListTile
              style={{ cursor: 'pointer' }}
              onClick={handleModalOpen6}
              key='6'>
              <img
                src='https://image.shutterstock.com/image-photo/tower-bridge-london-uk-sunset-600w-651736369.jpg'
                alt='Heathrow Airport'
              />
              <Modal
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                open={openModal6}
                onClose={handleModalClose6}>
                <div style={modalStyle} className={classes.paper2}>
                  <h2>Heathrow Airport</h2>
                  <Paper className={classes2.root}>
                    <div className={classes2.tableWrapper}>
                      <div className=''>
                        <h6>
                          <strong>Arriving flights in the last</strong>{' '}
                          <select
                            variant='contained'
                            color='primary'
                            className={classes.submitt}
                            name='days6'
                            value={days6}
                            onChange={e => {
                              onChange(e);
                            }}>
                            <option value='Select'>Select</option>
                            <option value='1'>1 day</option>
                            <option value='3'> 3 days</option>
                            <option value='7'>7 days</option>
                          </select>{' '}
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={() => fetchArrivals('EGLL', days6)}>
                            Search
                          </Button>
                        </h6>
                        {/* <div className='col s12 m6' style={{ marginTop: 10 }}>
                          
                        </div> */}
                        {arrivals.length <= 0 ? (
                          'No records found'
                        ) : (
                          <Fragment>
                            <Table
                              stickyHeader
                              className={classes2.table}
                              aria-label='custom pagination sticky table'>
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell>icao24</StyledTableCell>

                                  <StyledTableCell align='right'>
                                    Departure Airport
                                  </StyledTableCell>
                                  <StyledTableCell align='right'>
                                    Time of Arrival
                                  </StyledTableCell>
                                  <StyledTableCell align='right'>
                                    Time of Departure
                                  </StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {arrivals.data.map(row => (
                                  <TableRow key={uuid()}>
                                    <TableCell component='th' scope='row'>
                                      {row.icao24}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {row.estDepartureAirport === null
                                        ? 'N/A'
                                        : row.estDepartureAirport}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {moment
                                        .unix(row.firstSeen)
                                        .format('MMMM Do YYYY, hh:mm:ss a')}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {moment
                                        .unix(row.lastSeen)
                                        .format('MMMM Do YYYY, hh:mm:ss a')}
                                    </TableCell>
                                  </TableRow>
                                ))}
                                }
                              </TableBody>
                            </Table>
                          </Fragment>
                        )}
                        <h6>
                          {' '}
                          <strong>Departing flights in the last </strong>
                          <select
                            variant='contained'
                            color='primary'
                            className={classes.submitt}
                            name='days6b'
                            value={days6b}
                            onChange={e => {
                              onChange(e);
                            }}>
                            <option value='Select'>Select</option>
                            <option value='1'>1 day</option>
                            <option value='3'> 3 days</option>
                            <option value='7'>7 days</option>
                          </select>
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={() => fetchDepartures('EGLL', days6b)}>
                            Search
                          </Button>
                        </h6>
                        {/* <div className='col s12 m6' style={{ marginTop: 10 }}>
                          
                        </div> */}
                      </div>

                      {departures.length <= 0 ? (
                        'No records found'
                      ) : (
                        <Fragment>
                          <Table
                            stickyHeader
                            className={classes2.table}
                            aria-label='custom pagination sticky table'>
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>icao24</StyledTableCell>

                                <StyledTableCell align='right'>
                                  Arrival Airport
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                  Time of Departure
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                  Time of Arrival
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {departures.data.map(row => (
                                <TableRow key={uuid()}>
                                  <TableCell component='th' scope='row'>
                                    {row.icao24}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {row.estArrivalAirport === null
                                      ? 'N/A'
                                      : row.estArrivalAirport}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {moment
                                      .unix(row.firstSeen)
                                      .format('MMMM Do YYYY, hh:mm:ss a')}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {moment
                                      .unix(row.lastSeen)
                                      .format('MMMM Do YYYY, hh:mm:ss a')}
                                  </TableCell>
                                </TableRow>
                              ))}
                              }
                            </TableBody>
                          </Table>
                        </Fragment>
                      )}
                    </div>
                  </Paper>
                </div>
              </Modal>

              <GridListTileBar
                title='Heathrow Airport'
                actionIcon={
                  <IconButton
                    onClick={handleModalOpen6}
                    aria-label={`info about Heathrow Airport`}
                    className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
            <GridListTile
              style={{ cursor: 'pointer' }}
              onClick={handleModalOpen7}
              key='7'>
              <img
                src='https://image.shutterstock.com/image-photo/chicago-river-downtown-skyline-usa-600w-478361827.jpg'
                alt='O Hare International Airport'
              />
              <Modal
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                open={openModal7}
                onClose={handleModalClose7}>
                <div style={modalStyle} className={classes.paper2}>
                  <h2>O Hare International Airport</h2>
                  <Paper className={classes2.root}>
                    <div className={classes2.tableWrapper}>
                      <div className=''>
                        <h6>
                          <strong>Arriving flights in the last</strong>{' '}
                          <select
                            variant='contained'
                            color='primary'
                            className={classes.submitt}
                            name='days7'
                            value={days7}
                            onChange={e => {
                              onChange(e);
                            }}>
                            <option value='Select'>Select</option>
                            <option value='1'>1 day</option>
                            <option value='3'> 3 days</option>
                            <option value='7'>7 days</option>
                          </select>{' '}
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={() => fetchArrivals('KORD', days7)}>
                            Search
                          </Button>
                        </h6>
                        {/* <div className='col s12 m6' style={{ marginTop: 10 }}>
                          
                        </div> */}
                        {arrivals.length <= 0 ? (
                          'No records found'
                        ) : (
                          <Fragment>
                            <Table
                              stickyHeader
                              className={classes2.table}
                              aria-label='custom pagination sticky table'>
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell>icao24</StyledTableCell>

                                  <StyledTableCell align='right'>
                                    Departure Airport
                                  </StyledTableCell>
                                  <StyledTableCell align='right'>
                                    Time of Arrival
                                  </StyledTableCell>
                                  <StyledTableCell align='right'>
                                    Time of Departure
                                  </StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {arrivals.data.map(row => (
                                  <TableRow key={uuid()}>
                                    <TableCell component='th' scope='row'>
                                      {row.icao24}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {row.estDepartureAirport === null
                                        ? 'N/A'
                                        : row.estDepartureAirport}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {moment
                                        .unix(row.firstSeen)
                                        .format('MMMM Do YYYY, hh:mm:ss a')}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {moment
                                        .unix(row.lastSeen)
                                        .format('MMMM Do YYYY, hh:mm:ss a')}
                                    </TableCell>
                                  </TableRow>
                                ))}
                                }
                              </TableBody>
                            </Table>
                          </Fragment>
                        )}
                        <h6>
                          {' '}
                          <strong>Departing flights in the last </strong>
                          <select
                            variant='contained'
                            color='primary'
                            className={classes.submitt}
                            name='days7b'
                            value={days7b}
                            onChange={e => {
                              onChange(e);
                            }}>
                            <option value='Select'>Select</option>
                            <option value='1'>1 day</option>
                            <option value='3'> 3 days</option>
                            <option value='7'>7 days</option>
                          </select>
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={() => fetchDepartures('KORD', days7b)}>
                            Search
                          </Button>
                        </h6>
                        {/* <div className='col s12 m6' style={{ marginTop: 10 }}>
                          
                        </div> */}
                      </div>

                      {departures.length <= 0 ? (
                        'No records found'
                      ) : (
                        <Fragment>
                          <Table
                            stickyHeader
                            className={classes2.table}
                            aria-label='custom pagination sticky table'>
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>icao24</StyledTableCell>

                                <StyledTableCell align='right'>
                                  Arrival Airport
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                  Time of Departure
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                  Time of Arrival
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {departures.data.map(row => (
                                <TableRow key={uuid()}>
                                  <TableCell component='th' scope='row'>
                                    {row.icao24}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {row.estArrivalAirport === null
                                      ? 'N/A'
                                      : row.estArrivalAirport}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {moment
                                      .unix(row.firstSeen)
                                      .format('MMMM Do YYYY, hh:mm:ss a')}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {moment
                                      .unix(row.lastSeen)
                                      .format('MMMM Do YYYY, hh:mm:ss a')}
                                  </TableCell>
                                </TableRow>
                              ))}
                              }
                            </TableBody>
                          </Table>
                        </Fragment>
                      )}
                    </div>
                  </Paper>
                </div>
              </Modal>

              <GridListTileBar
                title='O Hare International Airport'
                actionIcon={
                  <IconButton
                    onClick={handleModalOpen7}
                    aria-label={`info about O Hare International Airport`}
                    className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
            <GridListTile
              style={{ cursor: 'pointer' }}
              onClick={handleModalOpen8}
              key='8'>
              <img
                src='https://image.shutterstock.com/image-photo/golden-pagoda-nan-lian-garden-600w-521749765.jpg'
                alt='Hong Kong International Airport'
              />
              <Modal
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                open={openModal8}
                onClose={handleModalClose8}>
                <div style={modalStyle} className={classes.paper2}>
                  <h2>Hong Kong International Airport</h2>
                  <Paper className={classes2.root}>
                    <div className={classes2.tableWrapper}>
                      <div className=''>
                        <h6>
                          <strong>Arriving flights in the last</strong>{' '}
                          <select
                            variant='contained'
                            color='primary'
                            className={classes.submitt}
                            name='days8'
                            value={days8}
                            onChange={e => {
                              onChange(e);
                            }}>
                            <option value='Select'>Select</option>
                            <option value='1'>1 day</option>
                            <option value='3'> 3 days</option>
                            <option value='7'>7 days</option>
                          </select>{' '}
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={() => fetchArrivals('VHHH', days8)}>
                            Search
                          </Button>
                        </h6>
                        {/* <div className='col s12 m6' style={{ marginTop: 10 }}>
                          
                        </div> */}
                        {arrivals.length <= 0 ? (
                          'No records found'
                        ) : (
                          <Fragment>
                            <Table
                              stickyHeader
                              className={classes2.table}
                              aria-label='custom pagination sticky table'>
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell>icao24</StyledTableCell>

                                  <StyledTableCell align='right'>
                                    Departure Airport
                                  </StyledTableCell>
                                  <StyledTableCell align='right'>
                                    Time of Arrival
                                  </StyledTableCell>
                                  <StyledTableCell align='right'>
                                    Time of Departure
                                  </StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {arrivals.data.map(row => (
                                  <TableRow key={uuid()}>
                                    <TableCell component='th' scope='row'>
                                      {row.icao24}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {row.estDepartureAirport === null
                                        ? 'N/A'
                                        : row.estDepartureAirport}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {moment
                                        .unix(row.firstSeen)
                                        .format('MMMM Do YYYY, hh:mm:ss a')}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {moment
                                        .unix(row.lastSeen)
                                        .format('MMMM Do YYYY, hh:mm:ss a')}
                                    </TableCell>
                                  </TableRow>
                                ))}
                                }
                              </TableBody>
                            </Table>
                          </Fragment>
                        )}
                        <h6>
                          {' '}
                          <strong>Departing flights in the last </strong>
                          <select
                            variant='contained'
                            color='primary'
                            className={classes.submitt}
                            name='days8b'
                            value={days8b}
                            onChange={e => {
                              onChange(e);
                            }}>
                            <option value='Select'>Select</option>
                            <option value='1'>1 day</option>
                            <option value='3'> 3 days</option>
                            <option value='7'>7 days</option>
                          </select>
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={() => fetchDepartures('VHHH', days8b)}>
                            Search
                          </Button>
                        </h6>
                        {/* <div className='col s12 m6' style={{ marginTop: 10 }}>
                          
                        </div> */}
                      </div>

                      {departures.length <= 0 ? (
                        'No records found'
                      ) : (
                        <Fragment>
                          <Table
                            stickyHeader
                            className={classes2.table}
                            aria-label='custom pagination sticky table'>
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>icao24</StyledTableCell>

                                <StyledTableCell align='right'>
                                  Arrival Airport
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                  Time of Departure
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                  Time of Arrival
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {departures.data.map(row => (
                                <TableRow key={uuid()}>
                                  <TableCell component='th' scope='row'>
                                    {row.icao24}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {row.estArrivalAirport === null
                                      ? 'N/A'
                                      : row.estArrivalAirport}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {moment
                                      .unix(row.firstSeen)
                                      .format('MMMM Do YYYY, hh:mm:ss a')}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {moment
                                      .unix(row.lastSeen)
                                      .format('MMMM Do YYYY, hh:mm:ss a')}
                                  </TableCell>
                                </TableRow>
                              ))}
                              }
                            </TableBody>
                          </Table>
                        </Fragment>
                      )}
                    </div>
                  </Paper>
                </div>
              </Modal>

              <GridListTileBar
                title='Hong Kong International Airport'
                actionIcon={
                  <IconButton
                    onClick={handleModalOpen8}
                    aria-label={`info about Hong Kong International Airport`}
                    className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
            <GridListTile
              style={{ cursor: 'pointer' }}
              onClick={handleModalOpen9}
              key='9'>
              <img
                src='https://image.shutterstock.com/image-photo/amsterdam-canal-singel-typical-dutch-600w-534783616.jpg'
                alt='Amsterdam Airport Schiphol'
              />
              <Modal
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                open={openModal9}
                onClose={handleModalClose9}>
                <div style={modalStyle} className={classes.paper2}>
                  <h2>Amsterdam Airport Schiphol</h2>
                  <Paper className={classes2.root}>
                    <div className={classes2.tableWrapper}>
                      <div className=''>
                        <h6>
                          <strong>Arriving flights in the last</strong>{' '}
                          <select
                            variant='contained'
                            color='primary'
                            className={classes.submitt}
                            name='days9'
                            value={days9}
                            onChange={e => {
                              onChange(e);
                            }}>
                            <option value='Select'>Select</option>
                            <option value='1'>1 day</option>
                            <option value='3'> 3 days</option>
                            <option value='7'>7 days</option>
                          </select>{' '}
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={() => fetchArrivals('EHAM', days9)}>
                            Search
                          </Button>
                        </h6>
                        {/* <div className='col s12 m6' style={{ marginTop: 10 }}>
                          
                        </div> */}
                        {arrivals.length <= 0 ? (
                          'No records found'
                        ) : (
                          <Fragment>
                            <Table
                              stickyHeader
                              className={classes2.table}
                              aria-label='custom pagination sticky table'>
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell>icao24</StyledTableCell>

                                  <StyledTableCell align='right'>
                                    Departure Airport
                                  </StyledTableCell>
                                  <StyledTableCell align='right'>
                                    Time of Arrival
                                  </StyledTableCell>
                                  <StyledTableCell align='right'>
                                    Time of Departure
                                  </StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {arrivals.data.map(row => (
                                  <TableRow key={uuid()}>
                                    <TableCell component='th' scope='row'>
                                      {row.icao24}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {row.estDepartureAirport === null
                                        ? 'N/A'
                                        : row.estDepartureAirport}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {moment
                                        .unix(row.firstSeen)
                                        .format('MMMM Do YYYY, hh:mm:ss a')}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {moment
                                        .unix(row.lastSeen)
                                        .format('MMMM Do YYYY, hh:mm:ss a')}
                                    </TableCell>
                                  </TableRow>
                                ))}
                                }
                              </TableBody>
                            </Table>
                          </Fragment>
                        )}
                        <h6>
                          {' '}
                          <strong>Departing flights in the last </strong>
                          <select
                            variant='contained'
                            color='primary'
                            className={classes.submitt}
                            name='days9b'
                            value={days9b}
                            onChange={e => {
                              onChange(e);
                            }}>
                            <option value='Select'>Select</option>
                            <option value='1'>1 day</option>
                            <option value='3'> 3 days</option>
                            <option value='7'>7 days</option>
                          </select>
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={() => fetchDepartures('EHAM', days9b)}>
                            Search
                          </Button>
                        </h6>
                        {/* <div className='col s12 m6' style={{ marginTop: 10 }}>
                          
                        </div> */}
                      </div>

                      {departures.length <= 0 ? (
                        'No records found'
                      ) : (
                        <Fragment>
                          <Table
                            stickyHeader
                            className={classes2.table}
                            aria-label='custom pagination sticky table'>
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>icao24</StyledTableCell>

                                <StyledTableCell align='right'>
                                  Arrival Airport
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                  Time of Departure
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                  Time of Arrival
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {departures.data.map(row => (
                                <TableRow key={uuid()}>
                                  <TableCell component='th' scope='row'>
                                    {row.icao24}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {row.estArrivalAirport === null
                                      ? 'N/A'
                                      : row.estArrivalAirport}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {moment
                                      .unix(row.firstSeen)
                                      .format('MMMM Do YYYY, hh:mm:ss a')}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {moment
                                      .unix(row.lastSeen)
                                      .format('MMMM Do YYYY, hh:mm:ss a')}
                                  </TableCell>
                                </TableRow>
                              ))}
                              }
                            </TableBody>
                          </Table>
                        </Fragment>
                      )}
                    </div>
                  </Paper>
                </div>
              </Modal>

              <GridListTileBar
                title='Amsterdam Airport Schiphol'
                actionIcon={
                  <IconButton
                    onClick={handleModalOpen9}
                    aria-label={`info about Amsterdam Airport Schiphol`}
                    className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
            <GridListTile
              style={{ cursor: 'pointer' }}
              onClick={handleModalOpen10}
              key='10'>
              <img
                src='https://image.shutterstock.com/image-photo/beautiful-toronto-islands-formerly-island-600w-293980604.jpg'
                alt='Toronto Pearson International Airport'
              />
              <Modal
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                open={openModal10}
                onClose={handleModalClose10}>
                <div style={modalStyle} className={classes.paper2}>
                  <h2>Toronto Pearson International Airport</h2>
                  <Paper className={classes2.root}>
                    <div className={classes2.tableWrapper}>
                      <div className=''>
                        <h6>
                          <strong>Arriving flights in the last</strong>{' '}
                          <select
                            variant='contained'
                            color='primary'
                            className={classes.submitt}
                            name='days10'
                            value={days10}
                            onChange={e => {
                              onChange(e);
                            }}>
                            <option value='Select'>Select</option>
                            <option value='1'>1 day</option>
                            <option value='3'> 3 days</option>
                            <option value='7'>7 days</option>
                          </select>{' '}
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={() => fetchArrivals('CYYZ', days10)}>
                            Search
                          </Button>
                        </h6>
                        {/* <div className='col s12 m6' style={{ marginTop: 10 }}>
                          
                        </div> */}
                        {arrivals.length <= 0 ? (
                          'No records found'
                        ) : (
                          <Fragment>
                            <Table
                              stickyHeader
                              className={classes2.table}
                              aria-label='custom pagination sticky table'>
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell>icao24</StyledTableCell>

                                  <StyledTableCell align='right'>
                                    Departure Airport
                                  </StyledTableCell>
                                  <StyledTableCell align='right'>
                                    Time of Arrival
                                  </StyledTableCell>
                                  <StyledTableCell align='right'>
                                    Time of Departure
                                  </StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {arrivals.data.map(row => (
                                  <TableRow key={uuid()}>
                                    <TableCell component='th' scope='row'>
                                      {row.icao24}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {row.estDepartureAirport === null
                                        ? 'N/A'
                                        : row.estDepartureAirport}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {moment
                                        .unix(row.firstSeen)
                                        .format('MMMM Do YYYY, hh:mm:ss a')}
                                    </TableCell>
                                    <TableCell align='right'>
                                      {moment
                                        .unix(row.lastSeen)
                                        .format('MMMM Do YYYY, hh:mm:ss a')}
                                    </TableCell>
                                  </TableRow>
                                ))}
                                }
                              </TableBody>
                            </Table>
                          </Fragment>
                        )}
                        <h6>
                          {' '}
                          <strong>Departing flights in the last </strong>
                          <select
                            variant='contained'
                            color='primary'
                            className={classes.submitt}
                            name='days10b'
                            value={days10b}
                            onChange={e => {
                              onChange(e);
                            }}>
                            <option value='Select'>Select</option>
                            <option value='1'>1 day</option>
                            <option value='3'> 3 days</option>
                            <option value='7'>7 days</option>
                          </select>
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={() => fetchDepartures('CYYZ', days10b)}>
                            Search
                          </Button>
                        </h6>
                        {/* <div className='col s12 m6' style={{ marginTop: 10 }}>
                          
                        </div> */}
                      </div>

                      {departures.length <= 0 ? (
                        'No records found'
                      ) : (
                        <Fragment>
                          <Table
                            stickyHeader
                            className={classes2.table}
                            aria-label='custom pagination sticky table'>
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>icao24</StyledTableCell>

                                <StyledTableCell align='right'>
                                  Arrival Airport
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                  Time of Departure
                                </StyledTableCell>
                                <StyledTableCell align='right'>
                                  Time of Arrival
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {departures.data.map(row => (
                                <TableRow key={uuid()}>
                                  <TableCell component='th' scope='row'>
                                    {row.icao24}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {row.estArrivalAirport === null
                                      ? 'N/A'
                                      : row.estArrivalAirport}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {moment
                                      .unix(row.firstSeen)
                                      .format('MMMM Do YYYY, hh:mm:ss a')}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {moment
                                      .unix(row.lastSeen)
                                      .format('MMMM Do YYYY, hh:mm:ss a')}
                                  </TableCell>
                                </TableRow>
                              ))}
                              }
                            </TableBody>
                          </Table>
                        </Fragment>
                      )}
                    </div>
                  </Paper>
                </div>
              </Modal>

              <GridListTileBar
                title='Toronto Pearson International Airport'
                actionIcon={
                  <IconButton
                    onClick={handleModalOpen10}
                    aria-label={`info about Toronto Pearson International Airport`}
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
const mapStateToProps = state => ({
  arrivals: state.flightInfo.arrivals,
  departures: state.flightInfo.departure,
  loading: state.flightInfo.loading
});
export default connect(
  mapStateToProps,
  { logout, fetchArrivals, fetchDepartures }
)(Dashboard);
