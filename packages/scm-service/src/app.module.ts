import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookModule } from './module/webhook/webhook.module';
import { ScmModule } from './module/scm/scm.module';
import { ScmVersionModule } from './module/scm-version/scm-version.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { OssModule } from './module/oss/oss.module';

const isProd = process.env.NODE_ENV == 'production';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [isProd ? path.resolve('.env') : path.resolve('.env')],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      autoLoadEntities: true, //自动加载实体
      host: process.env.SQL_HOST,
      port: parseInt(process.env.SQL_PORT), // 端口号
      username: process.env.SQL_USERNAME, // 用户名
      password: process.env.SQL_PASSWORD, // 密码
      database: process.env.SQL_DATABASE, //数据库名
      synchronize: !isProd, //是否自动同步实体文件,生产环境建议关闭
      timezone: 'Asia/Shanghai', // 设置时区
    }),

    WebhookModule,
    ScmModule,
    ScmVersionModule,
    OssModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
