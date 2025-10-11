import React, { useState, useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, SpinnerIcon } from './Icons';

// Add Razorpay type to window to support TypeScript
declare global {
    interface Window {
        Razorpay: any;
    }
}

interface PaymentGatewayProps {
    userName: string | null;
    onPaymentSuccess: () => void;
}

// Using a public test key from Razorpay's documentation
const RAZORPAY_KEY_ID = 'rzp_test_RRyXp5mgPu4trU'; 

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ userName, onPaymentSuccess }) => {
    const [paymentState, setPaymentState] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');

    const capitalizedUserName = userName ? userName.charAt(0).toUpperCase() + userName.slice(1) : 'there';

    const handlePayment = () => {
        if (!window.Razorpay) {
            console.error("Razorpay SDK not loaded. Please check your internet connection and script tag.");
            setPaymentState('failed');
            return;
        }

        setPaymentState('processing');

        const options = {
            key: RAZORPAY_KEY_ID,
            amount: "19900", // amount in the smallest currency unit (199 * 100)
            currency: "INR",
            name: "Dishuflix",
            description: "Lifetime Access Pass",
            handler: function (response: any) {
                console.log('Payment successful:', response);
                setPaymentState('success');
            },
            prefill: {
                name: userName || "Dishuflix User",
            },
            theme: {
                color: "#E50914" // The app's primary red color
            },
            modal: {
                ondismiss: function() {
                    console.log('Checkout form closed by user.');
                    setPaymentState('idle'); // Revert to idle state if user closes the modal
                }
            }
        };

        const razorpay = new window.Razorpay(options);
        
        razorpay.on('payment.failed', function (response: any) {
            console.error('Payment failed:', response);
            setPaymentState('failed');
        });
        
        razorpay.open();
    };

    useEffect(() => {
        if (paymentState === 'success') {
            const timer = setTimeout(() => {
                onPaymentSuccess();
            }, 2000); // Redirect after 2 seconds of showing the success message
            return () => clearTimeout(timer);
        }
    }, [paymentState, onPaymentSuccess]);

    const renderContent = () => {
        switch (paymentState) {
            case 'processing':
                return (
                    <div className="animate-fade-in">
                        <SpinnerIcon className="w-16 h-16 text-red-500 animate-spin mx-auto" />
                        <h3 className="text-2xl font-bold mt-4 text-white">Opening Payment Gateway</h3>
                        <p className="text-gray-400 mt-2 min-h-[1.5rem]">Please wait...</p>
                    </div>
                );
            case 'success':
                return (
                    <div className="animate-fade-in">
                        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
                        <h3 className="text-2xl font-bold mt-4 text-white">Payment Successful!</h3>
                        <p className="text-gray-400 mt-2">Welcome to Dishuflix. Redirecting...</p>
                    </div>
                );
            case 'failed':
                 return (
                    <div className="animate-fade-in">
                        <XCircleIcon className="w-16 h-16 text-red-500 mx-auto" />
                        <h3 className="text-2xl font-bold mt-4 text-white">Payment Failed</h3>
                        <p className="text-gray-400 mt-2 mb-6">Something went wrong. Please try again.</p>
                        <button
                            onClick={() => setPaymentState('idle')}
                            className="w-full mt-4 bg-[#E50914] text-white font-bold py-3 px-4 rounded-lg text-lg hover:bg-red-700 transition-colors duration-300"
                        >
                            Try Again
                        </button>
                    </div>
                );
            case 'idle':
            default:
                return (
                    <div className="animate-fade-in">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">You're Almost In, {capitalizedUserName}!</h2>
                        <p className="text-gray-400 mb-6">Lifetime of Unlimited entertainment!</p>
                        
                        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-700 text-left space-y-4">
                            <div className="flex justify-between items-baseline">
                                <span className="text-xl font-bold text-white">Lifetime Access</span>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-white">₹199</span>
                                    <span className="text-gray-400 line-through ml-2">₹499</span>
                                </div>
                            </div>
                            <ul className="text-gray-300 text-sm space-y-2">
                                <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> Unlimited Movies, TV Shows & More</li>
                                <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> Watch Anywhere. Completely Ad-Free.</li>
                                <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> Pay Once. Enjoy Forever.</li>
                            </ul>
                        </div>

                        <button
                            onClick={handlePayment}
                            className="w-full mt-6 bg-[#E50914] text-white font-bold py-3 px-4 rounded-lg text-lg hover:bg-red-700 transition-colors duration-300 shadow-[0_0_20px_rgba(229,9,20,0.5)] transform hover:scale-105"
                        >
                            Unlock Lifetime Access
                        </button>
                         <p className="text-xs text-gray-500 mt-3">100% Secure Payment via Razorpay.</p>
                    </div>
                );
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-[#141414] border border-gray-700 rounded-xl shadow-2xl shadow-red-900/20 p-6 md:p-8 w-full max-w-md text-center">
                {renderContent()}
            </div>
        </div>
    );
};

export default PaymentGateway;
