import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Task.vue";
import Login from "../views/Login.vue";
import Register from "../views/Auth.vue";
import { getAuth } from "firebase/auth";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (to.path === "/" && !user) {
    next("/login");
  } else {
    next();
  }
});

export default router;
