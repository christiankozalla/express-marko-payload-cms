# Build PayloadCMS into `build` directory
echo 'Building PayloadCMS into build directory'
npm run build:payload

# Build static files from Marko etc
echo 'Building static files and Marko server-side'
npm run build:server

# Build Marko client-side
echo 'Building Marko client-side'
npm run build:client

# Finalize production build into single distributable folder
echo 'Finalizing production build'
mkdir production
mv dist build production
cp -r collections .env payload.config.js index.js production

echo 'cd into production and start the server with\n' \
'`$ PAYLOAD_CONFIG_PATH=payload.config.js NODE_ENV=production node index.js`\n' \
'or `$ npm run start`'