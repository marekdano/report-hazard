import * as React from 'react';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Utils } from '../utils';

const styles = (theme: Theme) => 
  createStyles({
    container: {
      textAlign: 'center',
    },
    mediaContainer: {
      width: '512px',
      maxWidth: '100%',
      display: 'none',
      margin: 'auto',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    btnSubmit: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
    },
    btnClose: {
      marginTop: theme.spacing.unit * 5,
      marginBottom: theme.spacing.unit * 4,
    },
    pickImage: {
      display: 'none',
    },
    captureButton: {
      margin: '10px auto'
    },
    location: {
      margin: theme.spacing.unit * 1.4,
    }
  });

interface IProps {
  video: {
		stream: MediaStream | null,
    error: Error | null,
	}
  onToggleForm: (open: boolean) => () => void, 
}

interface IState {
  picture: any;
  displayLocationBtn: boolean;
  locationValue: string;
}
class ReportForm extends React.Component<WithStyles<typeof styles> & IProps, IState> {
  state = {
    picture: null,
    displayLocationBtn: true,
    locationValue: '',
  }

  private videoPlayer: React.RefObject<HTMLVideoElement> = React.createRef();;
	private imagePickerArea: React.RefObject<HTMLDivElement> = React.createRef();
  private canvasElem: React.RefObject<HTMLCanvasElement> = React.createRef();
  
  handleCapture = () => {
    (this.canvasElem.current as HTMLElement).style.display = 'block';
    (this.videoPlayer.current as HTMLElement).style.display = 'none';
    this.props.video.stream = null;
    const context = (this.canvasElem.current as HTMLCanvasElement).getContext('2d');
    if (context) {
      context.drawImage(
        this.videoPlayer.current as HTMLVideoElement,
        0, 
        0, 
        320, 
        (this.videoPlayer.current as HTMLVideoElement).videoHeight / ((this.videoPlayer.current as HTMLVideoElement).videoWidth / 320)
      );
      ((this.videoPlayer.current as HTMLMediaElement).srcObject as MediaStream).getVideoTracks().forEach((track) => {
        return track.stop(); 
      });
      const picture = Utils.dataURItoBlob((this.canvasElem.current as HTMLCanvasElement).toDataURL());
      this.setState({...this.state, picture});
    }
  }

  handleFileChosen = (event: any) => {
    const picture = event.target.files[0];
    this.setState({...this.state, picture});
  };

  handleLocation = () => {
    if (!('geolocation' in navigator)) {
      alert(`Couldn't fetch location, please enter manually!`);
      return;
    }
    this.setState({...this.state, displayLocationBtn: false});

    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      // TODO call google API to get the address based on coordinates of lat and lng
      // currently add a hard-coded location value
      this.setState({...this.state, locationValue: 'In Dublin'});
      this.setState({...this.state, displayLocationBtn: true});
    }, (error) => {
      console.log(error);
      alert(`Couldn't fetch location, please enter manually!`);
      this.setState({...this.state, displayLocationBtn: true});
    }, {timeout: 7000});
  };

  handleLocationValue = (e: any) => {
    const locationValue = e.target.value;
    this.setState({...this.state, locationValue });
  }
  
	render() {
    const { classes, onToggleForm, video } = this.props; 

		if (video.stream && this.videoPlayer.current) {
			(this.videoPlayer.current as HTMLMediaElement).srcObject = video.stream;
      (this.videoPlayer.current as HTMLElement).style.display = 'block';
		}
		
		if (video.error && this.imagePickerArea.current) {
      this.imagePickerArea.current.style.display = 'block';
    }

		return (
      <div>
        <video ref={this.videoPlayer} className={classes.mediaContainer} id="player" autoPlay={true} />
			  <canvas ref={this.canvasElem} className={classes.mediaContainer} id="canvas" width="320px" height="240px" />
        <Button variant="contained" color="primary" 
          className={classes.captureButton} 
          disabled={video && video.stream === null} 
          onClick={this.handleCapture}
        >
          Capture
        </Button>
			  <div ref={this.imagePickerArea} className={classes.pickImage} id="pick-image">
			    <h6>Pick an Image instead</h6>
			    <input type="file" accept="image/*" id="image-picker" onChange={this.handleFileChosen}/>
			  </div>
        <form>
          <section>
            <TextField
              id="title"
              label="Title"
              type="search"
              className={classes.textField}
              margin="normal"
            />
          </section>
          <section>
            <TextField
              id="search"
              label="Location"
              className={classes.textField}
              margin="normal"
              value={this.state.locationValue}
              onChange={this.handleLocationValue}
            />
          </section>
          <section className={classes.location}>
            {this.state.displayLocationBtn ? 
              <Button color="primary" id="location-btn" onClick={this.handleLocation}>
                Get Location
              </Button> : 
              <CircularProgress size={26} />}
            {/* <div className="mdl-spinner mdl-js-spinner is-active" id="location-loader" /> */}
          </section>
          <section className={classes.btnSubmit}>
            <Button variant="contained" color="secondary">
              Send
            </Button>
          </section>
          <section className={classes.btnClose}>
            <Button variant="fab" aria-label="Close" onClick={onToggleForm(false)}>
              <CloseIcon />
            </Button>
          </section>
        </form>
      </div>
    );
	}
}

export default withStyles(styles, { withTheme: true })(ReportForm);
