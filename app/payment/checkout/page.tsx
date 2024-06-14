'use client'

import React, {useEffect, useRef} from "react";
import {POST} from "@/utils/fetch-factory";
import {useRouter} from "next/navigation";

const checkoutPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const initializePayment = async () => {
            // Load the Nexi SDK
            await loadScript(process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_SCRIPT || '');

            // Fetch payment ID from your server
            const defaultSubscriptionId = process.env.NEXT_PUBLIC_DEFAULT_SUBSCRIPTION_PLAN || '';
            const paymentResult = await POST("/proxy/payment/create-payment/"+defaultSubscriptionId, {});
            if(paymentResult.isSuccess){

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
                    const checkout = new Dibs.Checkout(checkoutOptions);
                    checkout.on('payment-completed', function(response) {
                        const paymentId = response['paymentId'];
                        paymentSuccess(paymentId);
                    });
                } else {
                    console.error('Nexi SDK not loaded');
                }
            }

        };
        initializePayment();
    }, []);

    const paymentSuccess = async (paymentId: string)=>
    {
        const result = await POST(`/proxy/payment/complete-payment/${paymentId}`, {})
        if (result.isSuccess) {
            router.push('/payment/complete');
        }
    }
    const loadScript = (src: string) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    };

    return <div id="checkout-container-div" ref={containerRef}></div>;
}

export default checkoutPage;