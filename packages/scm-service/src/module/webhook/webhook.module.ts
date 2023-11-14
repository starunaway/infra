import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { ScmModule } from '../scm/scm.module';
import { ScmVersionModule } from '../scm-version/scm-version.module';

@Module({
  imports: [ScmModule, ScmVersionModule],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
