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

interface IProps {
  onToggleForm: (open: boolean) => () => void, 
}
class ReportForm extends React.Component<WithStyles<typeof styles> & IProps> {
  
	render() {
		const { classes, onToggleForm } = this.props; 

		return (
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
            <Button variant="contained" color="primary" id="location-btn">
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
    );
	}
}

export default withStyles(styles, { withTheme: true })(ReportForm);
