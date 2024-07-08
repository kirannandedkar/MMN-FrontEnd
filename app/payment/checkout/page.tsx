'use client';

import React, { useEffect, useRef } from "react";
import { POST } from "@/utils/fetch-factory";
import { useRouter } from "next/navigation";

declare global {
    interface Window {
        Dibs: any;
    }
}

const CheckoutPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const initializePayment = async () => {
            try {

                // Load the Nexi SDK
                await loadScript(process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_SCRIPT || '');

                // Fetch payment ID from your server
                const defaultSubscriptionId = process.env.NEXT_PUBLIC_DEFAULT_SUBSCRIPTION_PLAN || '';
                const paymentResult = await POST("/proxy/payment/create-payment/" + defaultSubscriptionId, {});
                
                if (paymentResult.isSuccess) {
                    // Set up the checkout options
                    const checkoutOptions = {
                        checkoutKey: process.env.NEXT_PUBLIC_PAYMENT_CHECKOUT_KEY || '',
                        paymentId: paymentResult.result.paymentId,
                        containerId: containerRef.current?.id || '',
                        language: "en-GB",
                        theme: {
                            buttonRadius: "5px",
                        },
                    };

                    // Initialize the checkout
                    if (window.Dibs) {
                        console.log('Initializing Dibs checkout with options:', checkoutOptions);
                        const checkout = new window.Dibs.Checkout(checkoutOptions);
                        checkout.on('payment-completed', function (response: any) {
                            const paymentId = response['paymentId'];
                            paymentSuccess(paymentId);
                        });
                    } else {
                        console.error('Nexi SDK not loaded');
                    }
                } else {
                    console.error('Payment initialization failed:', paymentResult.message);
                }
            } catch (error) {
                console.error('Error during payment initialization:', error);
            }
        };

        initializePayment();
    }, []);

    const paymentSuccess = async (paymentId: string) => {
        try {
            const result = await POST(`/proxy/payment/complete-payment/${paymentId}`, {});
            if (result.isSuccess) {
                router.push('/payment/complete');
            } else {
                console.error('Payment completion failed:', result.message);
            }
        } catch (error) {
            console.error('Error completing payment:', error);
        }
    };

    const loadScript = (src: string) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = () => resolve(true);
            script.onerror = () => reject(new Error(`Script load error for ${src}`));
            document.body.appendChild(script);
        });
    };

    return <div id="checkout-container-div" ref={containerRef}></div>;
};

export default CheckoutPage;
