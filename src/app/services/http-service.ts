import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    private httpClient = inject(HttpClient);
    private baseURL = 'http://localhost:5047';

    get<T>(resourcePath: string, params: any = {}) {
        return this.httpClient.get<T>(`${this.baseURL}/${resourcePath}`, {
            headers: this.getDefaultHeaders(),
            params: params,
        });
    }

    getText(resourcePath: string) {
        return this.httpClient.get(`${this.baseURL}/${resourcePath}`, {
            responseType: 'text',
        });
    }

    post<T>(resourcePath: string, body: any) {
        return this.httpClient.post<T>(`${this.baseURL}/${resourcePath}`, body, {
            headers: this.getDefaultHeaders(),
        });
    }

    patch<T>(resourcePath: string, body: any) {
        return this.httpClient.patch<T>(`${this.baseURL}/${resourcePath}`, body, {
            headers: this.getDefaultHeaders(),
        });
    }

    delete(resourcePath: string) {
        return this.httpClient.delete(`${this.baseURL}/${resourcePath}`);
    }

    private getDefaultHeaders() {
        return {
            'Content-Type': 'application/json',
        };
    }
}
