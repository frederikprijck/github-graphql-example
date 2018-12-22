# Github-GraphQL-Example

[![Build Status](https://travis-ci.org/frederikprijck/github-graphql-example.svg?branch=master)](https://travis-ci.org/frederikprijck/github-graphql-example)

This example application demonstrates how we can integrate the Github GraphQL API in an Angular application using [apollo-angular](https://github.com/apollographql/apollo-angular).

## Installing dependencies
You can install the dependencies using `npm install`.

## Running the application
Before you will be able to run the application you'll need to generate a Github Access Token (https://github.com/settings/tokens), ensure the following scopes are included:

- read:org
- read:user

Once the token is generated, copy it's value and paste it in `src/app/github-graphql/github-graphql.module.ts` on line 14.

The application can now be started using `npm start`.