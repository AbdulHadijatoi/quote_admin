import {
  DashboardIcon,
  SettingsIcon,
  UserIcon,
  LockIcon,
  SubscriptIcon,
  FormsIcon,
  HistoryIcon,
} from 'vue-tabler-icons';

export interface menu {
  header?: string;
  title?: string;
  icon?: object;
  to?: string;
  divider?: boolean;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  // { header: 'Dashboard' },
  {
    title: 'Dashboard',
    icon: DashboardIcon,
    to: '/dashboard'
  },
  { divider: true },
  
  // {
  //   title: 'Authentication',
  //   icon: KeyIcon,
  //   to: '/auth',
  //   children: [
  //     {
  //       title: 'Login',
  //       icon: CircleIcon,
  //       to: '/auth/login'
  //     },
  //     {
  //       title: 'Register',
  //       icon: CircleIcon,
  //       to: '/auth/register'
  //     }
  //   ]
  // },
  {
    title: 'Create Quote',
    icon: FormsIcon,
    to: '/dashboard/quotes/create'
  },
  {
    title: 'Quote History',
    icon: HistoryIcon,
    to: '/dashboard/quotes/history'
  },
  {
    title: 'Subscribers',
    icon: SubscriptIcon,
    to: '/dashboard/subscribers'
  },
  // {
  //   title: 'Permissions',
  //   icon: LockIcon,
  //   to: '/dashboard/permissions'
  // },
  {
    title: 'Employees',
    icon: UserIcon,
    to: '/dashboard/users'
  },
  {
    title: 'Setting',
    icon: SettingsIcon,
    to: '/dashboard/setting'
  },
];

export default sidebarItem;
