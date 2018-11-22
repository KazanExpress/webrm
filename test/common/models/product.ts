import { Entity } from '../../..';

export interface IProductOptions {
  id: number;
  title: string;
  url: string;
}

export class Product extends Entity<'id', number> {
  @Product.ID
  @Product.Column
  public id: number;

  @Product.Column
  public title: string;

  @Product.Column
  public url: string;

  constructor(options: IProductOptions, repo?) {
    super(options, repo);
    this.id = options.id;
    this.title = options.title;
    this.url = options.url;
  }
}