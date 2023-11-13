import { IsNotEmpty, IsString } from 'class-validator';

export class CreateScmDto {
  @IsNotEmpty({
    message: 'name 不能为空',
  })
  @IsString()
  name: string;

  @IsNotEmpty({
    message: 'creator 不能为空',
  })
  @IsString()
  creator: string;

  @IsNotEmpty({
    message: 'gitRepoUrl 不能为空',
  })
  @IsString()
  gitRepoUrl: string;

  @IsNotEmpty({
    message: 'gitRepoName 不能为空',
  })
  @IsString()
  gitRepoName: string;
}
