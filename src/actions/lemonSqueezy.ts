"use server"
import { lemonSqueezyClient } from "@/lib/axios";


export const buySubscription = async (userId: string) => {
    try {
        const res = await lemonSqueezyClient(process.env.LEMON_SQUEEZY_API_KEY!)
        .post('/checkouts', {
            data : {
                type : 'checkouts',
                attributes : {
                    checkout_data : {
                        custom : {
                            buyerUserId : userId
                        },
                    },
                    product_options : {
                        redirect_url : `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard`
                    },
                },
                relationships : {
                    store : {
                        data : {
                            type : 'stores',
                            id : process.env.LEMON_SQUEEZY_STORE_ID
                        }
                    },
                    variant : {
                        data : {
                            type : 'variants',
                            id : process.env.LEMON_SQUEEZY_VARIANT_ID
                        }
                    }
                },
            }
        })

        const checkoutUrl = res.data.data.attributes.url
        return { status: 200, url: checkoutUrl };


    } catch (error) {
        console.log("❌ Error in buySubscription", error);
        return { status: 500, error: "Internal Server error" };
    }
}