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
  });

class ReportForm extends React.Component<WithStyles<typeof styles>> {

	render() {
		const { classes } = this.props; 

		return (
			<div className={classes.container}>
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
          </div>
					<div className={classes.btnSubmit}>
            <Button variant="contained" color="secondary">
              Send
            </Button>
          </div>
					<div className={classes.btnClose}>
            <Button variant="fab" aria-label="Close">
              <CloseIcon />
            </Button>
          </div>
        </form>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(ReportForm);
