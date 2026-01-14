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

import { UserEntity } from 'features/user/user.entity';

import {
  CREATED_AT_COLUMN_NAME,
  UPDATED_AT_COLUMN_NAME,
} from '../../common/constants/database.constants';

@Entity('refresh_tokens')
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'refresh_token',
  })
  @Index('refresh_tokens_token_idx')
  token: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
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
