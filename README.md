# Makaton Translator Frontend

## Prerequisites

- [NodeJS](https://nodejs.org/)
- [Gulp](http://gulpjs.com/)
- [Bower](https://bower.io)

## Setup Instructions

- Clone repo
- Install Gulp and Bower
- Install dependencies
- Run the app

```
git clone git@github.com:macgrewal/makaton-translator-frontend.git
cd makaton-translator-frontend
npm install -g gulp bower
npm install
gulp      # starts in development mode
npm start # starts in production mode
```

## Deployment Instructions

- Add heroku remote
- Push to heroku master (must be a contributor to heroku app)
- Open heroku app [https://makatonics.herokuapp.com/](https://makatonics.herokuapp.com/)

```
git remote add heroku git@heroku.com:makatonics.git
git push heroku master
xdg-open https://makatonics.herokuapp.com/
```
