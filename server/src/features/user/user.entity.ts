import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { UserRole } from './enums/user-role.enum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  username: string;

  @Column({
    type: 'text',
  })
  password: string;

  @Column({
    type: 'text',
    unique: true,
  })
  @Index('user_email_idx')
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}
