# Interview challenge

This is a project made for a tech challenge required in an interview process.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) because it is the fastest and easiest way to start.
Typescript template is used.

## Notes

- Styled components for styling.
- [react-query](https://react-query.tanstack.com/): This handle api requests, retries, cache, errors, etc for me.
- [MSW](https://mswjs.io/): This is used to mock the API responses in tests
- I don't take into account i18n. I'd do it in a real project.
- Styles like font family, font size, etc, are not changed
- Lint/code formatter. I think it's important in a real environment within a team, but not for this challenge, so I don't configure it. 
- I didn't define how to manage errors, just catched them.
- I have delegated to react-query the cache, retries, error handling, etc with default values. A proper configuration based on requirements would be better in a real environment
- Pagination can be done with react-query too, but I decided not to do it now because the amount of elements received are not too much.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.