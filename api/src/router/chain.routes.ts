import { getChainList } from '../actions/chain/getChain'

const routes = [
    {
        path: '/chain/list',
        method: 'get',
        action: getChainList,
    },
]

export default routes
