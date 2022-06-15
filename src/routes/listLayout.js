
import { Outlet } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Main_logo from '../assets/Gallery Icons/APPLUS IDIADA.svg'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import SearchIcon from '@material-ui/icons/Search';
import AccountIcon from '../assets/Gallery Icons/Profile Logo.svg'
import { NavLink } from 'react-router-dom';
import ListAlt from '@mui/icons-material/ListAlt';
import { useParams } from 'react-router-dom';
import PopOverMenu from '../components/ControlFields/Color Picker/PopOverMenu';
import { Link, Tooltip } from '@material-ui/core';
import TransitionsModal from '../components/Header/Share'

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
    background: theme.palette.primary.main,
    color: '#212121',
  },
  header: {
    padding: 8,
    background: theme.palette.primary.main,
    color: '#212121',
  },
  margin: {
    margin: theme.spacing(1),
  },
  menuButton: {
    marginLeft: -theme.spacing(4),
  },
  iconButtonAvatar: {
    padding: 3,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.common.black,

    minWidth: 40,
    '&:hover': {
      color: theme.palette.error.main,
      boxShadow: 2,
      //  text-shadow: .1em .1em .2em rgba(0, 0, 0, 0.6),


    },
  },
  tab: {
    marginLeft: 25,
    textColor: theme.palette.error.main,
    indicator: theme.palette.error.main,


    '& .MuiTabs-indicator': {
      backgroundColor: theme.palette.error.main,



    }
  },
  button: {
    borderColor: lightColor,
  },
  hov: {
    margin: theme.spacing(0),

  },
});



function Header(props) {
  const { classes } = props;
  const [value, setValue] = React.useState('list');
  const { list } = useParams();
  const [listname, setListname] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return (
    <>

      {/* main content */}

      {/* breadcrumb */}

      <Outlet context={"Hello"} />


    </>
  );
};
Header.propTypes = {
  classes: PropTypes.object.isRequired,

};

let badgeMenu = [

  {
    icon: <ListAlt style={{ fontSize: 40 }} />,
    menu: [

      {
        name: 'good first issue',
        color: '#7057ff',
        description: 'Good for newcomers',
      },
      {
        name: 'help wanted',
        color: '#008672',
        description: 'Extra attention is needed',
      },
      {
        name: 'priority: critical',
        color: '#b60205',
        description: '',
      },
      {
        name: 'priority: high',
        color: '#d93f0b',
        description: '',
      },
      {
        name: 'priority: low',
        color: '#0e8a16',
        description: '',
      },
      {
        name: 'priority: medium',
        color: '#fbca04',
        description: '',
      },
      {
        name: "status: can't reproduce",
        color: '#fec1c1',
        description: '',
      },
      {
        name: 'status: confirmed',
        color: '#215cea',
        description: '',
      },
      {
        name: 'status: duplicate',
        color: '#cfd3d7',
        description: 'This issue or pull request already exists',
      },
      {
        name: 'status: needs information',
        color: '#fef2c0',
        description: '',
      },
      {
        name: 'status: wont do/fix',
        color: '#eeeeee',
        description: 'This will not be worked on',
      },
      {
        name: 'type: bug',
        color: '#d73a4a',
        description: "Something isn't working",
      },
      {
        name: 'type: discussion',
        color: '#d4c5f9',
        description: '',
      },
      {
        name: 'type: documentation',
        color: '#006b75',
        description: '',
      },
      {
        name: 'type: enhancement',
        color: '#84b6eb',
        description: '',
      },
      {
        name: 'type: epic',
        color: '#3e4b9e',
        description: 'A theme of work that contain sub-tasks',
      },
      {
        name: 'type: feature request',
        color: '#fbca04',
        description: 'New feature or request',
      },
      {
        name: 'type: question',
        color: '#d876e3',
        description: 'Further information is requested',
      },
    ]
  },

]


export default withStyles(styles)(Header);