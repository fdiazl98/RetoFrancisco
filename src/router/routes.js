const routes = [
  {
    path: "/",
    component: () => import("pages/Login.vue"),
  },

  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "index",
        component: () => import("pages/IndexPage.vue"),
        meta: { requireLogin: true },
      },

      {
        path: "Roles",
        component: () => import("pages/Roles.vue"),
        meta: { requireLogin: true },
      },

      //paginas de configuraciones
      {
        path: "/configuracion/categorias",
        meta: { requireLogin: true },
        component: () => import("pages/pagesConfiguracion/Categorias.vue"),
      },
      {
        path: "/configuracion/tipo-de-movimiento",
        meta: { requireLogin: true },
        component: () => import("pages/pagesConfiguracion/TipoMovimiento.vue"),
      },
      {
        path: "/configuracion/bodegas",
        meta: { requireLogin: true },
        component: () => import("pages/pagesConfiguracion/Bodegas.vue"),
      },
      {
        path: "/configuracion/articulos",
        meta: { requireLogin: true },
        component: () => import("pages/pagesConfiguracion/Articulos.vue"),
      },

      //paginas de seguridad
      {
        path: "/seguridad/Roles",
        meta: { requireLogin: true },
        component: () => import("pages/pagesSeguridad/Roles.vue"),
      },
      {
        path: "/seguridad/Usuarios",
        meta: { requireLogin: true },
        component: () => import("pages/pagesSeguridad/Usuarios.vue"),
      },

      //paginas de inventario
      {
        meta: { requireLogin: true },
        path: "/inventario/Listado-de-inventarios",
        component: () =>
          import("pages/pagesInventario/Listado_de_inventarios.vue"),
      },
      {
        path: "/inventario/Movimientos",
        meta: { requireLogin: true },
        component: () => import("pages/pagesInventario/Movimientos.vue"),
      },
    ],
  },

  {
    name: "Login",
    path: "/login",
    component: () => import("pages/Login.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
