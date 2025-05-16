declare module '*.scss';

declare module '@cre8_dev/cre8-icons/*';
declare module '*.svg' {
    const content: string;
    export default content;
}
declare module '*.svg?raw' {
    const content: string;
    export default content;
}
