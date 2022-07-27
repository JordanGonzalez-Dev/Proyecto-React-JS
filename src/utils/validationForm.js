const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export const validate = (values) => {
    
    if (!values.name) {
        return false
    }

    if (!values.phone) {
        return false
    } else if (values.phone.length < 8) {
        return false
    } else if (values.phone.length > 11) {
        return false
    }

    if (!values.email) {
        return false
    } else if (!regex.test(values.email)) {
        return false
    }
    
    return true
};

export { regex };