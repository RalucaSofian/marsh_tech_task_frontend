import {
    Component,
    computed,
    effect,
    inject,
    input,
    OnInit,
    output,
    Signal,
    signal,
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    RequiredValidator,
    Validators,
} from '@angular/forms';
import { Device, DeviceType } from '../../models/device';
import { Input } from '../ui/input/input';
import { Button, ButtonSize, ButtonVariant } from '../ui/button/button';
import { CreateDeviceDTO, EditDeviceDTO } from '../../dtos/deviceDTOs';
import { DropdownOption, Dropdown } from '../ui/dropdown/dropdown';
import { UsersService } from '../../services/users-service';
import { User } from '../../models/user';

@Component({
    selector: 'app-device-form',
    imports: [ReactiveFormsModule, Input, Button, Dropdown],
    templateUrl: './device-form.html',
    styleUrl: './device-form.css',
})
export class DeviceForm implements OnInit {
    readonly ButtonVariant = ButtonVariant;
    readonly ButtonSize = ButtonSize;

    deviceInfo = input<Device | null>();
    formTitle = input<string>('');

    usersService: UsersService = inject(UsersService);
    users: Signal<User[]> = this.usersService.users;

    typeOptions: DropdownOption[] = [
        { value: '', display: 'Select Type' },
        { value: DeviceType.Laptop, display: DeviceType.Laptop },
        { value: DeviceType.Phone, display: DeviceType.Phone },
        { value: DeviceType.Tablet, display: DeviceType.Tablet },
    ];

    userOptions: Signal<DropdownOption[]> = computed(() => {
        return [
            { value: null, display: 'Unassigned' },
            ...this.users().map((u) => {
                return { value: u.id as number, display: u.name as string };
            }),
        ];
    });

    deviceEdited = output<EditDeviceDTO>();
    deviceCreated = output<CreateDeviceDTO>();

    formCancelled = output();

    deviceForm = new FormGroup({
        name: new FormControl(this.deviceInfo()?.name, {
            nonNullable: true,
            validators: Validators.required,
        }),
        manufacturer: new FormControl(this.deviceInfo()?.manufacturer, {
            nonNullable: true,
            validators: Validators.required,
        }),
        type: new FormControl(this.deviceInfo()?.type, Validators.required),
        operatingSystem: new FormControl(this.deviceInfo()?.operatingSystem, {
            nonNullable: true,
            validators: Validators.required,
        }),
        osVersion: new FormControl(this.deviceInfo()?.osVersion),
        processor: new FormControl(this.deviceInfo()?.processor, {
            nonNullable: true,
            validators: Validators.required,
        }),
        ram: new FormControl(this.deviceInfo()?.ram, {
            nonNullable: true,
            validators: Validators.required,
        }),
        description: new FormControl(this.deviceInfo()?.description),
        userId: new FormControl(this.deviceInfo()?.assignedUser?.id),
    });

    constructor() {
        effect(() => {
            this.deviceForm = new FormGroup({
                name: new FormControl(this.deviceInfo()?.name, {
                    nonNullable: true,
                    validators: Validators.required,
                }),
                manufacturer: new FormControl(this.deviceInfo()?.manufacturer, {
                    nonNullable: true,
                    validators: Validators.required,
                }),
                type: new FormControl(this.deviceInfo()?.type, Validators.required),
                operatingSystem: new FormControl(this.deviceInfo()?.operatingSystem, {
                    nonNullable: true,
                    validators: Validators.required,
                }),
                osVersion: new FormControl(this.deviceInfo()?.osVersion),
                processor: new FormControl(this.deviceInfo()?.processor, {
                    nonNullable: true,
                    validators: Validators.required,
                }),
                ram: new FormControl(this.deviceInfo()?.ram, {
                    nonNullable: true,
                    validators: Validators.required,
                }),
                description: new FormControl(this.deviceInfo()?.description),
                userId: new FormControl(this.deviceInfo()?.assignedUser?.id),
            });
        });
    }

    ngOnInit(): void {
        this.usersService.fetchUsers();
    }

    onDeviceFormSubmit() {
        if (!this.deviceForm.valid) {
            return;
        }

        const deviceFormValues = this.deviceForm.value;
        const device = this.deviceInfo();

        if (device && device.id) {
            const editedDeviceInfo: EditDeviceDTO = {
                id: device.id,
                name: deviceFormValues.name,
                manufacturer: deviceFormValues.manufacturer,
                type: deviceFormValues.type as DeviceType,
                operatingSystem: deviceFormValues.operatingSystem,
                osVersion: deviceFormValues.osVersion,
                processor: deviceFormValues.processor,
                ram: deviceFormValues.ram,
                userId: deviceFormValues.userId,
                description: deviceFormValues.description,
            };

            this.deviceEdited.emit(editedDeviceInfo);
        }

        const newDeviceInfo: CreateDeviceDTO = {
            name: deviceFormValues.name as string,
            manufacturer: deviceFormValues.manufacturer as string,
            type: deviceFormValues.type as DeviceType,
            operatingSystem: deviceFormValues.operatingSystem as string,
            osVersion: deviceFormValues.osVersion,
            processor: deviceFormValues.processor as string,
            ram: deviceFormValues.ram as number,
            userId: deviceFormValues.userId,
            description: deviceFormValues.description,
        };

        this.deviceCreated.emit(newDeviceInfo);
    }

    typeSelected(selectedType: DeviceType) {
        this.type?.setValue(selectedType);
        this.type?.markAsTouched();
        this.type?.updateValueAndValidity();
    }

    userSelected(selectedUserId: number) {
        this.userId?.setValue(selectedUserId);
        this.userId?.markAsTouched();
        this.userId?.updateValueAndValidity();
    }

    get name() {
        return this.deviceForm.get('name');
    }

    get manufacturer() {
        return this.deviceForm.get('manufacturer');
    }

    get type() {
        return this.deviceForm.get('type');
    }

    get operatingSystem() {
        return this.deviceForm.get('operatingSystem');
    }

    get processor() {
        return this.deviceForm.get('processor');
    }

    get ram() {
        return this.deviceForm.get('ram');
    }

    get userId() {
        return this.deviceForm.get('userId');
    }
}
