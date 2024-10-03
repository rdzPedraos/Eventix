import React, { useMemo } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Button } from "@nextui-org/react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

import { Survey } from "@/types/models";
import SurveyLayout from "@/Layout/SurveyLayout";
import RenderQuestion from "@/components/Form/RenderQuestion";
import { route } from "@ziggyjs";
import { Logo } from "@/components";
import { triggerAlert } from "@/utils";

type PageProps = {
    survey: Survey;
    token: string;
};

export default function index() {
    const { survey, token } = usePage<PageProps>().props;
    const initialize = useMemo(
        () =>
            survey.questions.reduce((acc, question) => {
                acc[question.id] = "";
                return acc;
            }, {}),
        [survey.questions]
    );

    const { data, errors, setError, setData, submit } =
        useForm<any>(initialize);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        triggerAlert((resolve, reject) => {
            submit("post", route("answer.store", { token }), {
                preserveScroll: true,
                onSuccess: resolve,
                onError: reject,
            });
        });
    };

    return (
        <>
            <div className="p-4 bg-white shadow-lg flex items-center gap-4">
                <Logo size="lg" onlyImage />

                <div>
                    <h1 className="text-2xl font-bold w-full">{survey.name}</h1>
                    <p className="text-gray-600 w-full">{survey.description}</p>
                </div>
            </div>

            <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto flex flex-col gap-4 p-8"
            >
                {survey.questions.map((question, index) => {
                    const id = question.id.toString();

                    return (
                        <RenderQuestion
                            key={index}
                            number={index + 1}
                            question={question}
                            value={data[id]}
                            onChange={(value) => setData(id, value)}
                            clearError={() => setError(id, null)}
                            error={errors[id]}
                        />
                    );
                })}

                <Button
                    type="submit"
                    color="primary"
                    size="lg"
                    endContent={<PaperAirplaneIcon width={20} />}
                >
                    Enviar
                </Button>
            </form>
        </>
    );
}

index.layout = (page) => <SurveyLayout>{page}</SurveyLayout>;
