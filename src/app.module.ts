import { Module } from '@nestjs/common';
import { SmtpModule } from './smtp/smtp.module';
import { ConfigModule } from '@nestjs/config';
import { SmtpController } from './smtp/smtp.controller';
import { SmtpService } from './smtp/smtp.service';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		SmtpModule
	],
})
export class AppModule {}
