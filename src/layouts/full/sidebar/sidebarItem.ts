import {
  DashboardIcon,
  SettingsIcon,
  UserIcon,
  LockIcon,
  SubscriptIcon,
  FormsIcon,
  HistoryIcon,
} from 'vue-tabler-icons';
import { isSuperAdmin } from '@/utils/api';

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

// Define all menu items, including those that should be restricted
const allMenuItems: menu[] = [
  {
    title: 'Dashboard',
    icon: DashboardIcon,
    to: '/dashboard',
  },
  { divider: true },
  {
    title: 'Create Quote',
    icon: FormsIcon,
    to: '/dashboard/quotes/create',
  },
  {
    title: 'Quote History',
    icon: HistoryIcon,
    to: '/dashboard/quotes/history',
  },
  {
    title: 'Subscribers',
    icon: SubscriptIcon,
    to: '/dashboard/subscribers',
  },
  {
    title: 'Employees',
    icon: UserIcon,
    to: '/dashboard/users',
  },
  {
    title: 'Setting',
    icon: SettingsIcon,
    to: '/dashboard/setting',
  },
  // {
  //   title: 'Permissions',
  //   icon: LockIcon,
  //   to: '/dashboard/permissions',
  // },
];

// Filter the menu items based on the user's role
const sidebarItem: menu[] = isSuperAdmin()
  ? allMenuItems // Show all items to super admin
  : allMenuItems.filter((item: any) =>
      ['Dashboard', 'Create Quote', 'Quote History'].includes(item.title)
    );

export default sidebarItem;
