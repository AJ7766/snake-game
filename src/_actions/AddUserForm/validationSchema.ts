export const nameValidation = async (name: string) =>{
    let errorMessage = {};

    if (!name) {
        return errorMessage = {message: 'Name is required'} ;
    }

    if(!/^[A-Za-z\s]+$/.test(name)) {
        return errorMessage = { message: 'Name should not contain numbers or symbols' };
    }
    return null;
}

export const scoreValidation = async (score?: number) =>{
    let errorMessage = {};

    if (score === undefined || score < 0) {
       return errorMessage = { message: 'Score must be a positive number' };
    }
    return null;
}
