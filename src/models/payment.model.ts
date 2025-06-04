import { PaymentType } from "#types/payment.js";
import { prisma } from "@services/prisma.service.js";

export async function insertPayment(data: PaymentType){
    return await prisma.payments.create({
        data
    })
}

export async function updatePayment(paymentId: string, status: string){

    return await prisma.payments.update({
        where: { paymentId },
        data: { status }
    })
}