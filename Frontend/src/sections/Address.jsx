import { Elements, useStripe, useElements, PaymentElement, AddressElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

function UserAddressForm() {
    const navigate = useNavigate()
    const elements = useElements();
    const [loading, setLoading] = useState(false);

     const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const addressElement = elements.getElement(AddressElement)
    const { complete, value } = await addressElement.getValue();
    console.log(value)
    if (!complete) {
      setLoading(false);
      return;
    }
    const createUserInfo = await fetch('/api/shipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shipping: value })
    })
    if(!createUserInfo.ok) {
        navigate('/cart/checkout')
    }
  };
return (
    <form onSubmit={handleSubmit} className="size-[80%] p-4">
      <AddressElement options={{mode: 'shipping'}} />
      <button 
        type="submit" 
        disabled={loading}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? "Processing..." : "Submit"}
      </button>
    </form>
  ); 
}

export function UserAddress() {
      const appearance = { 
        theme: 'stripe',
        variables: { colorText: '#111827', colorBackground: '#ffffff' }
     }
    return (
        <Elements stripe={stripePromise} options={{ appearance }}>
            <UserAddressForm />
        </Elements>
    )
}