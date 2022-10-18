import login from 'actions/login/login';
import ping from 'actions/ping/ping';
import register from 'actions/register/register';
import {
    buy,
    sell,
    cancel,
    modify,
    getOpenOrders,
    getOrderHistory,
} from 'actions/order';
import { getPairs, getFavouritePairs } from 'actions/pair';
import { getSpotWallet } from 'actions/wallet';
import Route from './interfaces/Route';
import { auth } from './middleware';
import solveOtp from './actions/solveOtp/solveOtp';

const routes: Array<Route> = [
    { path: '/', action: ping, method: 'get' },
    { path: '/account/register', action: register, method: 'post' },
    { path: '/account/login/otp', action: solveOtp, method: 'post' },
    { path: '/account/login', action: login, method: 'post' },
    { path: '/order/buy', action: buy, method: 'post', middleware: auth },
    { path: '/order/sell', action: sell, method: 'post', middleware: auth },
    {
        path: '/order/cancel',
        action: cancel,
        method: 'delete',
        middleware: auth,
    },
    // { path: '/order/modify', action: modify, method: 'put', middleware: auth },
    {
        path: '/order/get',
        action: getOpenOrders,
        method: 'get',
        middleware: auth,
    },
    {
        path: '/order/history',
        action: getOrderHistory,
        method: 'get',
        middleware: auth,
    },
    { path: '/pair/get', action: getPairs, method: 'get' },
    { path: '/pair/getFavourite', action: getFavouritePairs, method: 'get' },
    {
        path: '/wallet/spot',
        action: getSpotWallet,
        method: 'get',
        middleware: auth,
    },
];

export default routes;
