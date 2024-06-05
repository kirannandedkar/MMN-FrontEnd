'use client'

import { AppDispatch } from "@/redux/store";
import { GetSubscription } from "@/redux/user/auth.action";
import { APIPOST } from "@/utils/fetch-api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const checkoutPage = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

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
                    checkout.on('payment-completed', async (response: any) => {
                        await APIPOST(`Payment/complete-payment/${paymentId}`);
                        dispatch(GetSubscription());
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