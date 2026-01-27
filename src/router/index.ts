import { createRouter, createWebHistory } from "vue-router";

export const routesNames = {
    home: "home",
    games: "games"
};
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: routesNames.home,
            component: () => import("../views/Home.vue")
        },
        {
            path: "/games",
            name: routesNames.games,
            component: () => import("../views/Games.vue")
        },
    ]
});
export default router;