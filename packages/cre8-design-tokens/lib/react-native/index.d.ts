import type { RootObject as RootObjectmarketing } from './brands/marketing/tokens-brand';
import type { RootObject as RootObjectlegacy } from './brands/legacy/tokens-brand';
import type { RootObject as RootObjectfemmecubator } from './brands/femmecubator/tokens-brand';
import type { RootObject as RootObjectminimalist } from './brands/minimalist/tokens-brand';
import type { RootObject as RootObjectblue } from './brands/blue/tokens-brand';
import type { RootObject as RootObjectblueV1 } from './brands/blue-v1/tokens-brand';
import type { RootObject as RootObjectcre8 } from './brands/cre8/tokens-brand';

export interface DesignTokens {
  'marketing': RootObjectmarketing
  'legacy': RootObjectlegacy
  'femmecubator': RootObjectfemmecubator
  'minimalist': RootObjectminimalist
  'blue': RootObjectblue
  'blue-v1': RootObjectblueV1
  'cre8': RootObjectcre8
}
  
declare const root: DesignTokens;
export default root;