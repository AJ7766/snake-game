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
}

export interface UserListPropsWithSetStatesProps {
    userList: UserObjectProps[];
}

export interface UserListProps {
    userList: UserObjectProps[];
}

export interface FormValueProps {
    name: string;
    score: string | number;
};