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
      host: 'localhost',
      port: 3306, // 端口号
      username: 'root', // 用户名
      password: 'root', // 密码
      database: 'scm', //数据库名
      synchronize: true, //是否自动同步实体文件,生产环境建议关闭
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
