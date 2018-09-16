import * as React from 'react';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme: Theme) => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
});

class ReportForm extends React.Component<WithStyles> {

	render() {
		const { classes } = this.props; 

		return (
			<div className={classes.container}>
				<form>
					<TextField
						id="title"
						label="Title"
						type="search"
						className={classes.textField}
						margin="normal"
					/>
					<TextField
						id="search"
						label="Location"
						className={classes.textField}
						margin="normal"
					/>
					<Button variant="contained" color="secondary">
          	Send
        	</Button>
					<Button variant="fab" aria-label="Close">
            <CloseIcon />
          </Button>
        </form>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(ReportForm);
