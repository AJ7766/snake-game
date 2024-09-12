import {
  Button,
  Field,
  Form,
  HStack,
  NumberInput,
  TextField,
  VStack,
} from "@northlight/ui";
import React from "react";
import { FormValueProps, UserObjectProps } from "../types/types";
import { formatName } from "../utils/nameFormatter";
import { useUserContext } from "../../context/UserContext";
import { validation } from "../_actions/AddUserForm/validationSchema";
import { useUserListActions } from "../_actions/userListActions";

export default function AddUserForm() {
  const { setUserScoreList } = useUserContext();
  const { handleAddUser } = useUserListActions();

  const handleSubmit = async (values: FormValueProps, methods: any) => {
    const errors = await validation(values);

    if (errors.size > 0) {
      try {
        for (const [field, {message}] of errors) {
          methods.setError(field, { message });
        }
      } catch (error: any) {
        methods.setError("field", { message: error.message });
      }
    }else {
      const formattedName = formatName(values.name);
      const updatedValues: UserObjectProps[] = [
        {
          name: formattedName,
          scores: !isNaN(Number(values.score)) ? [Number(values.score)] : [],
        },
      ];
      handleAddUser(updatedValues);
      setUserScoreList([]);
      methods.reset();
    }
  };

  return (
    <HStack width="200px">
      <Form
        initialValues={{ name: "", score: "" }}
        onSubmit={(values, methods) => handleSubmit(values, methods)}
        formSettings={{
          mode: "onSubmit",
          resetOptions: {
            keepDirty: true,
          },
        }}
        validate={validation}
      >
        <VStack>
          <TextField name="name" label="Name" isRequired={true} />
        </VStack>

        <VStack mt={3}>
          <Field name="score" label="Score" isRequired={true}>
            {({ value, onChange }) => (
              <NumberInput
                value={value}
                onChange={(e) => onChange(Number(e) || "")}
              />
            )}
          </Field>
        </VStack>

        <Button mt={3} type="submit" variant="success">
          Submit
        </Button>
      </Form>
    </HStack>
  );
}
