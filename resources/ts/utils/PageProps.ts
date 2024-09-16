export type Auth = {
    user: {
        id: number;
        name: string;
        email: string;
    };
};

export type App = {
    name: string;
    locale: string;
};

export type PageProps = {
    auth: Auth;
    app: App;
};
