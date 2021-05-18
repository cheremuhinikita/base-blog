import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { stringToBoolean } from 'src/common/utils/type-conversion.utlis';
import { LoggerAdapter } from 'src/common/adapters/logger.adapter';

export const TypeOrmRootModule = TypeOrmModule.forRootAsync({
	imports: [ConfigModule],
	useFactory: (configService: ConfigService) => {
		const logging = stringToBoolean(configService.get('TYPEORM_LOGGING'));
		const logger = logging && new LoggerAdapter();

		return {
			logging,
			logger,
			type: 'postgres',
			autoLoadEntities: true,
			host: configService.get('POSTGRES_HOST'),
			port: +configService.get('POSTGRES_PORT'),
			username: configService.get('POSTGRES_USER'),
			password: configService.get('POSTGRES_PASSWORD'),
			database: configService.get('POSTGRES_DB'),
			synchronize: stringToBoolean(configService.get('TYPEORM_SYNCHRONIZE')),
		};
	},
	inject: [ConfigService],
});
