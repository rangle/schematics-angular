# Angular Schematics for Productivity and Consistency

## Installation

To add these schematics to your angular-cli project, type the
following in the console at the root of your project:

```bash
npm install @egervari/schematics-angular --save
```

## Building and testing

To build the source code, run:

```bash
npm run build
```

After the schematics are built, to run them locally from the project
root, run:

```bash
cd dist
schematics .:feature --name=app --path=src/app
```

## Linting and Prettier

To clean up the source code, run:

```bash
npm run fix
```

## Publishing

To publish this to npm, run the following commands:

```bash
npm version major/minor/patch
npm run build
npm run publish
```

### Quickly create a patch version

To quickly create a patch version, instead of going through all of the
build and publish commands manually, instead run:

```bash
npm run release-patch
```
