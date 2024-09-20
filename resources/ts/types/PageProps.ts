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

type CollectionProps<T> = {
    data: T[];
    links: {
        first: string;
        last: string;
        next: string;
        prev: string;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        links: {
            url: null | string;
            label: string;
            active: boolean;
        }[];
        to: number;
        total: number;
    };
};
