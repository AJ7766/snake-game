import { ExcelRow } from "../excel-dropzone";
import { InitialDataProps, UserObjectProps } from "../types/types";

export const getInitialData = ({users, scores, setUserList}: InitialDataProps
) => {
    const initialUserList = new Map<string, UserObjectProps>();

    users.forEach(user => {
        initialUserList.set(user.name, { name: user.name, scores: [] });
    });

    scores.forEach(score => {
        const user = users.find(user_ => user_._id === score.userId);
        if (user) {
            const existingUser = initialUserList.get(user.name);
            existingUser && existingUser.scores.push(score.score);
        }
    });
    
    const updatedUserList:UserObjectProps[] = Array.from(initialUserList.values());
    setNewUserList(updatedUserList, setUserList);
}

export const convertExcelToUserProps = (
    excelUsers: ExcelRow[],
    setUserList: React.Dispatch<React.SetStateAction<UserObjectProps[]>>
) => {
    const convertedExcelList: UserObjectProps[] = [];

    excelUsers.forEach((user)=> {
        const newUser: UserObjectProps = {
            name: user.name,
            scores: [user.score]
        };
        convertedExcelList.push(newUser);
    })
    updateUserList(convertedExcelList, setUserList);
}

export const updateUserList = (
    newUsers: UserObjectProps[],
    setUserList: React.Dispatch<React.SetStateAction<UserObjectProps[]>>,
) => {
    const currentUserList = new Map<string, UserObjectProps>();
    
    newUsers.forEach((newUser) => {
        if (currentUserList.has(newUser.name)) {
            const existingUser = currentUserList.get(newUser.name);
            existingUser && existingUser.scores.push(...newUser.scores)
        }else {
            currentUserList.set(newUser.name, { name: newUser.name, scores: [...newUser.scores] });
        }
    });
    const updatedUserList: UserObjectProps[] = Array.from(currentUserList.values());

    setNewUserList(updatedUserList, setUserList);
};

const setNewUserList = (
    newUserList: UserObjectProps[],
    setUserList: React.Dispatch<React.SetStateAction<UserObjectProps[]>>
) => {

    setUserList(prevUserList => {
    const currentUserList = new Map<string, UserObjectProps>();

        prevUserList.forEach(user => {
            currentUserList.set(user.name, { ...user });
        });
    
        newUserList.forEach(newUser => {
            if (currentUserList.has(newUser.name)) {
                const existingUser = currentUserList.get(newUser.name);
                if (existingUser) {
                    currentUserList.set(newUser.name, {
                        ...existingUser,
                        scores: Array.from(new Set([...existingUser.scores, ...newUser.scores]))
                    })
                }
            } else {
                currentUserList.set(newUser.name, { ...newUser });
            }
        });
    
        const mergedList = Array.from(currentUserList.values());

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