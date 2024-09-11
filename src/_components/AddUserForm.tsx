import { Button, Form, FormattedNumberInputField, HStack, TextField, VStack } from "@northlight/ui";
import React from "react";
import { FormValueProps, UserObjectProps } from "../types/types";
import { formatName } from "../utils/nameFormatter";
import { useUserContext } from "../../context/UserContext";
import { validation } from "../_actions/AddUserForm/validationSchema";
import { useUserListActions } from "../_actions/userListActions";

export default function AddUserForm() {
    const { setUserScoreList } = useUserContext();
    const { handleUserListUpdate } = useUserListActions();

    const handleSubmit = async (
        values: FormValueProps,
        methods: any,
    ) => {
        const parsedScore = values.score !== undefined ? parseFloat(values.score as string) : 0;
        const parsedScoreValues = {
            name: values.name,
            score: parsedScore
        }
        const errors = await validation(parsedScoreValues);
    
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
                scores: !isNaN(parsedScore) ? [parsedScore] : []
            }];
            handleUserListUpdate(updatedValues);
            setUserScoreList([])
            methods.reset();
        }
    };

    return (
        <HStack width="200px">
        <Form
            initialValues={{ name: '', score: ''}}
            onSubmit={(values, methods) => handleSubmit(values, methods)}
            formSettings={{
                mode: 'onSubmit',
                resetOptions: {
                    keepDirty: true,
                },
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
            <TextField
                name="score"
                label="Score"
                type="number"
                isRequired={true}
                />
            </VStack>

            <Button mt={3} type="submit" variant="success">Submit</Button>
        </Form>
        </HStack>
    );
}
