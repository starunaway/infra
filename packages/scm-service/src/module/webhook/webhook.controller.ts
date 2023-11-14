import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { GitlabPushEventDTO } from './dto/gitlab-push.dto';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JenkinsTriggerDto } from './dto/jenkins-trigger.dto';
import { ScmService } from '../scm/scm.service';
import { ScmVersionService } from '../scm-version/scm-version.service';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly scmService: ScmService, // 在这里注入 ScmService
    private readonly ScmVersionService: ScmVersionService // 在这里注入 ScmService
  ) {}

  @Post('/gitlab/trigger')
  gitlabTrigger(@Body() pushEventDTO: GitlabPushEventDTO) {
    return this.webhookService.gitlabTrigger(pushEventDTO);
  }

  @Post('/jenkins/trigger')
  @UseInterceptors(AnyFilesInterceptor())
  async jenkinsTrigger(@UploadedFiles() files: File[], @Body() body: JenkinsTriggerDto) {
    console.log('files', files, body);

    const { scm } = body;

    const scmItem = await this.scmService.findOne(scm);

    // todo 这里需要上传到 oss
    const fileUrl = '';

    const versionInfo = {
      ...body,
      parentId: scmItem.id,
      fileUrl,
    };

    await this.ScmVersionService.create(versionInfo);
    return {
      fileUrl,
    };
  }
}

// curl -X POST -H "Content-Type: multipart/form-data" \
//      -F "file=@veWhiteBoard_MiniApp_Demo_1.0.0.zip" \
//      -F "sourceMapfile=@veWhiteBoard_MiniApp_Demo_1.0.0.zip" \
//      -F "scm=askxbot-frontend" \
//      -F "gitCommitId=scscasdggsga" \
//      -F "commitMsg=feat:sddsgdsg" \
//      -F "creator=mac@xbotspace.com" \
//      -F "branch=sdgsdg" \
//      -F "GIT_BRANCH=feat" \
//      -F "createdBy=jenkins" \
//      http://30.1.11.239:3000/api/webhook/jenkins/trigger
