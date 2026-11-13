# Instructions for coding agents

This repository is a starter for clickable UX mockups. Read this file and `README.md` before changing the project.

## Build a mockup

- Use the existing Vite + React app. Put screens and interaction logic in `src/`; put static assets in `public/` when needed.
- Replace the sample flow with the user's requested concept. Keep a simple way to move between screens or states so reviewers can explore it.
- Use realistic sample content and simulated behavior. Do not add real credentials, customer data, or backend dependencies to a mockup.
- Use `@strongtie/design-system` components before making application-owned controls. The package and its styles are already wired in. Import components from subpaths such as `@strongtie/design-system/button`. See https://design.strongtie.io/llms.txt and https://design.strongtie.io/components.
- Keep the package's source in `node_modules` unchanged. Add mockup-specific composition and CSS in `src/`.
- Use accessible labels, keyboard-operable controls, visible focus, and relevant empty, loading, error, and success states.
- Run `npm run build` before presenting the result when dependencies are available. Report any validation you could not run.

## Package access

`@strongtie/design-system` comes from Simpson's Azure Artifacts feed. The committed `.npmrc` routes only the `@strongtie` scope; it contains no credentials. Follow https://design.strongtie.io/getting-started/npmrc for local sign-in. Never commit a token, user `.npmrc`, or generated credentials.

If feed access is unavailable, explain the blocker to the user. The design system also has a public component registry at https://design.strongtie.io/getting-started/strongtie-registry, but changing to that delivery path requires updating dependencies and imports consistently.

## GitHub Pages setup and publishing

The repository includes `.github/workflows/pages.yml`. It builds on pushes to `main` and publishes the Vite `dist` directory. `vite.config.js` derives the Pages base path from `GITHUB_REPOSITORY`, so it works after a repository is created from this template or renamed.

When the user asks to publish or share a live mockup:

1. Check whether this repository has a GitHub remote and whether Pages is already configured. If you cannot inspect repository settings, ask the user to check them.
2. If Pages is not configured, **prompt the user with the exact steps**: open the new repository on GitHub, go to **Settings → Pages → Build and deployment**, and set **Source** to **GitHub Actions**. Explain that the custom workflow is already included; they should not select a branch publishing source.
3. Ask the user to add the repository Actions secret `AZURE_ARTIFACTS_PAT` under **Settings → Secrets and variables → Actions**. It must be an Azure DevOps PAT with Packaging Read access to the Simpson feed. Explain that this is needed because GitHub's runner cannot use their local feed sign-in. Do not ask them to paste the token in chat or a repository file.
4. After both settings are in place, push to `main` if authorized, inspect the workflow result, and give the user the actual Pages URL. If you cannot inspect the workflow, tell the user where to find the result in the **Actions** tab.
5. For a public Pages site, remind the user to keep confidential mockups and data out of the published content. A private repository alone does not guarantee a private Pages site.

Do not claim that publishing succeeded until the workflow and URL have been verified.
