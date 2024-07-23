export class NavigationModel{
    name: string = "";
    route: string = "";
    icon: string = "";
}

export const Navigations: NavigationModel[] = [
    {
        name: "Ana Sayfa",
        route: "/admin",
        icon: "fa-solid fa-home"
    },
    {
        name: "Kullanıcı Tipleri",
        route: "/admin/user-types",
        icon: "fa-solid fa-users-between-lines"
    },
    {
        name: "Kategories",
        route: "/admin/categories",
        icon: "fa-solid fa-list"
    }
]