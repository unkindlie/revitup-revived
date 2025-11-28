import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  CREATED_AT_COLUMN_NAME,
  UPDATED_AT_COLUMN_NAME,
} from 'common/constants/database.constants';

import { UserEntity } from 'features/user/user.entity';

import { RequestSource } from './enums/request-source.enum';

@Entity('password_reset_requests')
export class PasswordResetRequestEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'completed_at',
    nullable: true,
  })
  completedAt: Date;

  @Column({
    type: 'enum',
    enum: RequestSource,
  })
  source: RequestSource;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  @Index('password_reset_requests_user_id_idx')
  user: UserEntity;

  @CreateDateColumn({
    name: CREATED_AT_COLUMN_NAME,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: UPDATED_AT_COLUMN_NAME,
  })
  updatedAt: Date;
}
