import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@clerk/vue";
import { watch } from "vue";

export const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/navlink1",
    name: "navlink1",
    component: () => import("@/views/NavLink1.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/navlink2",
    name: "navlink2",
    component: () => import("@/views/NavLink2.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/navlink3",
    name: "navlink3",
    component: () => import("@/views/NavLink3.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/navlink4",
    name: "navlink4",
    component: () => import("@/views/NavLink4.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: () => import("@/views/SignUp.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/sign-in",
    name: "sign-in",
    component: () => import("@/views/SignIn.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/app",
    name: "app",
    component: () => import("@/layouts/AppLayout.vue"),
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "page-one",
        name: "page-one",
        component: () => import("@/views/PageOne.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "settings/profile",
        name: "profile",
        component: () => import("@/views/settings/Profile.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "settings/appearance",
        name: "appearance",
        component: () => import("@/views/settings/Appearance.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "billing",
        name: "billing",
        component: () => import("@/views/Billing.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/reset-password",
    name: "reset-password",
    component: () => import("@/views/ResetPassword.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/dashboard",
    redirect: "/app/dashboard",
  },
  {
    path: "/:catchAll(.*)",
    redirect: { name: "home" },
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach(async (to, _, next) => {
  const auth = useAuth();

  // Wait for Clerk to load
  if (!auth.isLoaded.value) {
    await new Promise<void>((resolve) => {
      const unwatch = watch(auth.isLoaded, (value) => {
        if (value) {
          unwatch();
          resolve();
        }
      });
    });
  }

  // After load, check auth state
  if (to.meta.requiresAuth && !auth.isSignedIn.value) {
    return next({ name: "sign-in" });
  }

  if (!to.meta.requiresAuth && auth.isSignedIn.value) {
    return next({ name: "dashboard" });
  }

  return next();
});

export default router;
