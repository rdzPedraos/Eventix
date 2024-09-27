import React from "react";
import FormCreateProvider from "./context";

import Header from "./partials/Header";
import QuestionList from "./partials/QuestionList";
import Footer from "./partials/Footer";

export default function Create() {
    return (
        <FormCreateProvider>
            <div className="w-full flex justify-center p-4">
                <div className="w-lg space-y-4">
                    <Header />
                    <QuestionList />
                    <Footer />
                </div>
            </div>
        </FormCreateProvider>
    );
}
