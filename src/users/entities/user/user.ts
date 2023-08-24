import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  @Unique("Username duplicado", ['username'])
  username: string;

  @Column()
  password: string;
}
