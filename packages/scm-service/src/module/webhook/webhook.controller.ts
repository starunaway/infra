import { Controller, Post, Body } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { GitlabPushEventDTO } from './dto/gitlab-push.dto';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('/gitlab/trigger')
  gitlabTrigger(@Body() pushEventDTO: GitlabPushEventDTO) {
    return this.webhookService.gitlabTrigger(pushEventDTO);
  }

  @Post('/jenkins/trigger')
  jenkinsTrigger(@Body() createWebhookDto: CreateWebhookDto) {
    return this.webhookService.jenkinsTrigger(createWebhookDto);
  }
}
