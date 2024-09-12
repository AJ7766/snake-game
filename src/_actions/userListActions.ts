import { useUserContext } from "../../context/UserContext";
import { ExcelRow } from "../excel-dropzone";
import { InitialDataProps, UserObjectProps } from "../types/types";

const getInitialData = ({ users, scores }: InitialDataProps): Map<string, UserObjectProps> => {
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
    
    return initialUserList;
};

const convertExcelToUserObjects = (excelUsers: ExcelRow[]): Map<string, UserObjectProps> => {
    const convertedExcelList = new Map<string, UserObjectProps>();

    excelUsers.forEach((user) => {
        if (convertedExcelList.has(user.name)) {
            const existingUser = convertedExcelList.get(user.name);
            if (existingUser) {
                existingUser.scores.push(user.score);
            }
        } else {
            const newUser: UserObjectProps = {
                name: user.name,
                scores: [user.score]
            };
            convertedExcelList.set(user.name, newUser);
        }
    });
    return convertedExcelList;
};

const updateUserList = (
    prevUserList: UserObjectProps[],
    newUserList: Map<string, UserObjectProps>
): UserObjectProps[] => {
    const currentUserList = new Map<string, UserObjectProps>();

    prevUserList.forEach(user => {
        currentUserList.set(user.name, { ...user });
    });

    newUserList.forEach((newUser) => {
        if (currentUserList.has(newUser.name)) {
            const existingUser = currentUserList.get(newUser.name);
            if (existingUser) {
                existingUser.scores = Array.from(new Set([...existingUser.scores, ...newUser.scores]));
            }
        } else {
            currentUserList.set(newUser.name, { ...newUser });
        }
    });
    const updatedUserList: UserObjectProps[] = Array.from(currentUserList.values());

    updatedUserList.forEach(user => {
        user.scores.sort((a, b) => b - a);
    });

    updatedUserList.sort((a, b) => {
        const highestScoreA = a.scores[0] || 0;
        const highestScoreB = b.scores[0] || 0;
        return highestScoreB - highestScoreA;
    });
    return updatedUserList;
};

const mergeAndSortUserList = (newUserList: UserObjectProps[]): UserObjectProps[] => {
    const userMap = new Map<string, UserObjectProps>();
    
    newUserList.forEach(newUser => {
        if (userMap.has(newUser.name)) {
            const existingUser = userMap.get(newUser.name);
            if (existingUser) {
                userMap.set(newUser.name, {
                    ...existingUser,
                    scores: Array.from(new Set([...existingUser.scores, ...newUser.scores])),
                });
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
};

export function useUserListActions() {
    const { setUserList } = useUserContext();

    const handleInitialData = (data: InitialDataProps) => {
        const newUserList = getInitialData(data);
        setUserList(prevList => updateUserList(prevList, newUserList));
    };

    const handleExcelConversion = (excelUsers: ExcelRow[]) => {
        const newUserList = convertExcelToUserObjects(excelUsers);
        setUserList(prevList => updateUserList(prevList, newUserList));
    };

    const handleUserListUpdate = (newUsers: UserObjectProps[]) => {
        setUserList(prevList => mergeAndSortUserList([...prevList, ...newUsers]));
    };

    return { handleInitialData, handleExcelConversion, handleUserListUpdate };
}