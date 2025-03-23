import { html } from 'lit';
import '../../../components/button/button';
import '../../../components/grid-item/grid-item';
import '../../../components/grid/grid';
import '../../../components/heading/heading';
import '../../../components/icon/icon';
import '../../../components/text-link/text-link';
import '../../../components/text-passage/text-passage';
import { spread } from '../../../directives/spread';
import '../icon-description/icon-description';

import './medication-card';

export default {
  title: 'Examples/Medication Card',
  component: 'medication-card',
  parameters: { status: { type: 'inProgress' } }
};

export const Default = (args) => html`<medication-card ${spread(args)}>
  <cre8-heading slot="heading" headingTagName="h2" variant="title-default">atorvastatin</cre8-heading>
  <div slot="headingAfter">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="25" viewBox="0 0 16 25" fill="none">
      <path
        d="M13.5694 5.87747C13.2776 5.87747 13.041 6.12621 13.041 6.433V22.5427C13.041 23.4732 12.8297 23.6871 11.9077 23.6871H4.59773C3.67837 23.6871 3.46703 23.4732 3.46703 22.5427V21.1928H9.85496C10.1468 21.1928 10.3833 20.9441 10.3833 20.6373V8.99389C10.3833 8.6871 10.1468 8.43839 9.85496 8.43839H3.46438V6.43578C3.46438 6.12898 3.22783 5.88027 2.93602 5.88027C2.64421 5.88027 2.40765 6.12898 2.40765 6.43578V22.5455C2.40765 24.087 3.1051 24.8036 4.60037 24.8036H11.9103C13.4082 24.8036 14.103 24.087 14.103 22.5455V6.43578C14.1037 6.287 14.0476 6.14414 13.9473 6.0392C13.847 5.93426 13.7109 5.87601 13.5694 5.87747Z"
        fill="#009BDF"
      />
      <path
        d="M15.4716 0H1.06053C0.768722 0 0.532166 0.248709 0.532166 0.555508V4.3274C0.532166 4.6342 0.768722 4.88291 1.06053 4.88291H15.4716C15.7634 4.88291 16 4.6342 16 4.3274V0.555508C16 0.248709 15.7634 0 15.4716 0ZM14.9433 3.7719H1.59153V1.11657H14.9433V3.7719Z"
        fill="#009BDF"
      />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="25" viewBox="0 0 16 25" fill="none">
      <path
        d="M13.5694 5.87747C13.2776 5.87747 13.041 6.12621 13.041 6.433V22.5427C13.041 23.4732 12.8297 23.6871 11.9077 23.6871H4.59773C3.67837 23.6871 3.46703 23.4732 3.46703 22.5427V21.1928H9.85496C10.1468 21.1928 10.3833 20.9441 10.3833 20.6373V8.99389C10.3833 8.6871 10.1468 8.43839 9.85496 8.43839H3.46438V6.43578C3.46438 6.12898 3.22783 5.88027 2.93602 5.88027C2.64421 5.88027 2.40765 6.12898 2.40765 6.43578V22.5455C2.40765 24.087 3.1051 24.8036 4.60037 24.8036H11.9103C13.4082 24.8036 14.103 24.087 14.103 22.5455V6.43578C14.1037 6.287 14.0476 6.14414 13.9473 6.0392C13.847 5.93426 13.7109 5.87601 13.5694 5.87747Z"
        fill="#009BDF"
      />
      <path
        d="M15.4716 0H1.06053C0.768722 0 0.532166 0.248709 0.532166 0.555508V4.3274C0.532166 4.6342 0.768722 4.88291 1.06053 4.88291H15.4716C15.7634 4.88291 16 4.6342 16 4.3274V0.555508C16 0.248709 15.7634 0 15.4716 0ZM14.9433 3.7719H1.59153V1.11657H14.9433V3.7719Z"
        fill="#009BDF"
      />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="25" viewBox="0 0 16 25" fill="none">
      <path
        d="M13.5694 5.87747C13.2776 5.87747 13.041 6.12621 13.041 6.433V22.5427C13.041 23.4732 12.8297 23.6871 11.9077 23.6871H4.59773C3.67837 23.6871 3.46703 23.4732 3.46703 22.5427V21.1928H9.85496C10.1468 21.1928 10.3833 20.9441 10.3833 20.6373V8.99389C10.3833 8.6871 10.1468 8.43839 9.85496 8.43839H3.46438V6.43578C3.46438 6.12898 3.22783 5.88027 2.93602 5.88027C2.64421 5.88027 2.40765 6.12898 2.40765 6.43578V22.5455C2.40765 24.087 3.1051 24.8036 4.60037 24.8036H11.9103C13.4082 24.8036 14.103 24.087 14.103 22.5455V6.43578C14.1037 6.287 14.0476 6.14414 13.9473 6.0392C13.847 5.93426 13.7109 5.87601 13.5694 5.87747Z"
        fill="#009BDF"
      />
      <path
        d="M15.4716 0H1.06053C0.768722 0 0.532166 0.248709 0.532166 0.555508V4.3274C0.532166 4.6342 0.768722 4.88291 1.06053 4.88291H15.4716C15.7634 4.88291 16 4.6342 16 4.3274V0.555508C16 0.248709 15.7634 0 15.4716 0ZM14.9433 3.7719H1.59153V1.11657H14.9433V3.7719Z"
        fill="#009BDF"
      />
    </svg>
    3 refills left
  </div>
  <cre8-grid variant="1-3up">
    <cre8-grid-item>
      <cre8-text-passage> 40 mg </cre8-text-passage>
      <cre8-text-passage> Dr Hayden Park <a href="#">Update doctor</a> </cre8-text-passage>
      <cre8-text-passage> Rx# 8974065213 <a href="#">Prescription details</a> </cre8-text-passage>
    </cre8-grid-item>
    <cre8-grid-item>
      <icon-description verticalAlign="center" size="sm"><cre8-icon-legacy name="people" slot="header"></cre8-icon-legacy>Chris</icon-description>
      <icon-description verticalAlign="center" size="sm">
        <cre8-icon-legacy name="express-scripts" style="--cre8-icon-height: 2rem; --cre8-icon-width: 2rem;" slot="header"></cre8-icon-legacy> Express Scripts
        Pharmacy
      </icon-description>
    </cre8-grid-item>
    <cre8-grid-item style="text-align: right">
      <icon-description weight="light" class="cre8-u-display-block cre8-u-margin-bottom-sm" align="end" verticalAlign="center" size="sm">
        <cre8-icon-legacy name="order-status" slot="header"></cre8-icon-legacy>Enrolled in auto refill
      </icon-description>
      <cre8-button
        class="cre8-u-display-block cre8-u-margin-bottom-sm"
        text="Manage Auto Refill"
        iconPosition="after"
        iconName="keyboard-arrow-down"
      ></cre8-button>
      <cre8-text-link>Archive Medication</cre8-text-link>
    </cre8-grid-item>
  </cre8-grid>
  <div slot="footer" style="display: flex; align-items: center;  gap: 1rem">
    <cre8-text-passage><strong>Next order:</strong> Processing Estimated delivery by: Aug 16,2022</cre8-text-passage>
    <cre8-button text="Order details" variant="link" size="sm" iconPosition="after" iconName="keyboard-arrow-down"></cre8-button>
  </div>
</medication-card>`;
