export const splitParams = (paramsString: string) => {
    const result: { [key in string]: string } = {};
    paramsString.split('&').forEach(param => {
        const [key, value] = param.split('=');
        if (key && value) {
            result[key] = value;
        }
    });
    return result;
};