import { TypeOrmModuleOptions } from '@nestjs/typeorm';
//import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

import { User } from 'src/modules/user/entity/user.entity';

dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User],
  synchronize: true,
  autoLoadEntities: true,
};
