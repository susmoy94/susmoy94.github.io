# Susmoy Das website

Production-ready static academic website.

## Local preview

```bash
cd susmoy-website
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Main files

- `index.html`: home page and latest news.
- `research.html`: research overview and animated research cards.
- `projects.html`: animated project cards.
- `publications.html`: year-wise publication list and profile cards.
- `software.html`: Zenodo and GitHub repositories.
- `teaching.html`: supervision and teaching areas.
- `cv.html`: public CV snapshot and selected talks.
- `fun.html`: interactive toys.
- `contact.html`: protected email reveal and profile links.
- `data/posts.json`: home-page news cards.
- `assets/css/style.css`: visual design and animations.
- `assets/js/site.js`: interactivity and email reveal.

## Update latest news

Edit `data/posts.json`.

## Update publications

Edit `publications.html`. Publications are grouped by year. Add `featured-paper` to highlight an article.

## Update profile cards

The DBLP, Google Scholar, and ORCID cards are in `publications.html` under `profile-logo-grid`.

## Update talks

Edit the `cv-talks` section in `cv.html`.

## Update software repositories

Edit `software.html`. Zenodo cards use `zenodo-card`.

## Update email

The email is assembled in `assets/js/site.js` from character codes rather than printed directly in HTML.

## Deployment

Upload the contents of `susmoy-website/` to GitHub Pages, Netlify, Vercel, or any static web host.






## Update co-authors and collaborators rail

The side rail is labelled `Co-authors and collaborators`. It is ordered by co-authored publication frequency first, with ties ordered by public seniority/title when needed. Entries display only name and affiliation line, with a small icon instead of numbers.

To update it, edit the `collab-rail` block in the HTML pages or regenerate it from the site build script.


## Publication page side rail and real logos

The co-authors and collaborators rail appears only on `publications.html`. Profile cards on the Publications page use real external logo images for DBLP, Google Scholar, and ORCID rather than CSS-drawn or text-only logo approximations.


## External logos

The site uses real external logo assets for DBLP, Google Scholar, GitHub, LinkedIn, ORCID, and Zenodo. These appear in the footer/profile link chips and on the Publications page profile cards. Zenodo cards on the Software page also display the Zenodo logo.
