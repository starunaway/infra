import { IsNotEmpty, IsString } from 'class-validator';

export class CreateScmVersionDto {
  @IsNotEmpty({
    message: '关联的 Scm 不能为空',
  })
  @IsString()
  parentId: string;

  verName?: string;
}
