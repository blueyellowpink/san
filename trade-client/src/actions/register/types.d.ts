export interface registerArgs {
    email: string;
    password: string;
    phoneNumber: string;
}

export interface registerResponse {
    user: any;
    token: string;
}
