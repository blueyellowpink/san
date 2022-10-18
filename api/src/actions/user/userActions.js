const getRefAction = require('./getRef.action/getRef.action')
const generate2FaAction = require('./generate2FaQr.action/generate2Fa.action')
const save2FaQrAction = require('./save2FaQr.action/save2FaQr.action')

const userActions = {
    getRef: getRefAction,
    generate2FaQr: generate2FaAction,
    save2FaQr: save2FaQrAction,
}

module.exports = userActions
