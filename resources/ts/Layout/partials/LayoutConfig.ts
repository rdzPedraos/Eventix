import { BreadCrumbProps } from "@/components/BreadCrumb";
import { useMemo } from "react";

type LayoutConfigProps = React.ReactNode & {
    props: any;
    type: {
        breadcrumb?: BreadCrumbProps | ((props: any) => BreadCrumbProps);
        fullView?: boolean;
    };
};

const getProperties = (children: LayoutConfigProps) => {
    const fullView = children.type.fullView;
    const breadcrumb = useMemo(() => {
        if (typeof children.type.breadcrumb === "function") {
            return children.type.breadcrumb(children.props);
        }

        return children.type.breadcrumb;
    }, [children.type.breadcrumb]);

    return { fullView, breadcrumb };
};

export { getProperties };
export type { LayoutConfigProps };
