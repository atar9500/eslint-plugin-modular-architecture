# Rules of Engagement (`modules-enagement`)

This ESLint rule promotes clean and maintainable code, i.e, **Rules of Engagement**, by enforcing two key principles:

1. **Unidirectional Flow**: Modules should reference items either internally or at a lower level within the codebase, ensuring a unidirectional flow of dependencies for enhanced clarity and maintainability.

2. **Explicit Exports**: Each module must explicitly expose its functionality through exports defined in its top-level index file. This practice enhances code transparency and eliminates hidden dependencies.

   **_Exception_**: This rule allows flexibility for shared modules, where access is permitted at any level, acknowledging practical considerations in such cases.

By adhering to these guidelines, your codebase becomes more comprehensible and less prone to complex dependencies, facilitating efficient development and debugging.

## Rule Details

Examples of **incorrect** code for this rule:

```ts
/**
 * Violation of the `Unidirectional Flow` rule
 * Inside file: ./src/shared/components/Button.tsx
 */
import App from '~/app';

/**
 * Violation of the `Unidirectional Flow` rule
 * Inside file: ./src/shared/components/App.tsx
 */
import FooBar from '~/foobar';

/**
 * Violation of the `Explicit Exports` rule
 * Inside file: ./src/app/components/App.tsx
 */
import FooBar from '~/foobar/inner/path/FooBar.tsx';

/**
 * Violation of the `Explicit Exports` rule
 * Inside file: ./src/foobar/inner-path/FooBar.tsx
 */
import randomNumber from '../../shared/utils/randomNumber.ts';
```

Examples of **correct** code for this rule:

```js
/**
 * Aligns with Rules of Engagement
 * Inside file: ./src/app/components/App.tsx
 */
import FooBar from '~/foobar';

/**
 * Aligns with Rules of Engagement
 * Inside file: ./src/foobar/inner/path/FooBar.tsx
 */
import randomNumber from '~/shared/utils/randomNumber';
```

### Options

#### `modulesPath`

The `modulesPath` option defines the folder in which to enforce the **Rules of Engagement**, usually it'll be the source folder.

**Default:** `"/src"`

#### `glob`

The `glob` option provides an option to lint only certain paths within the path defined in the `modulesPath` option.

#### `moduleLayers`

The `moduleLayers` option describes the hierarchy between the project modules. By default, any module that is not mentioned in this option is considered to have `0` in value (i.e, between `shared`/`common` & `app`).

**Default:** `{
  app: Number.MAX_SAFE_INTEGER,
  shared: Number.MIN_SAFE_INTEGER,
  common: Number.MIN_SAFE_INTEGER,
}`

#### `moduleImportLevels`

The `moduleLayers` option provides an option to define the maximum import level from each module. By default, any module that is not mentioned in this option is considered to have `1` in value.

**Default:** `{common: 3, shared: 3, app: 1}`

#### `alias`

This option allows to define an alias for external imports (imports outside of the current module, i.e `shared` to `app`).

**Default:** `~`

## When Not To Use It

When you don't want to follow `Rules of Engagement`.

## Further Reading

🚧 Proper documentation in progress 🚧
