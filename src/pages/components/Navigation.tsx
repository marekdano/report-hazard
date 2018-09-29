import * as React from 'react';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';

import { 
	AppBar, 
	IconButton, 
	List,
  ListItem,
  ListItemIcon,
  ListItemText,
	Toolbar, 
	Drawer, 
	Typography, 
	Button
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { NavLink } from 'react-router-dom';

const styles = (theme: Theme) => ({
	flex: {
    flexGrow: 1,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '20px 0 5px 24px',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list: {
    width: 250,
  },
  fab: {
    position: 'absolute' as 'absolute',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4,
	},
	link: {
		textDecoration: 'none',
	},
});

interface IProp {
	openDrawer: boolean;
	toggleDrawer: (key: boolean) => () => void;
}

const Navigation =  (props: WithStyles<typeof styles> & IProp) => {
	const { classes, openDrawer, toggleDrawer } = props;
	
	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton 
					className={classes.menuButton} 
					color="inherit" aria-label="Menu" 
					onClick={toggleDrawer(true)}>
					<MenuIcon />
				</IconButton>
				<Drawer open={openDrawer} onClose={toggleDrawer(false)}>
					<div
						tabIndex={0}
						role="button"
						className={classes.list}
						onClick={toggleDrawer(false)}
						onKeyDown={toggleDrawer(false)}
					>
						<div className={classes.drawerHeader}>
							<Typography variant="title">
								RecordHazard
							</Typography>
						</div>
						<List>
							<ListItem button={true}>
								<ListItemIcon>
									<RssFeedIcon />
								</ListItemIcon>
								<NavLink className={classes.link} to='/'>
									<ListItemText primary="Feed"/>
								</NavLink>
							</ListItem>
							<ListItem button={true}>
								<ListItemIcon>
									<HelpOutlineIcon />
								</ListItemIcon>
								<NavLink className={classes.link} to='/help'>
									<ListItemText primary="Help"/>
								</NavLink>
							</ListItem>
							<ListItem>
								<Button variant="contained" color="secondary">
									Enable Notifications
								</Button>
							</ListItem>
						</List>
					</div>
				</Drawer>
				<Typography variant="title" color="inherit" className={classes.flex}>
					RecordHazard
				</Typography>
				<Button variant="contained" color="secondary">
					Enable Notifications
				</Button> 
			</Toolbar>
		</AppBar>	
	)
};

export default withStyles(styles, { withTheme: true })(Navigation);