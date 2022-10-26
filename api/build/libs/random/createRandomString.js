"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const characterMap = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
const createRandomString = (len = 6, dictionary = characterMap) => Array.from({ length: len }, () => dictionary[Math.floor(Math.random() * dictionary.length)]).join('');
exports.default = createRandomString;
//# sourceMappingURL=createRandomString.js.map