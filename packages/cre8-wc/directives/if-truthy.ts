import { noChange } from 'lit';
import {
    Directive, directive, PartInfo, PartType, AttributePart, DirectiveParameters,
} from 'lit-html/directive.js';

class IfTruthyDirective extends Directive {
    constructor(partInfo: PartInfo) {
        super(partInfo);
        if (partInfo.type !== PartType.ATTRIBUTE) {
            throw new Error('The `ifTruthy` directive can only be used in attributes');
        }
    }

    // @eslint-ignore this is an override of Directive's update function
    update(part: AttributePart, [value]: DirectiveParameters<this>) {
        if (value) {
            return value;
        }

        part.element.removeAttribute(part.name);

        return noChange;
    }

    render([value]: string[]) {
        return value;
    }
}

export const ifTruthy = directive(IfTruthyDirective);

export default ifTruthy;
