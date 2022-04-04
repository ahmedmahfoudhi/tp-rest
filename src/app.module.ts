import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PremierModule } from './premier/premier.module';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';
import { devConfig } from './config/dev.config';
import { prodConfig } from "./config/prod.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "./todo/Entity/todo.entity";
import { UserModule } from './user/user.module';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { CvSkillModule } from './cv-skill/cv-skill.module';

@Module({
  imports: [
    PremierModule,
    TodoModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [process.env.NODE_ENV == 'development' ? devConfig : prodConfig],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'gl322',
      autoLoadEntities: true,
      synchronize: true,
      debug: true,
    }),
    UserModule,
    CvModule,
    SkillModule,
    CvSkillModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
