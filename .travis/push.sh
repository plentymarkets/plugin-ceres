#!/bin/sh

git config --global user.email $GITHUB_MAIL
git config --global user.name $GITHUB_USERNAME

git add .
git diff-index --quiet HEAD || git commit -m "Automatic build" && git push origin HEAD:$TRAVIS_BRANCH