import useForm from "@/hooks/useForm";
import { Survey } from "@/types/models";
import { SurveyResource } from "@/types/resources";

export default function useFormBuilder(
    survey: SurveyResource = {} as SurveyResource
) {
    const { data, setData, errors, register } = useForm<Survey>({
        ...survey,
    } as Survey);
    return { data, setData, errors, register };
}
