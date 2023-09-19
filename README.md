# Years of Experience

A React, Node.js (Express) app to create/manage sharable career experience pages with offline capabilities, personalization etc.

## Table of Contents

- [Introduction](#introduction)
- [Backend](#backend)
  - [Installation](#installation-backend)
  - [Usage](#usage-backend)
  - [Scripts](#scripts-backend)
  - [Dependencies](#dependencies-backend)
  - [Development Dependencies](#development-dependencies-backend)
  - [Author](#author-backend)
- [Frontend](#frontend)
  - [Installation](#installation-frontend)
  - [Usage](#usage-frontend)
  - [Scripts](#scripts-frontend)
  - [Dependencies](#dependencies-frontend)
  - [Development Dependencies](#development-dependencies-frontend)
  - [Author](#author-frontend)

## Introduction

This project consists of both backend and frontend components. The backend, named "Years of Experience," is responsible for managing experience data, while the frontend is a web application built to interact with the backend.

## Backend

### Installation (Backend)

To install the backend and its dependencies, navigate to the "backend" directory and run the following command:

### Usage (Backend)

To start the backend application in production mode, use:

```
npm run start
```

To run the backend application in development mode with automatic reloading, use:

```
npm run dev
```

### Scripts (Backend)

- `npm run build`: Compiles TypeScript code.
- `npm start`: Starts the backend application in production mode.
- `npm run dev`: Starts the backend application in development mode with automatic reloading.
- `npm run lint`: Runs ESLint to check and fix code style (backend specific).
- `npm test`: Placeholder for running tests (currently not specified).

### Dependencies (Backend)

- [bcryptjs](https://www.npmjs.com/package/bcryptjs): ^2.4.3
- [cookie-parser](https://www.npmjs.com/package/cookie-parser): ^1.4.6
- [cors](https://www.npmjs.com/package/cors): ^2.8.5
- [dotenv](https://www.npmjs.com/package/dotenv): ^16.0.1
- [express](https://www.npmjs.com/package/express): ^4.18.1
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): ^9.0.2
- [multer](https://www.npmjs.com/package/multer): ^1.4.3
- [pg](https://www.npmjs.com/package/pg): ^8.7.3
- [pg-hstore](https://www.npmjs.com/package/pg-hstore): ^2.3.4
- [sequelize](https://www.npmjs.com/package/sequelize): ^6.21.1

### Development Dependencies (Backend)

- [@types/bcryptjs](https://www.npmjs.com/package/@types/bcryptjs): ^2.4.3
- [@types/cookie-parser](https://www.npmjs.com/package/@types/cookie-parser): ^1.4.4
- [@types/cors](https://www.npmjs.com/package/@types/cors): ^2.8.12
- [@types/dotenv](https://www.npmjs.com/package/@types/dotenv): ^8.2.0
- [@types/express](https://www.npmjs.com/package/@types/express): ^4.17.13
- [@types/jsonwebtoken](https://www.npmjs.com/package/@types/jsonwebtoken): ^9.0.2
- [@types/multer](https://www.npmjs.com/package/@types/multer): ^1.4.7
- [@types/node](https://www.npmjs.com/package/@types/node): ^18.0.0
- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin): ^5.29.0
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser): ^5.29.0
- [concurrently](https://www.npmjs.com/package/concurrently): ^7.2.2
- [eslint](https://www.npmjs.com/package/eslint): ^8.18.0
- [nodemon](https://www.npmjs.com/package/nodemon): ^2.0.18
- [typescript](https://www.npmjs.com/package/typescript): ^4.7.4

> service hosted @ [render.com](https://render.com/) under [api.project-anuja.xyz](https://api.project-anuja.xyz/)

### Author (Backend)

- Author: Anuja

## Frontend

### Installation (Frontend)

To install the frontend and its dependencies, navigate to the "frontend" directory and run the following command:

- `yarn` recommended.

```
npm install
```

### Usage (Frontend)

To start the frontend development server, use:

```
npm run dev
```

To build the frontend for production, use:

### Scripts (Frontend)

- `npm start`: Starts the frontend development server.
- `npm run build`: Builds the frontend for production.
- `npm test`: Runs tests (frontend specific).
- `npm run lint`: Runs ESLint to check and fix code style (frontend specific).
- `npm run lint:fix`: Fixes ESLint issues (frontend specific).
- `npm run format`: Formats code using Prettier.
- `npm run eject`: Ejects from create-react-app (use with caution).

### Dependencies (Frontend)

- [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers): ^2.9.3
- [@testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom): ^5.16.4
- [@testing-library/react](https://www.npmjs.com/package/@testing-library/react): ^13.3.0
- [@testing-library/user-event](https://www.npmjs.com/package/@testing-library/user-event): ^13.5.0
- [@types/jest](https://www.npmjs.com/package/@types/jest): ^27.5.2
- [@types/node](https://www.npmjs.com/package/@types/node): ^16.11.41
- [@types/react](https://www.npmjs.com/package/@types/react): ^18.0.14
- [@types/react-dom](https://www.npmjs.com/package/@types/react-dom): ^18.0.5
- [@types/uuid](https://www.npmjs.com/package/@types/uuid): ^8.3.4
- [axios](https://www.npmjs.com/package/axios): ^0.27.2
- [date-fns](https://www.npmjs.com/package/date-fns): ^2.28.0
- [npm](https://www.npmjs.com/package/npm): ^8.13.1
- [react](https://www.npmjs.com/package/react): ^18.2.0
- [react-dom](https://www.npmjs.com/package/react-dom): ^18.2.0
- [react-dropzone](https://www.npmjs.com/package/react-dropzone): ^14.2.1
- [react-hook-form](https://www.npmjs.com/package/react-hook-form): ^7.33.0
- [react-loading-skeleton](https://www.npmjs.com/package/react-loading-skeleton): ^3.1.0
- [react-modal](https://www.npmjs.com/package/react-modal): ^3.15.1
- [react-router-dom](https://www.npmjs.com/package/react-router-dom): ^6.3.0
- [react-scripts](https://www.npmjs.com/package/react-scripts): 5.0.1
- [typescript](https://www.npmjs.com/package/typescript): ^4.7.4
- [uuid](https://www.npmjs.com/package/uuid): ^8.3.2
- [web-vitals](https://www.npmjs.com/package/web-vitals): ^2.1.4
- [yup](https://www.npmjs.com/package/yup): ^0.32.11

### Development Dependencies (Frontend)

- [@tailwindcss/line-clamp](https://www.npmjs.com/package/@tailwindcss/line-clamp): ^0.4.0
- [@types/axios](https://www.npmjs.com/package/@types/axios): ^0.14.0
- [@types/react-modal](https://www.npmjs.com/package/@types/react-modal): ^3.13.1
- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin): ^5.29.0
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser): ^5.29.0
- [autoprefixer](https://www.npmjs.com/package/autoprefixer): ^10.4.7
- [eslint](https://www.npmjs.com/package/eslint): ^7.32.0 || ^8.2.0
- [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb): ^19.0.4
- [eslint-config-airbnb-typescript](https://www.npmjs.com/package/eslint-config-airbnb-typescript): ^17.0.0
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier): ^8.5.0
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import): ^2.25.3
- [eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest): ^26.5.3
- [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y): ^6.5.1
- [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier): ^4.0.0
- [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react): ^7.30.1
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks): ^4.6.0
- [postcss](https://www.npmjs.com/package/postcss): ^8.4.14
- [prettier](https://www.npmjs.com/package/prettier): ^2.7.1
- [tailwindcss](https://www.npmjs.com/package/tailwindcss): ^3.1.4

> served from [netlify](https://www.netlify.com/) under [app.project-anuja.xyz](https://app.project-anuja.xyz/)

### Author (Frontend)

- Author: Anuja
