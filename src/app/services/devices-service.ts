import { inject, Injectable, signal } from '@angular/core';
import { HttpService } from './http-service';
import { Device } from '../models/device';
import { CreateDeviceDTO, EditDeviceDTO } from '../dtos/deviceDTOs';

@Injectable({
    providedIn: 'root',
})
export class DevicesService {
    private http = inject(HttpService);
    private readonly _devices = signal<Device[]>([]);
    readonly devices = this._devices.asReadonly();

    async fetchDevices() {
        this.http.get<Device[]>('devices').subscribe({
            next: (value) => {
                this._devices.set(value);
            },
            error: (err) => {
                console.log(err);
            },
            complete: () => {
                console.log('Fetch completed');
            },
        });
    }

    async createDevice(deviceInfo: CreateDeviceDTO) {
        this.http.post<Device>('devices', deviceInfo).subscribe({
            next: () => {
                this.fetchDevices();
            },
            error: (err) => {
                console.log(err);
            },
            complete: () => {
                console.log('Post completed');
            },
        });
    }

    async patchDevice(deviceInfo: EditDeviceDTO) {
        this.http.patch<Device>(`devices/${deviceInfo.id}`, deviceInfo).subscribe({
            next: () => {
                this.fetchDevices();
            },
            error: (err) => {
                console.log(err);
            },
            complete: () => {
                console.log('Patch completed');
            },
        });
    }

    async deleteDevice(id: number) {
        this.http.delete(`devices/${id}`).subscribe({
            next: () => {
                this.fetchDevices();
            },
            error: (err) => {
                console.log(err);
            },
            complete: () => {
                console.log('Delete completed');
            },
        });
    }
}
