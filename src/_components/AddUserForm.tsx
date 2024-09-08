import { Button, Form, HStack, NumberInputField, TextField, VStack } from "@northlight/ui";
import React, { useState } from "react";
import { FormValueProps, UserObjectProps } from "../types/types";
import { formatName } from "../utils/nameFormatter";
import { updateUserList } from "../_actions/userListActions";
import { useUserContext } from "../../context/UserContext";
import { validation } from "../_actions/AddUserForm/validationSchema";

export default function AddUserForm() {
    const [score, setScore] = useState<number | undefined>(undefined);
    const {setUserList, setUserScoreList} = useUserContext();
    const handleScoreChange = (value: string | number) => {
        const parsedValue = Number(value);

        setScore(value === '' || !isNaN(parsedValue) ? parsedValue : undefined);
    };

    const handleSubmit = async (
        values: FormValueProps,
        methods: any,
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
            const updatedValues: UserObjectProps[] = [{
                name: formattedName,
                scores: values.score !== undefined ? [values.score] : []
            }];
            updateUserList(updatedValues, setUserList);
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
            onSubmit={(values, methods) => handleSubmit(values, methods)}
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
