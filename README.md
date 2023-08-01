# Lake Norman Water Temperature Website

Hosted at: https://lknWater.info

### Testing
1. Install jest : `npm i`
2. Run tests: `npm test`

### Run Locally with Netlify functions
1. Install Netlify CLI globally: `npm install netlify-cli -g`
2. Link to Netlify app to inject env vars: `netlify link`
3. Start app locally: `OPENSSL_CONF=./openssl.conf netlify dev`
   1. Needed to override the openssl config to bypass the legacy renegotiation issue with the netlify servers
4. View site at [localhost:8888](http://localhost:8888)

Note: when running locally you can test both functions with either of these commands:
  -  `netlify functions:invoke scheduled-deploy`
  -  `netlify functions:invoke getWaterTemperature`
