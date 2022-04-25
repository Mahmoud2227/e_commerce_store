import {useState, useEffect} from "react";

import {commerce} from "./lib/commerce";
import {CircularProgress} from "@material-ui/core";
import {Products, NavBar, Cart, Checkout} from "./components";

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchProducts = async () => {
		setIsLoading(true);
		const {data} = await commerce.products.list();

		setProducts(data);
		setIsLoading(false);
	};

	const fetchCart = async () => {
		setIsLoading(true);
		const cart = await commerce.cart.retrieve();

		setCart(cart);
		setIsLoading(false);
	};

	const handleAddToCart = async (productID, quantity) => {
		const {cart} = await commerce.cart.add(productID, quantity);

		setCart(cart);
	};

	const handleUpdateCartQty = async (productID, quantity) => {
		const {cart} = await commerce.cart.update(productID, {quantity});

		setCart(cart);
	};

	const handleRemoveFromCart = async (productID) => {
		const {cart} = await commerce.cart.remove(productID);
		console.log(cart);
		setCart(cart);
	};

	const handleEmptyCart = async () => {
		const {cart} = await commerce.cart.empty();

		setCart(cart);
	};

	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

	return (
		<>
			<Router>
				<NavBar totalItems={cart.total_items} />
				{isLoading ? (
					<CircularProgress size={100} style={{position: "absolute", top: "50%", left: "50%"}} />
				) : (
					<Routes>
						<Route
							exact
							path='/'
							element={<Products products={products} onAddToCart={handleAddToCart} />}
						/>
						<Route
							exact
							path='/cart'
							element={
								<Cart
									cart={cart}
									handleUpdateCartQty={handleUpdateCartQty}
									handleRemoveFromCart={handleRemoveFromCart}
									handleEmptyCart={handleEmptyCart}
								/>
							}
						/>
						<Route exact path='/checkout' element={<Checkout cart={cart} />} />
					</Routes>
				)}
			</Router>
		</>
	);
}

export default App;
