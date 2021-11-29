# Schema

- Login / Sign Up / Logout
- Homepage or subscription
- Deliver Review
- Plans

# Technologies

<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />

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

## dump_sql

Please notice that there are available SQL scripts for postgresSQL. But you will also need to add the following datestyle:

```
ALTER DATABASE "my_database_name" SET datestyle TO "ISO, DMY";
```

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
