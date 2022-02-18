const routes = [
  {
    path: "/",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/Index.vue") },
      { path: "register", component: () => import("pages/Signup.vue") },
    ],
  },
  {
    path: "/dashboard",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Dashboard.vue") }],
  },
  {
    path: "/patient",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/patient/Index.vue") },
      {
        path: "booklet",
        component: () => import("pages/patient/Booklet.vue"),
      },
      {
        path: "profile",
        component: () => import("pages/patient/Profile.vue"),
      },
    ],
  },
  {
    path: "/appointments",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Appointments.vue") }],
  },
  {
    path: "/settings",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Settings.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
