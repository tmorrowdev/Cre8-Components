import { ElementPart, noChange } from 'lit';
import {
    Directive, directive, PartInfo, PartType, DirectiveParameters,
} from 'lit-html/directive.js';

class Spread extends Directive {
    constructor(partInfo: PartInfo) {
        super(partInfo);
        if (partInfo.type !== PartType.ELEMENT) {
            throw new Error('The `spread` directive can only be used in the element context');
        }
    }

  // @ts-ignore known bug in our spread operator
    update(part: ElementPart, [props]: DirectiveParameters<this>) {
        Object.entries(props).forEach(([k, v]) => {
            if (typeof v === 'string' && v.length > 0) {
                part.element.setAttribute(k, v);
            }
            if (typeof v === 'boolean') {
        // @ts-ignore known bug in our spread operator
                part.element[k] = v;
            }
        });

        return noChange;
    }

    render() {
        return '';
    }
}

export const spread = directive(Spread);

export default spread;
