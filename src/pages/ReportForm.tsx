import * as React from 'react';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import CloseIcon from '@material-ui/icons/Close';

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
    },
    pickImage: {
      display: 'none',
    },
    captureButton: {
      margin: '10px auto'
    },
  });

interface IProps {
  video: {
		stream: MediaStream | null,
    error: Error | null,
	}
  onToggleForm: (open: boolean) => () => void, 
}
class ReportForm extends React.Component<WithStyles<typeof styles> & IProps> {

  private videoPlayer: React.RefObject<HTMLVideoElement> = React.createRef();;
	private imagePickerArea: React.RefObject<HTMLDivElement> = React.createRef();
	private canvasElem: React.RefObject<HTMLCanvasElement> = React.createRef();
  
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
			  <Button variant="contained" color="primary" className={classes.captureButton}>Capture</Button>
			  <div ref={this.imagePickerArea} className={classes.pickImage} id="pick-image">
			    <h6>Pick an Image instead</h6>
			    <input type="file" accept="image/*" id="image-picker" />
			  </div>
        <form>
          <div>
            <TextField
              id="title"
              label="Title"
              type="search"
              className={classes.textField}
              margin="normal"
            />
          </div>
          <div>
            <TextField
              id="search"
              label="Location"
              className={classes.textField}
              margin="normal"
            />
            <div className="input-section">
              <Button color="primary" id="location-btn">
                Get Location
              </Button>
              <div className="mdl-spinner mdl-js-spinner is-active" id="location-loader" />
            </div>
          </div>
          <div className={classes.btnSubmit}>
            <Button variant="contained" color="secondary">
              Send
            </Button>
          </div>
          <div className={classes.btnClose}>
            <Button variant="fab" aria-label="Close" onClick={onToggleForm(false)}>
              <CloseIcon />
            </Button>
          </div>
        </form>
      </div>
    );
	}
}

export default withStyles(styles, { withTheme: true })(ReportForm);
