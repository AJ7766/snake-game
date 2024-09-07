import React, { useEffect } from 'react';
import scores from '../scores';
import users from '../users';
import { Container, HStack, ListItem, UnorderedList, VStack } from '@chakra-ui/react';
import { H1 } from '@northlight/ui';
import {handleScores} from '../_actions/scoreListActions';
import { getInitialData } from '../_actions/userListActions';
import { UserListProps, InitialDataProps } from '../types/types';


export default function UserList({ userList, setUserList, setUserScoreList }: UserListProps){

    useEffect(() => {
        const initialDataProps: InitialDataProps = {
            users: users,
            scores: scores,
            setUserList: setUserList,
        };
        getInitialData(initialDataProps);
    }, [users, scores]);

    return(
            <VStack  flexShrink="0" alignItems='flex-start'>
                <H1 marginBottom="4" >User List</H1>
                <UnorderedList mb={2} margin={0} display='inline' maxH={250} width={200} style={{overflowY: 'scroll'}}>
                    {userList.map((user, index) => (
                        <Container key={index}>
                            <ListItem cursor="pointer" onClick={() => handleScores(userList, user.name, setUserScoreList)}>
                                <p style={{display:'inline'}}>{user.name}&nbsp;-&nbsp;</p>
                                {user.scores.length > 0 && <p style={{display:'inline'}}>{user.scores[0]}</p>}
                            </ListItem>
                        </Container>
                    ))}
                </UnorderedList>
            </VStack>
    )
};