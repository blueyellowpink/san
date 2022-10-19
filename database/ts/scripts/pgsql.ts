import { CainanceSequel } from '../src'

!(async () => {
    await CainanceSequel.connect(
        {
            database: 'dev',
            user: 'postgres',
            password: 'qwe123',
            host: 'localhost',
        },
        {
            sync: true,
        }
    )
})()
