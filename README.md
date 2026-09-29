# Murhej Hantoush Portfolio

A scroll-based portfolio presenting Murhej Hantoush's AI/ML and software engineering projects as connected systems.

## Development

```sh
npm install
npm run dev
```

## Contact form

The form sends through FormSubmit's AJAX endpoint to `murhej.hantoush.work@gmail.com`. On its first submission, FormSubmit may send an activation email to that inbox; confirm it to enable delivery. If sending fails, the form reports that the message was not sent and copies the content as a fallback.

## Production build

```sh
npm run build
npm run preview
```

## Deployment

GitHub Actions builds and deploys `main` to GitHub Pages. The expected site URL is `https://murhej.github.io/portfolioMEMO/`. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions** if it is not already selected.

The site uses React, TypeScript, Vite, Motion for React, and Lucide icons. The hero portrait is stored in `public/images/murhej-portrait.jpg`.