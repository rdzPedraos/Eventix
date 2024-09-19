export type Permissions = string[];

export type User = {
    id: number;
    name: string;
    email: string;
};

export type Auth = {
    user: User;
    permissions: Permissions;
};

export type App = {
    name: string;
    locale: string;
};

export type PageProps = {
    auth: Auth;
    app: App;
};
