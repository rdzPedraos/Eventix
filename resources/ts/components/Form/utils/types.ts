export type QuestionType = "text" | "number" | "checkbox" | "radio" | "select";

export interface Question {
    id: number;
    text: string;
    description: string;
    options: string[];
    isRequired: boolean;
    type: QuestionType;
}

export interface QuestionItemProps {
    question: Question;
    isEditing: boolean;
    onEdit: (e: React.MouseEvent) => void;
    onDelete: (e: React.MouseEvent) => void;
    renderContent: () => React.ReactNode;
    closeEditMode: () => void;
    editingRef: React.RefObject<HTMLDivElement> | null;
}
