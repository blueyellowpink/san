exports.processMiddleware = middleware => async (req, res, next) => {
    try {
        await middleware(req, res)
        next()
    } catch (e) {
        console.error(e)

        const response = {
            success: false,
            data: null,
            message: e?.message || e || 'Something went wrong',
        }
        const status = e.status || 200

        res.status(status).json(response)
    }
}

exports.processAction = action => async (req, res) => {
    try {
        const data = await action(req, res)
        const response = {
            success: true,
            data: data !== undefined ? data : null,
            message: '',
        }

        res.json(response)
    } catch (e) {
        console.error(e)

        const status = e.status || 200
        const response = {
            success: false,
            data: null,
            message: e?.message || e || 'Something went wrong',
        }

        res.status(status).json(response)
    }
}
