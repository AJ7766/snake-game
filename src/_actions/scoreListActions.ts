import { UserScoreProps } from "../types/types";

export const handleScores = (
    userList: UserScoreProps[], 
    name: string, 
    setUserScoreList: React.Dispatch<React.SetStateAction<UserScoreProps[]>>
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