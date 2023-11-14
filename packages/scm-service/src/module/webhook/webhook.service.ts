import { Injectable } from '@nestjs/common';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { GitlabPushEventDTO } from './dto/gitlab-push.dto';

@Injectable()
export class WebhookService {
  // todo 目前不直接触发构建, 格式先保留
  gitlabTrigger(pushEventDTO: GitlabPushEventDTO) {
    console.log(pushEventDTO);

    const { project, project_id, commits } = pushEventDTO;
    const { name, namespace, path_with_namespace } = project;

    const latestCommit = commits[0];

    if (latestCommit) {
      const { message, url, author, added, modified, removed } = latestCommit;
      const { name: authorName, email: authorEmail } = author;

      const changedFiles = Array.from(new Set([...added, ...modified, ...removed]));
    }

    return 'This action adds a new webhook';
  }
}
