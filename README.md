# Advanced Node Production

This repository is for exploring advanced node concepts for production deployment. This is a full-blown node blog application with authentication, react-client, and MongoDB.

## Changelog

- **Make sure to setup your keys in a `.env` file in root**
- **Make sure to run `yarn install` to install all dependencies**
- Run scripts with:
  - `yarn dev`
  - `yarn build`
  - `yarn start`

### Updates in server

- Upgrade all dependencies to latest
- Switch to using `yarn` instead of `npm`
  - `package-json.lock` > `yarn.lock`
- Required versions set in `package.json`:
  - `yarn`: `^1.17.0`
  - `node`: `^12.7.0`
- Add support for `module-alias` to allow aliasing of modules in `require()`
- Switch to `.env` files for managing keys
  - Check `.env.placeholder` for setup
- Remove semicolons in `.js`
- Add `nodemon.json` for Nodemon settings
  - Add ignore for changes in `client` (already handled by CRA)
- `Blog` Schema
  - `createdAt` > `created`
- Some code cleanups

### Updates in `client`

- Upgrade all dependencies to latest
- Switch to using `yarn` instead of `npm`
  - `package-json.lock` > `yarn.lock`
- Required versions set in `package.json`:
  - `yarn`: `^1.17.0`
  - `node`: `^12.7.0`
- Add `jsconfig.json` to support module path alias directly starting from `src`
- Remove semicolons in `.js`
- Some code cleanups
