import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionCode: string | null = null;

  constructor() { }

  setSessionCode(code: string) {
    this.sessionCode = code;
  }

  getSessionCode(): string | null {
    return this.sessionCode;
  }
}
