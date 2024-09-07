import { ExcelRow } from "../excel-dropzone";
import { InitialDataProps, NewUserListProps, UserScoreProps } from "../types/types";

export const getInitialData = ({users, scores, setUserList}: InitialDataProps) => {

    const newUserMap = new Map<string, { name: string; scores: number[] }>();

    users.forEach(user => {
        newUserMap.set(user.name, { name: user.name, scores: [] });
    });

    scores.forEach(score => {
        const user = users.find(user_ => user_._id === score.userId);
        if (user) {
            const existingUser = newUserMap.get(user.name);
            if (existingUser) {
                existingUser.scores.push(score.score);
            } else {
                newUserMap.set(user.name, { name: user.name, scores: [score.score] });
            }
        }
    });
    const updatedUserList:NewUserListProps[] = Array.from(newUserMap.values());
    setNewUserList(updatedUserList, setUserList);
}

export const convertExcelToUserProps = (
    excelUsers: ExcelRow[],
    setUserList: React.Dispatch<React.SetStateAction<UserScoreProps[]>>) => {
    
    const convertedExcelList: UserScoreProps[] = [];

    excelUsers.forEach((row)=> {
        const newUser: UserScoreProps = {
            name: row.name,
            scores: [row.score]
        };
        convertedExcelList.push(newUser);
    })
    updateUserList(setUserList, convertedExcelList);
}

export const updateUserList = (
    setUserList: React.Dispatch<React.SetStateAction<UserScoreProps[]>>,
    newUsers: UserScoreProps[],
) => {
    const newUserMap = new Map<string, { name: string; scores: number[] }>();
    
    newUsers.forEach((newUsers) => {
        if (newUserMap.has(newUsers.name)) {
            const existingUser = newUserMap.get(newUsers.name);
            if (existingUser) {
                existingUser.scores.push(...newUsers.scores);
            }
        } else {
            newUserMap.set(newUsers.name, { name: newUsers.name, scores: [...newUsers.scores] });
        }
    });
    const updatedUserList: UserScoreProps[] = Array.from(newUserMap.values());

    setNewUserList(updatedUserList, setUserList);
};

const setNewUserList = (
    newUserList: NewUserListProps[],
    setUserList: React.Dispatch<React.SetStateAction<UserScoreProps[]>>) => {

    setUserList(prevUserList => {
    const userMap = new Map<string, UserScoreProps>();
    
        prevUserList.forEach(user => {
            userMap.set(user.name, { ...user });
        });
    
        newUserList.forEach(newUser => {
            if (userMap.has(newUser.name)) {
                const existingUser = userMap.get(newUser.name);
                if (existingUser) {
                    userMap.set(newUser.name, {
                        ...existingUser,
                        scores: Array.from(new Set([...existingUser.scores, ...newUser.scores]))
                    })
                }
            } else {
                userMap.set(newUser.name, { ...newUser });
            }
        });
    
        const mergedList = Array.from(userMap.values());

        mergedList.forEach(user => {
            user.scores.sort((a, b) => b - a);
        });

        mergedList.sort((a, b) => {
            const highestScoreA = a.scores[0] || 0;
            const highestScoreB = b.scores[0] || 0;
            return highestScoreB - highestScoreA;
        });
        return mergedList;
    });
};