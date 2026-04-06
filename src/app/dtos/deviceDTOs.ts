import { DeviceType } from '../models/device';

export type CreateDeviceDTO = {
    name: string;
    manufacturer: string;
    type: DeviceType;
    operatingSystem: string;
    osVersion?: string | null;
    processor: string;
    ram: number;
    userId?: number | null;
    description?: string | null;
};

export type EditDeviceDTO = {
    id: number;
    name?: string;
    manufacturer?: string;
    type?: DeviceType;
    operatingSystem?: string;
    osVersion?: string | null;
    processor?: string;
    ram?: number;
    userId?: number | null;
    description?: string | null;
};
