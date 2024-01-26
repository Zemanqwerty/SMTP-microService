import { MailerService } from "@nestjs-modules/mailer";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SendSmtp } from "src/dtos/smtp/sendSmtp.dto";

@Injectable()
export class SmtpService {
    constructor(
        private mailerService: MailerService
    ) {};

    async sendActivationLink(message: SendSmtp) {
        try {
            return await this.mailerService.sendMail({
                to: message.to,
                subject: 'Подтверждение почты',
                template: './activateAccount',
                context: {
                    url: message.link
                },
            });
        } catch (e) {
            console.log(e);
        }
    }

    async sendResetPasswordLink(message: SendSmtp) {
        try {
            return await this.mailerService.sendMail({
                to: message.to,
                subject: 'Восстановление пароля',
                template: './resetPassword',
                context: {
                    url: message.link
                },
            });
        } catch (e) {
            console.log(e);
        }
    }
}