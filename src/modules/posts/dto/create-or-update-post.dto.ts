import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrUpdatePostDto {
	@ApiProperty()
	@IsNotEmpty()
	@Type(() => Number)
	@IsInt()
	readonly authorId: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	readonly title: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	readonly body: string;
}
