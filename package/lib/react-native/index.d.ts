import type { RootObject as RootObjecttcg } from './brands/tcg/tokens-brand';
import type { RootObject as RootObjectpbm } from './brands/pbm/tokens-brand';
import type { RootObject as RootObjectpharmacy } from './brands/pharmacy/tokens-brand';
import type { RootObject as RootObjecthealthkit } from './brands/healthkit/tokens-brand';
import type { RootObject as RootObjectchc } from './brands/chc/tokens-brand';
import type { RootObject as RootObjectcignaLegacy } from './brands/cigna-legacy/tokens-brand';
import type { RootObject as RootObjectevernorth } from './brands/evernorth/tokens-brand';

export interface DesignTokens {
  'tcg': RootObjecttcg
  'pbm': RootObjectpbm
  'pharmacy': RootObjectpharmacy
  'healthkit': RootObjecthealthkit
  'chc': RootObjectchc
  'cigna-legacy': RootObjectcignaLegacy
  'evernorth': RootObjectevernorth
}
  
declare const root: DesignTokens;
export default root;