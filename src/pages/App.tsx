import * as React from 'react';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';

import Navigation from './components/Navigation';
import FeedPage from './FeedPage';
import { Route, Switch } from 'react-router';
import HelpPage from './HelpPage';

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  mainContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: '1.8em 0 0',
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
    const renderFeedPage = () => (
      <FeedPage onToggleReportForm={this.toggleReportForm} openReportForm={this.state.openReportForm} />
    );

    return (
      <div className={classes.root}>
        <Navigation openDrawer={this.state.openDrawer} toggleDrawer={this.toggleDrawer} />
        <main className={classes.mainContent}>
          <Switch>
            <Route exact={true} path='/' render={renderFeedPage}/>
            <Route path='/help' component={HelpPage} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
