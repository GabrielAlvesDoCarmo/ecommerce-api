"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
let userRegired = 0;
let id = 1;
let users = [];
app.listen(3000, () => {
    console.log("Servidor online na porta 3000");
});
app.get("/users", (req, res) => {
    res.send(users);
});
app.get("/users/:id", (req, res) => {
    let userId = Number(req.params.id);
    let user = users.find(user => user.id === userId);
    res.send(user);
});
app.post("/users", (req, res) => {
    let user = req.body;
    user.id = id++;
    userRegired++;
    users.push(user);
    res.send({
        message: `Usuario criado com sucesso ${userRegired}`
    });
});
app.get("/", (req, res) => {
    res.send("Mundao e loko ");
});
//# sourceMappingURL=index.js.map