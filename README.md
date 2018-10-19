# Angular Schematics for Productivity and Consistency

Developing large-scale web-applications is *hard*, and without a lot of
experience building large Angular applications, it's very easy to make
an architectural or structural mistake that could cost your team a lot
of money and time to fix down the road once that mistake is realized.

The schematics in this library will help your team develop Angular
applications that are consistent and have an architecture/folder
structure that will scale for extremely large projects right from the
get-go.

The output of these schematics is based on many years of experience
building large-scale projects in Angular, and have been used in
applications that contain several hundred-thousand lines of code. Thus,
the opinions and ideas behind these schematics have been battle-tested
and proved to prevent and solve scalability problems many people run
into when building large-scale Angular projects.

## Installation

To add these schematics to your angular-cli project, type the
following in the console at the root of your project:

```bash
npm install @egervari/schematics-angular --save-dev
```

### Using Schematics Via Console

To run a schematic (such as creating a new *feature*) through the
console, specifying the feature's name, path and selector prefix, type
the following:

```bash
schematics @egervari/schematics-angular:feature --name=my-module --path=src/app --prefix=rng
```

You should see the following files be created:

```
CREATE /src/app/modules/my-module/components/index.ts (50 bytes)
CREATE /src/app/modules/my-module/components/my-module/my-module.component.html (0 bytes)
CREATE /src/app/modules/my-module/components/my-module/my-module.component.scss (12 bytes)
CREATE /src/app/modules/my-module/components/my-module/my-module.component.ts (222 bytes)
CREATE /src/app/modules/my-module/services/my-module.service.ts (203 bytes)
CREATE /src/app/modules/my-module/store/my-module.actions.ts (236 bytes)
CREATE /src/app/modules/my-module/store/my-module.effects.ts (472 bytes)
CREATE /src/app/modules/my-module/store/my-module.reducer.ts (456 bytes)
CREATE /src/app/modules/my-module/store/my-module.store.ts (310 bytes)
CREATE /src/app/modules/my-module/types/my-module-state/my-module-state.functions.ts (159 bytes)
CREATE /src/app/modules/my-module/types/my-module-state/my-module-state.interface.ts (58 bytes)
CREATE /src/app/modules/my-module/my-module-routing.module.ts (370 bytes)
CREATE /src/app/modules/my-module/my-module.module.ts (726 bytes)
```

### Using Schematics Through WebStorm

To use schematics in WebStorm, right-click on a folder, select
**'New'**, then select **'Angular Schematic'**, and then select any
schematic from the following list:

![alt text](docs/webstorm-1.png "Angular Schematics Selection")

For the parameters input, WebStorm will pass many of the options - such
as project name and path - on your behalf, so all you have to do is set
the `name` parameter for most schematics and you're all set:

![alt text](docs/webstorm-2.png "Add name parameter")

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
