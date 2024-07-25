const camelCaseToSentenceCase = (input: string) => {
    // Step 1: Insert spaces before uppercase letters (except the first letter)
    const spacedString = input.replace(/([a-z])([A-Z])/g, '$1 $2');

    // Step 2: Convert the entire string to lowercase
    const lowerCaseString = spacedString.toLowerCase();

    // Step 3: Capitalize the first character
    const result = lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.slice(1);
    return result;
}

type ErrorState<T> = {
    [K in keyof T]: string;
};

type ValidationResult<T> = {
    isValid: boolean;
    updatedErrorState: ErrorState<T>;
};

const validatedForm = <T extends Record<string, any>>(errorState: ErrorState<T>, formData: T): ValidationResult<T> => {
    let isValid = true;
    const state = { ...errorState };

    for (let key in formData) {
        if (formData[key] == null || formData[key] === '') {
            isValid = false;
            state[key] = `${camelCaseToSentenceCase(String(key))} field is required`;
        }
    }
    return {
        isValid: isValid,
        updatedErrorState: state
    };
};



export { camelCaseToSentenceCase, validatedForm }