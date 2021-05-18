/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger as TypeOrmLogger } from 'typeorm';
import { Logger as NestLogger } from '@nestjs/common';

export class LoggerAdapter implements TypeOrmLogger {
	private readonly logger: NestLogger;

	constructor() {
		this.logger = new NestLogger('TypeOrm');
	}

	private stringifyParams(parameters: any[]): string {
		if (parameters && parameters.length) {
			const strParams = JSON.stringify(parameters);

			return ` -- PARAMETERS: ${strParams}`;
		}

		return '';
	}

	logQuery(query: string, parameters?: any[]): void {
		this.logger.log(`Query: ${query}${this.stringifyParams(parameters)}`);
	}

	logQueryError(error: string | Error, query: string, parameters?: any[]): void {
		this.logger.error(`Error: ${error}, query: ${query}, ${this.stringifyParams(parameters)}`);
	}

	logQuerySlow(time: number, query: string, parameters?: any[]): void {
		this.logger.log(`Time: ${time}, query: ${query}, ${this.stringifyParams(parameters)}`);
	}

	logSchemaBuild(message: string): void {
		this.logger.log(message);
	}

	logMigration(message: string): void {
		this.logger.log(message);
	}

	log(level: 'log' | 'info' | 'warn', message: string): void {
		switch (level) {
			case 'log':
				this.logger.log(message);
				break;
			case 'info':
				this.logger.debug(message);
				break;
			case 'warn':
				this.logger.warn(message);
				break;
		}
	}
}
