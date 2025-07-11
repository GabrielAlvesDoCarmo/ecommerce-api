"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var express_1 = require("express");
var users_route_1 = require("./users.route");
var routes = function (app) {
    app.use(express_1.default.json());
    app.use(users_route_1.userRouter);
};
exports.routes = routes;
