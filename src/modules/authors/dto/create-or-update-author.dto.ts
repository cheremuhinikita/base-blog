import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrUpdateAuthorDto {
	@IsNotEmpty()
	@IsString()
	readonly name: string;

	@IsNotEmpty()
	@IsString()
	readonly username: string;

	@IsNotEmpty()
	@IsString()
	@IsEmail()
	readonly email: string;

	@IsOptional()
	@IsString()
	readonly address?: string;

	@IsOptional()
	@IsString()
	readonly website?: string;
}
