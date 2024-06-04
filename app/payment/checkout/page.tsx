'use client'

import { APIPOST } from "@/utils/fetch-api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const checkoutPage = () => {
    const router = useRouter();
    const subscriptionId = 4;
    const containerId = 'nexipay-checkout';

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://test.checkout.dibspayment.eu/v1/checkout.js?v=1'; // Replace with actual NexiPay script URL
        script.async = true;
        script.onload = () => {
            APIPOST(`Payment/create-payment/${subscriptionId}`).then((response) => {
                const paymentId = response?.paymentId;
                if (paymentId) {
                    const checkoutOptions = {
                        checkoutKey: process.env.NEXT_PUBLIC_NEXI_PUB_KEY,
                        paymentId: paymentId,
                        containerId: containerId,
                    };

                    const checkout = new window.Dibs.Checkout(checkoutOptions);
                    checkout.on('payment-completed', (response: any) => {
                        setTimeout(() => {
                            router.back();
                        }, 1000);
                    });
                }
            });
        };
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return <div id={containerId}></div>;
}

export default checkoutPage;