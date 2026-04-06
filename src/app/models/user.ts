export class User {
    id?: number;
    name?: string;
    location?: string;

    constructor(userInfo: { [k in keyof User]: any }) {
        this.id = userInfo.id;
        this.name = userInfo.name;
        this.location = userInfo.location;
    }
}
