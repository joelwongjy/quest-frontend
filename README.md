# Quest Frontend

To be built!

## Contents

- [Getting started](#getting-started)
- [Development](#development)
- [Project structure](#project-structure)
- [Key packages used](#key-packages-used)
- [React hooks exposed](#react-hooks-exposed-by-the-app)
- [Deployment](#deployment)

## Getting started

### Installing the pre-requisites

Ensure that you have Node.js v12.16.3 (LTS) and Yarn.

If you do not have installed Node.js on your machine previously, it is highly recommended to install Node.js from their site [here](https://nodejs.org/en/). This will not only install the latest version of Node.js but also npm as well.

If you do not have Yarn installed, follow the instructions [here](https://yarnpkg.com/lang/en/docs/install/).

## Development

### Clone the repository

```bash
git clone git@github.com:dsc-team-quest/frontend.git
```

### Install dependencies

In your Terminal, `cd` to the directory and run

```bash
yarn install
```

### Start local backend server

The backend server must be running on `localhost:3001` before starting the app.

- If you would like to change the development API URL, in `.env`, change the following line

  ```bash
  REACT_APP_BACKEND_API=<YOUR BACKEND API URL HERE>
  ```

### Start app in development

```bash
yarn start
```

The app should now be running locally on `localhost:3000`.

## Project structure

The current project structure is as shown below:

```bash
frontend
├─public/
└─src/
  │ index.tsx
  │ serviceWorker.ts
  ├─app/
  ├─assets/
  ├─components/
  ├─constants/
  ├─contexts/
  ├─interfaces/
  ├─routes/
  ├─reducers/
  ├─services/
  └─utils/
```

### Rules when creating a new React component

This project creates a new folder for each component in its most sensible parent directory.

- For example, a component such as `loading` that is used by multiple other components/routes should exist in the `components/` folder.
- A component that is only used by a single other component should exist in the folder of the parent component, either as an individual file or as a subfolder, if the component is complex.

  - E.g. `dashboard/PieChart.tsx`, `login/LoginForm`, etc.

- Components wrapped by React Router's `<Route>` object should be contained in the `routes/` folder.

A typical component folder should look like this:

```bash
component
│ Component.tsx  # A stateless/function component
│ Component.scss  # The styles for the component with the same name
| ComponentContainer.tsx  # The stateful component for the stateless component it contains
| index.ts  # A single line file that exports the top level component for use.
```

Grouping the components this way allows for easy refactoring of components without having to change all imports for other components that uses the refactored component, since one just needs to update the exported component in `index.ts`.

> The bare minimum that a component folder should contain is `Component.tsx` and `index.ts`. The rest are optional.

### `app/` directory

Contains:

- `App.tsx`, the entry point of the application. Code splitting is done here with authentication.
- `AuthenticatedApp.tsx`, which contains routes accessible to authenticated users.
- `UnauthenticatedApp.tsx`, which contains publicly accessible routes.
- `store.tsx`, for Redux store.

### `assets/` directory

Contains animations, images, and general scss folders.

### `components/` directory

Contains components that are used by more than 1 (or 2) components.

### `constants/` directory

Contains constants that are used throughout the application.

### `contexts/` directory

Contains contexts providing React hooks and providers that can be used by React components.

### `interfaces/` directory

Contains interfaces used in the application.

### `pages/` directory

Contains folders containing components that are wrapped by React Router's `<Route>` in `src/app/AuthenticatedApp` or `src/app/UnauthenticatedApp`.

### `reducers/` directory

Contains reducers used in the application. [Redux Toolkit](https://redux-toolkit.js.org/) is used as the redux library of choice.

### `services/` directory

Contains helper services that interface directly with the backend API.

### `utils/` directory

Contain helper functions and data for usage around the application.

## Key packages used

This is to help increase familiarity with the various parts of our app.

### `@reduxjs/toolkit`, `react-redux`, `redux`, `redux-persist`

`redux` is a state management library for JavaScript, and `react-redux` is the official React bindings for Redux, i.e. Redux adapted for React.

`@reduxjs/toolkit` is the official, opinionated, batteries-included toolset for efficient Redux development, i.e. it enables ease of using Redux without the need for a lot of boilerplate code.

Unfortunately, Redux does not store state past a session, i.e. once you refresh, it's gone. This is why we use `redux-persist`, which persists the Redux store for us across sessions.

### `axios`

A powerful HTTP client, i.e. helps us to make HTTP requests to our backend API.

### `react-router-dom`

Enables routing within the app, e.g. `/home` will now lead me to a different page from `/login`.

### `typescript`

Allows for types in JavaScript. Makes your life so much better.

### `eslint`, `prettier`

> These are devDependencies, i.e. they are not bundled in the final production build.

These two dependencies are a linter and formatter respectively, and they help us to ensure that everyone's code follow a certain style and formatting.

### `husky`, `lint-staged`, `pretty-quick`

> These are devDependencies, i.e. they are not bundled in the final production build.

`husky` enables us to make better use of git hooks, i.e. automated commands that run whenever we try to commit, push and more. We will be using it to do code style checks whenever someone tries to commit.

`lint-staged` enables us to target only the files we have changed and staged, i.e. we don't have to check the entire project when only 1 file was changed.

`pretty-quick` helps to run prettier on changed files.

## React hooks exposed by the app

These hooks are exported from the various `contexts/*Context.tsx` files in the `contexts` folder.

### useAuth

Useful authentication functions.

```tsx
import { useAuth } from 'contexts/AuthContext';
```

Contains:

- `data`: The current user logged in.
- `login(username: string, password: string)`: Used to log in to the app.
- `signup(username: string, password: string, name:string)`: Used to sign up with the app.
- `logout()`: Log out of the application.

#### Usage of `useAuth`

```tsx
const { logout } = useAuth()

<Button onClick={logout} />
```

### useUser

Retrieve user information.

```tsx
import { useUser } from 'contexts/UserContext';
```

#### Usage of `useUser`

```tsx
// App.tsx
const App = () => {
  const user = useUser();

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};
```

### useCache

> To be added.

Handles app versioning. Refer to [Versioning and cache busting](#versioning-and-cache-busting) for more information.

```tsx
import { useCache } from 'contexts/CacheContext';
```

Contains:

- `isLatestVersion`: A boolean value denoting whether the cached app on the user's side is the latest version.
- `refreshCacheAndReload()`: Clears the user's cache and reloads the page to refetch the latest app.

#### Usage of `useCache`

```tsx
// App.tsx
const App = () => {
  const { isLatestVersion, refreshCacheAndReload } = useCache();

  return {!isLatestVersion && <Alert okHandler={refreshCacheAndReload}>};
};
```

## Deployment

### Versioning and cache busting

As a PWA caches heavily on the user side, the LB Volunteer App includes cache busting logic to ensure the user will always fetch the latest version.

To specify a new version before each deployment, run the following command in the branch that will be deployed:

```bash
yarn version
```

A prompt will appear asking for the new version number. Refer to `https://semver.org` for versioning conventions. Once you input a new version, `yarn` will auto-commit the changes to `package.json`.

Upon deployment, `generate-build-version.js` will be executed and write the latest version to `public/meta.json`. Should there be a mismatch in the version of `package.json` and `public/meta.json` on the users' end, the app will clear all caches and reload to fetch the latest version.
