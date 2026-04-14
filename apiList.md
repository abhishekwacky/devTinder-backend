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

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter

- GET /user/connections
- GET /user/requests
- GET /user/feed - Gets you the profile of other users on platform

Status: ignore, interested, accepted, rejected
