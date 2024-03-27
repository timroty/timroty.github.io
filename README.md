# timroty.github.io

Personal website build with Next.js, the Notion Api, and TypeScript.

### Getting Started

#### Clone the Repository
```bash
git clone https://github.com/timroty/timroty.github.io
cd timroty.github.io
```
#### Install NPM Packages
```bash
npm install
```
#### Setting Secrets
The `.env.example` file contains the names of the environment variables that must be set in order to run the project.
Create a new file called `.env.local`, copy the environment variables, and set the environment variable value to the appropriate key.

#### Starting the Development Server
```bash
npm run dev
```
Once the server is started, it will be avalible at `http://localhost:3000/`.

#### Dev Dependencies

This project includes ESLint and Prettier for code linting and formatting.

To run ESLint to check for code errors and attempt to fix them, use the following command:

```bash
npm run lint -- --fix
```

Prettier can be ran using the following command:
```bash
npm run format
```

### Deploying
The Github Actions script for deploying the site is located in at `.github/workflows/nextjs.yml`. This will automatically run on every push to the `main` branch to build and deploy the site. 

### Credits

This project was developed with inspiration and resources from the following:

- [Notion Blog with Next.js by Samuel Kraft](https://github.com/samuelkraft/notion-blog-nextjs)
- [Shadcn UI Kit](https://ui.shadcn.com/)
