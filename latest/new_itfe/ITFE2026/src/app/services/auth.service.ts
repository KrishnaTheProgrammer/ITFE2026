import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthModalMode, UserProfile } from '../models/series.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = 'itfe_current_user_v1';

  private readonly userSubject = new BehaviorSubject<UserProfile | null>(this.loadStoredUser());
  readonly currentUser$ = this.userSubject.asObservable();

  private readonly modalModeSubject = new BehaviorSubject<AuthModalMode>(null);
  readonly authModalMode$ = this.modalModeSubject.asObservable();

  get currentUser(): UserProfile | null {
    return this.userSubject.value;
  }

  get isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }

  get authModalMode(): AuthModalMode {
    return this.modalModeSubject.value;
  }

  openModal(mode: 'login' | 'signup'): void {
    this.modalModeSubject.next(mode);
  }

  closeModal(): void {
    this.modalModeSubject.next(null);
  }

  login(user: UserProfile): void {
    this.userSubject.next(user);
    this.saveStoredUser(user);
    this.closeModal();
  }

  loginWithDemo(): void {
    this.login({
      name: 'Guest Explorer',
      email: 'explorer@indiathroughforeigneyes.com'
    });
  }

  logout(): void {
    this.userSubject.next(null);
    this.saveStoredUser(null);
  }

  private loadStoredUser(): UserProfile | null {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? (JSON.parse(raw) as UserProfile) : null;
    } catch {
      return null;
    }
  }

  private saveStoredUser(user: UserProfile | null): void {
    try {
      if (user) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(this.STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  }
}