# Generate Composer

Node module for generating and updating composer files for DC WordPress sites.

![npm](https://img.shields.io/npm/v/@designcontainer/generate-composer)

## Installation

```bash
npm i -g @designcontainer/generate-composer
```

## CLI

cd into a the root directory of a WordPress repository and run:

```bash
generate-composer
```

The first time running the CLI, you will be prompted to enter you GitHub API token. This will be saved in your os' keychain.

To set a new token run:

```bash
generate-composer --github-token
```

## API

cd into a the root directory of a WordPress repository and run:

```javascript
const GenerateComposerFile = require('@designcontainer/generate-composer');
const composer = new GenerateComposerFile(dir, name, githubToken);
```

**Generate a new Composer file**

```javascript
composer.generate();
```

**Update a new Composer file**

```javascript
composer.update();
```

**Write file**

```javascript
composer.generate();
composer.write();
```
