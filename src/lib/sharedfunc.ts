// // base fucntion to create a session token
export const rand = () => {
    return Math.random().toString(36).substr(2);
};
// // creates a session token with the base function
export const randomtoken = () => {
    return rand() + rand();
};
