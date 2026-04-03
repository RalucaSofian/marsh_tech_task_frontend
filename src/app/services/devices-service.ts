import { inject, Injectable, signal } from '@angular/core';
import { HttpService } from './http-service';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  private http = inject(HttpService);
  private readonly _devices = signal<Device[]>([]);
  readonly devices = this._devices.asReadonly();

  async fetchDevices() {
    this.http.get<Device[]>('devices').subscribe({
      next: (value) => { this._devices.set(value); },
      error: (err) => { console.log(err); },
      complete: () => { console.log('Fetch completed'); }
    });
  }
}
