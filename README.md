# Go Auth

Authorization project using **go** or go lang and **react**, practicing basic front and backend development.

## Main Technologies

- Go lang
- Typescript
- Gin-gonic
- Golang-jwt
- Gorm
- crypto/argon2
- React
- TailwindCSS

## Functionalities

The program uses a PostgresSQL Dockerized DB, and connects to it via GORM, all the passwords are hashed before being stored on the database, using the Argon2 algorithm.

Also, it features the use of JWT for authorization, being used on the endpoint users/me, which can be used with a cookie or sending the Signed String as a header.

The front was developed using React and TailwindCSS, it makes use of the cookies and hits the endpoints created on go.
