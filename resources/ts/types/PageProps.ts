type PageProps = {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
        permissions: string[];
    };
    app: {
        name: string;
        locale: string;
    };
};
