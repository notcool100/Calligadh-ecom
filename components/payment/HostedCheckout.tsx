// *********************
// Role of the component: Mastercard Hosted Checkout Payment Integration
// Name of the component: HostedCheckout.tsx
// Developer: AI Assistant
// Version: 1.0
// Component call: <HostedCheckout onPaymentComplete={callback} orderData={orderData} />
// Input parameters: onPaymentComplete (callback), orderData (order details)
// Output: Payment interface with embedded/modal payment options
// *********************

"use client";
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface OrderData {
  total: number;
  currency?: string;
  orderId?: string;
}

interface HostedCheckoutProps {
  onPaymentComplete: (result: any) => void;
  onPaymentError: (error: any) => void;
  onPaymentCancel: () => void;
  orderData: OrderData;
  sessionId?: string; // This would come from your backend after initiating checkout
}

// Declare global Checkout object for TypeScript
declare global {
  interface Window {
    Checkout: {
      configure: (config: any) => void;
      showEmbeddedPage: (selector: string, callback?: () => void) => void;
      showPaymentPage: () => void;
      saveFormFields: () => void;
      restoreFormFields: () => void;
    };
  }
}

const HostedCheckout: React.FC<HostedCheckoutProps> = ({
  onPaymentComplete,
  onPaymentError,
  onPaymentCancel,
  orderData,
  sessionId = "demo_session_id" // In production, this should come from your backend
}) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMode, setPaymentMode] = useState<'embedded' | 'modal' | 'page'>('embedded');

  const initializeCheckout = () => {
    if (window.Checkout) {
      try {
        window.Checkout.configure({
          session: {
            id: sessionId
          }
        });
        console.log('Checkout configured with session ID:', sessionId);
      } catch (error) {
        console.error('Error configuring checkout:', error);
        toast.error('Payment system configuration failed');
      }
    }
  };

  useEffect(() => {
    // Load the Hosted Checkout script
    const loadScript = () => {
      // Check if script is already loaded
      if (window.Checkout) {
        setIsScriptLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://secure.ap.tnspayments.com/static/checkout/checkout.min.js';
      script.setAttribute('data-error', 'handlePaymentError');
      script.setAttribute('data-cancel', 'handlePaymentCancel');
      script.setAttribute('data-complete', 'handlePaymentComplete');

      script.onload = () => {
        setIsScriptLoaded(true);
        initializeCheckout();
      };

      script.onerror = () => {
        toast.error('Failed to load payment system');
      };

      document.head.appendChild(script);
    };

    loadScript();

    // Define global callback functions
    (window as any).handlePaymentComplete = (result: any) => {
      console.log('Payment completed:', result);
      toast.success('Payment completed successfully!');
      onPaymentComplete(result);
      setIsModalOpen(false);
    };

    (window as any).handlePaymentError = (error: any) => {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
      onPaymentError(error);
    };

    (window as any).handlePaymentCancel = () => {
      console.log('Payment cancelled');
      toast('Payment cancelled');
      onPaymentCancel();
      setIsModalOpen(false);
    };

    return () => {
      // Cleanup: remove global callbacks
      delete (window as any).handlePaymentComplete;
      delete (window as any).handlePaymentError;
      delete (window as any).handlePaymentCancel;
    };
  }, [onPaymentComplete, onPaymentError, onPaymentCancel, initializeCheckout]);

  const handleEmbeddedPayment = () => {
    if (window.Checkout) {
      try {
        window.Checkout.showEmbeddedPage('#embedded-payment-container');
      } catch (error) {
        console.error('Error showing embedded payment:', error);
        toast.error('Failed to initialize embedded payment');
      }
    }
  };

  const handleModalPayment = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      if (window.Checkout) {
        try {
          window.Checkout.showEmbeddedPage('#modal-payment-container', () => {
            setIsModalOpen(true);
          });
        } catch (error) {
          console.error('Error showing modal payment:', error);
          toast.error('Failed to initialize modal payment');
        }
      }
    }, 100);
  };

  const handlePagePayment = () => {
    if (window.Checkout) {
      try {
        window.Checkout.showPaymentPage();
      } catch (error) {
        console.error('Error showing payment page:', error);
        toast.error('Failed to redirect to payment page');
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
    }
  };

  if (!isScriptLoaded) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading payment system...</span>
      </div>
    );
  }

  return (
    <div className="hosted-checkout-container">
      {/* Payment Mode Selection */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Choose Payment Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setPaymentMode('embedded')}
            className={`p-3 text-center rounded-md border-2 transition-colors ${
              paymentMode === 'embedded'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
            }`}
          >
            <div className="font-medium">Embedded Payment</div>
            <div className="text-sm mt-1">Pay on this page</div>
          </button>
          
          <button
            onClick={() => setPaymentMode('modal')}
            className={`p-3 text-center rounded-md border-2 transition-colors ${
              paymentMode === 'modal'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
            }`}
          >
            <div className="font-medium">Modal Payment</div>
            <div className="text-sm mt-1">Pay in popup</div>
          </button>
          
          <button
            onClick={() => setPaymentMode('page')}
            className={`p-3 text-center rounded-md border-2 transition-colors ${
              paymentMode === 'page'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
            }`}
          >
            <div className="font-medium">Payment Page</div>
            <div className="text-sm mt-1">Redirect to pay</div>
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h4 className="font-medium text-blue-800 mb-2">Payment Summary</h4>
        <div className="text-blue-700">
          <div className="flex justify-between">
            <span>Total Amount:</span>
            <span className="font-semibold">${orderData.total}</span>
          </div>
          <div className="flex justify-between">
            <span>Currency:</span>
            <span>{orderData.currency || 'USD'}</span>
          </div>
          {orderData.orderId && (
            <div className="flex justify-between">
              <span>Order ID:</span>
              <span className="font-mono text-xs">{orderData.orderId}</span>
            </div>
          )}
        </div>
      </div>

      {/* Payment Buttons */}
      <div className="mb-6">
        {paymentMode === 'embedded' && (
          <button
            onClick={handleEmbeddedPayment}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Start Embedded Payment
          </button>
        )}
        
        {paymentMode === 'modal' && (
          <button
            onClick={handleModalPayment}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors font-medium"
          >
            Open Modal Payment
          </button>
        )}
        
        {paymentMode === 'page' && (
          <button
            onClick={handlePagePayment}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 transition-colors font-medium"
          >
            Go to Payment Page
          </button>
        )}
      </div>

      {/* Embedded Payment Container */}
      {paymentMode === 'embedded' && (
        <div 
          id="embedded-payment-container" 
          className="min-h-[400px] border border-gray-300 rounded-md p-4 bg-white"
        >
          {/* The payment form will be injected here by the Hosted Checkout script */}
        </div>
      )}

      {/* Modal Payment */}
      {isModalOpen && paymentMode === 'modal' && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Complete Payment</h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div 
                  id="modal-payment-container" 
                  className="min-h-[400px]"
                >
                  {/* The payment form will be injected here by the Hosted Checkout script */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Notice */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Demo Mode</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>This is a demo implementation. In production, you would need:</p>
              <ul className="list-disc list-inside mt-1 ml-2">
                <li>Valid merchant credentials from Mastercard</li>
                <li>Backend endpoint to initiate checkout sessions</li>
                <li>Proper session ID from your payment processor</li>
                <li>SSL certificate for secure payments</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostedCheckout;