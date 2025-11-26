import { sildeMenu } from '../../shared/typings/app.typings';

export const sidebarMenu: sildeMenu[] = [
  {
    id: 1,
    icon: '../../../../assets/images/icons/roles.svg',
    title: 'User',
    routerLink: 'user',
    permission: true,
    name: 'user',
    subMenu: [],
    siblings: [
      {
        icon: '../../../../assets/images/sidebar-icons/roles.svg',
        title: 'User',
        routerLink: 'user',
        siblings: [],
        name: 'user',
        action: {},
        listingAction: [],
        permission: true,
      },
    ],
  },
];
