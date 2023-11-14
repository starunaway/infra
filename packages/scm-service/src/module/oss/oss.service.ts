import { Injectable } from '@nestjs/common';
import * as Client from 'ali-oss';
@Injectable()
export class OssService {
  client: any;
  private getAliOssClient() {
    if (this.client) {
      return this.client;
    }

    const config = {
      accessKeyId: process.env.OSS_KEY,
      accessKeySecret: process.env.OSS_KEY_SECRET, // 存储桶名字
      bucket: process.env.OSS_BUCKET, // 文件存储路径
      dir: 'xbot/',
      region: 'oss-cn-shanghai',
    };

    const client = new Client(config);
    this.client = client;
    return client;
  }

  async uploadFile(file: Express.Multer.File, filePath: string) {
    try {
      const client = this.getAliOssClient();
      const result = await client.put(`xbot/${filePath}`, file.buffer);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
