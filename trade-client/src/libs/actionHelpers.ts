import { ProcessActionType } from 'interfaces/Action';

export const processAction: ProcessActionType = action => async (req, res) => {
    try {
        const response: any = await action(req, res);

        const bodyResponse: BodyResponse = {
            success: true,
            data: response,
            message: '',
            code: 'OK',
        };

        return res.json(bodyResponse);
    } catch (e) {
        const { message } = e;
        console.log(e);

        const bodyResponse: BodyResponse = {
            success: false,
            data: null,
            message,
            code: 'ERR',
        };

        return res.json(bodyResponse);
    }
};
