import * as React from 'react';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import ReportForm from './ReportForm';
import Navigation from './components/Navigation';

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  mainContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: '1.8em 0 0',
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
        <Navigation openDrawer={this.state.openDrawer} toggleDrawer={this.toggleDrawer} />
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
