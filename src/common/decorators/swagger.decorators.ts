/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
} from '@nestjs/swagger';

export const ApiCreate = (entityName: string, type: any): MethodDecorator =>
	applyDecorators(
		ApiOperation({ summary: `Create ${entityName}` }),
		ApiBadRequestResponse({
			description: 'Invalid request body.',
		}),
		ApiCreatedResponse({
			description: `The ${entityName} has been successfully created.`,
			type,
		}),
	);

export const ApiFindAll = (entityName: string, type: any): MethodDecorator =>
	applyDecorators(
		ApiOperation({ summary: `Find all ${entityName}s` }),
		ApiOkResponse({
			description: `Found all ${entityName}s.`,
			type,
		}),
	);

export const ApiFindOne = (entityName: string, type: any): MethodDecorator =>
	applyDecorators(
		ApiOperation({ summary: `Find ${entityName} by id` }),
		ApiParam({ type: 'number', name: 'id' }),
		ApiBadRequestResponse({
			description: 'Invalid id param.',
		}),
		ApiNotFoundResponse({
			description: `Record ${entityName} by id does not exists.`,
		}),
		ApiOkResponse({
			description: `Found ${entityName}.`,
			type,
		}),
	);

export const ApiUpdate = (entityName: string, type: any, relations?: string[]): MethodDecorator => {
	const enumeration = relations ? [entityName, ...relations].join(' or ') : entityName;

	return applyDecorators(
		ApiOperation({ summary: `Update ${entityName} by id` }),
		ApiParam({ type: 'number', name: 'id' }),
		ApiBadRequestResponse({
			description: 'Invalid id param or request body.',
		}),
		ApiNotFoundResponse({
			description: `Record ${enumeration} by id does not exists.`,
		}),
		ApiOkResponse({
			description: `The ${entityName} has been successfully updated.`,
			type,
		}),
	);
};

export const ApiDelete = (entityName: string, type: any): MethodDecorator =>
	applyDecorators(
		ApiOperation({ summary: `Delete ${entityName} by id` }),
		ApiParam({ type: 'number', name: 'id' }),
		ApiBadRequestResponse({
			description: 'Invalid id param.',
		}),
		ApiNotFoundResponse({
			description: `Record ${entityName} by id does not exists.`,
		}),
		ApiOkResponse({
			description: `The ${entityName} has been successfully deleted.`,
			type,
		}),
	);
