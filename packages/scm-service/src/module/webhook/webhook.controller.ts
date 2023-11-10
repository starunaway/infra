import { Controller, Post, Body, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { GitlabPushEventDTO } from './dto/gitlab-push.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('/gitlab/trigger')
  gitlabTrigger(@Body() pushEventDTO: GitlabPushEventDTO) {
    return this.webhookService.gitlabTrigger(pushEventDTO);
  }

  @Post('/jenkins/trigger')
  @UseInterceptors(FileInterceptor('files'))
  jenkinsTrigger(@UploadedFiles() files, @Body() body: CreateWebhookDto) {
    console.log('files', files, body);
    return this.webhookService.jenkinsTrigger(body, files);
  }
}
