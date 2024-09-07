export interface UserProps {
    _id: number;
    name: string;
}

export interface ScoreProps {
    userId: number;
    score: number;
}

export interface UserScoreProps {
    name: string;
    scores: number[];
}

export interface InitialDataProps {
    users: UserProps[];
    scores: ScoreProps[];
    setUserList: React.Dispatch<React.SetStateAction<UserScoreProps[]>>;
}

export interface NewUserListProps {
    name: string;
    scores: number[];
}

export interface AddUserProps {
    setUserList: React.Dispatch<React.SetStateAction<UserScoreProps[]>>;
    setUserScoreList:React.Dispatch<React.SetStateAction<UserScoreProps[]>>;
}

export interface UserListProps {
    userList: UserScoreProps[];
    setUserList: React.Dispatch<React.SetStateAction<UserScoreProps[]>>;
    setUserScoreList:React.Dispatch<React.SetStateAction<UserScoreProps[]>>;
}

export interface UserScoresListProps {
    userScoreList: UserScoreProps[];
}