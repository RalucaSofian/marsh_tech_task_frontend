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
import { User } from '../../models/user';
import { UsersService } from '../../services/users-service';
import { AuthService } from '../../services/auth-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-home',
    imports: [
        LucideAngularModule,
        Button,
        Input,
        DeviceCard,
        DeviceDetails,
        Modal,
        ReactiveFormsModule,
        DeviceForm,
    ],
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
    authService: AuthService = inject(AuthService);

    deleteDeviceModalOpened = signal<boolean>(false);
    deviceToBeDeleted = signal<Device>({});

    addDeviceModalOpened = signal<boolean>(false);

    selectedDeviceId = signal<number>(-1);

    searchForm = new FormGroup({
        searchTerm: new FormControl(''),
    });

    usersService: UsersService = inject(UsersService);
    currentUser: Signal<User> = this.usersService.currentUser;

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

    assignToMeHandler() {
        const newDeviceInfo: EditDeviceDTO = {
            id: this.selectedDeviceId(),
            userId: this.currentUser().id,
        };
        this.devicesService.patchDevice(newDeviceInfo);
        this.devicesService.fetchDevices();
    }

    unassignFromMeHandler() {
        const newDeviceInfo: EditDeviceDTO = {
            id: this.selectedDeviceId(),
            userId: null,
        };
        this.devicesService.patchDevice(newDeviceInfo);
        this.devicesService.fetchDevices();
    }

    public searchHandler() {
        console.log(this.searchForm.value.searchTerm);
        this.devicesService.fetchDevices(this.searchForm.value.searchTerm as string);
    }

    public clearSearch() {
        this.searchForm.get('searchTerm')?.reset;
        this.devicesService.fetchDevices();
    }

    logOutHandler() {
        this.authService.logout();
    }
}
