// Import necessary modules and services
import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';

// decaring the variables for token and refresh token
const TOKEN_KEY = 'Token';
const REFRESHTOKEN_KEY = 'refreshToken';
@Injectable({
    providedIn: 'root'
})
export class TokenService {
    constructor(
        private localStorage: LocalstorageService // inject the service in constructor
    ) { }

    // save the token in localstorage
    public saveToken(token: string): void {
        localStorage.removeItem(TOKEN_KEY);
        this.localStorage.setItem(TOKEN_KEY, token);
    }

    // get the token in localstorage
    public getToken(): void | string | null {
        return this.localStorage.getItem(TOKEN_KEY);
    }

    // save the refresh token in localstorage
    public saveRefreshToken(token: string): void {
        localStorage.removeItem(REFRESHTOKEN_KEY);
        this.localStorage.setItem(REFRESHTOKEN_KEY, token);
    }

    // get the refresh token in localstorage
    public getRefreshToken(): void | string | null {
        return this.localStorage.getItem(REFRESHTOKEN_KEY);
    }
}