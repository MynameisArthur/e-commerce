import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price})=>{
    const priceForStripe = price * 100;//mnożę przez 100, ponieważ STRIPE liczy kwoty w centach
    const publishableKey = 'pk_test_AXMmHZtBiYuJ42ynYhNNMczP';// API klucz generowany przez Stripe
    const onToken = token=>{
        console.log(token);
        alert('Payment Successful');
    }
    return(
        <StripeCheckout 
            label="Pay Now"
            name="CRWN Clothes"
            billingAddress
            shippingAddress
            image="https://sendeyo.com/up/d/f3eb2117da"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};
export default StripeCheckoutButton;