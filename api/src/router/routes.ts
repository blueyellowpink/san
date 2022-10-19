import authRoutes from './auth.routes'
import pingRoutes from './ping.routes'
import userRoutes from './user.routes'
import chainRoutes from './chain.routes'
import tradingPairRoutes from './pair.routes'

export type Route = {
    path: string
    method: string
    action: (req: any) => Promise<any>
    auth?: (req: any) => Promise<any> | undefined
    middlewares?: Array<any> | undefined
}

const routes = [
    ...authRoutes,
    ...userRoutes,
    ...chainRoutes,
    ...tradingPairRoutes,
    ...pingRoutes,
] as Array<Route>

export default routes
