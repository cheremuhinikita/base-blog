import { IAuthor } from 'src/modules/authors/interfaces/author.interface';

export interface IPost {
	title: string;
	body: string;
	author: IAuthor;
}
