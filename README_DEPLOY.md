# PhysioQ NBME Practice App - Online Deployment

This app is a static web application. It can be hosted online with GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any static file server.

## Files to publish

- `index.html`
- `styles.css`
- `app.js`
- `question-bank.json` if present
- `.nojekyll`
- `netlify.toml`
- `vercel.json`

The app can run without a backend. The question bank is generated client-side and stored in the browser. If `question-bank.json` is present, the app will load that static bank first and use the generator as a fallback.

## GitHub Pages

1. Create a public or private GitHub repository.
2. Upload the files listed above to the repository root.
3. Open repository `Settings`.
4. Go to `Pages`.
5. Select deployment from the default branch and root folder.
6. Open the generated GitHub Pages URL.

## Netlify

1. Create a new site from the repository or upload the project folder.
2. Leave build command empty.
3. Set publish directory to `.`.
4. Deploy.

## Vercel

1. Import the repository.
2. Use the static/default project settings.
3. Leave build command empty.
4. Set output directory to `.` if prompted.
5. Deploy.

## Cache Refresh

The app references `app.js?v=19`. If users still see an older version after deployment, hard refresh the browser or update the version query in `index.html`.
