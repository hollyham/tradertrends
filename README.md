# Trader Trends

Made during AthenaHacks 2021

Link: Coming soon!

## Dependencies

- [Finnhub API](https://www.npmjs.com/package/finnhub)

## Process

### Getting Started

- [React and Express](https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/)

### Deploying on Google's App Engine (Google Cloud Platform)

- [5 Step Guide to Deploy Your React App on Google's App Engine](https://javascript.plainenglish.io/quickly-deploy-your-react-app-on-googles-app-engine-6bb97480cc9c)<br />
  Steps:
  1. Create app on the App Engine (region is us-central)
  2. Open up the Cloud Shell and clone the app's source code from GitHub.
  3. Build app for deployment. For this web app, in both the client and api folder, run:
     <pre><code>npm i</code></pre>
     Then in the client folder, run:
     <pre><code>npm run build</code></pre>
  4. Add an app.yaml file in the build folder with the following contents
     <pre><code>runtime: nodejs12
     handlers:
     # Serve all static files with url ending with a file extension
     - url: /(._\..+)$
       static_files: build/\1
       upload: build/(._\..+)$
     # Catch all handler to index.html
     - url: /.\*
       static_files: build/index.html
       upload: build/index.html</code></pre>
  5. Deploy with the following command:
     gcloud app deploy

### Mapping custom domain

- Went through Google App Engine's "Add a new custom domain" instructions.
- Verification of domain from Domain.com by adding TXT DNS record with...
  <pre><code>Name: @
  Type: TXT
  Content: [Google will provide this while using Webmaster Central]
  TTL: Selected the shortest amount of time (initially, for faster verification)
