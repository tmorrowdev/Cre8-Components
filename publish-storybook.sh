#!/bin/bash
set -e

if [ -e ./docs ]; then
  read -p "The ./docs directory already exist, remove it? y/n " REMOVEIT
  if [ "$REMOVEIT" != "y" ]; then
    echo "Not removing, aboring script."
    exit 1
  fi
  rm -rf ./docs
fi

branchname=storybook-build-`date +%Y-%m-%d`

if [ "$(git branch --list $branchname)" ]; then
  REMOVEIT=''
  read -p "The branch $branchname already exists, remove it? y/n " REMOVEIT
  if [ "$REMOVEIT" != "y" ]; then
    echo "Not removing, aboring script."
    exit 1
  fi

  echo Removing $branchname...
  git branch -D $branchname
fi
echo Creating new branch $branchname
git checkout -b "$branchname" 

# This regenerates `packages/cre8-wc/.storybook/custom-elements.json` which Storybook uses to automatically show all attributes, pull in jsdoc, etc.
echo Regenerate custom-elements.json
yarn build:custom-elements.json

echo Building cre8-wc and its storybook...
yarn cre8-wc:build
# This writes the `packages/cre8-wc/dist/` folder
yarn cre8-wc:sb:build

echo Building cre8-react and its storybook...
yarn cre8-react:build
yarn cre8-react:sb:build


echo Shuffling things around
mkdir ./docs || true
cp storybook-index.html ./docs/index.html
mv packages/cre8-wc/dist/ ./docs/cre8-wc
mv packages/cre8-react/dist/ ./docs/cre8-react


echo commiting and pushing
# Commit and push up that branch
git add -f docs
git commit -m 'storybook update'


echo ""
echo ""
echo "Please run: git push origin $branchname"
echo "Then go into Settings->Pages and point to $branchname"
