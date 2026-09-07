type LoginFormFields = {
    email: string;
    password: string;
    remember: boolean;
};

type RegisterFormFields = {
    email: string;
    document_type_code: string;
    document_number: string;
    name: string;
    last_name: string;
    phone: string;
    otp: string;
    verify_otp: string;
    password: string;
    verify_password: string;
};
