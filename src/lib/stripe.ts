import { loadStripe, Stripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

/**
 * Stripe Integration Service
 * Provides helpers for handling payments, checkout sessions, and customer management.
 */
export const stripeService = {
  /**
   * Create a checkout session for rent payment or other invoices
   */
  createCheckoutSession: async (invoiceId: string, amount: number, customerId?: string) => {
    // In a real app, this would call a Supabase Edge Function or your backend
    // which then calls Stripe's API to create a session.
    console.log(`Creating checkout session for invoice ${invoiceId}, amount ${amount}`);
    
    // Example: Redirecting to a hosted checkout page (simulation)
    return {
      sessionId: 'mock_session_id',
      url: 'https://checkout.stripe.com/pay/mock'
    };
  },

  /**
   * Handle the redirect to Stripe Checkout
   */
  redirectToCheckout: async (sessionId: string) => {
    const stripe = await stripePromise;
    if (stripe) {
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error('Stripe redirect error:', error);
        throw error;
      }
    }
  },

  /**
   * Sync a customer with Stripe
   */
  syncCustomer: async (email: string, name: string) => {
    // Call backend/edge function to create/update Stripe customer
    console.log(`Syncing customer ${email} with Stripe`);
  }
};