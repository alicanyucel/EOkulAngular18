import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "login",
        loadComponent: () => import("./components/login/login.component")
    },
    {
        path: "",
        loadComponent: ()=> import("./components/landpage/landpage.component")
    },
    {
        path: "admin",
        loadComponent: ()=> import("./components/layouts/layouts.component"),
        children: [
            {
                path: "",
                loadComponent: () => import("./components/home/home.component")
            },
            {
                path: "user-types",
                loadComponent: () => import("./components/user-types/user-types.component")
            },
            {
                path: "categories",
                loadComponent: ()=> import("./components/categories/categories.component")
            },
            {
                path: "books",
                loadComponent: ()=> import("./components/books/books.component")
            }
        ]
    },
    {
        path: "**",
        loadComponent: () => import("./components/not-found/not-found.component")
    }
];
