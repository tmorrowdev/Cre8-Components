import type { RootObject as RootObjecttcg } from './brands/tcg/tokens-brand';
import type { RootObject as RootObjectpbm } from './brands/pbm/tokens-brand';
import type { RootObject as RootObjectpharmacy } from './brands/pharmacy/tokens-brand';
import type { RootObject as RootObjectlegacy } from './brands/legacy/tokens-brand';
import type { RootObject as RootObjectchc } from './brands/chc/tokens-brand';
import type { RootObject as RootObjectcre8Legacy } from './brands/cre8-legacy/tokens-brand';
import type { RootObject as RootObjectcre8 } from './brands/cre8/tokens-brand';

export interface DesignTokens {
  'tcg': RootObjecttcg
  'pbm': RootObjectpbm
  'pharmacy': RootObjectpharmacy
  'legacy': RootObjectlegacy
  'chc': RootObjectchc
  'cre8-legacy': RootObjectcre8Legacy
  'cre8': RootObjectcre8
}
  
declare const root: DesignTokens;
export default root;