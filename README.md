## Description

Auth Redirect is a simple NestJS service that performs the authorization flow on behalf of a user when developing against Dynaboard locally.

It's goal is to provide a stable OAuth redirect callbacks for Authorization Providers (Auth0, Github, etc) during end-to-end testing and shuttle codes to and from Dynaboard resource handlers.

When setting up your OAuth provider callbacks, use the following URLs:

- https://authredirect.dynaboard.dev/api/callback (preferred)
- http://localhost:5001/api/callback (for development, if running this locally)

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
$ pnpm dev
```
