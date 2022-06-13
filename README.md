# Node SSR Application

This app is a basic Express server with a plugged-in CMS named Payload. Payload connects to a locally running instance of MongoDB to persist data, that authors can manage.

On top of it all, the server renders Marko templates and streams content without overhead like hydration.

## Production build

```
npm run build
```
produces static files from Marko in `dist` and a React application for PayloadCMS in `build`

The server ist started via

```
npm run start
```