# simple-ethereum-wallet

Create an API which allows users to register with a username and password.
It should assign them a unique generated ethereum address just as a centralized exchange does.
The user can send funds to the address using the blockchain - ether or tokens (e.g. USDC).

### Features

A user should be able to do the following:

- Register an account which is stored in postgres db
- Get their username and deposit address
- Get their balance for ether and a specific token by interacting with an eth node.

## Tech

- [Postgres](https://www.postgresql.org/) - Database
- [Node.js](https://nodejs.org/en/) - Backend server
- [Express](http://expressjs.com/) - Node.js network app framework

## Installation

Make sure to install **Postgres** and update `config/database.config.ts` accordingly.

Install the dependencies and devDependencies and start the server.

```sh
pnpm i
pnpm run dev
```
