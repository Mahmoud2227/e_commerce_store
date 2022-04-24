import {useState, useEffect} from "react";

import {commerce} from "./lib/commerce";
import {CircularProgress} from "@material-ui/core";
import {Products, NavBar, Cart} from "./components";

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
		console.log(cart);
		setCart(cart);
		setIsLoading(false);
	};

	const handleAddToCart = async (productID, quantity) => {
		const item = await commerce.cart.add(productID, quantity);

		setCart(item.cart);
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
						<Route exact path='/cart' element={<Cart cart={cart} />} />
					</Routes>
				)}
			</Router>
		</>
	);
}

export default App;
