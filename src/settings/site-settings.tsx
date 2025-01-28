import { SAFlag } from '@components/icons/language/SAFlag';
import { USFlag } from '@components/icons/language/USFlag';
import siteLogo from 'public/assets/images/rainlogo.png';
import siteLogoBlack from 'public/assets/images/rainlogo.png';

export const siteSettings = {
  name: 'Razazoror',
  description:
    'raindrops grocessery.',
  author: {
    name: 'bepositive, Inc.',
    websiteUrl: '#',
    address: '',
  },
  logo: {
    url: siteLogo,
    urlReverse: siteLogoBlack,
    alt: 'Razazoror',
    href: '/en',
    width: 200,
    height: 100,
  },
  defaultLanguage: 'en',
  currencyCode: 'USD',
  site_header: {
    topmenu: [

      {
        id: 1,
        path: '/',
        label: 'menu-gift',
      },
    ],
    menu: [
      {
        id: 1,
        path: '/shops/',
        label: 'menu-shops',
      },

      {
        id: 2,
        path: '/contact-us',
        label: 'menu-contact-us',
      },
    ],
    languageMenu: [
      {
        id: 'ar',
        name: 'عربى',
        value: 'ar',
        icon: <SAFlag />,
      },
      {
        id: 'en',
        name: 'English',
        value: 'en',
        icon: <USFlag />,
      },
    ],
    pagesMenu: [
      {
        id: 1,
        path: '/search',
        label: 'menu-best-deals',
      },
      {
        id: 2,
        path: '/about-us',
        label: 'menu-about-us',
      },
      {
        id: 3,
        path: '/contact-us',
        label: 'menu-contact-us',
      },
      {
        id: 4,
        path: '/faq',
        label: 'menu-faq',
      },
    ],
  },
};
