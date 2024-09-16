export type Auth = {
    user: {
        id: number;
        name: string;
        email: string;
    };
};

export type PageProps = {
    auth: Auth;
};
