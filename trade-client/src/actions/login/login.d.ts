import AppRequest from '../../interfaces/AppRequest';
import { loginResponse } from './types';

export default function login(req: AppRequest): Promise<loginResponse>;
