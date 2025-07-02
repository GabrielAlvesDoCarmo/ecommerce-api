"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./routes/index");
const app = (0, express_1.default)();
(0, index_1.routes)(app);
app.listen(3000, () => {
    console.log("Servidor online na porta 3000");
});
//# sourceMappingURL=index.js.map