import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { Image } from '../images/image.entity';
import { CREATED_AT_COLUMN_NAME } from '../../common/constants/database.constants';

@Entity('user_images')
export class UserImage {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @PrimaryColumn({ name: 'image_id' })
  imageId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => Image)
  @JoinColumn({ name: 'image_id' })
  image: Image;

  @CreateDateColumn({ name: CREATED_AT_COLUMN_NAME })
  createdAt: Date;
}
