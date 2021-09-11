export interface UserResponseInterface {
    user: {
        id: number;
        username: string;
        email: string;
        password: string;
        token: string;
    };
}
