import { Container, H1, VStack } from "@northlight/ui";
import React from "react";
import { UserScoresListProps } from "../types/types";

export default function UserScoresList({userScoreList}: UserScoresListProps){

    return (
        <>
            {userScoreList.length === 0 ?
                <H1 maxW={350} width="100%" whiteSpace="nowrap" marginBottom="4" >Select a user!</H1>
                :
                <>
                {userScoreList && userScoreList.length > 0 && (
                <VStack alignItems='flex-start' maxW={350} width="100%">
                        <H1 marginBottom="4" >All the scores for {userScoreList[0].name}</H1>
                        <Container overflowY="scroll" padding={0} maxH={250}>
                            {userScoreList[0].scores.map((score, index) => (
                                <p key={index} style={{marginBottom:"5px"}}>{score}</p>
                            ))}
                        </Container>
                </VStack>
                )}
            </>}
        </>)
}