declare module '*.scss';

declare module '@cre8/cre8-icons/*';
declare module '*.svg' {
    const content: string;
    export default content;
}
declare module '*.svg?raw' {
    const content: string;
    export default content;
}
