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

Install the dependencies and devDependencies and start the server.

```sh
pnpm i
npm run dev
```

## Test

To run all test case

```sh
npm run dev
npm run test
```

## Curls to try

**POST** Register User

```sh
curl -X POST -H "Content-Type: application/json" \
    -d '{"username": "chris", "password": "123456"}' \
    http://localhost:3000/api/user
```

**GET** Get User Ethereum Address

```sh
curl -X GET -H "Content-Type: application/json" \
    -d '{"username": "chris"}' \
    http://localhost:3000/api/user
```

**POST** Get Ethereum and Token Balance

ERC Token Support: **USDT**, **USDC**, **WBTC**

```sh
curl -X GET -H "Content-Type: application/json" \
    -d '{"eth_address": "ETH_ADDRESS", "erc_token": "USDT"}' \
    http://localhost:3000/api/user/balance
```
