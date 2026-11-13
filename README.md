# StrongTie UX mockup template

A small Vite + React starter for clickable UX mockups. It includes the [StrongTie design system](https://design.strongtie.io/), sample screens and states, instructions for coding agents, and a GitHub Pages workflow.

## Create a mockup

1. On GitHub, choose **Use this template → Create a new repository**. Name the repository for your concept.
2. Open the new repository in your coding tool and ask its AI to read `AGENTS.md` and `README.md`.
3. Give it your brief. For example:

   > Read AGENTS.md and build a clickable mockup for [describe the user task]. Use StrongTie components, include the important screens and states, and tell me when it is ready to publish with GitHub Pages.

4. Review the result locally and ask for changes. Then follow **Publish on GitHub Pages** below.

## Run locally

Prerequisites: Node.js 20+ and npm 10+, plus access to Simpson's Azure Artifacts feed.

The project `.npmrc` routes `@strongtie/*` to the Simpson feed. Follow the [StrongTie npm authentication guide](https://design.strongtie.io/getting-started/npmrc) to sign in locally. Keep credentials in your user-level `~/.npmrc`; never commit them.

```sh
npm install
npm run dev
```

Open the URL printed by Vite. `npm run build` checks the production build; `npm run preview` opens that build locally.

The starter uses `@strongtie/design-system` version 1.3.0 and its bundled CSS. The [component catalog](https://design.strongtie.io/components) shows imports and examples. If you cannot access the feed, the [public StrongTie registry](https://design.strongtie.io/getting-started/strongtie-registry) is an alternative installation path; ask your coding agent to migrate the project to that path before building.

## Publish on GitHub Pages

Each new repository needs these one-time settings:

1. In **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**. The custom workflow is already in `.github/workflows/pages.yml`.
2. In **Settings → Secrets and variables → Actions**, add a repository secret named `AZURE_ARTIFACTS_PAT`. Give it an Azure DevOps PAT with **Packaging: Read** access to the Simpson feed. This lets the GitHub runner install `@strongtie/design-system`. Do not put the token in a file or chat message.
3. Push a change to `main`, or run **Build and deploy mockup** from the **Actions** tab. When it succeeds, find the live URL under **Settings → Pages** or in the workflow's deployment summary.

The Vite configuration sets the correct `/repository-name/` asset path automatically during GitHub Actions builds. The workflow publishes the built `dist` directory. If publishing fails, check the **Actions** log; missing feed access and a missing Pages source setting are the most common setup issues.

GitHub Pages may make the mockup publicly reachable even when the source repository is private. Check your organization's Pages access policy before publishing confidential work.

## Project map

- `src/App.jsx`: example screens and interactions; replace these for a new concept.
- `src/styles.css`: mockup layout styles.
- `src/main.jsx`: design system style import and React entry.
- `vite.config.js`: Pages asset base path.
- `.github/workflows/pages.yml`: build and deploy action.
- `AGENTS.md`: instructions for coding agents, including how to guide a designer through Pages setup.

For the design system's current component guidance, see [design.strongtie.io](https://design.strongtie.io/) and its [agent index](https://design.strongtie.io/llms.txt).
