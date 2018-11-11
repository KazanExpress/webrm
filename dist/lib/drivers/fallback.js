"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class FallbackDriver extends base_1.Driver {
    create(repositoryName, entity) {
        throw new Error('Method not implemented.');
    }
    read(repositoryName, id) {
        throw new Error('Method not implemented.');
    }
    update(repositoryName, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
            return {};
        });
    }
    delete(repositoryName, entity) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
            return {};
        });
    }
}
exports.FallbackDriver = FallbackDriver;
//# sourceMappingURL=fallback.js.map