import { Component, inject, input, output, Signal, signal } from '@angular/core';
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
import { UsersService } from '../../services/users-service';
import { User as UserModel } from '../../models/user';

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
    readonly UserIcon = User;
    readonly ButtonVariant = ButtonVariant;
    readonly ButtonSize = ButtonSize;

    editDeviceModalOpened = signal<boolean>(false);

    usersService: UsersService = inject(UsersService);
    currentUser: Signal<UserModel> = this.usersService.currentUser;

    detailsClosed = output<void>();
    detailsEdited = output<EditDeviceDTO>();

    assignToMe = output<void>();
    unassignFromMe = output<void>();

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

    assignToMeHandler() {
        this.assignToMe.emit();
    }

    unassignFromMeHandler() {
        this.unassignFromMe.emit();
    }

    get assignedUserName(): string | undefined {
        if (this.deviceInfo().assignedUser?.name === this.currentUser().name) {
            return 'Me';
        } else {
            return this.deviceInfo().assignedUser?.name;
        }
    }
}
