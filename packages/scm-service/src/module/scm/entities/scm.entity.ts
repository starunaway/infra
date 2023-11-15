import { IsString, Matches } from 'class-validator';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('scm', { name: 'SCM表' })
@Unique(['name'])
export class ScmEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: '主键',
  })
  id: string; // 标记为主键，值自动生成

  @Column({ length: 30, comment: '名称' })
  @IsString()
  @Matches(/^[a-zA-Z0-9_@]+$/, { message: '只允许包含数字、大小写字母、下划线和@符号' })
  name: string; //

  @Column({
    type: 'text',
    nullable: true,
    comment: '描述',
  })
  desc: string; //

  @Column({
    comment: '创建人',
  })
  creator: string;

  @Column({
    comment: 'git仓库地址',
  })
  gitRepoUrl: string;

  @Column({
    comment: 'git仓库名称',
  })
  gitRepoName: string;

  @Column({ nullable: true, comment: '最新版本' })
  latestVerId: number;

  @Column({ nullable: true, comment: 'scm 仓库收藏数' })
  stars: number;

  @Column({ nullable: true, comment: 'scm 仓库图标' })
  icon: string;

  @Column({ nullable: true, comment: '构建分支' })
  buildBranch: string;

  @Column({ type: 'longtext', nullable: true, comment: '部署配置' })
  deployConf: string;

  @Column({ type: 'longtext', nullable: true, comment: 'nginx配置文件' })
  nginxConf: string;

  @Column({ type: 'longtext', nullable: true, comment: '构建配置' })
  buildConf: string;

  @Column({ nullable: true })
  status: string; // 暂时保留

  @Column({ nullable: true })
  deleted: boolean;

  @Column({ nullable: true })
  public: boolean; //是否可以部署公网版本

  @Column({ nullable: true })
  cdn: string; // cdn域名

  @Column({ nullable: true })
  buildImage: string; //用于构建的镜像版本，比如 Node 18

  @Column({ nullable: true })
  team: string;

  @Column({ nullable: true })
  group: string;

  @Column({ nullable: true })
  label: string;

  @Column({ nullable: true })
  tag: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @BeforeInsert()
  @BeforeUpdate()
  transformArrays() {
    if (Array.isArray(this.cdn)) {
      this.cdn = JSON.stringify(this.cdn);
    }
    if (Array.isArray(this.tag)) {
      this.tag = JSON.stringify(this.tag);
    }
  }
}
