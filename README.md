# punpongsanon.info

Personal homepage for **Parinya Punpongsanon**, built with
[SvelteKit](https://svelte.dev/docs/kit) and prerendered to a fully static site
via [`@sveltejs/adapter-static`](https://svelte.dev/docs/kit/adapter-static).
It is deployed to GitHub Pages under the custom domain `punpongsanon.info`.

All page content lives in plain **YAML data files** — for routine updates
(a new paper, project, talk, or job) you only edit YAML and push; you never need
to touch the Svelte components.

---

## Table of contents

- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Everyday commands](#everyday-commands)
- [Project structure](#project-structure)
- [Editing content](#editing-content)
  - [`site.yaml` — site metadata](#siteyaml--site-metadata)
  - [`about.yaml` — profile header](#aboutyaml--profile-header)
  - [`research.yaml` — research projects](#researchyaml--research-projects)
  - [`publication.yaml` — publications](#publicationyaml--publications)
  - [`activities.yaml` — professional activities](#activitiesyaml--professional-activities)
  - [`employment.yaml` — employment & education](#employmentyaml--employment--education)
  - [Writing HTML & special characters in YAML](#writing-html--special-characters-in-yaml)
  - [Adding images](#adding-images)
- [Changing the layout, styles, or icons](#changing-the-layout-styles-or-icons)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Tech stack

| Concern      | Choice                                                        |
| ------------ | ------------------------------------------------------------- |
| Framework    | SvelteKit 2 (Svelte 5)                                         |
| Build        | Vite 6                                                         |
| Output       | Static prerender (`@sveltejs/adapter-static`)                 |
| Content      | YAML, imported at build time via `@rollup/plugin-yaml`        |
| Icons        | Font Awesome + Hugeicons (loaded from CDN in `src/app.html`)  |
| Fonts        | Inter + Fira Code (Google Fonts)                              |
| Hosting      | GitHub Pages (`build` branch) with `CNAME` = `punpongsanon.info` |

---

## Prerequisites

- [Node.js](https://nodejs.org/) **20 or newer** (includes `npm`).

Check your version:

```bash
node --version
```

---

## Getting started

```bash
git clone https://github.com/punpongsanon/punpongsanon.github.io.git
cd punpongsanon.github.io
npm install
```

---

## Everyday commands

| Command           | What it does                                                        |
| ----------------- | ------------------------------------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload at http://localhost:5173       |
| `npm run build`   | Prerender the static site into `./build`                            |
| `npm run preview` | Serve the contents of `./build` locally to check the final output   |

The typical loop is: run `npm run dev`, edit a YAML file, and watch the page
update instantly in the browser.

---

## Project structure

```
.
├── src
│   ├── app.html                 # HTML shell (fonts, Font Awesome, favicon, <title> hooks)
│   ├── app.css                  # global styles (colours, layout, all component styling)
│   ├── lib
│   │   ├── asset.js             # normalises asset paths coming from the data files
│   │   ├── data                 # ← SITE CONTENT. Edit these YAML files.
│   │   │   ├── site.yaml        # title / tagline / favicon
│   │   │   ├── about.yaml       # profile photo, bio, social links, interests
│   │   │   ├── research.yaml    # research projects + filter categories
│   │   │   ├── publication.yaml # books / journals / papers / posters
│   │   │   ├── activities.yaml  # talks, funding, awards, services, reviews
│   │   │   └── employment.yaml  # employment + education history
│   │   └── components           # one Svelte component per section
│   │       ├── Nav.svelte
│   │       ├── Profile.svelte
│   │       ├── Research.svelte
│   │       ├── Publications.svelte
│   │       ├── PubItem.svelte   # a single citation row (reused by Publications)
│   │       ├── Activities.svelte
│   │       ├── Employment.svelte
│   │       ├── Footer.svelte
│   │       └── BackToTop.svelte
│   └── routes
│       ├── +layout.svelte       # nav + page container + back-to-top button
│       ├── +layout.js           # prerender = true (static build)
│       └── +page.svelte         # composes the sections in order
├── static
│   ├── assets                   # images, research thumbnails, logos, favicon
│   ├── CNAME                    # custom domain (punpongsanon.info)
│   └── .nojekyll                # tells GitHub Pages not to run Jekyll
├── svelte.config.js             # adapter-static configuration
├── vite.config.js               # Vite + YAML import plugin
└── .github/workflows/deploy.yml # CI: build and publish on push to `dev`
```

The sections render in the order listed in
[`src/routes/+page.svelte`](src/routes/+page.svelte). To reorder or hide a
section, rearrange or remove its component there.

---

## Editing content

Every field below is **optional unless noted** — leave a field blank (or delete
the line) and the component simply omits it. Add a new item by copying an
existing block in the same list and keeping the indentation identical (YAML is
whitespace-sensitive: use spaces, never tabs).

### `site.yaml` — site metadata

```yaml
title: Parinya Punpongsanon   # shown in the nav, the browser tab, and the footer
info: /pa rin ya/             # appended to the browser tab title
icon: assets/img/parinya_icon.png  # favicon (also wired up in src/app.html)
```

### `about.yaml` — profile header

Fields actually rendered by [`Profile.svelte`](src/lib/components/Profile.svelte):

```yaml
name: Parinya Punpongsanon, Ph.D.       # required
profile-pic: assets/img/parinya.jpg     # required
pronunciation: /pa rin ya/              # small grey line under the name

# Social icons (each shown only if present)
scholar: https://scholar.google.com/...
github:  https://github.com/punpongsanon
youtube: https://www.youtube.com/@fipresearch
orcid:   https://orcid.org/0000-0003-2720-7768

# Bio paragraphs — HTML is allowed (links, <hightlight>…</hightlight> for bold)
first-paragraph: I am an Associate Professor at the ...
second-paragraph: I am also the Principal Investigator of ...

# Grey contact box. HTML allowed; <code>…</code> renders as a small chip.
research-introduction: <code>Contact Information</code> ... <code>email</code> parinya[at]...

# Research interests list (rendered as "Field: subfields")
research-interests:
  - field: xR
    subfields: locomotion interface, pseudo-haptics
  - field: Human Perception
    subfields: visual illusion, enhancing recognition abilities
```

> To add another social icon (e.g. ResearchGate), add the URL here **and** add a
> matching `<a class="social-icon">` block in `Profile.svelte`.

### `research.yaml` — research projects

Two top-level keys: `categories` (the filter buttons) and `projects`.

```yaml
categories:
  - data-filter: xR
    category-name: xR
  - data-filter: digital fabrication
    category-name: digital fabrication

projects:
  - title: ChewTect&#58; Designing Temporal Food Texture via Computational Molding  # required
    system-name:            # optional short system name, shown italic before the title
    gif: assets/research/DIS_2026_ChewTect.png   # thumbnail (png/jpg/gif)
    conference: ACM DIS 2026
    conference-web:         # link wrapped around the conference name
    status:                 # e.g. "To appear" — shown in red brackets
    authors: Yamato Miyatake, ..., <u>Parinya Punpongsanon</u>.  # HTML allowed
    doi:                    # link icons below the authors (each shown if present)
    pdf:
    code:
    demo:                   # video / YouTube
    slides:
    talk:
    poster:
    project-web:
    abstract-less: First part of the abstract, always visible.
    abstract-more: The rest, revealed by the "See More" toggle.
    category: digital fabrication   # MUST match a categories.data-filter to be filterable
```

**Pagination is automatic** (5 projects per page). Order projects newest-first —
they appear in the order listed.

### `publication.yaml` — publications

Four independent lists: `book_list`, `journal_list`, `paper_list`,
`poster_list`. Every item uses the **same fields** and is rendered by
[`PubItem.svelte`](src/lib/components/PubItem.svelte):

```yaml
journal_list:
  - team: Yamato Miyatake and <u>Parinya Punpongsanon</u>   # author list (HTML allowed)
    title: TastePrint&#58; A 3D food printing system ...     # required
    event: Applied Food Research                             # venue name
    event-web: https://www.sciencedirect.com/journal/applied-food-research
    pages: Vol. 6, 102242
    date: June 2026
    remark:                     # small chip, e.g. "Short Article"
    accept_rate: IF (2025)&#58; 5.4   # small chip
    prize:                      # amber "award" chip
    doi:                        # link icons (each shown if present)
    pdf:
    code:
    demo:
```

On the page, **all groups are shown by default**. The filter buttons
(**All**, **Books**, **Journals/Articles**, **Full Papers**, **Talks/Posters**)
let the reader narrow the list to a single category; **All** restores the full
list. A group's button only appears if that list has at least one entry.

### `activities.yaml` — professional activities

Six lists, each with its own small schema:

```yaml
talk_list:            # Invited Talks
  - date: 2025/12/12
    where: 電子情報通信学会 ...   # organisation (HTML allowed)
    url: https://...
    place: 名城大学
    topic: XRにおける知覚 ...

funding_list:         # Funding
  - from: 2024
    to: 2027
    url: https://...
    funding: JSPS KAKENHI ...
    topic: Project title / description

award_list:           # Awards
  - url: https://...
    awarding: Best Paper Award
    title: For "…"

chair_list:           # Academic Services (organising roles)
  - year: 2025
    url: https://...
    position: Program Committee Chair
    conference: ACM …

ipc_list:             # Program Committee member
  - url: https://...
    conference: ACM CHI
    year: 2025

reviewer_list:        # Peer Review activities
  - conference: IEEE TVCG
    year: 2024
```

### `employment.yaml` — employment & education

Two lists shown side by side:

```yaml
employment_list:
  - position: Associate Professor          # required
    place: Graduate School ..., Saitama University
    url: http://www.ics.saitama-u.ac.jp/
    from: Apr 2023
    to: Present
    desc: Fabrication, Interaction and Perception Laboratory as PI
    logo: assets/img/logo_saitama_university.jpg

education_list:
  - position: Ph.D in Engineering
    place: Graduate School of Engineering Science, The University of Osaka
    url: https://www.es.osaka-u.ac.jp/en/
    from: Oct 2013
    to: Sep 2016
    advisors: Prof. Daisuke Iwai and Prof. Kosuke Sato   # optional
    thesis: Spatial Augmented Reality for Deformable Objects  # optional
    pdf: assets/...                                       # link target for the thesis title
    logo: assets/img/logo_osaka_university.jpg
```

### Writing HTML & special characters in YAML

- **HTML is allowed** in text fields (`authors`, `team`, `title`, bio
  paragraphs, `desc`, etc.). It is rendered as-is, so you can use `<u>`, `<b>`,
  `<i>`, `<a href="…">`, and the custom `<hightlight>` tag (renders bold).
- **Colons need escaping.** A raw `:` followed by a space confuses the YAML
  parser. The data files use the HTML entity `&#58;` in titles instead
  (e.g. `TastePrint&#58; A 3D food printing system`). Alternatively, wrap the
  whole value in double quotes: `title: "TastePrint: A 3D food printing system"`.
- **Never use tabs** for indentation — YAML requires spaces.

### Adding images

1. Drop the file into [`static/assets/`](static/assets/) (use `img/` for photos
   and logos, `research/` for project thumbnails).
2. Reference it from YAML **without** a leading slash, e.g.
   `gif: assets/research/my_project.png`.

Anything under `static/` is copied to the site root at build time, so
`static/assets/research/my_project.png` is served at
`/assets/research/my_project.png`. The [`asset()`](src/lib/asset.js) helper
prefixes local paths automatically; external `http(s)://` URLs are left
untouched.

---

## Changing the layout, styles, or icons

- **Order / presence of sections** — [`src/routes/+page.svelte`](src/routes/+page.svelte).
- **Navigation links** — [`src/lib/components/Nav.svelte`](src/lib/components/Nav.svelte).
- **Colours, spacing, typography** — CSS variables at the top of
  [`src/app.css`](src/app.css) (`--text`, `--link`, `--accent`, `--maxw`, …).
- **Fonts / icon libraries / favicon** — the `<head>` of
  [`src/app.html`](src/app.html).
- **A section's markup** — its component in
  [`src/lib/components/`](src/lib/components/).

Icons use Font Awesome / Hugeicons class names directly in markup
(e.g. `<i class="fab fa-github"></i>`); browse names at
[fontawesome.com/icons](https://fontawesome.com/icons).

---

## Deployment

Deployment is automated by
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. Push to the **`dev`** branch (or run the workflow manually from the Actions
   tab).
2. The workflow runs `npm ci` → `npm run build`.
3. The built `./build` folder is published to the **`build`** branch by
   `peaceiris/actions-gh-pages`, which also writes the `CNAME` and `.nojekyll`.
4. GitHub Pages serves the `build` branch at `punpongsanon.info`.

**One-time setup requirements:**

- GitHub → *Settings → Pages* → Source = **Deploy from a branch**, branch =
  `build`, folder = `/ (root)`.
- GitHub → *Settings → Actions → General → Workflow permissions* = **Read and
  write permissions** (otherwise the deploy step cannot push to `build`).

To deploy manually to any static host, run `npm run build` and upload the
`build/` directory.

---

## Troubleshooting

| Symptom | Fix |
| ------- | --- |
| `npm run dev` fails right after cloning | Run `npm install`; ensure Node ≥ 20. |
| A YAML edit breaks the build | Check indentation (spaces, not tabs) and quote/escape any value containing a colon. The build error names the file and line. |
| An image doesn't show | Confirm the file is under `static/assets/…` and the YAML path has no leading slash and matches the filename exactly (case-sensitive on the server). |
| The deploy Action fails to push | Enable "Read and write permissions" for Actions (see above). |
| Custom domain stops working | The `build` branch must contain a `CNAME` file — it is generated from `static/CNAME`, so keep that file intact. |
