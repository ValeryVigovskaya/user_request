import { IsOptional, IsUrl, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'; //добавила не через простой интерфейс, а с библиотекой, чтобы было видно,
//как бы это реализовалось с БД
import { TStatuses, TTypes } from '../../utils/types';

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  //   @UpdateDateColumn()
  //   updatedAt: Date;

  @Column({ type: 'int', unique: true })
  requestNumber: number;

  @Column('varchar', { default: 'Ошибка' })
  type: TTypes;

  @Column('varchar')
  @Length(50, 3000)
  caption: string;

  @Column('varchar')
  @Length(2, 30)
  username: string;

  @Column('varchar')
  @IsUrl()
  @IsOptional()
  img: string[];

  @Column('varchar', { default: 'В очереди' })
  status: TStatuses;
}
