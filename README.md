# work.vote

[![CircleCI](https://circleci.com/gh/developmentseed/work.vote/tree/master.svg?style=svg)](https://circleci.com/gh/developmentseed/work.vote/tree/master)

The front end for work.vote

## Development environment
To set up the development environment for this website, you'll need to install the following on your system:

- nodejs 8.11 or above
- yarn
- nvm 

After these basic requirements are met, run the following commands in the website's folder:

     $ nvm use
     $ yarn

### Local Serve 

     $ yarn serve

Compiles the sass files, javascript, and launches the server making the site available at `http://localhost:3000/`

The system will watch files and execute tasks whenever one of them changes.

The site will automatically refresh since it is bundled with livereload.

The run the site locally using the public api run:

     $ DS_ENV=production yarn serve

### Build 

     $ yarn build 

### Deployment

`master` branch is automatically deployed to [surge.sh](https://surge.sh).

For manual deployment run:

     $ yarn build
     $ yarn surge