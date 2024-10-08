import { FormValueProps } from "../../types/types";

export const validation = async (values: FormValueProps) => {
    const errorsMap = new Map<string, { message: string }>()
    
    try{
        const nameError = await nameValidation(values.name);
        if(nameError){
            errorsMap.set('name', { message: nameError.message })
        }

        const scoreError = await scoreValidation(values.score);
        if(scoreError){
            errorsMap.set('score', { message: scoreError.message })
        }
        return errorsMap;

    } catch(error:any) {
        throw new Error(error);
    }
};

const nameValidation = async (name: string) =>{

    if (!name) {
        return { message: 'Name is required' } ;
    }

    if(!/^[A-Za-z\s]+$/.test(name)) {
        return { message: 'Name should not contain numbers or symbols' };
    }
    return null;
}

const scoreValidation = async (score: number | string) =>{
    
    if (!score) {
        return { message: 'Score is required' }
     }

    if (typeof score !== 'number'){
        return { message: 'Score must be a number'}
    }

    if (score < 0) {
       return { message: 'Score must be a positive number' }
    }

    return null;
}
