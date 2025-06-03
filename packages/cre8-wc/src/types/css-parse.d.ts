import { css } from "lit";
declare module "*.css"{
    const css = css`${contents}`;
    export default css;
};

declare module "components/**/*.scss"{
    const scss = css`${contents}`;
    export default scss;
};
