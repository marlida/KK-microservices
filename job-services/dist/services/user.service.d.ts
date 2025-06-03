import { User, UserCreateInput } from "../types/user";
export declare class userService {
    private static clearUserCache;
    private static clearUserCacheById;
    static createUser: (userData: UserCreateInput) => Promise<User>;
    static getUser: () => Promise<User[]>;
    static getUserById: (id: number) => Promise<User | null>;
    static getUserExists: (name: string) => Promise<User | null>;
    static updateUser: (id: number, userData: UserCreateInput) => Promise<User>;
    static deleteUser: (id: number) => Promise<User>;
}
