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
    margin: '56px auto 10px',
    paddingTop: '1.4rem',
  },
});

interface IState {
  openReportForm: boolean;
  openDrawer: boolean;
};

function initMedia() {
	const navigatr = navigator as any;
	if (!('mediaDevices' in navigatr)) {
		navigatr.mediaDevices = {};
	}

	if (!('getUserMedia' in navigator.mediaDevices)) {
		navigatr.mediaDevices.getUserMedia = (constraints: any) => {
			const getUserMedia = navigatr.webkitGetUserMedia || navigatr.mozGetuserMedia;

			if (!getUserMedia) {
				return Promise.reject(new Error('getuserMedia is not implemented!'));
			}

			return new Promise((resolve, reject) => {
				getUserMedia.call(navigatr, constraints, resolve, reject);
			});
		}
	}

	navigatr.mediaDevices.getUserMedia({video: true})
		.then((stream: any) => {
			// (videoPlayer.current as HTMLMediaElement).srcObject = stream;
			// (videoPlayer.current as HTMLElement).style.display = 'block';
			console.log(stream);
		})
		.catch((err: any) => {
			// if (imagePickerArea.current) {
			// 	imagePickerArea.current.style.display = 'block'; 
			// }
			console.log(err);
		})
}

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
    initMedia();
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
