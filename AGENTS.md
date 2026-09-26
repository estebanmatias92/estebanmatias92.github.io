# AGENTS.md — estebanmatias92.github.io

Astro 5 static CV site. SSOT: `src/data/resume.yaml` → `src/data/resume.ts:loadResume()` → `src/pages/index.astro` (full CV) + `src/pages/resume.astro` (print PDF). Deployed to GitHub Pages.

## Commands
* Dev: `npm run dev` (or `devenv task site:dev`)
* Verify: `npm run build` — runs `astro check && astro build`. Always run before push; CI runs `npm ci && npm run build`.
* Runtime: Node 22 only (`devenv.nix:pkgs.nodejs_22`, `package.json engines >=22`). Don't downgrade `@types/node` major independently.

## Architecture
* Single package, no workspaces, no tests, no lint.
* `resumeVariants` in YAML (by `fingerprint`) is dead data — neither page filters by it yet.
* `experienceProjects[].bullets[]` all empty; pages fall back to `description`.
* `experienceProjects[].url` is repo-only: repository URLs only; roles, teaching posts, institutions, and non-repo coursework containers must use `""`.
* Only static asset: `public/favicon.svg`. Build output `dist/` (`index.html + resume/`).

## Gotchas
* `contact.github/linkedin/website` in YAML are already full URLs, but `index.astro` and `resume.astro:37-38` prefix them (`https://github.com/${...}`, `github.com/...`) → broken links. Fix rendering, not YAML.
* `astro.config.mjs base: /estebanmatias92.github.io/` is for project pages; repo name is a user site (`estebanmatias92.github.io`) which normally uses `base: /`. Don't change without checking Pages URL.
* Don't commit generated `*.pdf`, root `*.md` exports, or `dist/` — `dist/` is ignored, `*.pdf` is not.
* `summary` and variant content are hand-curated — don't auto-rewrite tone.

## Agent skills

### Issue tracker

Issues live in GitHub Issues via `gh`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five canonical labels (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context (`CONTEXT.md` + `docs/adr/` at root, created lazily). See `docs/agents/domain.md`.
