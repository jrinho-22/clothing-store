export interface INaveItem {
    label: string;
    permission: ['admin' | 'all' | 'client' | 'guest'];
    path: string
  }