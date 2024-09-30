import useForm from "@/hooks/useForm";
import { Survey } from "@/types/models";

export default function useFormBuilder(survey: Survey = {} as Survey) {
    const { data, setData, errors, register } = useForm<Survey>({
        ...survey,
    } as Survey);

    return { data, setData, errors, register };
}
