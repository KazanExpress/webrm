import { Debugable } from '../debug';
import { Driver, IDriverConstructor } from '../drivers';
import { QueryResult } from '../queryResult';
import { IStorableConstructor, Record } from '../storable';
import { FromSecArg, IRepoData, IRepoFactoryOptions, RepoFactory, Repository } from './base';
export interface IRecordRepoMethods<C extends IStorableConstructor<E>, E extends Record = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0], ReturnType = any> {
    create(options: A, apiOptions?: any): Promise<ReturnType>;
    read(apiOptions?: any): Promise<ReturnType>;
    update(options: Partial<A>, apiOptions?: any): Promise<ReturnType>;
    delete(deleteApiOptions?: any): Promise<ReturnType>;
}
export interface IRecordRepository<C extends IStorableConstructor<E>, E extends Record = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]> extends IRepoData, IRecordRepoMethods<C, E, A, QueryResult<E> | QueryResult<undefined>>, Debugable {
}
export declare type RecordDataMap<C extends IStorableConstructor<E>, E extends Record = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]> = Partial<IRecordRepoMethods<C, E, A, A | undefined>>;
/**
 * A single-entity repository.
 *
 * @template `DM` API data map for the repo
 * @template `C` entity constructor type
 * @template `E` entity instance type
 * @template `A` entity constructor parameter options
 */
export declare class RecordRepositoryClass<DM extends RecordDataMap<C, E, A>, C extends IStorableConstructor<E>, E extends Record = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]> extends Repository<DM, C, E, A> implements IRepoData, IRecordRepository<C, E, A> {
    readonly currentDriver: Driver;
    constructor(name: string, connectionName: string, currentDriver: Driver, record: C, api?: DM);
    create(options: A, apiOptions?: FromSecArg<DM['create']> | false): Promise<QueryResult<E>>;
    update(options: Partial<A>, apiOptions?: FromSecArg<DM['update']> | false): Promise<QueryResult<E>>;
    read(apiOptions?: FromSecArg<DM['read']> | false): Promise<QueryResult<E>>;
    delete(apiOptions?: FromSecArg<DM['delete']> | false): Promise<QueryResult<E>>;
}
export declare function RecordRepository<D extends RecordDataMap<C>, C extends IStorableConstructor<any>, E extends Record = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]>(options: IRepoFactoryOptions<C, D> & {
    dirvers?: IDriverConstructor | IDriverConstructor[];
}): RepoFactory<RecordRepositoryClass<D, C, E, A>>;
