import React from "react";
import {Container, Typography, Button, Grid} from "@material-ui/core";

import CartItem from "./CartItem/CartItem";

import useStyles from "./CartStyles";

const Cart = ({cart}) => {
	const classes = useStyles();

	const EmptyCard = () => (
		<Typography variant='subtitle1'>
			You have no items in your shopping cart, start adding some!{" "}
		</Typography>
	);

	const FilledCart = () => (
		<>
			<Grid container spacing={3}>
				{cart.line_items.map((item) => (
					<Grid item xs={12} sm={4} key={item.id}>
						<CartItem item={item} />
					</Grid>
				))}
			</Grid>
			<div className={classes.cardDetails}>
				<Typography variant='h4'>SubTotal: {cart.subtotal.formatted_with_symbol}</Typography>
				<div>
					<Button
						className={classes.emptyButton}
						size='large'
						type='button'
						variant='contained'
						color='secondary'>
						Empty Cart
					</Button>
					<Button
						className={classes.checkoutButton}
						size='large'
						type='button'
						variant='contained'
						color='primary'>
						Checkout
					</Button>
				</div>
			</div>
		</>
	);

	if (!cart.line_items) {
		return "Loading...";
	}

	return (
		<Container>
			<div className={classes.toolbar} />
			<Typography variant='h3' className={classes.title} gutterBottom>
				Your Shopping Cart
			</Typography>
			{!cart.line_items.length ? <EmptyCard /> : <FilledCart />}
		</Container>
	);
};

export default Cart;
