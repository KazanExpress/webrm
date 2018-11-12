"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
const storable_1 = require("./storable");
class Entity extends storable_1.Storable {
    constructor(options, $repository) {
        super($repository);
        // TODO: check to be writable
        this.__col__ = [];
        if (this.__idCol__) {
            this.__idValue__ = options[this.__idCol__];
        }
    }
    $save() {
        /* TODO */
        throw new Error('Method not implemented.');
    }
    $delete() {
        /* TODO */
        throw new Error('Method not implemented.');
    }
    static Column(target, key) {
        target.__col__.push(key);
    }
    static ID(target, key) {
        target.__idCol__ = key;
    }
}
__decorate([
    util_1.Enumerable(false),
    __metadata("design:type", Array)
], Entity.prototype, "__col__", void 0);
__decorate([
    util_1.Enumerable(false),
    __metadata("design:type", Object)
], Entity.prototype, "__idCol__", void 0);
__decorate([
    util_1.Enumerable(false),
    __metadata("design:type", Object)
], Entity.prototype, "__idValue__", void 0);
__decorate([
    util_1.Enumerable(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Entity.prototype, "$save", null);
__decorate([
    util_1.Enumerable(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Entity.prototype, "$delete", null);
exports.Entity = Entity;
exports.Column = Entity.Column;
exports.ID = Entity.ID;
//# sourceMappingURL=entity.js.map