import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { 
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar, 
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '20px 0 5px 24px',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list: {
    width: 250,
  },
});

interface IState {
  openDrawer: boolean;
};

class App extends React.Component<WithStyles<typeof styles>, IState> {
  state = {
    openDrawer: false,
  };

  toggleDrawer = (open: boolean) => () => {
    this.setState({
      openDrawer: open,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton 
              className={classes.menuButton} 
              color="inherit" aria-label="Menu" 
              onClick={this.toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer open={this.state.openDrawer} onClose={this.toggleDrawer(false)}>
              <div
                tabIndex={0}
                role="button"
                className={classes.list}
                onClick={this.toggleDrawer(false)}
                onKeyDown={this.toggleDrawer(false)}
              >
                <div className={classes.drawerHeader}>
                  <Typography variant="title">
                    RecordHazard
                  </Typography>
                </div>
                <List>
                  <ListItem button={true}>
                    <ListItemIcon>
                      <RssFeedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Feed" />
                  </ListItem>
                  <ListItem button={true}>
                    <ListItemIcon>
                      <HelpOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Help" />
                  </ListItem>
                  <ListItem>
                    <Button variant="contained" color="secondary">
                      Enable Notifications
                    </Button>
                  </ListItem>
                </List>
              </div>
            </Drawer>
            <Typography variant="title" color="inherit" className={classes.flex}>
              RecordHazard
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(App);
