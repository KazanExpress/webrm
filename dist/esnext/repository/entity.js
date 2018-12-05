import { FallbackDriver } from '../drivers';
import { QueryResult } from '../queryResult';
import { Repository, selectDriver } from './base';
/**
 * A typical multi-entity repository.
 *
 * @template `DM` API data map for the repo
 * @template `C` entity constructor type
 * @template `E` entity instance type
 * @template `A` entity constructor parameter options
 * @template `ID` entity primary key type
 * @template `IDKey` entity primary key name
 */
export class EntityRepositoryClass extends Repository {
    constructor(name, connectionName, currentDriver, entity, api) {
        super(name, connectionName, entity, api);
        this.currentDriver = currentDriver;
        this.columns = [];
        this.primaryKey = entity.prototype.__idKey__;
        delete entity.prototype.__idKey__;
        if (entity.prototype.__col__) {
            this.columns = entity.prototype.__col__;
            if (!this.columns.includes(String(this.primaryKey))) {
                this.columns.push(String(this.primaryKey));
            }
            delete entity.prototype.__col__;
        }
        else {
            // Cast to any to allow passing `this` as a second arg for classes implementing IActiveRecord to work
            // and to avoid pointless casting to Saveable
            this.columns = Object.keys(new entity({}, this));
        }
    }
    get driverOptions() {
        return {
            name: this.name,
            columns: this.columns,
            primaryKey: this.primaryKey
        };
    }
    async add(options, 
    // TODO: up to debate - singular arguments always or multiple args inference?
    apiOptions // Pass false to disable the api call
    ) {
        try {
            const result = await this.currentDriver.create(this.driverOptions, options);
            const instance = this.makeDataInstance(result);
            // Call local driver changes synchronously
            const queryResult = new QueryResult(true, instance);
            // Call api driver asynchronously
            if (this.api && this.api.add && apiOptions !== false) {
                this.$log(`API handler execution start: ${this.name}.add()`);
                // @TODO: implement async request queue
                this.api.add(options, apiOptions).then(res => {
                    queryResult.result = this.makeDataInstance(res);
                    this.$log(`API handler execution end: ${this.name}.add() => ${JSON.stringify(res, undefined, '  ')}`);
                }).catch(e => {
                    queryResult.error = e;
                    this.$error(`API handler execution end: ${this.name}.add() => ${e}`);
                });
            }
            else {
                this.$log('No API handler called');
            }
            return queryResult;
        }
        catch (e) {
            this.$error(e);
            return new QueryResult(false, this.makeDataInstance(options), e);
        }
    }
    async get(id, getApiOptions) {
        try {
            const result = await this.currentDriver.findById(this.driverOptions, id);
            if (!result) {
                throw new Error(`No results found for id ${id}`);
            }
            const instance = this.makeDataInstance(result);
            // Call local driver changes synchronously
            const queryResult = new QueryResult(true, instance);
            // Call api driver asynchronously
            if (this.api && this.api.get && getApiOptions !== false) {
                this.$log(`API handler execution start: ${this.name}.get()`);
                // @TODO: implement async request queue
                this.api.get(id, getApiOptions).then(res => {
                    queryResult.result = this.makeDataInstance(res);
                    this.$log(`API handler execution end: ${this.name}.get() => ${JSON.stringify(res, undefined, '  ')}`);
                }).catch(e => {
                    queryResult.error = e;
                    this.$error(`API handler execution end: ${this.name}.get() => ${e}`);
                });
            }
            else {
                this.$log('No API handler called');
            }
            return queryResult;
        }
        catch (e) {
            return new QueryResult(false, undefined, e);
        }
    }
    async update(entity, updateApiOptions) {
        throw new Error('Not implemented');
        return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
    /* Do we even need this?.. */
    async updateById(id, query, updateApiOptions) {
        throw new Error('Not implemented');
        return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance(query({})));
    }
    async delete(entity, deleteApiOptions) {
        throw new Error('Not implemented');
        return new QueryResult(/* TODO: implement this */ true, this.makeDataInstance({}));
    }
    // TODO: Find, find by, exists, etc...
    async count() {
        // TODO: count entities
    }
}
export function EntityRepository(options) {
    return (name, connection) => new EntityRepositoryClass(name, connection.name, new (selectDriver(options.dirvers || FallbackDriver, name))(connection), options.model, options.api);
}
//# sourceMappingURL=entity.js.map