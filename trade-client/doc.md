# Account API Doc

## Prerequisite

-   Dev host: https://api.cainance.xyz/api/account
-   Body response

```typescript
interface BodyResponse {
    success: boolean;
    data: any;
    message: string;
    code: string;
}
```

-   i18n:
    Currently support English (`en`). Pass language to querystring, example: `?lng=en`. [Source](https://github.com/i18next/i18next-http-middleware#language-detection).

## /register - Register with phone number and email

-   Method: `POST`
-   URL: `/register`
-   Params: null
-   Payload:

```typescript
interface registerArgs {
    email: string; // User email
    password: string; // User password
    phoneNumber: string; // User phone Number
}
/**
 * Phone number: start with + (plus)
 */
```

-   Response:

```typescript
interface registerResponse {
    user: any;
    token: string;
}
```

## /login - Login

-   Method: `POST`
-   URL: `/login`
-   Params: null
-   Payload:

```typescript
interface loginArgs {
    email: string; // User email
    password: string; // User password
    phoneNumber: string; // User phone Number
}
```

-   Response:

```typescript
interface loginRespones {
    user: any; // User info
    token: string; // JWT token
}
```
