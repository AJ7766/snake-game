import { validation } from "../../_components/AddUserForm";
import { FormValues, UserScoreProps } from "../../types/types";
import { formatName } from "../../utils/nameFormatter";
import { updateUserList } from "../userListActions";

export const handleSubmit = async (
    values: FormValues,
    methods: any,
    setUserList: React.Dispatch<React.SetStateAction<UserScoreProps[]>>,
    setUserScoreList: React.Dispatch<React.SetStateAction<UserScoreProps[]>>,
    setScore: React.Dispatch<React.SetStateAction<number | undefined>>,
) => {
    const errors = await validation(values);

    if (Object.keys(errors).length) {
        try{
            for (const field in errors) {
                if (errors.hasOwnProperty(field)) {
                    methods.setError(field, { message: errors[field] });
                }
            }
        }catch(error:any){
            methods.setError('field', { message: error.message });
        }
    }else{
        const formattedName = formatName(values.name);
        const updatedValues: UserScoreProps = {
            name: formattedName,
            scores: values.score !== undefined ? [values.score] : []
        };
        updateUserList(setUserList, [updatedValues]);
        setUserScoreList([])

        setScore(undefined);
        methods.reset({
            name: '',
            score: undefined
        });
    }
};
