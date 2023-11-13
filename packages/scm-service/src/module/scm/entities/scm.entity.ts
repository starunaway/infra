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

@Entity('scm')
@Unique(['name'])
export class ScmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number; // 标记为主键，值自动生成

  @Column({ type: 'uuid' })
  @Generated('uuid')
  uuid: string; // 自动生成的UUID

  @Column({ length: 30 })
  @IsString()
  @Matches(/^[a-zA-Z0-9_@]+$/, { message: '只允许包含数字、大小写字母、下划线和@符号' })
  name: string; //

  @Column({
    type: 'text',
    nullable: true,
  })
  desc: string; //

  @Column()
  creator: string;

  @Column()
  gitRepoUrl: string;

  @Column()
  gitRepoName: string;

  @Column({ nullable: true })
  latestVerId: number;

  @Column({ nullable: true })
  stars: number;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  buildBranch: string;

  @Column({ type: 'longtext', nullable: true })
  deployConf: string;

  @Column({ type: 'longtext', nullable: true })
  nginxConf: string;

  @Column({ type: 'longtext', nullable: true })
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
