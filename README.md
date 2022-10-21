# monorepo

## Requirements
- NodeJS v16.17.0

## Bazel build
- generate `pnpm-lock.yaml` file without install packages
```bash
npx pnpm install --lockfile-only
```

- fetch packages from NPM
```bash
bazel fetch @npm_deps//...
```

- (optional) query location, build
```bash
bazel query @npm_deps//... --output=location
bazel query --output=build @npm_deps//:typescript
```

- copy `repositories.bzl` file from `@npm_deps//:repositories.bzl`
```bash
bazel run //:update_repos
```

- build
```bash
bazel build ...
```

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

### get chain list
```bash
http :3000/api/chain/list
# {
#     "data": [
#         {
#             "name": "Binance Smart Chain",
#             "symbol": "bsc",
#             "type": "evm"
#         },
#         {
#             "name": "Tron",
#             "symbol": "tron",
#             "type": "evm"
#         },
#         {
#             "name": "Ethereum",
#             "symbol": "eth",
#             "type": "evm"
#         },
#         {
#             "name": "Polkadot",
#             "symbol": "dot",
#             "type": "dot"
#         },
#         {
#             "name": "Solana",
#             "symbol": "sol",
#             "type": "solana"
#         },
#         {
#             "name": "NEAR",
#             "symbol": "near",
#             "type": "near"
#         }
#     ],
#     "message": "",
#     "success": true
# }
```
