import { Logger, Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { ScmModule } from '../scm/scm.module';
import { ScmVersionModule } from '../scm-version/scm-version.module';
import { OssModule } from '../oss/oss.module';

@Module({
  imports: [ScmModule, ScmVersionModule, OssModule],
  controllers: [WebhookController],
  providers: [
    WebhookService,
    {
      provide: 'WebhookLogger',
      useFactory: () => {
        return new Logger('Webhook');
      },
    },
  ],
})
export class WebhookModule {}
