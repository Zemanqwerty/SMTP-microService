import { Module } from '@nestjs/common';
import { SmtpService } from './smtp.service';
import { SmtpController } from './smtp.controller';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
    imports: [
        MailerModule.forRootAsync({
            // imports: [ConfigModule], // import module if not enabled globally
            useFactory: async (config: ConfigService) => ({
              // transport: config.get("MAIL_TRANSPORT"),
              // or
              transport: {
                host: config.get('MAIL_HOST'),
                secure: true,
                ignoreTLS: false,
                port: 465,
                auth: {
                  user: config.get('MAIL_USER'),
                  pass: config.get('MAIL_PASSWORD'),
                },
              },
              defaults: {
                from: `"No Reply" <${config.get('MAIL_FROM')}>`,
              },
              template: {
                dir: join(__dirname, 'templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                  strict: true,
                },
              },
            }),
            inject: [ConfigService],
          }),
    ],
    providers: [
        SmtpService
    ],
    controllers: [SmtpController],
})
export class SmtpModule {}
