import { JsonAPIClient } from 'kefetchup/src';
import { EntityDataMap, RecordDataMap } from '../../src/apiMap';
import { IProductOptions, IUserOptions, Product, User } from './models';

export const createUser: () => IUserOptions = () => ({
  name: 'max',
  // tslint:disable-next-line:no-magic-numbers
  birthDate: new Date(Date.UTC(1997, 8, 9)),
  cart: []
});

const DB = {
  USER: null as IUserOptions | null,
  PRODUCTS: [] as IProductOptions[],
};


export class UserApiMap extends JsonAPIClient implements RecordDataMap<typeof User> {
  constructor() {
    super('https://kazanexpress.ru', {
      headers: {
        Authorization: 'basic asdasd'
      }
    });
  }

  public async create(
    ormOptions: IUserOptions,
    { username, password }: { username: string; password: string }
  ): Promise<IUserOptions> {
    DB.USER = createUser();
    DB.USER.name = username;

    return Promise.resolve(DB.USER);
  }

  public async read() {
    return Promise.resolve(DB.USER);
  }

  public async update(data: Partial<IUserOptions>) {
    if (DB.USER) {
      for (const key in DB.USER) if (data[key]) {
        DB.USER[key] = data[key];
      }
    }

    return Promise.resolve(DB.USER);
  }


  public async delete() {
    const temp = DB.USER;
    DB.USER = null;

    return temp;
  }
}

export class ProductApiMap extends JsonAPIClient implements EntityDataMap<typeof Product> {
  constructor() {
    super('https://kazanexpress.ru', {
      headers: {
        Authorization: 'basic asdasd'
      }
    });
  }

  public async add(options: IProductOptions, apiKey: string) {
    DB.PRODUCTS.push(options);

    return options;
  }

  public async get(id: number) {
    return Promise.resolve(DB.PRODUCTS.find(p => p.id === id));
  }

  public update;
  public delete;
  public updateById;
  public count;
}
