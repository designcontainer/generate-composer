## Installation

```bash
npm i -g @designcontainer/generate-composer
```

## CLI

cd into a the root directory of a WordPress repository and run:

```bash
generate-composer
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
