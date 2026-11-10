# Alex Williams — Portfolio site

Plain HTML, CSS and JavaScript. No framework, no build step, nothing to install.
Double-click `index.html` to open it.

## What's where

```
index.html            Home: Overview, Work, Services, Latest, Contact
writing.html          Every published piece: selected, outlet tiles, full archive
notes.html            Blog index + full activity log
notes/_TEMPLATE.html  Copy this to write a post
css/style.css         All styling (colors and fonts at the top, in :root)
js/data.js            ALL the content that changes: projects, services, feed, posts
js/clips.js           Your 316 published pieces (edit to add more)
js/render.js          Builds the generated parts from data.js (don't edit)
js/writing.js         Builds the Writing page from clips.js (don't edit)
work/                 Put your PDFs here (reports, decks)
img/                  Put screenshots here
```

## Editing

You only edit two kinds of things:

- **Things that change often → `js/data.js`.** Projects, services, the Latest
  feed, blog posts, your email. Every list has a copy-paste template in the
  comments right above it.
- **Things that rarely change → `index.html`.** The Overview text, the fact
  sheet, "How I work", and the Contact text. Look for `EDIT` comments.

### Publish a project that's still a draft
Some projects in `js/data.js` have `draft: true`. They stay hidden until
they're ready. Each one has a comment above it listing what to fix and the
exact file name to export to.
1. Fix the piece, export it as a PDF with that file name into `work/`.
2. In `js/data.js`, delete that project's `draft: true` line.
3. Upload the changed files. The card appears with a button to the PDF.

Tip: before exporting, set the document title in Keynote/PowerPoint
(File → Properties / Document info). It's what Google shows as the title
when a PDF turns up in search.

### The Writing page (writing.html)
Everything on it comes from **`js/clips.js`**: one line per published piece.
- **Add a piece:** copy any line in `items`, change the date, outlet, title and
  link. The page sorts by date for you; new formats show up in the filter.
- **Selected writing:** add `featured: true` to a line (keep it to about six).
- **Hide a piece** without deleting it: add `hide: true`.
- **Outlet logos:** drop a logo into `img/logos/` and set `logo` for that outlet
  near the top of `clips.js` (e.g. `logo: "img/logos/techradar.png"`). Until
  then the tile shows the outlet's name.
- Links to `web.archive.org` are labeled ARCHIVED automatically; everything
  else shows as LIVE.

### Add a screenshot to a project
Drop it in `img/` and set `image: "img/your-file.jpg"`. Wide images (16:9)
look best.

### Publish a blog post
1. Copy `notes/_TEMPLATE.html` to `notes/your-post-slug.html` and write it.
2. Add an entry to `notes` in `js/data.js` pointing at that file.
It shows on the Notes page and in the homepage Latest feed automatically.

### Is the Latest feed really automatic?
Yes. On page load, `render.js` merges `latest` and `notes`, sorts them by date,
and shows the newest few on the homepage (set by `HOMEPAGE_LATEST_COUNT`).
Anything from the last 30 days gets a red NEW tag (set by `NEW_DAYS`).

## Before going live — checklist
- [ ] Set your email in `js/data.js` → `site.email`
- [ ] Search `js/data.js` for `CHECK` and fix each one
- [ ] Drafts can wait: the site is fine to go live with only the finished projects showing
- [ ] No email yet? Leave `site.email` empty ("") and the Email button simply won't show

## Putting it online

This site is set up for **https://ajdw.github.io** (canonical URLs already point
there). Upload it through GitHub's website:
1. Go to github.com/ajdw/ajdw.github.io (create it if needed: New repository,
   name it exactly `ajdw.github.io`, Public).
2. Click **Add file → Upload files**. Open the unzipped `portfolio` folder,
   select everything INSIDE it and drag
   it onto the page, so `index.html` sits at the top level, not inside a folder.
3. Click **Commit changes**.
4. Settings → Pages → Build and deployment: Source **Deploy from a branch**,
   Branch **main**, folder **/ (root)**, Save. Live in a minute or two.
To update later: upload the changed files the same way; they replace the old ones.

### Other options

**Fastest: Netlify.** Sign up for a free account at netlify.com FIRST, then
drag the whole `portfolio` folder onto Netlify Drop (app.netlify.com/drop).
You get a live URL in seconds. (Without an account the site is deleted
within an hour unless you claim it.) Rename the site in its settings to get
a cleaner address, e.g. alexwilliams.netlify.app if it's free.
To update later: drag the folder onto that site's Deploys page again.

**Best long-term: GitHub Pages.**
1. Create a repository named `yourusername.github.io`.
2. Upload the contents of this folder (so `index.html` is at the top level).
3. Settings → Pages → Source: `main` branch, `/ (root)`.
4. Live at `https://yourusername.github.io` in about a minute.

To update the live site later, upload the changed files again. That's it.
