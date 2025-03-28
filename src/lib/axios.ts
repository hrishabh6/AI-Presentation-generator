import axios from 'axios';

export const lemonSqueezyClient = (lemonSqueezyApiKey : string) => {
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_API,
        headers : {
            Accept : "Application/vnd.api+json",
            Authorization: `Bearer ${lemonSqueezyApiKey ? lemonSqueezyApiKey : process.env.LEMON_SQUEEZY_API_KEY}`
        },
    });
}