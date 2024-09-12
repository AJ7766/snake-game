import { useUserContext } from "../../context/UserContext";
import { ExcelRow } from "../excel-dropzone";
import { InitialDataProps, UserObjectProps } from "../types/types";

const getInitialData = ({ users, scores }: InitialDataProps): UserObjectProps[]=> {
    const initialUserMap = new Map<string, UserObjectProps>();

    users.forEach(user => {
        initialUserMap.set(user.name, { name: user.name, scores: [] });
    });

    scores.forEach(score => {
        const user = users.find(user_ => user_._id === score.userId);
        if (user) {
            const existingUser = initialUserMap.get(user.name);
            existingUser && existingUser.scores.push(score.score);
        }
    });
    const updatedUserList: UserObjectProps[] = Array.from(initialUserMap.values());

    return updatedUserList;
};

const convertExcelToUserObjects = (excelUsers: ExcelRow[]): UserObjectProps[] => {
    const convertedExcelMap = new Map<string, UserObjectProps>();

    excelUsers.forEach((user) => {
        if (convertedExcelMap.has(user.name)) {
            const existingUser = convertedExcelMap.get(user.name);
            if (existingUser) {
                existingUser.scores.push(user.score);
            }
        } else {
            const newUser: UserObjectProps = {
                name: user.name,
                scores: [user.score]
            };
            convertedExcelMap.set(user.name, newUser);
        }
    });
    const convertedExcelList: UserObjectProps[] = Array.from(convertedExcelMap.values());

    return convertedExcelList;
};

const mergeAndSortUserList = (mergedList: UserObjectProps[]): UserObjectProps[] => {
    const currentUserList = new Map<string, UserObjectProps>();

    mergedList.forEach(user => {
        currentUserList.set(user.name, { ...user });
    });

    mergedList.forEach((newUser) => {
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

export function useUserListActions() {
    const { setUserList } = useUserContext();

    const handleInitialData = (data: InitialDataProps) => {
        const newUserList = getInitialData(data);
        setUserList(prevList => mergeAndSortUserList([...prevList, ...newUserList]));
    };

    const handleExcelConversion = (excelUsers: ExcelRow[]) => {
        const newUserList = convertExcelToUserObjects(excelUsers);
        setUserList(prevList => mergeAndSortUserList([...prevList, ...newUserList]));
    };

    const handleAddUser = (newUser: UserObjectProps[]) => {
        setUserList(prevList => mergeAndSortUserList([...prevList, ...newUser]));
    };

    return { handleInitialData, handleExcelConversion, handleAddUser };
}