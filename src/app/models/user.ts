export class User {
    id?: number;
    name?: string;
    location?: string;
    role?: string;

    constructor(userInfo: { [k in keyof User]: any }) {
        this.id = userInfo.id;
        this.name = userInfo.name;
        this.location = userInfo.location;
        this.role = userInfo.role;
    }
}
