[//]: # 'UNGEN:'

# GitHub Template for React-based for Azure

An opininated but flexible React App template with batteries builtin.

## Project Features

- **[Typescript](https://www.typescriptlang.org/) Support**
- **Modern React/Redux Integration** ([React](https://reactjs.org/), [Redux Toolkit](https://redux-toolkit.js.org/), [RTK Query](https://redux-toolkit.js.org/rtk-query/overview), [Redux Observable](https://redux-observable.js.org/))
- Ensure Code Cleaniness and **auto fix styling** ([eslint](https://eslint.org/) + [Prettier](https://prettier.io/))
- **Unit and Interaction Tests** ([jest](https://jestjs.io/) + [Storybook Interactions](https://storybook.js.org/docs/react/essentials/interactions))
- E2E Tests ([Playwright](https://playwright.dev/))
- **Seamless External Services Mocking** ([msw](https://mswjs.io/))
- Fun Typescript Development ([ts-node](https://github.com/TypeStrong/ts-node) + [ts-jest](https://github.com/kulshekhar/ts-jest))
- **Isolated Local Dev Environment** ([VSCode DevContainers](https://code.visualstudio.com/docs/remote/containers))
- **Modern Build Tools** ([Vite](https://vitejs.dev/))
- **Code generation** for all aspects of the app ([plop](https://plopjs.com/))
- **Infrastructure as Code** ([Terraform](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs))
- **CICD** ([GitHub Action](https://github.com/howlowck/template-react-ts-vite/actions) for PR, testing, and deployment)
- **VSCode Integration** (devcontainers, [settings](https://github.com/howlowck/template-react-ts-vite/blob/main/.devcontainer/devcontainer.json), coverage gutter, linting, testing, etc)

## Project Structure

```
.
├── .devcontainer/          # VSCode DevContainer Configuration
├── .plop/                  # Plop templates
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

## Steps to use this template

- Update .github/ISSUE_TEMPLATE/config.yml (url property)

## Getting Started

- Run `npm ci` to install all the dependencies
- Run `npm run dev` to run the application

## Deploy

- Run `npm ci`
- Run `npm run build` to build the application
- Run `npm start` to start the application

## TODO:

- Resolve local files (avoid '../..' relative linking)
- Create script to automate the code changes to create new project
