import authRoutes from './auth.routes'
import pingRoutes from './ping.routes'
import userRoutes from './user.routes'

export type Route = {
    path: string
    method: string
    action: (req: any) => Promise<any>
    auth?: (req: any) => Promise<any> | undefined
    middlewares?: Array<any> | undefined
}

const routes = [...authRoutes, ...userRoutes, ...pingRoutes] as Array<Route>

export default routes
