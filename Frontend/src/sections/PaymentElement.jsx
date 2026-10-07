import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

export function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

     const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setLoading(true);

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    // Confirm the payment using the PaymentIntent client secret
    const {paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/cart/checkout/confirmation`,
      }
    });

    if (error) {
      setErrorMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      window.location.href = `${window.location.origin}/cart/checkout/confirmation`;
    }

    setLoading(false);
  };
return (
    <form onSubmit={handleSubmit} className="size-[80%] p-4">
      <PaymentElement options={{layout: 'tabs'}}/>
      <button 
        type="submit" 
        disabled={!stripe || loading}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay now"}
      </button>
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
    </form>
  );
}