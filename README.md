# GitHub Template for React-based for Azure

An opininated but flexible React App template with batteries builtin.

## Project Features
* **[Typescript](https://www.typescriptlang.org/) Support**
* **Modern React/Redux Integration** ([React](https://reactjs.org/), [Redux Toolkit](https://redux-toolkit.js.org/), [RTK Query](https://redux-toolkit.js.org/rtk-query/overview), [Redux Observable](https://redux-observable.js.org/))
* Fun Component Development (Storybook)
* Ensure Code Cleaniness and **auto fix styling** (eslint + Prettier)
* **Unit and Interaction Tests** (jest + Storybook Interactions)
* E2E Tests ([Playwright](https://playwright.dev/))
* **Seamless External Services Mocking** ([msw](https://mswjs.io/))
* Fun Typescript Development (ts-node + ts-jest)
* **Isolated Local Dev Environment** (with VSCode DevContainers)
* **Modern Build Tools** (vite)
* **Code generation** for all aspects of the app (plop)
* **Infrastructure as Code** (Terraform)
* **CICD** (GitHub Action for PR, testing, and deployment)
* **VSCode Integration** (devcontainers, settings, coverage gutter, linting, testing, etc)

## Project Structure

```
.
├── .devcontainer/          # VSCode DevContainer Configuration
├── .plop/                  # Plop templates
├── .storybook/             # Storybook Configuration
├── docs/                   # Documentation files (alternatively `doc`)
│   ├── media/              # Media (images, gifs) files
│   ├── CODE_OF_CONDUCT.md  # Code of Conduct Document
│   └── ...                 # Docs Markdown files
├── mocks/                  # External Services Mocks (using msw)
├── server/                 # Application API + static file source code (using express)
├── src/                    # Application source code (using react)
├── tests/                  # Application tests source code (using jest)
├── .editorconfig           # EditorConfig file
├── .eslintignore           # File list that ESLint should ignore
├── .eslintrc.json          # Configuration file for ESLint
├── .example.env            # Template file for environment variables
├── .gitignore              # File list that git should ignore
├── .prettierrc             # Configuration file for Prettier
├── jest.config.js          # Configuration file for Jest
├── LICENSE                 # License Document
├── package-lock.json       # lock file for npm dependencies
├── package.json            # package declaration of the application
├── plopfile.js             # Configuration file for Plop generator
├── README.md               # Main project README
├── tsconfig.dev.json       # Typescript Config FIle for frontend app (during dev)
├── tsconfig.json           # Typescript Config File for frontend app (during build)
├── tsconfig.server.json    # Typescript Config File for server (during dev and build)
└── vite.config.ts          # Configuration file for vite
```

## TODO:
* Resolve local files (avoid '../..' relative linking)
