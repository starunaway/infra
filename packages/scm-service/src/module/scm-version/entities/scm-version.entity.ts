import { ScmEntity } from 'src/module/scm/entities/scm.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('scm_version', {
  name: 'SCM版本表',
})
export class ScmVersionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // 标记为主键，值自动生成

  @Column({
    comment: '关联的SCM仓库',
  })
  parentId: string;

  @Column({ nullable: true, comment: '构建版本' })
  verName: string;

  @Column({ nullable: true, comment: '构建分支' })
  branch: string;

  @Column({ nullable: true, comment: 'git commit' })
  gitCommitId: string;

  @Column({ nullable: true, comment: '产物存储路径' })
  filePath: string;

  @Column({ nullable: true, comment: 'sourceMap存储路径' })
  sourceMapPath: string;

  @Column({ nullable: true })
  enable: boolean;

  @Column({ nullable: true })
  status: boolean;

  @Column({ nullable: true })
  creator: string;

  @Column({ nullable: true, comment: 'git 提交信息' })
  commitMsg: string;

  @Column({ nullable: true })
  createdBy: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}

// // {
//   scm: "askxbot-frontend",
//   gitCommitId: "e2f28d5c1930e13ed5f5d22a25e32441990baea2",
//   commitMsg: "chore: public",
//   creator: "mac@xbotspace.com",
//   branch: "HEAD",
//   GIT_BRANCH: "origin/dev-nginx}",
//   createdBy: "jenkins",
// }

// {
//     fieldname: "file",
//     originalname: "askxbot-v20231110152937_e2f28d5c.tgz",
//     encoding: "7bit",
//     mimetype: "application/octet-stream",
//     buffer:
//     size: 209301,
//   }
