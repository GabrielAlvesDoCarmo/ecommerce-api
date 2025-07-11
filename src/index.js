"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app_1 = require("firebase-admin/app");
var routes_1 = require("./routes");
(0, app_1.initializeApp)();
var app = (0, express_1.default)();
(0, routes_1.routes)(app);
app.listen(3000, function () {
    console.log("Servidor online na porta 3000");
});
