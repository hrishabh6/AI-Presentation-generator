

export const dynamic = "force-dynamic";
import crypto from 'node:crypto'
import {client} from "@/lib/prisma"
import { NextRequest } from 'next/server';

export async function POST(req : NextRequest) {
    try {
        const rawBody = await req.text()
        const body = JSON.parse(rawBody) 
        
        const {buyerUserId} = body.meta.custom_data

        if(!buyerUserId) {
            throw new Error("Buyer user ID not found")
        }

        const hmac = crypto.createHmac('sha256', process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!) 

        const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8')

        const signatuer = Buffer.from(req.headers.get('X-Signature') || '', 'utf8')

        console.log('digest', digest)
        console.log('signature', signatuer)

        if(!crypto.timingSafeEqual(digest, signatuer)) {
            throw new Error("Invalid signature")
        }

        const buyer = await client.user.update({
            where : {
                id : buyerUserId
            },
            data : {
                subscription : true
            }
        })

        if (!buyer) {
            return Response.json({
                message : "Cannot update the subscription",
                status : 404
            })
        }


    } catch (error) {
        console.log("❌ Error in lemonSqueezy webhook", error);
        return Response.json({
            message : "Internal server error",
            status : 500
        })
    }
}