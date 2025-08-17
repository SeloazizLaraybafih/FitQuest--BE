import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';
import { UserModule } from './user/user.module';
import { AchievementModule } from './achievement/achievement.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), FirebaseModule, UserModule, AchievementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
