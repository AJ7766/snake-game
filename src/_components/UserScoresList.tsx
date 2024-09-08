import { Container, H1, VStack } from "@northlight/ui";
import React from "react";
import { UserListProps } from "../types/types";

export default function UserScoresList({userList}: UserListProps){

    return (
        <>
            {userList.length === 0 ?
                <H1 maxW={350} width="100%" whiteSpace="nowrap" marginBottom="4" >Select a user!</H1>
                :
                <>
                {userList && userList.length > 0 && (
                <VStack alignItems='flex-start' maxW={350} width="100%">
                        <H1 marginBottom="4" >All the scores for {userList[0].name}</H1>
                        <Container overflowY="scroll" padding={0} maxH={250}>
                            {userList[0].scores.map((score, index) => (
                                <p key={index} style={{marginBottom:"5px"}}>{score}</p>
                            ))}
                        </Container>
                </VStack>
                )}
            </>}
        </>)
}