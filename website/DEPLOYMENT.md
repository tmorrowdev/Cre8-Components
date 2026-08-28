# Deploying `/website`

`/website` is a fully static site (no install, no build). Everything it needs is
in this directory: `index.html`, `assets/`, and the vendored runtime in
`vendor/` (Cre8 web-components bundle, theme CSS, fonts). `website/vercel.json`
carries the framework/output settings and security headers for a project rooted
at this directory.

## Recommended: dedicated Vercel project

1. In the Vercel dashboard, create a project (e.g. `cre8-website`) linked to
   `tmorrowdev/Cre8-Components`.
2. Set **Root Directory** to `website`.
3. Leave install/build commands alone — `website/vercel.json` already sets
   no-op install/build and `outputDirectory: "."`.

Every push to `main` then redeploys the site automatically.

## Fallback: bootstrap deployment (no git-linked project available)

`deploy/vercel.bootstrap.json` is a self-contained `vercel.json` for deploying
this site into any Vercel project without uploading the ~2.5 MB of site files:
its install step clones this public repo at `main` and its build step copies
`website/` into the output directory. Deploy it with the Vercel CLI from an
empty directory containing only that file (renamed to `vercel.json`):

```sh
mkdir -p /tmp/website-deploy && cp deploy/vercel.bootstrap.json /tmp/website-deploy/vercel.json
cd /tmp/website-deploy && vercel deploy
```

Note: because the bootstrap clones `main`, the deployed content always tracks
`main`, regardless of which branch the deploy is made from.

## Current deployment

A preview deployment built this way lives in the `cre8-components-cre8-wc-u2p6`
Vercel project (team `tmorrowdevs-projects`):

- https://cre8-components-cre8-wc-u2p6-49ra5rgs9-tmorrowdevs-projects.vercel.app

Preview URLs in that project are behind Vercel Authentication (Standard
Protection), so they require a Vercel login or a share link. To make the site
public, either disable deployment protection for that project or move to the
dedicated-project setup above.
