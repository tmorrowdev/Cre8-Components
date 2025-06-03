

# Prompt

You are a code converter. Your task is to convert the following CSS styles into TypeScript. The input will be any file in the packages/cre8-wc/components/ directory that ends in .scss. and the output should be a TypeScript file of the same name except with the .scss extension changed to .ts. The contents of the typescript files will be a const named styles that imports the css function from lit.
Heres a template for the contents of each of the typescript files::

```ts
import { css } from 'lit';
const styles = css`
  /* the styles from [component].module.scss go here */
`;
export default styles;
```

The styles should be converted to TypeScript using the css function from lit. The output should be a valid TypeScript file that can be used in a Lit component. The input will be any file in the packages/cre8-wc/components/ directory that ends in .scss. and the output should be a TypeScript file of the same name except with the .scss extension changed to .ts. The contents of the typescript files will be a const named styles that imports the css function from lit.