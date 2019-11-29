import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import uuid from 'uuid/v4';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableFooter from '@material-ui/core/TableFooter';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
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
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);
const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'>
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'>
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'>
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'>
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

const useStyles2 = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    // overflowX: 'auto',
    maxHeight: 400,
    overflow: 'auto'
  }
}));

// const rand = () => {
//   return Math.round(Math.random() * 20) - 10;
// };
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
    width: 460,
    height: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const Dashboard = ({
  logout,
  arrivals,
  departures,
  fetchArrivals,
  fetchDepartures
}) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const classes2 = useStyles2();
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const emptyRows =
  //   rowsPerPage -
  //   Math.min(
  //     rowsPerPage,
  //     arrivals.length === undefined ? 0 : arrivals - page * rowsPerPage
  //   );

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = event => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };
  const [open, setOpen] = React.useState(false);
  const [openModal1, setOpenModal1] = React.useState(false);
  const [openModal2, setOpenModal2] = React.useState(false);
  const [openModal3, setOpenModal3] = React.useState(false);
  const [openModal4, setOpenModal4] = React.useState(false);
  const [openModal5, setOpenModal5] = React.useState(false);
  const [openModal6, setOpenModal6] = React.useState(false);
  const [openModal7, setOpenModal7] = React.useState(false);
  const [openModal8, setOpenModal8] = React.useState(false);
  const [openModal9, setOpenModal9] = React.useState(false);
  const [openModal10, setOpenModal10] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleModalOpen1 = () => {
    setOpenModal1(true);
    fetchArrivals(
      'KATL',
      moment()
        .subtract(12, 'hours')
        .unix(),
      moment().unix()
    );
    fetchDepartures(
      'KATL',
      moment()
        .subtract(12, 'hours')
        .unix(),
      moment().unix()
    );
  };
  const handleModalClose1 = () => {
    setOpenModal1(false);
  };
  const handleModalOpen2 = () => {
    setOpenModal2(true);
    fetchArrivals(
      'KDEN',
      moment()
        .subtract(12, 'hours')
        .unix(),
      moment().unix()
    );
    fetchDepartures(
      'KDEN',
      moment()
        .subtract(12, 'hours')
        .unix(),
      moment().unix()
    );
  };
  const handleModalClose2 = () => {
    setOpenModal2(false);
  };
  const handleModalOpen3 = () => {
    setOpenModal3(true);
    fetchArrivals(
      'OMDB',
      moment()
        .subtract(12, 'hours')
        .unix(),
      moment().unix()
    );
    fetchDepartures(
      'OMDB',
      moment()
        .subtract(12, 'hours')
        .unix(),
      moment().unix()
    );
  };
  const handleModalClose3 = () => {
    setOpenModal3(false);
  };

  const handleModalOpen4 = () => {
    setOpenModal4(true);
    fetchArrivals(
      'KLAX',
      moment()
        .subtract(12, 'hours')
        .unix(),
      moment().unix()
    );
    fetchDepartures(
      'KLAX',
      moment()
        .subtract(12, 'hours')
        .unix(),
      moment().unix()
    );
  };
  const handleModalClose4 = () => {
    setOpenModal4(false);
  };
  const handleModalOpen5 = () => {
    setOpenModal5(true);
    fetchArrivals(
      'RJTT',
      moment()
        .subtract(12, 'hours')
        .unix(),
      moment().unix()
    );
    fetchDepartures(
      'RJTT',
      moment()
        .subtract(12, 'hours')
        .unix(),
      moment().unix()
    );
  };
  const handleModalClose5 = () => {
    setOpenModal5(false);
  };
  const handleModalOpen6 = () => {
    setOpenModal6(true);
    fetchArrivals(
      'EGLL',
      moment()
        .subtract(12, 'hours')
        .unix(),
      moment().unix()
    );
    fetchDepartures(
      'EGLL',
      moment()
        .subtract(12, 'hours')
        .unix(),
      moment().unix()
    );
  };
  const handleModalClose6 = () => {
    setOpenModal6(false);
  };
  const handleModalOpen7 = () => {
    setOpenModal7(true);
    fetchArrivals(
      'KORD',
      moment()
        .subtract(12, 'hours')
        .unix(),
      moment().unix()
    );
    fetchDepartures(
      'KORD',
      moment()
        .subtract(12, 'hours')
        .unix(),
      moment().unix()
    );
  };
  const handleModalClose7 = () => {
    setOpenModal7(false);
  };
  const handleModalOpen8 = () => {
    setOpenModal8(true);
    fetchArrivals(
      'VHHH',
      moment()
        .subtract(12, 'hours')
        .unix(),
      moment().unix()
    );
    fetchDepartures(
      'VHHH',
      moment()
        .subtract(12, 'hours')
        .unix(),
      moment().unix()
    );
  };
  const handleModalClose8 = () => {
    setOpenModal8(false);
  };
  const handleModalOpen9 = () => {
    setOpenModal9(true);
    fetchArrivals(
      'EHAM',
      moment()
        .subtract(12, 'hours')
        .unix(),
      moment().unix()
    );
    fetchDepartures(
      'EHAM',
      moment()
        .subtract(12, 'hours')
        .unix(),
      moment().unix()
    );
  };
  const handleModalClose9 = () => {
    setOpenModal9(false);
  };
  const handleModalOpen10 = () => {
    setOpenModal10(true);
    fetchArrivals(
      'CYYZ',
      moment()
        .subtract(12, 'hours')
        .unix(),
      moment().unix()
    );
    fetchDepartures(
      'CYYZ',
      moment()
        .subtract(12, 'hours')
        .unix(),
      moment().unix()
    );
  };
  const handleModalClose10 = () => {
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
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile
              key='Subheader'
              cols={2}
              style={{ height: 'auto' }}></GridListTile>

            <GridListTile key='1'>
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
                      <Table
                        stickyHeader
                        className={classes2.table}
                        aria-label='custom pagination sticky table'>
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Arrivals</StyledTableCell>
                            <StyledTableCell>icao24</StyledTableCell>

                            <StyledTableCell align='right'>
                              Departure Airport
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
                          {arrivals.length <= 0
                            ? 'Please be patient while arrivals to Hartsfield-Jackson Atlanta International Airport within the last 12 hours are being fetched...'
                            : arrivals.data.map(row => (
                                <TableRow key={uuid()}>
                                  <TableCell
                                    component='th'
                                    scope='row'></TableCell>
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
                        </TableBody>
                      </Table>
                      <Table
                        stickyHeader
                        className={classes2.table}
                        aria-label='custom pagination sticky table'>
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Departures</StyledTableCell>
                            <StyledTableCell>icao24</StyledTableCell>

                            <StyledTableCell align='right'>
                              Arrival Airport
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
                          {departures.length <= 0
                            ? 'Please be patient while departures from Hartsfield-Jackson Atlanta International Airport within the last 20 hours are being fetched...'
                            : departures.data.map(row => (
                                <TableRow key={uuid()}>
                                  <TableCell
                                    component='th'
                                    scope='row'></TableCell>
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
                        </TableBody>
                      </Table>
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
            <GridListTile key='2'>
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
                  <div className={classes2.tableWrapper}>
                    <Table
                      stickyHeader
                      className={classes2.table}
                      aria-label='custom pagination sticky table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Arrivals</StyledTableCell>
                          <StyledTableCell>icao24</StyledTableCell>

                          <StyledTableCell align='right'>
                            Departure Airport
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
                        {arrivals.length <= 0
                          ? 'Please be patient while arrivals to Denver International Airport within the last 12 hours are being fetched...'
                          : arrivals.data.map(row => (
                              <TableRow key={uuid()}>
                                <TableCell
                                  component='th'
                                  scope='row'></TableCell>
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
                      </TableBody>
                    </Table>
                    <Table
                      stickyHeader
                      className={classes2.table}
                      aria-label='custom pagination sticky table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Departures</StyledTableCell>
                          <StyledTableCell>icao24</StyledTableCell>

                          <StyledTableCell align='right'>
                            Arrival Airport
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
                        {departures.length <= 0
                          ? 'Please be patient while departures from Denver International Airport within the last 12 hours are being fetched...'
                          : departures.data.map(row => (
                              <TableRow key={uuid()}>
                                <TableCell
                                  component='th'
                                  scope='row'></TableCell>
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
                      </TableBody>
                    </Table>
                  </div>
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
            <GridListTile key='3'>
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
                  <div className={classes2.tableWrapper}>
                    <Table
                      stickyHeader
                      className={classes2.table}
                      aria-label='custom pagination sticky table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Arrivals</StyledTableCell>
                          <StyledTableCell>icao24</StyledTableCell>

                          <StyledTableCell align='right'>
                            Departure Airport
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
                        {arrivals.length <= 0
                          ? 'Please be patient while arrivals to Dubai International Airport within the last 12 hours are being fetched...'
                          : arrivals.data.map(row => (
                              <TableRow key={uuid()}>
                                <TableCell
                                  component='th'
                                  scope='row'></TableCell>
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
                      </TableBody>
                    </Table>
                    <Table
                      stickyHeader
                      className={classes2.table}
                      aria-label='custom pagination sticky table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Departures</StyledTableCell>
                          <StyledTableCell>icao24</StyledTableCell>

                          <StyledTableCell align='right'>
                            Arrival Airport
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
                        {departures.length <= 0
                          ? 'Please be patient while departures from Dubai International Airport within the last 12 hours are being fetched...'
                          : departures.data.map(row => (
                              <TableRow key={uuid()}>
                                <TableCell
                                  component='th'
                                  scope='row'></TableCell>
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
                      </TableBody>
                    </Table>
                  </div>
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
            <GridListTile key='4'>
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
                  <div className={classes2.tableWrapper}>
                    <Table
                      stickyHeader
                      className={classes2.table}
                      aria-label='custom pagination sticky table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Arrivals</StyledTableCell>
                          <StyledTableCell>icao24</StyledTableCell>

                          <StyledTableCell align='right'>
                            Departure Airport
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
                        {arrivals.length <= 0
                          ? 'Please be patient while arrivals to Los Angeles International Airport within the last 12 hours are being fetched...'
                          : arrivals.data.map(row => (
                              <TableRow key={uuid()}>
                                <TableCell
                                  component='th'
                                  scope='row'></TableCell>
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
                      </TableBody>
                    </Table>
                    <Table
                      stickyHeader
                      className={classes2.table}
                      aria-label='custom pagination sticky table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Departures</StyledTableCell>
                          <StyledTableCell>icao24</StyledTableCell>

                          <StyledTableCell align='right'>
                            Arrival Airport
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
                        {departures.length <= 0
                          ? 'Please be patient while departures from Los Angeles International Airport within the last 12 hours are being fetched...'
                          : departures.data.map(row => (
                              <TableRow key={uuid()}>
                                <TableCell
                                  component='th'
                                  scope='row'></TableCell>
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
                      </TableBody>
                    </Table>
                  </div>
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
            <GridListTile key='5'>
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
                  <div className={classes2.tableWrapper}>
                    <Table
                      stickyHeader
                      className={classes2.table}
                      aria-label='custom pagination sticky table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Arrivals</StyledTableCell>
                          <StyledTableCell>icao24</StyledTableCell>

                          <StyledTableCell align='right'>
                            Departure Airport
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
                        {arrivals.length <= 0
                          ? 'Please be patient while arrivals to Tokyo Haneda Airport within the last 12 hours are being fetched...'
                          : arrivals.data.map(row => (
                              <TableRow key={uuid()}>
                                <TableCell
                                  component='th'
                                  scope='row'></TableCell>
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
                      </TableBody>
                    </Table>
                    <Table
                      stickyHeader
                      className={classes2.table}
                      aria-label='custom pagination sticky table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Departures</StyledTableCell>
                          <StyledTableCell>icao24</StyledTableCell>

                          <StyledTableCell align='right'>
                            Arrival Airport
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
                        {departures.length <= 0
                          ? 'Please be patient while departures from Tokyo Haneda Airport within the last 12 hours are being fetched...'
                          : departures.data.map(row => (
                              <TableRow key={uuid()}>
                                <TableCell
                                  component='th'
                                  scope='row'></TableCell>
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
                      </TableBody>
                    </Table>
                  </div>
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
            <GridListTile key='6'>
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
                  <div className={classes2.tableWrapper}>
                    <Table
                      stickyHeader
                      className={classes2.table}
                      aria-label='custom pagination sticky table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Arrivals</StyledTableCell>
                          <StyledTableCell>icao24</StyledTableCell>

                          <StyledTableCell align='right'>
                            Departure Airport
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
                        {arrivals.length <= 0
                          ? 'Please be patient while arrivals to Heathrow Airport within the last 12 hours are being fetched...'
                          : arrivals.data.map(row => (
                              <TableRow key={uuid()}>
                                <TableCell
                                  component='th'
                                  scope='row'></TableCell>
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
                      </TableBody>
                    </Table>
                    <Table
                      stickyHeader
                      className={classes2.table}
                      aria-label='custom pagination sticky table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Departures</StyledTableCell>
                          <StyledTableCell>icao24</StyledTableCell>

                          <StyledTableCell align='right'>
                            Arrival Airport
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
                        {departures.length <= 0
                          ? 'Please be patient while departures from Heathrow Airport within the last 12 hours are being fetched...'
                          : departures.data.map(row => (
                              <TableRow key={uuid()}>
                                <TableCell
                                  component='th'
                                  scope='row'></TableCell>
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
                      </TableBody>
                    </Table>
                  </div>
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
            <GridListTile key='7'>
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
                  <div className={classes2.tableWrapper}>
                    <Table
                      stickyHeader
                      className={classes2.table}
                      aria-label='custom pagination sticky table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Arrivals</StyledTableCell>
                          <StyledTableCell>icao24</StyledTableCell>

                          <StyledTableCell align='right'>
                            Departure Airport
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
                        {arrivals.length <= 0
                          ? 'Please be patient while arrivals to O Hare International Airport within the last 12 hours are being fetched...'
                          : arrivals.data.map(row => (
                              <TableRow key={uuid()}>
                                <TableCell
                                  component='th'
                                  scope='row'></TableCell>
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
                      </TableBody>
                    </Table>
                    <Table
                      stickyHeader
                      className={classes2.table}
                      aria-label='custom pagination sticky table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Departures</StyledTableCell>
                          <StyledTableCell>icao24</StyledTableCell>

                          <StyledTableCell align='right'>
                            Arrival Airport
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
                        {departures.length <= 0
                          ? 'Please be patient while departures from O Hare International Airport within the last 12 hours are being fetched...'
                          : departures.data.map(row => (
                              <TableRow key={uuid()}>
                                <TableCell
                                  component='th'
                                  scope='row'></TableCell>
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
                      </TableBody>
                    </Table>
                  </div>
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
            <GridListTile key='8'>
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
                  <div className={classes2.tableWrapper}>
                    <Table
                      stickyHeader
                      className={classes2.table}
                      aria-label='custom pagination sticky table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Arrivals</StyledTableCell>
                          <StyledTableCell>icao24</StyledTableCell>

                          <StyledTableCell align='right'>
                            Departure Airport
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
                        {arrivals.length <= 0
                          ? 'Please be patient while arrivals to Hong Kong International Airport within the last 12 hours are being fetched...'
                          : arrivals.data.map(row => (
                              <TableRow key={uuid()}>
                                <TableCell
                                  component='th'
                                  scope='row'></TableCell>
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
                      </TableBody>
                    </Table>
                    <Table
                      stickyHeader
                      className={classes2.table}
                      aria-label='custom pagination sticky table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Departures</StyledTableCell>
                          <StyledTableCell>icao24</StyledTableCell>

                          <StyledTableCell align='right'>
                            Arrival Airport
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
                        {departures.length <= 0
                          ? 'Please be patient while departures from Hong Kong International Airport within the last 12 hours are being fetched...'
                          : departures.data.map(row => (
                              <TableRow key={uuid()}>
                                <TableCell
                                  component='th'
                                  scope='row'></TableCell>
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
                      </TableBody>
                    </Table>
                  </div>
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
            <GridListTile key='9'>
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
                  <div className={classes2.tableWrapper}>
                    <Table
                      stickyHeader
                      className={classes2.table}
                      aria-label='custom pagination sticky table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Arrivals</StyledTableCell>
                          <StyledTableCell>icao24</StyledTableCell>

                          <StyledTableCell align='right'>
                            Departure Airport
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
                        {arrivals.length <= 0
                          ? 'Please be patient while arrivals to Amsterdam Airport Schiphol within the last 12 hours are being fetched...'
                          : arrivals.data.map(row => (
                              <TableRow key={uuid()}>
                                <TableCell
                                  component='th'
                                  scope='row'></TableCell>
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
                      </TableBody>
                    </Table>
                    <Table
                      stickyHeader
                      className={classes2.table}
                      aria-label='custom pagination sticky table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Departures</StyledTableCell>
                          <StyledTableCell>icao24</StyledTableCell>

                          <StyledTableCell align='right'>
                            Arrival Airport
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
                        {departures.length <= 0
                          ? 'Please be patient while departures from Amsterdam Airport Schiphol within the last 12 hours are being fetched...'
                          : departures.data.map(row => (
                              <TableRow key={uuid()}>
                                <TableCell
                                  component='th'
                                  scope='row'></TableCell>
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
                      </TableBody>
                    </Table>
                  </div>
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
            <GridListTile key='10'>
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
                  <div className={classes2.tableWrapper}>
                    <Table
                      stickyHeader
                      className={classes2.table}
                      aria-label='custom pagination sticky table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Arrivals</StyledTableCell>
                          <StyledTableCell>icao24</StyledTableCell>

                          <StyledTableCell align='right'>
                            Departure Airport
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
                        {arrivals.length <= 0
                          ? 'Please be patient while arrivals to Toronto Pearson International Airport within the last 12 hours are being fetched...'
                          : arrivals.data.map(row => (
                              <TableRow key={uuid()}>
                                <TableCell
                                  component='th'
                                  scope='row'></TableCell>
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
                      </TableBody>
                    </Table>
                    <Table
                      stickyHeader
                      className={classes2.table}
                      aria-label='custom pagination sticky table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Departures</StyledTableCell>
                          <StyledTableCell>icao24</StyledTableCell>

                          <StyledTableCell align='right'>
                            Arrival Airport
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
                        {departures.length <= 0
                          ? 'Please be patient while departures from Toronto Pearson International Airport within the last 12 hours are being fetched...'
                          : departures.data.map(row => (
                              <TableRow key={uuid()}>
                                <TableCell
                                  component='th'
                                  scope='row'></TableCell>
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
                      </TableBody>
                    </Table>
                  </div>
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
  departures: state.flightInfo.departure
});
export default connect(
  mapStateToProps,
  { logout, fetchArrivals, fetchDepartures }
)(Dashboard);
