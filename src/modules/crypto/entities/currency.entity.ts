import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Currency {
  @ApiProperty({ example: '1', description: 'coin id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'BTC', description: 'from coin name' })
  @Column({ type: 'varchar' })
  fromCoin: string;

  @ApiProperty({ example: 'BTC', description: 'to coin name' })
  @Column({ type: 'varchar' })
  toCoin: string;

  @ApiProperty({ example: '-997.070000000007', description: 'change 24 hour' })
  @Column({ type: 'varchar' })
  CHANGE24HOUR: string;

  @ApiProperty({
    example: '-2.706622697767768',
    description: 'change PCT 24 hour',
  })
  @Column({ type: 'varchar' })
  CHANGEPCT24HOUR: string;

  @ApiProperty({ example: '36838.16', description: 'open 24 hour' })
  @Column({ type: 'varchar' })
  OPEN24HOUR: string;

  @ApiProperty({ example: '17644.184244279997', description: 'volume 24 hour' })
  @Column({ type: 'varchar' })
  VOLUME24HOUR: string;

  @ApiProperty({
    example: '630555660.5020074',
    description: 'volume 24 hour to',
  })
  @Column({ type: 'varchar' })
  VOLUME24HOURTO: string;

  @ApiProperty({ example: '33826.06', description: 'low 24 hour' })
  @Column({ type: 'varchar' })
  LOW24HOUR: string;

  @ApiProperty({ example: '37056.81', description: 'high 24 hour' })
  @Column({ type: 'varchar' })
  HIGH24HOUR: string;

  @ApiProperty({ example: '35841.09', description: 'price' })
  @Column({ type: 'varchar' })
  PRICE: string;

  @ApiProperty({ example: '18822156', description: 'supply' })
  @Column({ type: 'varchar' })
  SUPPLY: string;

  @ApiProperty({ example: '674606587190.0399', description: 'mktcap' })
  @Column({ type: 'varchar' })
  MKTCAP: string;
}
