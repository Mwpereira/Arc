# 🔏 Arc

A revamped version of my original Arc Password Manager program. Arc is a secure, advanced, and customizable password vault. Keep your accounts and data safe by storing your account information using AWS resources, with everything heavily encrypted from client to server. Never worry about forgetting account credentials ever again thanks to Arc. This cross-platform software makes accessibility easy across Windows, Linux, Mac OS, as well as web browser capability on your laptop/desktop.

[Live Demo](https://arc.mwpereira.ca)

## 📐 Project Setup

```
git clone https://github.com/Mwpereira/Arc.git
cd Arc
npm install
```

## 🖥 Developing

### Client

Develop using a Desktop Application _(Recommended)_

```
npm run electron:serve
```

Develop using a Web Browser Build

```
npm run serve
```

### Server

Running aws serverless locally

```
serverless offline
```

## 📚 Frameworks

-   _Vue.js_ - for building user interfaces and connecting Javascript/Typescript code
-   _Electron_ - for the development of cross-platform desktop GUI applications
-   _Bulma_ - for UI components and styling

## 🔐 Back-End

### Dependencies

-   _Serverless_ - for hosting AWS resources including API Gateway, Lambdas, and DynamoDB
-   _Dynamoose_ - for modeling and executing according to database schema's
-   _Webpack_ - for bundling serverless file and uploading them to AWS
-   _bcrypt_ - for hashing functionality

## 🎨 Front-End

### Dependencies

-   _Buefy_ - for using UI components for Vue.js based on Bulma
-   _ChartJS_ - for creating and presenting data in a modern chart
-   _axios_ - for the promise based HTTP client to handle requests
-   _LottieFiles_ - for animated illustrations

## 🧪 Testing

### Run Cypress e2e tests

```
npm run test:e2e
```

### Run Jest api tests

```
npm run test:unit
```

### Gallery

<img src="/dist/screenshots/home.PNG" width="750x50">
<img src="/dist/screenshots/login.PNG" width="750x50">
<img src="/dist/screenshots/dashboard.PNG" width="750x50">
<img src="/dist/screenshots/accounts.PNG" width="750x50">
