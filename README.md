# Schema

- Login / Sign Up / Logout
- Homepage or subscription
- Deliver Review
- Plans

# MyWallet Model Outline

## Users

- Attributes
  - Name
  - Email
  - Password


## Logged_users

- Attributes
  - User id
  - Token


## Balances

- Attributes
  - User id
  - Entry's value
  - Entry's description
  - Entry's date

# Getting Started

This project was designed with node.js and express. To run this project in your personal computer, make sure to run `npm i` first. And, if you want to make a better management of scripts, I advise you to run `npm i ntl`, since it gives you the control to choose witch script to run withou the need to decorate each of them.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the production environment.

### `npm start:dev`

Runs the app in the development environment.

### `npm start:test`

Runs the app in the test environment. This was created just for testing proposes.

### `npm test`

Runs the app in the test mode with jest.

**You will also see any lint errors in the console.
