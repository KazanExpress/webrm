import { Driver } from './base';

/* TODO: driver that just writes everything to short-term memory */
export class FallbackDriver extends Driver {
  public create<T extends object>(repositoryName: string, entity: T): Promise<T> {
    throw new Error('Method not implemented.');
  }

  public read<T extends object>(repositoryName: string, id: any): Promise<T> {
    throw new Error('Method not implemented.');
  }

  public update<T extends object>(repositoryName: string, id: any, data: Partial<T>): Promise<T>;
  public update<T extends object>(repositoryName: string, entity: Partial<T>): Promise<T>;
  public async update(repositoryName: any, id: any, data?: any) {
    throw new Error('Method not implemented.');

    return {};
  }
  public delete<T extends object>(repositoryName: string, id: any): Promise<T>;
  public async delete(repositoryName: any, entity: any) {
    throw new Error('Method not implemented.');

    return {};
  }


}
