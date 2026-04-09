import { Component, inject, input, output, Signal, signal } from '@angular/core';
import { Device, DeviceType } from '../../models/device';
import {
    LucideAngularModule,
    User,
    Trash2,
    Laptop,
    Smartphone,
    Tablet,
    LucideIconData,
} from 'lucide-angular';

import { Button, ButtonSize, ButtonVariant } from '../ui/button/button';
import { UsersService } from '../../services/users-service';
import { User as UserModel } from '../../models/user';

@Component({
    selector: 'app-device-card',
    imports: [LucideAngularModule, Button],
    templateUrl: './device-card.html',
    styleUrl: './device-card.css',
})
export class DeviceCard {
    readonly User = User;
    readonly Trash2 = Trash2;
    readonly ButtonVariant = ButtonVariant;
    readonly ButtonSize = ButtonSize;
    readonly DeviceType = DeviceType;

    deviceInfo = input.required<Device>();
    selected = input<boolean>(false);

    usersService: UsersService = inject(UsersService);
    currentUser: Signal<UserModel> = this.usersService.currentUser;

    deviceSelected = output<number>();
    deviceDeleteClicked = output<number>();

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

    get assignedUserName(): string | undefined {
        if (this.deviceInfo().assignedUser?.name === this.currentUser().name) {
            return 'Me';
        } else {
            return this.deviceInfo().assignedUser?.name;
        }
    }
}
