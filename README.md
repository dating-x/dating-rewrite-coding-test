# Description

The app in the repo contains a landing page. The landing page makes a few API requests, and displays the data. It's served behind `https://sample-url-1.com` URL. We decided to open two other domains, `https://sample-url-2.com` and `https://sample-url-3.com`, where we want to serve the same JS bundle.

It will work in exactly the same way (each page will make the same API requests), but we want them to look different in order to make some A/B testing:

- components might be in different places on the page
- styles might be different
- text content might be different

The theme is dictated by injected `window.appConfig.themeId` from the backend (it's curently mocked in `index.html`).

The task is to update the app's folder structure and the code to be more flexible and support different themes based on that injected variable. Maybe consider:

- using variants in tailwind
- using composables if they make sense, to avoid code repetitions
- write some unit tests
- any suggestions on alternative approaches to solve the issue

# Installation

```
$ pnpm install
$ pnpm dev
```
