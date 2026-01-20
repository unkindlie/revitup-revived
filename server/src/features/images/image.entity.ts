import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CREATED_AT_COLUMN_NAME } from 'common/constants/database.constants';

@Index(['fileName', 'url'])
@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'file_name',
  })
  fileName: string;

  // TODO: add proper enum types
  @Column({
    name: 'file_type',
  })
  fileType: string;

  @Column({
    name: 'bytes_size',
    unsigned: true,
  })
  bytesSize: number;

  @Column({
    type: 'text',
  })
  url: string;

  @Index('idx_image_created_at')
  @CreateDateColumn({
    name: CREATED_AT_COLUMN_NAME,
  })
  createdAt: Date;
}
