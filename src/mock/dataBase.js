export const menuList =[
  {
    id: 1,
    href: "/sdas",
    name: "系统功能设置",
    icon: "fa fa-id-badge",
    children: [
      {
        id: 2,
        parentId: 1,
        href: "/menu",
        name: "菜单管理",
        icon: "fa fa-certificate"
      },
    ]
  },
  {
    id: 3,
    parentId: 1,
    href: "/home",
    name: "员工管理",
    icon: "fa fa-sitemap"
  },
  {
    id: 4,
    href: "/test",
    name: "用户管理",
    icon: "fa fa-qrcode"
  },
  {
    id:5,
    href:"/order",
    name: "订单管理",
    icon: "fa fa-book"
  }
]
