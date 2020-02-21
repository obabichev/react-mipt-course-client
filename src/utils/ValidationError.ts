export class ValidationError extends Error {

    public validation: { [key in string]: { messages: string[]; } };

    constructor({validation, message}: { validation: { [key in string]: { messages: string[] } }, message: string }) {
        super(message);

        this.validation = validation;
    }
}