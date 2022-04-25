import {useState, useEffect} from "react";
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from "@material-ui/core";
import {useForm, FormProvider} from "react-hook-form";

import {commerce} from "../../lib/commerce";

import CustomSelect from "./CustomSelect";

import FormInput from "./FormInput";

const AddressForm = ({checkoutToken}) => {
	// const [shippingCountries, setShippingCountries] = useState([]);
	// const [shippingCountry, setShippingCountry] = useState("");
	// const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
	// const [shippingSubdivision, setShippingSubdivision] = useState("");
	// const [shippingOptions, setShippingOptions] = useState([]);
	// const [shippingOption, setShippingOption] = useState("");

	const methods = useForm();

	// const countries = Object.entries(shippingCountries).map(([code, name]) => ({
	// 	id: code,
	// 	label: name,
	// }));

	// const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({
	// 	id: code,
	// 	label: name,
	// }));

	// const options = shippingOptions.map((option) => ({
	// 	id: option.id,
	// 	label: `${option.description} - ${option.price.formatted_with_symbol}`,
	// }));

	// console.log(options);

	// const fetchShippingCountries = async (checkoutTokenID) => {
	// 	const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenID);
	// 	setShippingCountries(countries);
	// 	setShippingCountry(Object.keys(countries)[0]);
	// };

	// const fetchSubdivisions = async (checkoutTokenID, countryCode) => {
	// 	const {subdivisions} = await commerce.services.localeListShippingSubdivisions(
	// 		checkoutTokenID,
	// 		countryCode
	// 	);
	// 	setShippingSubdivisions(subdivisions);
	// 	setShippingSubdivision(Object.keys(subdivisions)[0]);
	// };

	// const fetchShippingOptions = async (checkoutTokenID, countryCode, subdivisionCode = null) => {
	// 	console.log(subdivisionCode);
	// 	const options = await commerce.checkout.getShippingOptions(checkoutTokenID, {
	// 		country: countryCode,
	// 		region: subdivisionCode,
	// 	});
	// 	setShippingOptions(options);
	// 	setShippingOption(options[0].id);
	// };

	// useEffect(() => {
	// 	fetchShippingCountries(checkoutToken.id);
	// }, [checkoutToken.id]);

	// useEffect(() => {
	// 	if (shippingCountry) {
	// 		fetchSubdivisions(checkoutToken.id, shippingCountry);
	// 	}
	// }, [checkoutToken.id, shippingCountry]);

	// useEffect(() => {
	// 	if (shippingSubdivision) {
	// 		fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
	// 	}
	// }, [checkoutToken.id, shippingCountry, shippingSubdivision]);

	return (
		<>
			<Typography variant='h6' gutterBottom>
				Shipping Address
			</Typography>
			<FormProvider {...methods}>
				<form>
					<Grid container spacing={3}>
						<FormInput name='firstName' label='First name' />
						<FormInput name='lastName' label='Last name' />
						<FormInput name='address' label='Address' />
						<FormInput name='email' label='Email' />
						<FormInput name='city' label='City' />
						<FormInput name='zip' label='ZIP / Postal code' />
						<CustomSelect checkoutToken={checkoutToken} />
						{/* <Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select
								value={shippingCountry}
								fullWidth
								onChange={(e) => setShippingCountry(e.target.value)}>
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
								value={shippingSubdivision}
								fullWidth
								onChange={(e) => setShippingSubdivision(e.target.value)}>
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
								value={shippingOption}
								fullWidth
								onChange={(e) => setShippingOption(e.target.value)}>
								{options.map((option) => (
									<MenuItem key={option.id} value={option.id}>
										{option.label}
									</MenuItem>
								))}
							</Select>
						</Grid> */}
					</Grid>
				</form>
			</FormProvider>
		</>
	);
};

export default AddressForm;