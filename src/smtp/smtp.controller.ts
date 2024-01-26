import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { SmtpService } from "./smtp.service";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { SendSmtp } from "src/dtos/smtp/sendSmtp.dto";



@Controller()
export class SmtpController {
    constructor(
        private readonly smtpService: SmtpService,
    ) {};

    @MessagePattern({ cmd: 'smtp' })
    async sendEmailActivationLink(@Payload() message: SendSmtp, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        console.log(message.to);

        channel.ack(originalMsg);

        if (message.type === 'activation') {
            return await this.smtpService.sendActivationLink(message);
        } else if (message.type === 'reset') {
            return await this.smtpService.sendResetPasswordLink(message);
        }
    }

    // @MessagePattern({ cmd: 'sendResetPasswordLink' })
    // async sendResetPasswordLink(@Payload() message: SendSmtp, @Ctx() context: RmqContext) {
    //     const channel = context.getChannelRef();
    //     const originalMsg = context.getMessage();
    //     console.log(message.to);

    //     channel.ack(originalMsg);
        
    //     return await this.smtpService.sendActivationLink(message);
    // }
}
