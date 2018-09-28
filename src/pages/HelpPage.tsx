import * as React from 'react';
import { Typography, Theme, withStyles, WithStyles, Button } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';

const styles = (theme: Theme) => ({
	contact: {
		marginTop: theme.spacing.unit * 5
	},
	icon: {
		margin: theme.spacing.unit
	}
});

const HelpPage = ({classes}: WithStyles<typeof styles>) => {
	return (
		<div>
			<Typography variant="title" color="textSecondary">
				Need help?
			</Typography>
			<Typography variant="body2">
				Prevent your workspace to be knocked down and report each hazard!
      </Typography>
			<div className={classes.contact}>
				<Typography variant="headline">
					Contact us!
				</Typography>
				<Button variant="fab" color="primary" className={classes.icon}>
					<PhoneIcon />
				</Button>
				<Button variant="fab" color="primary" className={classes.icon} >
					<MailIcon />
				</Button>
			</div>
		</div>
	);
};

export default withStyles(styles, { withTheme: true })(HelpPage);