const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

export const isEmail: (string) => boolean = inp => {
    return emailRegex.test(inp);
};
