import { QueryResult } from '../queryResult';
import { IStorable, IStorableConstructor } from '../storable';
import { Repository } from './base';
export declare class RecordRepository<C extends IStorableConstructor<E>, E extends IStorable = InstanceType<C>, A extends ConstructorParameters<C>[0] = ConstructorParameters<C>[0]> extends Repository<C, E> {
    create(options: A): QueryResult<E>;
    update(options: Partial<A>): QueryResult<E>;
    read(): QueryResult<E>;
    delete(): QueryResult<E>;
}