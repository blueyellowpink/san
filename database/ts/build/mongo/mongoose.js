"use strict";
const tslib_1 = require("tslib");
const mongoose = require('mongoose');
const globalConfig = require('../../globalConfig');
const UserModel = require('./models/user.model');
mongoose.set('debug', true);
exports.connectToMongo = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.connect(globalConfig.db.mongo.uri);
    console.log('Mongo connected');
});
exports.models = {
    user: UserModel,
};
//# sourceMappingURL=mongoose.js.map