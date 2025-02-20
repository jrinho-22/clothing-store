import { INaveItem } from "../../../interfaces/INavItems";

const nav: INaveItem[] = [
    {
      permission: ['all'],
      label: 'Home',
      path: 'home'
      // children: [
      //   {
      //     label: 'teste',
      //     path: ''
      //   },
      // ],
    },
    {
      permission: ['all'],
      label: 'All Products',
      path: 'all-products'
      // children: [
      //   {
      //     label: 'teste',
      //     path: ''
      //   },
      // ],
    },
    {
      permission: ['client'],
      label: 'Categories',
      path: 'products'
    },
    {
      permission: ['admin'],
      label: 'Cart',
      path: 'cart'
    },
    {
      permission: ['admin'],
      label: 'checkUser',
      path: 'signUser'
    },
  ];
  
  export default nav