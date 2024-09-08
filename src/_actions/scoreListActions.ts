import { UserObjectProps } from "../types/types";

export const handleScores = (
    userList: UserObjectProps[], 
    name: string, 
    setUserScoreList: React.Dispatch<React.SetStateAction<UserObjectProps[]>>
) => {
    const user = userList.find(user => user.name === name);
    if (user) {
        setUserScoreList([{
            name: user.name,
            scores: user.scores
        }]);
    } else {
        setUserScoreList([]);
    }
}