# SCAFFOLDER

This project kickstarts a project and sets:
  - jest
  - dotenv
  - babel
  - bunyan
  - standard
  - prettier
  - vscode conf
  - editorconfig
  - nodemon
  - precommit hooks

## USAGE

just `cd` to your repository (created based on this one) and:

- `yarn build` - to create a optimized babel-free version
- `yarn dev` - to start your production optimized version
- `yarn dev` - to start working
- `yarn test` - to run tests
- `yarn test src/path/to/your/file.test.js` to sun specific test
- `git commit` - run this without message after adding files to stage to run ESLint on staged files

## REQUIREMENTS

- Node (Any version above 6 should work, tested on version 8+)
- Yarn (Again, any version, tested with 1+)
- Git

## INSTALATION

There are many ways to start with this project:

### Using startup shell script
Just type this in your terminal:

```
wget --no-cache -O - https://raw.githubusercontent.com/yknx4/scaffolder/master/web-installer.sh | sh
```

You'll end up with an scaffolder directory with all installed and ready to code

### Git clone
```
git clone git@github.com:yknx4/scaffolder.git
cd scaffolder
rm -rf .git
git init
yarn install
```

### Download from latest
I'll try to keep tag `latest` always up to date. You can just [download this zip](https://github.com/yknx4/scaffolder/archive/latest.zip). Then just unzip and `git init` and `yarn install`
