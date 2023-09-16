# eslint-plugin-modular-architecture

An eslint plugin to enforce modular architecture and encapsulation

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-modular-architecture`:

```sh
npm install eslint-plugin-modular-architecture --save-dev
```

## Usage

Add `modular-architecture` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["modular-architecture"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "modular-architecture/import-export-only": 2,
    "modular-architecture/modules-engagement": 2
  }
}
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                                   | Description                               |
| :----------------------------------------------------- | :---------------------------------------- |
| [import-export-only](docs/rules/import-export-only.md) | Enforce import/export only on index files |
| [modules-engagement](docs/rules/modules-engagement.md) | Enforce the rules of engagement           |

<!-- end auto-generated rules list -->
