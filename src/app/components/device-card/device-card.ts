import { Component, input, output, signal } from '@angular/core';
import { Device, DeviceType } from '../../models/device';
import { LucideAngularModule, User, Trash2, Laptop, Smartphone, Tablet, LucideIconData } from 'lucide-angular';


import { Button, ButtonSize, ButtonVariant } from "../ui/button/button";
import { Modal } from "../ui/modal/modal";

@Component({
  selector: 'app-device-card',
  imports: [LucideAngularModule, Button, Modal],
  templateUrl: './device-card.html',
  styleUrl: './device-card.css',
})
export class DeviceCard {
  readonly User = User;
  readonly Trash2 = Trash2;
  readonly ButtonVariant = ButtonVariant;
  readonly ButtonSize = ButtonSize;
  readonly DeviceType = DeviceType;
  deleteDeviceModalOpened = signal<boolean>(false);

  deviceInfo = input.required<Device>();
  selected = input<boolean>(false);

  deviceSelected = output<number>();
  deviceDeleted = output<number>();

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
