export interface UserProps {
    _id: number;
    name: string;
}

export interface ScoreProps {
    userId: number;
    score: number;
}

export interface UserObjectProps {
    name: string;
    scores: number[];
}

export interface InitialDataProps {
    users: UserProps[];
    scores: ScoreProps[];
    setUserList: React.Dispatch<React.SetStateAction<UserObjectProps[]>>;
}

export interface AddUserProps {
    setUserList: React.Dispatch<React.SetStateAction<UserObjectProps[]>>;
    setUserScoreList:React.Dispatch<React.SetStateAction<UserObjectProps[]>>;
}

export interface UserListPropsWithSetStatesProps {
    userList: UserObjectProps[];
    setUserList: React.Dispatch<React.SetStateAction<UserObjectProps[]>>;
    setUserScoreList:React.Dispatch<React.SetStateAction<UserObjectProps[]>>;
}

export interface UserListProps {
    userList: UserObjectProps[];
}

export interface FormValueProps {
    name: string;
    score?: number;
};