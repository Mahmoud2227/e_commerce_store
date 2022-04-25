import {useState, useCallback} from "react";

import {Button, Grid, Typography} from "@material-ui/core";
import {useForm, FormProvider} from "react-hook-form";
import {Link} from "react-router-dom";
import CustomSelect from "./CustomSelect";

import FormInput from "./FormInput";

const AddressForm = ({checkoutToken, next}) => {
	const methods = useForm();
	const [countryData, setCountryData] = useState({});

	const getCountryData = useCallback((data) => {
		setCountryData(data);
	}, []);

	return (
		<>
			<Typography variant='h6' gutterBottom>
				Shipping Address
			</Typography>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit((data) => next({...data, ...countryData}))}>
					<Grid container spacing={3}>
						<FormInput name='firstName' label='First name' />
						<FormInput name='lastName' label='Last name' />
						<FormInput name='address' label='Address' />
						<FormInput name='email' label='Email' />
						<FormInput name='city' label='City' />
						<FormInput name='zip' label='ZIP / Postal code' />
						<CustomSelect checkoutToken={checkoutToken} getCountryData={getCountryData} />
					</Grid>
					<br />
					<div style={{display: "flex", justifyContent: "space-between"}}>
						<Button component={Link} to='/cart' variant='outlined'>
							Back to Cart
						</Button>
						<Button type='submit' variant='contained' color='primary'>
							Next
						</Button>
					</div>
				</form>
			</FormProvider>
		</>
	);
};

export default AddressForm;
