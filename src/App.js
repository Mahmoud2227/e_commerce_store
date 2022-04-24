import {useState, useEffect} from "react";

import {commerce} from "./lib/commerce";
import {Products, NavBar} from "./components";

function App() {
	const [products, setProducts] = useState([]);

	const fetchProducts = async () => {
		const {data} = await commerce.products.list();

		setProducts(data);
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	console.log(products);

	return (
		<div>
			<NavBar />
			<Products products={products} />
		</div>
	);
}

export default App;