function formalText(text: string) {
    return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

function shortText(text: string, max = 30) {
    return text.length > max ? text.slice(0, max) + "..." : text;
}

export { formalText, shortText };
