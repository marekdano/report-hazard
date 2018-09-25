import * as React from 'react';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
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
import AddIcon from '@material-ui/icons/Add';

import ReportForm from './ReportForm';

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  mainContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: '1.8em 0 0',
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
  fab: {
    position: 'absolute' as 'absolute',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4,
  },
});

interface IState {
  openReportForm: boolean;
  openDrawer: boolean;
};

class App extends React.Component<WithStyles<typeof styles>, IState> {
  state = {
    openReportForm: false,
    openDrawer: false,
  };

  toggleDrawer = (open: boolean) => () => {
    this.setState({
      openDrawer: open,
    });
  };

  toggleReportForm = (open: boolean) => () => {
    this.setState({
      openReportForm: open
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
            <Button variant="contained" color="secondary">
              Enable Notifications
            </Button> 
          </Toolbar>
        </AppBar>
        <main>
          <div className={classes.mainContent}>
            {this.state.openReportForm ?
              <ReportForm onToggleForm={this.toggleReportForm} /> :
              <Typography variant="title" align="center" color="textSecondary">
                Let's know about a hazard
              </Typography>}
          </div>
          
          {!this.state.openReportForm && 
          <Button variant="fab" color="secondary" className={classes.fab} aria-label="Add" onClick={this.toggleReportForm(true)} >
            <AddIcon />
          </Button>}
        
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
