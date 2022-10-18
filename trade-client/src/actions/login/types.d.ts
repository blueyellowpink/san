export interface loginResponse {
    user: any; // User info
    token: string; // JWT token
}

export interface loginArgs {
    email: string; // User email
    password: string; // User password
    phoneNumber: string; // User phone Number
}
