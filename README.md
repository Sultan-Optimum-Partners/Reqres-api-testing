# Playwright API Testing Project

This project contains automated tests for the [Reqres API](https://reqres.in/) using [Playwright](https://playwright.dev/). The tests are designed to verify the functionality of various API endpoints and are configured to run seamlessly in a GitHub Actions CI/CD pipeline. Environment variables and repository secrets are used to enhance security and flexibility.

---

## Features
- Automated API tests for the [Reqres API](https://reqres.in/).
- Configured to run tests locally and in GitHub Actions.
- Utilizes environment variables for secure configuration.
- Includes GitHub Actions workflow for continuous integration.

---

## Prerequisites

Ensure the following are installed on your local machine:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

## Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Sultan-Optimum-Partners/Reqres-api-testing
   cd Reqres-api-testing
   ```

2. Install dependencies:
   ```bash
   npm ci
   ```

3. Create an `.env.development` file for local testing:
   ```env
   BASE_URL=https://reqres.in
   ```

4. Run tests locally:
   ```bash
   npx playwright test
   ```

---

## GitHub Actions Configuration

The project is configured to run tests automatically in GitHub Actions on every push or pull request targeting the `main` or `master` branch.

### Workflow Details
The workflow is defined in `.github/workflows/playwright-tests.yml` and performs the following steps:
1. Checks out the repository code.
2. Sets up the Node.js environment.
3. Installs dependencies using `npm ci`.
4. Installs Playwright browsers.
5. Runs the Playwright tests.
6. Uploads the test report as an artifact.

### Using Environment Variables
The `BASE_URL` environment variable is required for the tests to run. It is securely managed using GitHub Secrets.

#### Adding the Secret in GitHub Repository Settings
1. Go to your repository on GitHub.
2. Navigate to **Settings > Secrets and variables > Actions**.
3. Click **New repository secret**.
4. Add a secret with the name `BASE_URL` and the value `https://reqres.in`.

---

## Running Tests in GitHub Actions
1. Push changes to the `main` or `master` branch, or open a pull request.
2. The workflow will automatically start and execute the tests.
3. Check the test results under the **Actions** tab in your repository.
4. Download the test report artifact if needed for further analysis.


