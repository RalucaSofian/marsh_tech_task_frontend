import { Component, inject, Signal, OnInit, signal } from '@angular/core';
import { LucideAngularModule, Monitor, Plus, Search } from 'lucide-angular';
import { Button, ButtonSize, ButtonVariant } from '../../components/ui/button/button';
import { Input } from '../../components/ui/input/input';
import { DevicesService } from '../../services/devices-service';
import { Device } from '../../models/device';
import { DeviceCard } from '../../components/device-card/device-card';
import { DeviceDetails } from '../../components/device-details/device-details';
import { Modal } from '../../components/ui/modal/modal';
import { DeviceForm } from '../../components/device-form/device-form';
import { CreateDeviceDTO, EditDeviceDTO } from '../../dtos/deviceDTOs';

@Component({
    selector: 'app-home',
    imports: [LucideAngularModule, Button, Input, DeviceCard, DeviceDetails, Modal, DeviceForm],
    templateUrl: './home.html',
    styleUrl: './home.css',
})
export class Home {
    readonly Monitor = Monitor;
    readonly Plus = Plus;
    readonly Search = Search;
    readonly ButtonVariant = ButtonVariant;
    readonly ButtonSize = ButtonSize;

    devicesService: DevicesService = inject(DevicesService);
    devices: Signal<Device[]> = this.devicesService.devices;

    deleteDeviceModalOpened = signal<boolean>(false);
    deviceToBeDeleted = signal<Device>({});

    addDeviceModalOpened = signal<boolean>(false);

    selectedDeviceId = signal<number>(-1);

    ngOnInit(): void {
        this.devicesService.fetchDevices();
    }

    deviceSelectedHandler(deviceId: number) {
        this.selectedDeviceId.set(deviceId);
    }

    deviceDeleteClicked(deviceId: number) {
        const delDevice = this.devices().find((dev) => dev.id === deviceId);
        this.deviceToBeDeleted.set(delDevice!);
        this.deleteDeviceModalOpened.set(true);
    }

    deviceDeletedHandler(deviceId: number) {
        this.devicesService.deleteDevice(deviceId);
        this.deleteDeviceModalOpened.set(false);
    }

    deviceCreatedHandler(deviceCreated: CreateDeviceDTO) {
        this.devicesService.createDevice(deviceCreated);
        this.addDeviceModalOpened.set(false);
    }

    deviceEditedHandler(deviceEdited: EditDeviceDTO) {
        this.devicesService.patchDevice(deviceEdited);
    }
}
