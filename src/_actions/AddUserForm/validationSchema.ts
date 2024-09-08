import { FormValueProps } from "../../types/types";

export const validation = async (values: FormValueProps) => {
    const errors: any = {}
    
    try{
        const nameError = await nameValidation(values.name);
        if(nameError){
            errors.name = nameError.message;
        }

        const scoreError = await scoreValidation(values.score);
        if(scoreError){
            errors.score = scoreError.message;
        }

        return errors;

    } catch(error:any) {
        throw new Error(error);
    }
};

const nameValidation = async (name: string) =>{
    let errorMessage = {};

    if (!name) {
        return errorMessage = {message: 'Name is required'} ;
    }

    if(!/^[A-Za-z\s]+$/.test(name)) {
        return errorMessage = { message: 'Name should not contain numbers or symbols' };
    }
    return null;
}

const scoreValidation = async (score?: number) =>{
    let errorMessage = {};

    if (score === undefined || score < 0) {
       return errorMessage = { message: 'Score must be a positive number' };
    }
    return null;
}
