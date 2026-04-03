import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private httpClient = inject(HttpClient);
  private baseURL = 'http://localhost:5047';

  get<T>(resourcePath: string, searchParams: any = {}) {
    return this.httpClient.get<T>(
      `${this.baseURL}/${resourcePath}`,
      {
        headers: this.getDefaultHeaders(),
        params: searchParams,
      },
    );
  }

  patch<T>(resourcePath: string, body: T) {
    return this.httpClient.patch<T>(
      `${this.baseURL}/${resourcePath}`,
      body,
      {
        headers: this.getDefaultHeaders(),
      },
    );
  }

  private getDefaultHeaders() {
    return {
      'Content-Type': 'application/json',
    }
  }
}
