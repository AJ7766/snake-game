import React, { useEffect } from "react";
import scores from "../scores";
import users from "../users";
import {
  Container,
  ListItem,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { H1 } from "@northlight/ui";
import { useUserListActions } from "../_actions/userListActions";
import { InitialDataProps, UserObjectProps } from "../types/types";
import { useUserContext } from "../../context/UserContext";

export default function UserList() {
  const { userList, setUserScoreList } = useUserContext();
  const { handleInitialData } = useUserListActions();
  useEffect(() => {
    const initialDataProps: InitialDataProps = {
      users: users,
      scores: scores,
    };
    handleInitialData(initialDataProps);
  }, [users, scores]);

  const handleScores = (name: string) => {
    const user = userList.find((user) => user.name === name);
    if (user) {
      setUserScoreList([
        {
          name: user.name,
          scores: user.scores,
        },
      ]);
    } else {
      setUserScoreList([]);
    }
  };

  return (
    <VStack flexShrink="0" alignItems="flex-start">
      <H1 marginBottom="4">User List</H1>
      <UnorderedList
        mb={2}
        margin={0}
        display="inline"
        maxH={250}
        width={200}
        style={{ overflowY: "scroll" }}
      >
        {userList.map((user, index) => (
          <Container key={index}>
            <ListItem
              cursor="pointer"
              onClick={() => handleScores(user.name)}
            >
              <p style={{ display: "inline" }}>{user.name}&nbsp;-&nbsp;</p>
              {user.scores.length > 0 && (
                <p style={{ display: "inline" }}>{user.scores[0]}</p>
              )}
            </ListItem>
          </Container>
        ))}
      </UnorderedList>
    </VStack>
  );
}
