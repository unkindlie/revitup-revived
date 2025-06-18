import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn({
        name: 'user_id',
    })
    id: number;
}
