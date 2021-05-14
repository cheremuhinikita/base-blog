import { Type } from 'class-transformer';
import { IsInt, IsNumber } from 'class-validator';

export class ParamsDto {
	@Type(() => Number)
	@IsNumber()
	@IsInt()
	readonly id: number;
}
