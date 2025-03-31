import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { JournalModule } from './journal/journal.module';
import { PostcardModule } from './postcard/postcard.module';
import { LoresModule } from './lores/lores.module';

@Module({
  imports: [UserModule, JournalModule, PostcardModule, LoresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
