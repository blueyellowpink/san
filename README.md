# monorepo

## Requirements
- NodeJS v16.17.0

## Docs

### Sign up
```bash
http :3000/api/auth/sign-up email=trasuadev@gmail.com password=qwe123
# {
#     "data": {
#         "account": {
#             "email": "trasuadev@gmail.com"
#         }
#     },
#     "message": "",
#     "success": true
# }
```

### Sign in
```bash
http :3000/api/auth/sign-in email=trasuadev@gmail.com password=qwe123
# {
#     "data": {
#         "account": {
#             "_id": "634ecb2cec81b92eae1784ca",
#             "email": "trasuadev@gmail.com"
#         },
#         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzRlY2IyY2VjODFiOTJlYWUxNzg0Y2EiLCJlbWFpbCI6InRyYXN1YWRldkBnbWFpbC5
# jb20iLCJpYXQiOjE2NjYxMDgyNzJ9.7g7Z8-eNmFghmCyI8aVT-3cdNacvvr6pBxRjdAi4MzM"
#     },
#     "message": "",
#     "success": true
# }
```
