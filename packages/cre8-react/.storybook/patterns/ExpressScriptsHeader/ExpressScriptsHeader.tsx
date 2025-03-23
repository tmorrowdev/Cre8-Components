import '!style-loader!css-loader!sass-loader!./ExpressScriptsHeader.scss';
import classnames from 'classnames';
import * as React from 'react';
import {
  cre8Button,
  cre8Grid,
  cre8GridItem,
  cre8Header,
  cre8Heading,
  cre8LinkList,
  cre8LinkListItem,
  cre8NavContainer,
  cre8PrimaryNav,
  cre8PrimaryNavItem,
  cre8UtilityNav,
  cre8UtilityNavItem
} from '../../../src';

export interface ExpressScriptsHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * CSS class names that can be appended to the component.
   */
  styleModifier?: string;
}

/**
 * Primary UI component for user interaction
 */
export const ExpressScriptsHeader = ({ styleModifier, ...other }: ExpressScriptsHeaderProps) => {
  const [isActiveVar, setIsActive] = React.useState(false);

  const toggleIsActive = () => {
    console.log('HELLO THERE');
    setIsActive(!isActiveVar);
  };

  const componentClassName = classnames('c-express-scripts-header', styleModifier, {
    'cre8-is-active': isActiveVar === true
  });

  return (
    <cre8Header className={componentClassName}>
      <svg className="c-express-scripts-header__logo" xmlns="http://www.w3.org/2000/svg" width="230" height="48" viewBox="0 0 230 48" fill="none">
        <ellipse cx="23.6844" cy="24.3528" rx="22.9775" ry="22.9412" fill="#14568D" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M56.5973 29.5173V16.354H63.9133L63.6284 18.1434H58.7883V21.7385H62.8472V23.5448H58.8265V27.6531H64.1035V29.5173H56.5973Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M74.663 29.5173L71.9389 24.3065L69.3096 29.5173H66.6237L70.6613 22.4606L67.1186 16.354H69.7861L71.9007 20.4262L73.9779 16.354H76.569L73.215 22.3088L77.2923 29.5173H74.663Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M86.1919 18.7702C85.7932 18.3523 85.2219 18.1243 84.3643 18.1243H82.6499V22.7457H84.3643C85.9834 22.7457 86.7264 21.9855 86.7264 20.4262C86.7264 19.7027 86.5546 19.1507 86.1919 18.7702ZM84.879 24.4964H82.6498V29.5173H80.4779V16.354H83.9825C85.907 16.354 86.6125 16.5446 87.3365 16.9829C88.4988 17.6669 89.1471 18.8465 89.1471 20.2921C89.1471 22.8806 87.2609 24.4964 84.879 24.4964Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M95.8367 18.1243H94.6362V22.2897H95.7604C96.9036 22.2897 97.5123 22.138 97.9125 21.7384C98.2759 21.3763 98.5042 20.825 98.5042 20.1396C98.5042 18.8083 97.7796 18.1243 95.8367 18.1243ZM98.886 29.5173L97.7414 27.4822C96.8279 25.8665 96.2192 24.9524 95.4931 24.2302C95.2457 23.9825 95.0555 23.8491 94.6362 23.83V29.5173H92.4841V16.354H96.5041C99.4573 16.354 100.791 18.0672 100.791 20.1206C100.791 22.0053 99.5718 23.7354 97.5123 23.7354C97.9902 23.9825 98.8676 25.2566 99.5527 26.3606L101.496 29.5173H98.886Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M104.871 29.5173V16.354H112.189L111.902 18.1434H107.064V21.7385H111.122V23.5448H107.101V27.6531H112.378V29.5173H104.871Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M119.699 29.7643C118.193 29.7643 116.668 29.3655 115.373 28.5862L116.211 26.9118C117.392 27.5958 118.44 27.9975 119.775 27.9975C121.394 27.9975 122.366 27.2161 122.366 25.9045C122.366 24.9333 121.755 24.3255 120.404 23.9443L118.993 23.5448C117.792 23.2031 116.935 22.7076 116.439 21.9664C116.079 21.4328 115.888 20.806 115.888 20.0443C115.888 17.7241 117.716 16.145 120.365 16.145C121.87 16.145 123.375 16.582 124.536 17.4008L123.546 18.941C122.328 18.2196 121.488 17.933 120.441 17.933C119.144 17.933 118.288 18.6375 118.288 19.7217C118.288 20.5398 118.745 20.9577 120.041 21.3382L121.603 21.7956C123.508 22.3469 124.842 23.5638 124.842 25.5431C124.842 27.7314 123.07 29.7643 119.699 29.7643Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M132.352 29.7643C130.846 29.7643 129.323 29.3655 128.026 28.5862L128.865 26.9118C130.045 27.5958 131.094 27.9975 132.429 27.9975C134.048 27.9975 135.02 27.2161 135.02 25.9045C135.02 24.9333 134.41 24.3255 133.056 23.9443L131.648 23.5448C130.446 23.2031 129.589 22.7076 129.095 21.9664C128.733 21.4328 128.541 20.806 128.541 20.0443C128.541 17.7241 130.37 16.145 133.019 16.145C134.524 16.145 136.03 16.582 137.192 17.4008L136.201 18.941C134.981 18.2196 134.144 17.933 133.094 17.933C131.801 17.933 130.942 18.6375 130.942 19.7217C130.942 20.5398 131.4 20.9577 132.695 21.3382L134.257 21.7956C136.164 22.3469 137.497 23.5638 137.497 25.5431C137.497 27.7314 135.724 29.7643 132.352 29.7643Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M151.524 29.7643C150.017 29.7643 148.495 29.3655 147.198 28.5862L148.039 26.9118C149.219 27.5958 150.265 27.9975 151.6 27.9975C153.221 27.9975 154.191 27.2161 154.191 25.9045C154.191 24.9333 153.582 24.3255 152.228 23.9443L150.819 23.5448C149.618 23.2031 148.762 22.7076 148.266 21.9664C147.905 21.4328 147.712 20.806 147.712 20.0443C147.712 17.7241 149.542 16.145 152.19 16.145C153.697 16.145 155.202 16.582 156.363 17.4008L155.374 18.941C154.153 18.2196 153.316 17.933 152.267 17.933C150.972 17.933 150.113 18.6375 150.113 19.7217C150.113 20.5398 150.572 20.9577 151.867 21.3382L153.43 21.7956C155.336 22.3469 156.668 23.5638 156.668 25.5431C156.668 27.7314 154.895 29.7643 151.524 29.7643Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M165.246 29.726C163.491 29.726 162.102 29.0611 161.071 27.8258C160.082 26.6265 159.568 25.0284 159.568 23.1267C159.568 21.547 159.853 20.2347 160.444 19.1314C161.436 17.2488 163.244 16.1074 165.302 16.1074C166.58 16.1074 167.798 16.4872 168.578 17.1345L167.57 18.5801C166.866 18.067 166.14 17.8375 165.321 17.8375C164.198 17.8375 163.264 18.4093 162.692 19.4173C162.235 20.2157 162.006 21.319 162.006 22.8804C162.006 24.4961 162.178 25.4095 162.521 26.1514C163.093 27.4058 164.179 28.0164 165.454 28.0164C166.39 28.0164 167.074 27.7693 167.816 27.1778L168.846 28.5669C167.816 29.3462 166.656 29.726 165.246 29.726Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M175.385 18.1243H174.184V22.2897H175.309C176.451 22.2897 177.06 22.138 177.46 21.7384C177.825 21.3763 178.052 20.825 178.052 20.1396C178.052 18.8083 177.326 18.1243 175.385 18.1243ZM178.433 29.5173L177.289 27.4822C176.376 25.8665 175.766 24.9524 175.04 24.2302C174.793 23.9825 174.603 23.8491 174.184 23.83V29.5173H172.03V16.354H176.051C179.004 16.354 180.339 18.0672 180.339 20.1206C180.339 22.0053 179.118 23.7354 177.06 23.7354C177.539 23.9825 178.414 25.2566 179.099 26.3606L181.043 29.5173H178.433Z"
          fill="white"
        />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M184.419 29.5173H186.668V16.354H184.419V29.5173Z" fill="white" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M196.521 18.7702C196.119 18.3523 195.547 18.1243 194.69 18.1243H192.974V22.7457H194.69C196.311 22.7457 197.053 21.9855 197.053 20.4262C197.053 19.7027 196.882 19.1507 196.521 18.7702ZM195.205 24.4964H192.974V29.5173H190.802V16.354H194.309C196.233 16.354 196.94 16.5446 197.662 16.9829C198.826 17.6669 199.473 18.8465 199.473 20.2921C199.473 22.8806 197.586 24.4964 195.205 24.4964Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M210.451 18.1815H207.136V29.5173H204.945V18.1815H201.609V16.354H210.736L210.451 18.1815Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M217.199 29.7643C215.691 29.7643 214.169 29.3655 212.873 28.5862L213.71 26.9118C214.892 27.5958 215.94 27.9975 217.274 27.9975C218.894 27.9975 219.865 27.2161 219.865 25.9045C219.865 24.9333 219.256 24.3255 217.902 23.9443L216.493 23.5448C215.292 23.2031 214.436 22.7076 213.941 21.9664C213.577 21.4328 213.386 20.806 213.386 20.0443C213.386 17.7241 215.216 16.145 217.864 16.145C219.371 16.145 220.874 16.582 222.037 17.4008L221.045 18.941C219.827 18.2196 218.99 17.933 217.941 17.933C216.646 17.933 215.787 18.6375 215.787 19.7217C215.787 20.5398 216.244 20.9577 217.54 21.3382L219.103 21.7956C221.007 22.3469 222.341 23.5638 222.341 25.5431C222.341 27.7314 220.569 29.7643 217.199 29.7643Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M227.267 17.9493C227.218 17.9323 227.114 17.9154 227.005 17.9154H226.837V18.5422H226.995C227.196 18.5422 227.284 18.5203 227.347 18.4617C227.4 18.4088 227.434 18.3276 227.434 18.2302C227.434 18.0876 227.378 17.993 227.267 17.9493ZM227.512 19.8566C227.422 19.6999 227.386 19.6392 227.293 19.4726C227.07 19.0561 226.995 18.9403 226.913 18.9086C226.888 18.8966 226.865 18.8909 226.837 18.8909V19.8566H226.384V17.5448H227.245C227.658 17.5448 227.929 17.8159 227.929 18.2189C227.929 18.5705 227.696 18.8528 227.412 18.8578C227.455 18.8966 227.476 18.9178 227.509 18.9587C227.639 19.1253 228.062 19.8566 228.062 19.8566H227.512ZM227.105 17.062C226.227 17.062 225.523 17.7947 225.523 18.7137C225.523 19.6328 226.227 20.3768 227.105 20.3768C227.981 20.3768 228.694 19.6328 228.694 18.7137C228.694 17.7947 227.981 17.062 227.105 17.062ZM227.105 20.777C225.98 20.777 225.052 19.8664 225.052 18.7137C225.052 17.5667 225.98 16.6519 227.105 16.6519C228.231 16.6519 229.161 17.5667 229.161 18.7137C229.161 19.8664 228.231 20.777 227.105 20.777Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M23.869 1.48651C11.3424 1.48651 1.15169 11.659 1.15169 24.1672C1.15169 36.6733 11.3424 46.8514 23.869 46.8514C36.3949 46.8514 46.5856 36.6733 46.5856 24.1672C46.5856 11.659 36.3949 1.48651 23.869 1.48651ZM23.869 47.9999C10.7068 47.9999 0 37.3044 0 24.1672C0 11.0272 10.7068 0.335938 23.869 0.335938C37.0298 0.335938 47.7374 11.0272 47.7374 24.1672C47.7374 37.3044 37.0298 47.9999 23.869 47.9999Z"
          fill="white"
        />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.575684 23.1254H47.3183V21.9995H0.575684V23.1254Z" fill="white" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.81226 7.81827H39.985V6.69238H7.81226V7.81827Z" fill="white" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.93164 39.3988H41.7426V38.2729H5.93164V39.3988Z" fill="white" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19.2665 13.2707C21.0764 9.39113 19.7218 8.90478 17.2232 8.70501L17.9232 7.21631H39.3764C39.3764 7.21631 41.8784 9.22031 42.7763 10.5424C42.2892 11.8349 41.9527 12.8514 41.6105 13.9441L39.843 14.0937C40.2389 12.0784 39.978 10.7514 39.4591 9.96784C38.8306 9.13137 37.3402 8.69019 33.6716 8.69019H29.1899C28.2821 8.69019 27.8657 8.7869 27.223 10.1634L21.9821 21.3615H27.076C32.1699 21.3615 32.7596 20.9669 34.9979 17.9245H36.6276L32.5206 26.717H30.891C31.5449 23.4255 31.0953 23.0803 26.2707 23.0803H21.116L16.7404 32.6069C15.7555 34.721 15.2012 36.1963 15.8418 36.5358C16.7778 37.037 18.4888 37.1302 21.408 37.1302C25.2795 37.1302 27.8198 36.6382 29.6382 35.5038C31.0925 34.5742 32.9787 33.0029 34.8509 31.037L36.3886 31.2325C35.6123 32.3133 32.0059 37.2735 30.91 38.6005H5.51602C5.51602 38.6005 4.97516 37.9173 4.64429 37.4436C8.76822 37.0624 8.62611 36.0594 10.2374 32.6069L19.2665 13.2707Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.2148 13.3001L13.1123 12.182C13.6878 12.129 14.269 12.0923 14.8657 12.1029C15.2475 12.1029 15.6321 12.1149 16.0103 12.1389L15.941 13.2605C15.5769 13.238 15.2291 13.2203 14.8374 13.2288C14.2951 13.2288 13.7493 13.2514 13.2148 13.3001ZM20.9995 14.318C20.1476 14.0046 19.2667 13.7575 18.3751 13.5782L18.5964 12.4742C19.5438 12.6655 20.4834 12.9302 21.3884 13.2634L20.9995 14.318ZM8.18726 14.5057L7.76872 13.4639C8.66661 13.1017 9.59844 12.8095 10.5352 12.5935L10.7904 13.6897C9.9074 13.893 9.03213 14.1655 8.18726 14.5057ZM25.5342 16.785C24.806 16.2366 24.034 15.7481 23.2358 15.3217L23.766 14.33C24.6158 14.781 25.4374 15.3048 26.2101 15.885L25.5342 16.785ZM3.724 17.1076L3.02124 16.2267C3.77632 15.6259 4.58159 15.0796 5.41797 14.601L5.97933 15.5744C5.19173 16.0262 4.43312 16.5429 3.724 17.1076ZM29.1781 20.4443C28.6379 19.7172 28.037 19.0227 27.3929 18.3845L28.1847 17.5855C28.8705 18.2638 29.5075 18.9979 30.0837 19.773L29.1781 20.4443ZM31.6244 24.9909C31.3161 24.1396 30.9372 23.3052 30.5024 22.5076L31.4922 21.969C31.9545 22.8146 32.354 23.7055 32.6813 24.6097L31.6244 24.9909Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M32.5668 30.8958C32.5399 29.9902 32.4416 29.0782 32.2748 28.1873L33.3834 27.9819C33.5615 28.9405 33.6662 29.897 33.6937 30.8605L32.5668 30.8958ZM30.8927 40.8939L29.9312 40.3059C30.4049 39.5358 30.6233 39.1702 30.9754 38.3344L32.2134 38.3203C31.8394 39.2083 31.3939 40.0772 30.8927 40.8939ZM27.3661 45.101L26.616 44.2631C27.2926 43.6596 27.9303 42.9975 28.5058 42.3022L29.3761 43.0172C28.7631 43.7612 28.0879 44.4629 27.3661 45.101Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.29846 41.2529L6.52429 40.4765L25.2393 0.675293L26.2574 1.15388L7.47167 41.1584L7.29846 41.2529Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.4253 44.1232L10.403 43.6488L30.1403 1.34033L31.1612 1.8161L11.4253 44.1232Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M22.5916 47.6878L21.7892 47.104C22.6298 46.7666 23.4535 46.365 24.2326 45.9033L24.8081 46.8725C23.9773 47.3645 23.6797 47.4591 22.7861 47.8141L22.5916 47.6878Z"
          fill="white"
        />
      </svg>

      <cre8UtilityNav inverted={true}>
        <cre8UtilityNavItem
          className="c-express-scripts-header__utility-nav-search"
          text="Open Search Modal"
          iconPosition="before"
          iconName="shop"
          hideText={true}
        ></cre8UtilityNavItem>
      </cre8UtilityNav>
      <cre8Button
        className="c-express-scripts-header__menu-button"
        size="lg"
        aria-expanded={isActiveVar === true ? true : false}
        onClick={toggleIsActive}
        variant="bare"
        text="Menu"
        hideText={true}
        inverted={true}
        iconPosition="before"
        iconName="menu"
      ></cre8Button>
      <cre8NavContainer slot="bottom" className="c-express-scripts-header__nav-container">
        <cre8PrimaryNav inverted={true} className="c-express-scripts-header__primary-nav">
          <cre8PrimaryNavItem text="Home"></cre8PrimaryNavItem>
          <cre8PrimaryNavItem text="Prescriptions" megaMenu={true}>
            <cre8Grid className="c-express-scripts-header__megamenu-grid" variant="3up">
              <cre8GridItem>
                <cre8Heading headingTagName="h3" className="c-express-scripts-header__heading">
                  Megamenu title
                </cre8Heading>
                <cre8LinkList spacing="condensed" variant="display">
                  <cre8LinkListItem href="#">Link List Item 24</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 25</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 26</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 27</cre8LinkListItem>
                </cre8LinkList>
              </cre8GridItem>
              <cre8GridItem>
                <cre8Heading headingTagName="h3" className="c-express-scripts-header__heading">
                  Megamenu title
                </cre8Heading>
                <cre8LinkList spacing="condensed">
                  <cre8LinkListItem href="#">Link List Item 28</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 29</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 30</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 31</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 32</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 33</cre8LinkListItem>
                </cre8LinkList>
              </cre8GridItem>
              <cre8GridItem>
                <cre8Heading headingTagName="h3" className="c-express-scripts-header__heading">
                  Megamenu title
                </cre8Heading>
                <cre8LinkList spacing="condensed" styleModifier="cre8-u-margin-bottom-lg">
                  <cre8LinkListItem href="#">Link List Item 34</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 35</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 36</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 37</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 38</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 39</cre8LinkListItem>
                </cre8LinkList>
              </cre8GridItem>
            </cre8Grid>
          </cre8PrimaryNavItem>
          <cre8PrimaryNavItem text="Benefits" megaMenu={true}>
            <cre8Grid className="c-express-scripts-header__megamenu-grid" variant="3up">
              <cre8GridItem>
                <cre8Heading headingTagName="h3" className="c-express-scripts-header__heading">
                  Megamenu title
                </cre8Heading>
                <cre8LinkList spacing="condensed" variant="display">
                  <cre8LinkListItem href="#">Link List Item 24</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 25</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 26</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 27</cre8LinkListItem>
                </cre8LinkList>
              </cre8GridItem>
              <cre8GridItem>
                <cre8Heading headingTagName="h3" className="c-express-scripts-header__heading">
                  Megamenu title
                </cre8Heading>
                <cre8LinkList spacing="condensed">
                  <cre8LinkListItem href="#">Link List Item 28</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 29</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 30</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 31</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 32</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 33</cre8LinkListItem>
                </cre8LinkList>
              </cre8GridItem>
              <cre8GridItem>
                <cre8Heading headingTagName="h3" className="c-express-scripts-header__heading">
                  Megamenu title
                </cre8Heading>
                <cre8LinkList spacing="condensed" styleModifier="cre8-u-margin-bottom-lg">
                  <cre8LinkListItem href="#">Link List Item 34</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 35</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 36</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 37</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 38</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 39</cre8LinkListItem>
                </cre8LinkList>
              </cre8GridItem>
            </cre8Grid>
          </cre8PrimaryNavItem>
          <cre8PrimaryNavItem text="Account" megaMenu={true}>
            <cre8Grid className="c-express-scripts-header__megamenu-grid" variant="3up">
              <cre8GridItem>
                <cre8Heading headingTagName="h3" className="c-express-scripts-header__heading">
                  Megamenu title
                </cre8Heading>
                <cre8LinkList spacing="condensed" variant="display">
                  <cre8LinkListItem href="#">Link List Item 24</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 25</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 26</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 27</cre8LinkListItem>
                </cre8LinkList>
              </cre8GridItem>
              <cre8GridItem>
                <cre8Heading headingTagName="h3" className="c-express-scripts-header__heading">
                  Megamenu title
                </cre8Heading>
                <cre8LinkList spacing="condensed">
                  <cre8LinkListItem href="#">Link List Item 28</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 29</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 30</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 31</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 32</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 33</cre8LinkListItem>
                </cre8LinkList>
              </cre8GridItem>
              <cre8GridItem>
                <cre8Heading headingTagName="h3" className="c-express-scripts-header__heading">
                  Megamenu title
                </cre8Heading>
                <cre8LinkList spacing="condensed" styleModifier="cre8-u-margin-bottom-lg">
                  <cre8LinkListItem href="#">Link List Item 34</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 35</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 36</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 37</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 38</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 39</cre8LinkListItem>
                </cre8LinkList>
              </cre8GridItem>
            </cre8Grid>
          </cre8PrimaryNavItem>
          <cre8PrimaryNavItem text="Help" megaMenu={true}>
            <cre8Grid className="c-express-scripts-header__megamenu-grid" variant="3up">
              <cre8GridItem>
                <cre8Heading headingTagName="h3" className="c-express-scripts-header__heading">
                  Megamenu title
                </cre8Heading>
                <cre8LinkList spacing="condensed" variant="display">
                  <cre8LinkListItem href="#">Link List Item 24</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 25</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 26</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 27</cre8LinkListItem>
                </cre8LinkList>
              </cre8GridItem>
              <cre8GridItem>
                <cre8Heading headingTagName="h3" className="c-express-scripts-header__heading">
                  Megamenu title
                </cre8Heading>
                <cre8LinkList spacing="condensed">
                  <cre8LinkListItem href="#">Link List Item 28</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 29</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 30</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 31</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 32</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 33</cre8LinkListItem>
                </cre8LinkList>
              </cre8GridItem>
              <cre8GridItem>
                <cre8Heading headingTagName="h3" className="c-express-scripts-header__heading">
                  Megamenu title
                </cre8Heading>
                <cre8LinkList spacing="condensed" styleModifier="cre8-u-margin-bottom-lg">
                  <cre8LinkListItem href="#">Link List Item 34</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 35</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 36</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 37</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 38</cre8LinkListItem>
                  <cre8LinkListItem href="#">Link List Item 39</cre8LinkListItem>
                </cre8LinkList>
              </cre8GridItem>
            </cre8Grid>
          </cre8PrimaryNavItem>
          <cre8PrimaryNavItem className="c-express-scripts-header__log-out" text="Log out"></cre8PrimaryNavItem>
        </cre8PrimaryNav>
      </cre8NavContainer>
    </cre8Header>
  );
};
