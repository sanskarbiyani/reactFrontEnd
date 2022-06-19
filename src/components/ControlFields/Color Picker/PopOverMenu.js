import React, { Component } from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Grid from "@mui/material/Grid"
import CircleIcon from '@mui/icons-material/CheckCircle';
import { Badge } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as MuiIcons from '@mui/icons-material'
import Icon from '@mui/material/Icon';
import { Tooltip } from "@mui/material";
const icons = [
  'ListAlt', 'PlaylistAddCheckCircle', 'PlaylistAddCheckCircleRounded', 'AccessAlarms', 'Timer', 'MonetizationOn',
  'AccountBalanceWallet', 'AddShoppingCart', 'CreditScore', 'AssignmentTurnedInSharp', 'PendingActionsSharp', 'TrackChanges', 'WorkspacePremiumOutlined',
  'DateRangeSharp', 'ScheduleSendSharp', 'Upcoming', 'EventBusySharp', 'EventAvailableSharp', 'People', 'Groups', 'FlashOn', 'OfflineBolt', 'TimelapseSharp', 'BatchPredictionRounded',
  'PublicRounded', 'LinkedIn', 'Settings', 'LaptopMacSharp', 'PhoneIphone', 'CheckCircleOutlineRounded', 'ShoppingBagRounded', 'LocalAtmRounded', 'RequestQuoteRounded',
  'PriceChangeRounded', 'AddBusinessRounded', 'PlaylistRemoveRounded', 'LeakRemoveSharp', 'QrCodeScannerSharp', 'IntegrationInstructionsSharp', 'Campaign', 'BusinessCenter',
  'Email', 'HomeRounded', 'CommuteRounded', 'FlightSharp', 'BadgeRounded', 'EmojiEvents', 'Calculate', 'AlternateEmail', 'ContactMail', 'Google', 'NaturePeople',
  'BarChart'
]
const useStyles = makeStyles((theme) => ({
  images: (props) => ({
    '&:hover': {
      backgroundColor: props.backgroundColor,
    },


  }),
}));

function importAll(r) {

  let images = {};
  r.keys().forEach(item => { images[item.replace('./', '')] = r(item); });
  return images;
}
// const cache = {}

const Images = React.memo((props) => {
  const classes = useStyles(props);

  return (
    icons.map((item, i) => {

      return (<Grid item xs={2}  >
        <MenuItem key={i} className={classes.images}>
          <Icon component={MuiIcons[icons[i]]} onClick={() => props.onSubmiting(icons[i])} ></Icon>
        </MenuItem>
      </Grid>)
    }
    )
    // <img src={item} width={30} height={30} style={{display:'flex', alignItems:'center'}}  />
  );
})


class PopOverMenu extends Component {

  constructor(props, context) {
    super(props, context);

    const images = importAll(require.context('../../../assets/Icons for List', false, /\.(png|jpe?g|svg)$/))
    this.state = {
      open: false, anchorEl: null, icon: this.props.icon, headerColor: '#7057ff', choiceColor: '#7057ff', images: Object.entries(images).map(module => module[1])

    };

  }

  show = (event) => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  hide = (event) => {
    this.setState({
      open: false
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      this.setState({ open: false });
    }
  };
  bgcolor = (bgcolor, event) => {

    if ("choice" === this.props.where) {
      this.props.onChange(this.props.index, bgcolor);
      console.log('-----------')
      console.log(bgcolor)
      this.setState({
        choiceColor: bgcolor
      })
      console.log(this.state.choiceColor)
    }
    else {
      this.props.onChange(bgcolor)
      this.setState({
        headerColor: bgcolor
      })
    }


  }

  setIcon = (src) => {
    if (this.props.where !== "header")
      this.props.onSelect(this.props.index, src)
    else
      this.props.onChangeIcon(src)
    this.setState({
      icon: <Icon component={MuiIcons[src]} style={{ width: this.props.where !== "header" ? 20 : 40, height: this.props.where !== "header" ? 20 : 40 }}></Icon>
    })

    this.handleClose()
  }

  showMenuItemsColor = () =>

    this.props.menu.map((item, i) => (
      <Grid item xs={2}>
        <MenuItem key={i} onClick={this.handleClose} >
          <Tooltip title={item.description}>
            <CircleIcon style={{ color: item.color, fontSize: 30 }} onClick={() => this.bgcolor(item.color)} />
          </Tooltip>
        </MenuItem>

      </Grid>

    ))
    ;

  showMenuItemsIcons = () => {
    if (this.props.where !== "header")
      return <Images images={this.state.images} backgroundColor={this.state.choiceColor} onSubmiting={this.setIcon} />
    return (
      <Images images={this.state.images} backgroundColor={this.state.headerColor} onSubmiting={this.setIcon} />
    )


  }


  showBadgeIcon = () => {
    if (this.props.where === 'choice')
      return (
        <Badge badgeContent={this.props.badgeCount} style={{ color: this.state.choiceColor }} >
          {this.state.icon}
        </Badge>
      );
    else
      return (
        <Badge badgeContent={this.props.badgeCount} style={{ color: this.state.headerColor }}>
          {this.state.icon}
        </Badge>
      );
  }



  render() {

    return (
      <div className="popover-menu">
        <Button
          aria-controls={this.state.open ? "menu-list-grow" : null}
          aria-haspopup="true"
          onMouseEnter={this.show}
          onMouseLeave={this.hide}
        >
          {this.showBadgeIcon()}
        </Button>

        <Popper
          onMouseEnter={this.handleOpen}
          onMouseLeave={this.handleClose}
          placement="bottom"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          role={undefined}
          transition
          sx = {{
            position: 'relative',
            zIndex: 30,
          }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >

              <Paper style={{ width: 300 }} >

                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList
                    autoFocusItem={this.state.open}
                    id="menu-list-grow"
                    onKeyDown={this.handleListKeyDown}

                  >

                    <Grid container >
                      {this.showMenuItemsColor()}
                    </Grid>
                    <span style={{ display: "flex", border: '1px solid #e8e8e8' }}> </span>
                    <Grid container >

                      {

                        this.showMenuItemsIcons()
                      }
                    </Grid>
                  </MenuList>
                </ClickAwayListener>

              </Paper>

            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

export default PopOverMenu;
