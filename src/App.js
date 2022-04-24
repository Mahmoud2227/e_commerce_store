import {useState, useEffect} from "react";

import {commerce} from "./lib/commerce";
import {Products, NavBar, Cart} from "./components";

function App() {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	// const [isLoading, setIsLoading] = useState(true);

	const fetchProducts = async () => {
		// setIsLoading(true);
		const {data} = await commerce.products.list();

		setProducts(data);
		// setIsLoading(false);
	};

	const fetchCart = async () => {
		// setIsLoading(true);
		const cart = await commerce.cart.retrieve();

		setCart(cart);
		// setIsLoading(false);
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
		// !isLoading && (
		<>
			<NavBar totalItems={cart.total_items} />
			{/* <Products products={products} onAddToCart={handleAddToCart} /> */}
			<Cart cart={cart} />
		</>
	);
	// );
}

export default App;
