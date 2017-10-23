#!/bin/bash
curl  -H 'Cache-Control: no-cache' -sS https://codeload.github.com/yknx4/scaffolder/tar.gz/latest | tar -xzv
mv scaffolder-latest scaffolder
cd scaffolder
git init
yarn install
rm web-installer.sh
cp .env.example .env
echo "All done, don't forget to update README.md, and your information in package.json, also check LICENCE.md"
