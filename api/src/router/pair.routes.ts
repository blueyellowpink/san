import { getTradingPairList } from '../actions/pair/getTradingPair'

const routes = [
    {
        path: '/pair/list',
        method: 'get',
        action: getTradingPairList,
    },
]

export default routes
