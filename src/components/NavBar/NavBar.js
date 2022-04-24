import React from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Badge,
	MenuItem,
	MenuItemTypeMap,
	Typography,
} from "@material-ui/core";
import {ShoppingCart} from "@material-ui/icons";
import {Link, useLocation} from "react-router-dom";

import logo from "../../assets/ecommerce.png";
import useStyles from "./NavBarStyles";

const NavBar = ({totalItems}) => {
	const classes = useStyles();
	const location = useLocation();

	if (location.pathname === "/") {
	}

	return (
		<>
			<AppBar position='fixed' className={classes.appBar} color='inherit'>
				<Toolbar>
					<Typography component={Link} to='/' variant='h6' className={classes.badge}>
						<img src={logo} alt='ECommerce' height='25px' className={classes.image} />
						ECommerce
					</Typography>
					<div className={classes.grow} />
					{location.pathname === "/" && (
						<div className={classes.button}>
							<IconButton component={Link} to='/cart' aria-label='Show cart items' color='inherit'>
								<Badge badgeContent={totalItems} color='secondary' overlap='rectangular'>
									<ShoppingCart />
								</Badge>
							</IconButton>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</>
	);
};

export default NavBar;
