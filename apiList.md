# DevTinder APIs

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- GET /profile/edit
- PATCH /profile/password

## connectionRequestRouter

- POST /request/send/:status/:userId (interested)
- POST /request/send/:status/:userId (ignored)

- POST /request/review/:status/:requestId (accepted)
- POST /request/review/:status/:requestId (rejected)

## userRouter

- GET /user/requests
- GET /user/connections
- GET /user/feed - Gets you the profile of other users on platform

Status: ignore, interested, accepted, rejected
