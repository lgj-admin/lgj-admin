export const menuList =[
  {
    id: 1,
    href: "/sdas",
    name: "系统功能设置",
    icon: "fa fa-id-badge",
    children: [
      {
        id: 13,
        parentId: 1,
        href: "/authority",
        name: "权限管理",
        icon: "fa fa-certificate",
      },
      {
        id: 2,
        parentId: 1,
        href: "/menu",
        name: "菜单管理",
        icon: "fa fa-certificate"
      },
      {
        id: 8,
        href: "/permission",
        name: "角色管理",
        icon: "fa fa-address-book"
      },
      {
        id: 12,
        href: "/city",
        name: "城市管理",
        icon: "fa fa-cc"
      },
    ]
  },
  {
    id:9,
    name:'人员管理',
    href:"",
    icon:"fa fa-user-circle",
    children:[
      {
        id: 10,
        href: "/regional",
        name: "大区经理管理",
        icon: "fa fa-address-card-o"
      },
      {
        id: 11,
        href: "/area",
        name: "区域经理管理",
        icon: "fa fa-id-card-o"
      },
      {
        id: 3,
        href: "/home",
        name: "员工管理",
        icon: "fa fa-sitemap"
      },
      {
        id: 4,
        href: "/user",
        name: "用户管理",
        icon: "fa fa-user"
      },
    ]
  },
  {
    id:5,
    href:"/order",
    name: "订单管理",
    icon: "fa fa-first-order"
  },
  {
    id: 6,
    href: "/service",
    name: "服务管理",
    icon: "fa fa-server"
  },
  {
    id: 7,
    href: "/carousel",
    name: "轮播图管理",
    icon: "fa fa-file-image-o"
  },
]
