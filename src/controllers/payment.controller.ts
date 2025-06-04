import { PaymentType } from "#types/payment.js";
import { IConfirmationType, ICreatePayment } from "@a2seven/yoo-checkout";
import { insertPayment, updatePayment } from "@models/payment.model.js";
import { checkout } from "@services/payment.service.js";
import { Request, Response } from "express";
import { v7 } from 'uuid'

export async function createPayment(req: Request, res: Response): Promise<Response | any>{
    const { amount, email } = req.body

    try {
        const payload: ICreatePayment = {
            amount: {
                value: amount,
                currency: 'RUB'
            },
            confirmation: {
                type: "redirect" as IConfirmationType,
                return_url: "http:localhost:3000"
            },
            description: "payment"
        }

        const { id, amount: { value }, paid, created_at, status } = await checkout.createPayment(payload, v7())

        const paymentData: PaymentType = {
            paymentId: id,
            value,
            isPaid: paid,
            createdAt: new Date(created_at),
            status
        }

        await insertPayment(paymentData)
        
        res.json({paymentData})
    } catch (error) {
        
    }
}

export async function getPayment(paymentId: string, userId: string): Promise<Response | any>{
    try {
        const getPaymentResponse = await checkout.getPayment(paymentId)

        if (getPaymentResponse.status !== "succeeded" && !getPaymentResponse.paid){
            updatePayment(paymentId, getPaymentResponse.status)
            console.log(getPaymentResponse)
            return getPaymentResponse
        }

        await checkout.capturePayment(paymentId, getPaymentResponse)
        updatePayment(paymentId, getPaymentResponse.status)
        console.log(getPaymentResponse)
        return getPaymentResponse

    } catch (error) {
        console.error(error)
    }
}