import { ScmEntity } from 'src/module/scm/entities/scm.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('scm_version')
export class ScmVersionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number; // 标记为主键，值自动生成

  @Column()
  parentId: number;

  @Column({ nullable: true })
  verName: string;

  @Column({ nullable: true })
  branch: string;

  @Column({ nullable: true })
  gitCommitId: string;

  @Column({ nullable: true })
  fileUrl: string;

  @Column({ nullable: true })
  enable: boolean;

  @Column({ nullable: true })
  status: boolean;

  @Column({ nullable: true })
  creator: string;

  @Column({ nullable: true })
  commitMsg: string;

  @Column({ nullable: true })
  createdBy: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
