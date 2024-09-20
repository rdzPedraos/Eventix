type LoginFormFields = {
    email: String;
    password: String;
    remember: Boolean;
};

type RegisterFormFields = {
    email: String;
    document_type_code: String;
    document_number: String;
    name: String;
    last_name: String;
    phone: String;
    otp: String;
    verify_otp: String;
    password: String;
    verify_password: String;
};

type ActivityCreateFormFields = {
    name: String;
    description: String;
    image: File;
    color: String;
    dates: Date[];
};
