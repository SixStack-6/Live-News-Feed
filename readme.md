# NewsPulse — Live News Feed

A live news feed app with category filters, search, bookmarks, and
light/dark theme — built with vanilla JavaScript using ES modules
(no framework, no build step).

## Setup

1. Get a free API key at [newsapi.org](https://newsapi.org).
2. Copy `js/config.example.js` to `js/config.local.js`.
3. Open `js/config.local.js` and paste your key into `LOCAL_API_KEY`.
4. Open `index.html` in a browser (or serve the folder with any static
   server — ES modules require `http://`, not `file://`, in some browsers).

If you skip steps 1–3, the app still works — it automatically falls back
to local mock article data so the UI never looks broken.

## ⚠️ About the API key (read this before pushing to GitHub)

The original draft of this project had a real News API key hardcoded
directly in `js/utils/constants.js` — a file that would have been
committed and pushed to a public repo. That key has been removed from
the codebase.

**If you're the one who owned that key: rotate/regenerate it on
newsapi.org**, since it was sitting in an uploaded zip file and may
already be exposed.

The fix: the key now lives only in `js/config.local.js`, which is listed
in `.gitignore` and will never be committed. `constants.js` imports it
from there. One honest caveat: this is a client-side-only app with no
backend, so *any* key used here is technically visible to anyone who
opens their browser's Network tab while the site runs — gitignoring it
only stops it from leaking through your GitHub history, not through the
live site itself. For a real production app, API calls like this should
go through a backend that holds the key server-side.

## File breakdown (for the team)

The project was already organized into clean folders by responsibility
(`api/`, `components/`, `state/`, `storage/`, `utils/`) using ES modules,
so this split is about ownership groupings rather than rewriting files.

| Owner    | Files                                                                                       | Covers                                      |
|----------|-----------------------------------------------------------------------------------------------|----------------------------------------------|
| Person A | `index.html`, `css/variables.css`, `css/base.css`, `css/layout.css`                          | Page structure, design tokens, base styles, page layout |
| Person B | `css/components.css`, `css/animations.css`, `css/responsive.css`, `js/components/Header.js`, `js/components/Hero.js`, `js/components/Categories.js` | Component styling, responsiveness, header/hero/category UI |
| Person C | `js/components/NewsCard.js`, `js/components/BreakingNews.js`, `js/components/Loader.js`, `js/components/Error.js` | News card rendering, loading & error/empty states |
| Person D | `js/app.js`, `js/api/newsAPI.js`, `js/state/store.js`, `js/storage/localStorage.js`, `js/utils/constants.js`, `js/utils/dateFormatter.js`, `js/components/Bookmarks.js` | App orchestration, API calls, state management, persistence, bookmarks |

### Why load order isn't an issue here

Unlike a plain-script project, this app uses `<script type="module">`
with explicit `import`/`export` statements in every file. The browser
resolves the dependency graph automatically based on those imports —
so there's no script-tag ordering to get wrong, and no risk of a
`ReferenceError` from loading files in the wrong sequence.

## Notes

- Responsive from 320px phones up through desktop.
- Uses [Lucide icons](https://lucide.dev) loaded via CDN.
- Bookmarks and theme preference persist via `localStorage`.
