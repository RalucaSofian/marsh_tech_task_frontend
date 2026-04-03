import { User } from "./user";

export enum DeviceType {
    Laptop = 'Laptop',
    Phone = 'Phone',
    Tablet = 'Tablet',
}

export class Device {
    id?: number;
    name?: string;
    manufacturer?: string;
    type?: DeviceType;
    operatingSystem?: string;
    osVersion?: string;
    processor?: string;
    ram?: number;
    assignedUser?: User;
    description?: string;

    constructor(deviceInfo: { [k in keyof Device]: any }) {
        this.id = deviceInfo.id;
        this.name = deviceInfo.name;
        this.manufacturer = deviceInfo.manufacturer;
        this.type = deviceInfo.type;
        this.operatingSystem = deviceInfo.operatingSystem;
        this.osVersion = deviceInfo.osVersion;
        this.processor = deviceInfo.processor;
        this.ram = deviceInfo.ram;
        this.assignedUser = deviceInfo.assignedUser;
        this.description = deviceInfo.description;
    }
}
