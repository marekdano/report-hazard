import * as React from 'react';
import { Button, Typography, withStyles, WithStyles, Theme } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import ReportForm from './ReportForm';

const styles = (theme: Theme) => ({
	container: {
		textAlign: 'center' as 'center',
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

const FeedPage = (props: WithStyles<typeof styles> & IProp) => {
	const { classes, onToggleReportForm, openReportForm } = props;

	return (
		<div>
			{openReportForm ?
				<div className={classes.container}>
       		<video id="player" autoPlay={true} />
        	<canvas id="canvas" width="320px" height="240px" />
					<Button variant="contained" color="primary" id="capture-btn">Capture</Button>
					<div id="pick-image">
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
