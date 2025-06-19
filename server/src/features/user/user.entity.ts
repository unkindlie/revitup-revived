import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn({
        name: 'user_id',
    })
    id: number;

    @Column({
        name: 'user_name',
    })
    username: string;

    @Column({
        name: 'user_password',
    })
    password: string;

    @Column({
        name: 'user_email_address',
    })
    emailAddress: string;
}
