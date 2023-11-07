import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('scm')
export class CreateScmDto {
  @PrimaryGeneratedColumn('uuid')
  id: number; // 标记为主键，值自动生成

  @Column({ length: 30 })
  name: string; //

  @Column()
  desc: string; //

  creator: string;

  gitRepo: string;

  latestVerInfo: any;

  stars: number;

  icon: string;

  buildBranch: string;

  deployConf: string;

  nginxConf: string;

  buildConf: string;

  status: string; // 暂时保留

  deleted: boolean;

  public: boolean; //是否可以部署公网版本

  cdn: string[]; // cdn域名

  buildImage: string; //用于构建的镜像版本，比如 Node 18

  team: string;

  group: string;

  label: string;

  tag: string;

  createTime: string;

  updateTime: string;
}
