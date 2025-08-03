# Frontend For Web Audio Player

Created a React App For Practice, and personal Use For my personal music player.

THE MAIN REPO IS AT
[This URL](https://github.com/altair13421/WebAudioPlayer)

## Config

### Docker

Apparently, I made a Non docker use, and normal use

the main `docker-compose.yml` file is in the main repo, so need to Make it so the File Structure is Like This

```txt
.
├── data
├── docker-compose.yml
├── webaudiofe # Frontend
└── WebAudioPlayer # Backend
```

The configs to look at

```yml
services:
  ## will contain only frontend config, backend config to be explained in backend repo
  frontend:
    build:
      context: ./webaudiofe # THe Folder
      dockerfile: Dockerfile-dev # Change if you want to use the prod one
    volumes:
      - ./webaudiofe:/app # Mount Directory for This App.
      - /app/node_modules  # Isolate node_modules
    environment:
      - NODE_ENV=development
      - REACT_APP_API_URL=http://localhost:8008/api/ # BACKEND URL. Have to append /api/ to the end
    ports:
      - "3000:3000" # open whatever port you need. Don't Forget to DO it in Dockerfile-dev/Dockerfile-prod
    depends_on:
      - backend
    restart: unless-stopped
    stdin_open: true  # For interactive terminal
    tty: true         # For color output

## The rest of the File
```

Build only Frontend?

```sh
# Build Frontend
docker-compose build frontend
# or with file
docker-compose -f docker-compose.yml build frontend

# Since it needs backend to be done, make sure to build that and run that so this can run
```

### Normal Usage

```sh
#Install node modules
npm i

# need to somehow download the latest react-scripts, since it doesn't
npm install react-scripts@latest --save

# Start
npm start
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
