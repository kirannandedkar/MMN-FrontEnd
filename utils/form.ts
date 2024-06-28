const camelCaseToSentenceCase = (input: string) => {
    // Step 1: Insert spaces before uppercase letters (except the first letter)
    const spacedString = input.replace(/([a-z])([A-Z])/g, '$1 $2');

    // Step 2: Convert the entire string to lowercase
    const lowerCaseString = spacedString.toLowerCase();

    // Step 3: Capitalize the first character
    const result = lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.slice(1);
    return result;
}

export { camelCaseToSentenceCase }