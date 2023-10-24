"use strict";
/* eslint-disable no-await-in-loop */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLog = void 0;
const constants_1 = require("./utils/constants");
const sleep_1 = require("./utils/sleep");
function createLog(ctx, fields) {
    return __awaiter(this, void 0, void 0, function* () {
        const { clients: { masterdata }, } = ctx;
        const maxRetries = 10;
        const retryDelay = 1500;
        for (let retryNumber = 0; retryNumber < maxRetries; retryNumber++) {
            try {
                const saveLogResponse = yield masterdata.createOrUpdatePartialDocument({
                    dataEntity: constants_1.LOGS_DATA_ENTITY,
                    schema: constants_1.LOGS_SCHEMA_NAME,
                    fields,
                });
                return Object.assign({ status: 200, success: true }, saveLogResponse);
            }
            catch (error) {
                yield (0, sleep_1.sleep)(retryDelay);
                if (retryNumber >= maxRetries - 1) {
                    return {
                        status: (error === null || error === void 0 ? void 0 : error.status) ? error === null || error === void 0 ? void 0 : error.status : 500,
                        success: false,
                        error: (error === null || error === void 0 ? void 0 : error.message)
                            ? error === null || error === void 0 ? void 0 : error.message
                            : "There was an issue processing your request. Please try again later.",
                    };
                }
            }
        }
        return {
            status: 500,
            success: false,
            error: "Unexpected error",
        };
    });
}
exports.createLog = createLog;
