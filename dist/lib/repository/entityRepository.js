"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queryResult_1 = require("../queryResult");
const base_1 = require("./base");
class EntityRepository extends base_1.Repository {
    constructor(name, connection, entity) {
        super(name, connection, entity);
        this.primaryKey = entity.prototype.__id__;
        this.columns = Object.keys(entity.prototype.__col__);
        delete entity.prototype.__col__;
    }
    add(options) {
        return new queryResult_1.QueryResult(true, Promise.resolve(new this.Data(options)));
    }
    get(id) {
        return new queryResult_1.QueryResult(true, Promise.resolve(new this.Data({})));
    }
    update(options) {
        return new queryResult_1.QueryResult(true, Promise.resolve(new this.Data({})));
    }
    updateById(id, query) {
        return new queryResult_1.QueryResult(true, Promise.resolve(new this.Data({})));
    }
    delete(id) {
        return new queryResult_1.QueryResult(true, Promise.resolve(new this.Data({})));
    }
}
exports.EntityRepository = EntityRepository;
//# sourceMappingURL=entityRepository.js.map