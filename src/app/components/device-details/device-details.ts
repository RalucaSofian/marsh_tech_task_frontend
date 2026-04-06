import { Component, input, output, signal } from '@angular/core';
import { Device, DeviceType } from '../../models/device';
import {
    LucideAngularModule,
    Pencil,
    X,
    User,
    LucideIconData,
    Laptop,
    Smartphone,
    Tablet,
} from 'lucide-angular';
import { Button, ButtonSize, ButtonVariant } from '../ui/button/button';
import { DetailRow } from './detail-row/detail-row';
import { Modal } from '../ui/modal/modal';
import { DeviceForm } from '../device-form/device-form';
import { EditDeviceDTO } from '../../dtos/deviceDTOs';

@Component({
    selector: 'app-device-details',
    imports: [LucideAngularModule, Button, DetailRow, Modal, DeviceForm],
    templateUrl: './device-details.html',
    styleUrl: './device-details.css',
})
export class DeviceDetails {
    deviceInfo = input.required<Device>();

    readonly Pencil = Pencil;
    readonly X = X;
    readonly User = User;
    readonly ButtonVariant = ButtonVariant;
    readonly ButtonSize = ButtonSize;

    editDeviceModalOpened = signal<boolean>(false);

    detailsClosed = output<void>();
    detailsEdited = output<EditDeviceDTO>();

    getDeviceIcon(type: DeviceType): LucideIconData {
        switch (type) {
            case DeviceType.Laptop:
                return Laptop;
            case DeviceType.Phone:
                return Smartphone;
            case DeviceType.Tablet:
                return Tablet;
            default:
                return Laptop;
        }
    }

    detailsEditedHandler(deviceInfo: EditDeviceDTO) {
        this.detailsEdited.emit(deviceInfo);
        this.editDeviceModalOpened.set(false);
    }
}
