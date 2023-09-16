# A rule to enforce engagement between modules (`modules-enagement`)

This ESLint rule promotes clean and maintainable code by enforcing two key principles, also called **Rules of Engagement**:

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

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
