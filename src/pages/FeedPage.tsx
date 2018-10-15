import * as React from 'react';
import { Button, Typography, withStyles, WithStyles, Theme } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import ReportForm from './ReportForm';

const styles = (theme: Theme) => ({
	container: {
		textAlign: 'center' as 'center',
	},
	mediaContainer: {
		width: '512px',
		maxWidth: '100%',
		display: 'none',
		margin: 'auto',
	},
	pickImage: {
		display: 'none',
	},
	captureButton: {
		margin: '10px auto'
	},
  fab: {
    position: 'absolute' as 'absolute',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4,
  },
});

interface IProp {
	openReportForm: boolean;
	onToggleReportForm: (key: boolean) => () => void;
}

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
			(videoPlayer.current as HTMLMediaElement).srcObject = stream;
			(videoPlayer.current as HTMLElement).style.display = 'block';
			console.log(stream);
		})
		.catch((err: any) => {
			if (imagePickerArea.current) {
				imagePickerArea.current.style.display = 'block'; 
			}
			console.log(err);
		})
}

let videoPlayer: React.RefObject<HTMLVideoElement>;
let imagePickerArea: React.RefObject<HTMLDivElement>;
let canvasElem: React.RefObject<HTMLCanvasElement>;

const FeedPage = (props: WithStyles<typeof styles> & IProp) => {
	const { classes, onToggleReportForm, openReportForm } = props;

	videoPlayer = React.createRef();
	imagePickerArea = React.createRef();
	canvasElem = React.createRef();
	
	initMedia();

	return (
		<div>
			{openReportForm ?
				<div className={classes.container}>
       		<video ref={videoPlayer} className={classes.mediaContainer} id="player" autoPlay={true} />
        	<canvas ref={canvasElem} className={classes.mediaContainer} id="canvas" width="320px" height="240px" />
					<Button variant="contained" color="primary" className={classes.captureButton}>Capture</Button>
					<div ref={imagePickerArea} className={classes.pickImage} id="pick-image">
          	<h6>Pick an Image instead</h6>
          	<input type="file" accept="image/*" id="image-picker" />
        	</div>
					<ReportForm onToggleForm={onToggleReportForm} />
				</div> :
				<Typography variant="title" align="center" color="textSecondary">
					Let's know about a hazard
				</Typography>}
	
			{!openReportForm && 
				<Button variant="fab" color="secondary" className={classes.fab} aria-label="Add" onClick={onToggleReportForm(true)}>
					<AddIcon />
				</Button>}
		</div>
	);
};

export default withStyles(styles, { withTheme: true })(FeedPage);
