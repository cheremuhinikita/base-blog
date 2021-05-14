import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrUpdateAuthorDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	readonly name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	readonly username: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	readonly email: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	readonly address: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	readonly website: string;
}
