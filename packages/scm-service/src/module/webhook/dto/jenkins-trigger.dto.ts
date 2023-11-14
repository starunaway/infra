import { IsNotEmpty, IsString } from 'class-validator';

export class JenkinsTriggerDto {
  @IsNotEmpty({
    message: '关联的 Scm 不能为空',
  })
  @IsString()
  scm: string;

  parentId?: string;

  verName?: string;

  @IsString()
  gitCommitId: string;

  @IsString()
  commitMsg: string;

  @IsString()
  creator: string;

  @IsString()
  branch: string;

  @IsString()
  GIT_BRANCH: string;

  @IsString()
  createdBy: string;
}
