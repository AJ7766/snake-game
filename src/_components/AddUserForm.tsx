import { Button, Form, HStack, NumberInputField, TextField, VStack } from "@northlight/ui";
import React, { useState } from "react";
import { nameValidation, scoreValidation } from "../_actions/AddUserForm/validationSchema";
import { updateUserList } from "../_actions/userListActions";
import { AddUserProps, UserScoreProps } from "../types/types";
import { formatName } from "../utils/nameFormatter";

type FormValues = {
    name: string;
    score?: number;
};

const validation = async (values: FormValues) => {
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



export default function AddUserForm({setUserList, setUserScoreList}: AddUserProps) {
    const [score, setScore] = useState<number | undefined>(undefined);

    const handleScoreChange = (value: string | number) => {
        const parsedValue = Number(value);

        setScore(value === '' || !isNaN(parsedValue) ? parsedValue : undefined);
    };

    const handleSubmit = async (
        values: FormValues,
        methods: any,
        setUserList: React.Dispatch<React.SetStateAction<UserScoreProps[]>>,
        setUserScoreList: React.Dispatch<React.SetStateAction<UserScoreProps[]>>,
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

    return (
        <HStack width="200px">
        <Form
            initialValues={{ name: '', score: undefined }}
            onSubmit={(values, methods) => handleSubmit(values, methods, setUserList, setUserScoreList)}
            formSettings={{
                mode: 'onSubmit',
            }}
            validate={validation}
        >
            <VStack>
            <TextField
                name="name"
                label="Name"
                isRequired={true}
            />
            </VStack>

            <VStack mt={3}>
            <NumberInputField
                name="score"
                label="Score"
                isRequired={true}
                precision={0}
                value={score ?? ''}
                onChange={(value: string | number) => handleScoreChange(value)}
                />
            </VStack>

            <Button mt={3} type="submit" variant="success">Submit</Button>
        </Form>
        </HStack>
    );
}
