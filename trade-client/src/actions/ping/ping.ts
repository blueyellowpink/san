import { ActionType } from 'interfaces/Action';

const ping: ActionType = async () => {
    return 'HELLO';
};

export default ping;
