import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  HttpStatus,
  Logger,
  Inject,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { GitlabPushEventDTO } from './dto/gitlab-push.dto';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JenkinsTriggerDto } from './dto/jenkins-trigger.dto';
import { ScmService } from '../scm/scm.service';
import { ScmVersionService } from '../scm-version/scm-version.service';
import { OssService } from '../oss/oss.service';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { CreateScmVersionDto } from '../scm-version/dto/create-scm-version.dto';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly scmService: ScmService,
    private readonly scmVersionService: ScmVersionService,
    private readonly ossService: OssService,
    @Inject('WebhookLogger')
    private readonly logger: Logger
  ) {}

  @Post('/gitlab/trigger')
  gitlabTrigger(@Body() pushEventDTO: GitlabPushEventDTO) {
    return this.webhookService.gitlabTrigger(pushEventDTO);
  }

  @Post('/jenkins/trigger')
  @UseInterceptors(AnyFilesInterceptor())
  async jenkinsTrigger(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: JenkinsTriggerDto
  ) {
    this.logger.log('files', files);
    this.logger.log('body', body);
    try {
      const { scm } = body;

      const scmItem = await this.scmService.findOne(scm);
      this.logger.log('scmItem', scmItem);
      // todo 这里需要上传到 oss
      const uploadPromises = files.map((file) => {
        const { fieldname, originalname } = file;
        return this.ossService.uploadFile(file, `${scm}/${originalname}`).then((result) => {
          return {
            fieldname,
            originalname,
            result,
          };
        });
      });

      const res = await Promise.allSettled(uploadPromises);

      this.logger.log('uploadPromises', res);
      let filePath = '';
      let sourceMapPath = '';
      let ossFileUrl = '';

      res.forEach((item) => {
        if (item.status === 'fulfilled') {
          const { fieldname, originalname, result } = item.value;
          if (fieldname === 'file') {
            filePath = result.name;
            ossFileUrl = result.url;
          }
          if (fieldname === 'sourceMapfile') {
            sourceMapPath = result.name;
          }
        }
      });

      const versionInfo: CreateScmVersionDto = {
        ...body,
        parentId: scmItem.id,
        filePath,
      };

      if (sourceMapPath) {
        versionInfo.sourceMapPath = sourceMapPath;
      }

      await this.scmVersionService.create(versionInfo);
      return {
        ossFileUrl,
        filePath,
      };
    } catch (e) {
      throw new ApiException(e.message, ApiErrorCode.WebhookError, HttpStatus.OK);
    }
  }
}

// curl -X POST -H "Content-Type: multipart/form-data" \
//      -F "file=@veWhiteBoard_MiniApp_Demo_1.0.0.zip" \
//      -F "sourceMapfile=@Electron_API_reference_release_3.44.1" \
//      -F "scm=askxbot-frontend" \
//      -F "gitCommitId=scscasdggsga" \
//      -F "commitMsg=feat:sddsgdsg" \
//      -F "creator=mac@xbotspace.com" \
//      -F "branch=sdgsdg" \
//      -F "GIT_BRANCH=feat" \
//      -F "createdBy=jenkins" \
//      http://30.1.11.239:3000/api/webhook/jenkins/trigger

// [
//   {
//     status: 'fulfilled',
//     value: {
//       fieldname: 'file',
//       originalname: 'veWhiteBoard_MiniApp_Demo_1.0.0.zip',
//       result: {
//         name: 'xbot/askxbot-frontend/veWhiteBoard_MiniApp_Demo_1.0.0.zip',
//         url: 'http://lanma-yunpan.oss-cn-shanghai.aliyuncs.com/xbot/askxbot-frontend/veWhiteBoard_MiniApp_Demo_1.0.0.zip',
//         res: {
//           status: 200,
//           statusCode: 200,
//           statusMessage: 'OK',
//           headers: {
//             server: 'AliyunOSS',
//             date: 'Tue, 14 Nov 2023 06:46:20 GMT',
//             'content-length': '0',
//             connection: 'keep-alive',
//             'x-oss-request-id': '655317BCCA9F863535A1248A',
//             etag: '"DAA8D59A67AB7A131AA629406EE7E34B"',
//             'x-oss-hash-crc64ecma': '17494064167652923750',
//             'content-md5': '2qjVmmerehMapilAbufjSw==',
//             'x-oss-server-time': '86',
//           },
//           size: 0,
//           aborted: false,
//           rt: 3516,
//           keepAliveSocket: false,
//           data: new Uint8Array([]),
//           requestUrls: [
//             'http://lanma-yunpan.oss-cn-shanghai.aliyuncs.com/xbot/askxbot-frontend/veWhiteBoard_MiniApp_Demo_1.0.0.zip',
//           ],
//           timing: null,
//           remoteAddress: '106.14.228.175',
//           remotePort: 80,
//           socketHandledRequests: 1,
//           socketHandledResponses: 1,
//         },
//       },
//     },
//   },
//   {
//     status: 'fulfilled',
//     value: {
//       fieldname: 'sourceMapfile',
//       originalname: 'Electron_API_reference_release_3.44.1.zip',
//       result: {
//         name: 'xbot/askxbot-frontend/Electron_API_reference_release_3.44.1.zip',
//         url: 'http://lanma-yunpan.oss-cn-shanghai.aliyuncs.com/xbot/askxbot-frontend/Electron_API_reference_release_3.44.1.zip',
//         res: {
//           status: 200,
//           statusCode: 200,
//           statusMessage: 'OK',
//           headers: {
//             server: 'AliyunOSS',
//             date: 'Tue, 14 Nov 2023 06:46:20 GMT',
//             'content-length': '0',
//             connection: 'keep-alive',
//             'x-oss-request-id': '655317BCA9FF3B3131EB3A79',
//             etag: '"A5471C7DA7450CDCF560643961E61A1F"',
//             'x-oss-hash-crc64ecma': '9043166225253067356',
//             'content-md5': 'pUccfadFDNz1YGQ5YeYaHw==',
//             'x-oss-server-time': '78',
//           },
//           size: 0,
//           aborted: false,
//           rt: 3474,
//           keepAliveSocket: false,
//           data: new Uint8Array([]),
//           requestUrls: [
//             'http://lanma-yunpan.oss-cn-shanghai.aliyuncs.com/xbot/askxbot-frontend/Electron_API_reference_release_3.44.1.zip',
//           ],
//           timing: null,
//           remoteAddress: '106.14.228.175',
//           remotePort: 80,
//           socketHandledRequests: 1,
//           socketHandledResponses: 1,
//         },
//       },
//     },
//   },
// ];
