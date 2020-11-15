export const validateCallbackInformation = data => {
    const errors = {};
    let isValid = true;

    if (!data.name) {
        errors.name = true;
        isValid = false;
    }

    if (!data.number) {
        errors.number = true;
        isValid = false;
    }

    // if (!data.email) {
    //     errors.email = true;
    //     isValid = false;
    // }

    // if (!data.mobile) {
    //     errors.mobile = true;
    //     isValid = false;
    // }

    return { errors, isValid };
};
