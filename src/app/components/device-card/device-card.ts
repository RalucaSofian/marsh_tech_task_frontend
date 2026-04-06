import { Component, input, output, signal } from '@angular/core';
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
}
