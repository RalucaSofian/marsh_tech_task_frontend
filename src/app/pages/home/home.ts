import { Component, inject, Signal, OnInit, signal } from '@angular/core';
import { LucideAngularModule, Monitor, Plus, Search} from 'lucide-angular';
import { Button, ButtonSize, ButtonVariant } from "../../components/ui/button/button";
import { Input } from "../../components/ui/input/input";
import { DevicesService } from '../../services/devices-service';
import { Device } from '../../models/device';
import { DeviceCard } from "../../components/device-card/device-card";
import { DeviceDetails } from "../../components/device-details/device-details";


@Component({
  selector: 'app-home',
  imports: [LucideAngularModule, Button, Input, DeviceCard, DeviceDetails],
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

  selectedDeviceId = signal<number>(-1);

  ngOnInit(): void {
    this.devicesService.fetchDevices();
  }

  deviceSelectedHandler(deviceId: number) {
    this.selectedDeviceId.set(deviceId);
  }

  deviceDeletedHandler(deviceId: number) {
    console.log('SHOULD DELETE DEVICE');
    console.log(deviceId);
  }

}
