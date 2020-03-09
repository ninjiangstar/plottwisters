# Engineering Standards

To maintain consistency, readability, and future maintainability, developers should keep these standards in mind when building Twisterland. This guide is expected to evolve and grow over time.

## Project Structure

- Monorepo: all source files live in individual packages under `/packages/*`
- `server-router` contains the webpack configuration and the top-level page router.
  - running `yarn dev` in the project root serves the project to `localhost:9000` and watches for file changes.
  - router manages paths at root `/` level. Each route should point to an `*-app` package.
- `*-app`: application-level packages.
  - Reserved for high-level projects that are served from a top-level path.
  - Examples: `profile-app`, `gift-tagger-app`, `admin-app`
  - Optionally consists of a router.
- `*-common`: for components and styles that are shared between packages
- `*-utils`: for utility functions that are shared between packages

## React

- Prefer functional components (`React.FC`) over component classes (`React.Component`/`React.PureComponent`)
- Only use `React.PureComponent` for container-like components with complex states or logic that heavily depends on implementing react lifecycle methods.
- Only use `React.Component` for rare cases where you must implement `shouldComponentUpdate()`
- Frequently use `React.memo()` to wrap functional components, unless the component does not re-render often with the same props. See: [Use React.memo() wisely](https://dmitripavlutin.com/use-react-memo-wisely/)
