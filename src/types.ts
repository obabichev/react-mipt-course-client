export type User = {
    _id: string,
    email: string,
    name: string,
}

export type Tokens = {
    accessToken: string,
    accessTokenExpiresIn: number,
    refreshToken: string,
    refreshTokenExpiresIn: number
}

export type Dictionary = {
    key: string;
    value: string;
}

export type Board = {
    _id: string;
    title: string;
    key: string;
    owner?: User;
    category?: Dictionary;
    icon?: Dictionary
}