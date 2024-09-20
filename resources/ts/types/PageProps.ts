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

type PaginationProps = {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number | string;
    links: {
        url: null | string;
        label: string;
        active: boolean;
    }[];
    to: number;
    total: number;
};

type CollectionProps<T> = {
    data: T[];
    links: {
        first: string;
        last: string;
        next: string;
        prev: string;
    };
    meta: PaginationProps;
};
