import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrUpdatePostDto {
	@IsNotEmpty()
	@Type(() => Number)
	@IsInt()
	readonly authorId: number;

	@IsNotEmpty()
	@IsString()
	readonly title: string;

	@IsNotEmpty()
	@IsString()
	readonly body: string;
}
