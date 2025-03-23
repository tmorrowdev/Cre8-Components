import sanitizeHtml from 'sanitize-html';

// Need to sanitize some fields we show in Storybook via `unsafeHTML` with user provided data
export const sanitizeInput = (value: string, ...extraAllowedTags: string[]) => sanitizeHtml(value, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, ...extraAllowedTags],
    allowedAttributes: false,
});

/**
 * Adding this default export to satisfy the `import/prefer-default-export` eslint rule.
 *
 * Remove this once more functions are added to this file, OR
 * rename this from `story-helpers.ts` if the only planned function is for sanitizeInput
 */
export default sanitizeInput;
