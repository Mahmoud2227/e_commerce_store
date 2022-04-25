import {useEffect, useReducer} from "react";

import {commerce} from "../../lib/commerce";

import {Grid, Select, InputLabel, MenuItem} from "@material-ui/core";

const initialState = {
	countries: [],
	country: "",
	subdivisions: [],
	subdivision: "",
	options: [],
	option: "",
};

const selectBoxReducer = (state, action) => {
	switch (action.type) {
		case "SET_COUNTRIES":
			const countries = Object.entries(action.countries).map(([code, name]) => ({
				id: code,
				label: name,
			}));
			return {
				...state,
				countries,
			};
		case "SET_COUNTRY":
			return {
				...state,
				country: action.country,
				subdivision: "",
			};
		case "SET_SUBDIVISIONS":
			const subdivisions = Object.entries(action.subdivisions).map(([code, name]) => ({
				id: code,
				label: name,
			}));
			return {
				...state,
				subdivisions,
			};
		case "SET_SUBDIVISION":
			return {
				...state,
				subdivision: action.subdivision,
			};
		case "SET_OPTIONS":
			const options = action.options.map((option) => ({
				id: option.id,
				label: `${option.description} - ${option.price.formatted_with_symbol}`,
			}));
			return {
				...state,
				options,
			};
		case "SET_OPTION":
			return {
				...state,
				option: action.option,
			};
		default:
			return state;
	}
};

const CustomSelect = ({checkoutToken, getCountryData}) => {
	const [state, dispatch] = useReducer(selectBoxReducer, initialState);

	const {countries, subdivisions, options, country, subdivision, option} = state;

	const fetchShippingCountries = async (checkoutTokenID) => {
		const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenID);
		dispatch({type: "SET_COUNTRIES", countries});
		dispatch({type: "SET_COUNTRY", country: Object.keys(countries)[0]});
	};

	const fetchSubdivisions = async (checkoutTokenID, countryCode) => {
		const {subdivisions} = await commerce.services.localeListShippingSubdivisions(
			checkoutTokenID,
			countryCode
		);
		dispatch({type: "SET_SUBDIVISIONS", subdivisions});
		dispatch({type: "SET_SUBDIVISION", subdivision: Object.keys(subdivisions)[0]});
	};

	const fetchShippingOptions = async (checkoutTokenID, countryCode, subdivisionCode) => {
		const options = await commerce.checkout.getShippingOptions(checkoutTokenID, {
			country: countryCode,
			region: subdivisionCode,
		});

		dispatch({type: "SET_OPTIONS", options});
		dispatch({type: "SET_OPTION", option: options[0].id});
	};

	useEffect(() => {
		fetchShippingCountries(checkoutToken.id);
	}, [checkoutToken.id]);

	useEffect(() => {
		if (country) {
			fetchSubdivisions(checkoutToken.id, country);
		}
	}, [checkoutToken.id, country]);

	useEffect(() => {
		if (subdivision) {
			fetchShippingOptions(checkoutToken.id, country, subdivision);
			getCountryData({country, subdivision, option});
		}
	}, [checkoutToken.id, country, subdivision, option, getCountryData]);

	return (
		<>
			<Grid item xs={12} sm={6}>
				<InputLabel>Shipping Country</InputLabel>
				<Select
					value={country}
					fullWidth
					onChange={(e) => dispatch({type: "SET_COUNTRY", country: e.target.value})}>
					{countries.map((country) => (
						<MenuItem key={country.id} value={country.id}>
							{country.label}
						</MenuItem>
					))}
				</Select>
			</Grid>
			<Grid item xs={12} sm={6}>
				<InputLabel>Shipping subdivision</InputLabel>
				<Select
					value={subdivision}
					fullWidth
					onChange={(e) => dispatch({type: "SET_SUBDIVISION", subdivision: e.target.value})}>
					{subdivisions.map((subdivision) => (
						<MenuItem key={subdivision.id} value={subdivision.id}>
							{subdivision.label}
						</MenuItem>
					))}
				</Select>
			</Grid>
			<Grid item xs={12} sm={6}>
				<InputLabel>Shipping Options</InputLabel>
				<Select
					value={option}
					fullWidth
					onChange={(e) => dispatch({type: "SET_OPTION", option: e.target.value})}>
					{options.map((option) => (
						<MenuItem key={option.id} value={option.id}>
							{option.label}
						</MenuItem>
					))}
				</Select>
			</Grid>
		</>
	);
};

export default CustomSelect;
