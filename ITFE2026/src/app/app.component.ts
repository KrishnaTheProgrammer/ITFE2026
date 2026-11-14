import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Episode {
  number: number;
  title: string;
  flag: string;
  country: string;
  status: 'Coming Soon' | 'Upcoming';
  duration: string;
  location: string;
  synopsis: string;
  highlights: string[];
}

export interface CultureBadge {
  flag: string;
  country: string;
}

export interface UserProfile {
  name: string;
  email: string;
}

@Component({
  selector: 'app-root',
  template: `
    <div id="top" class="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-white antialiased">
      <!-- Navbar -->
      <header class="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 backdrop-blur-md shadow-2xl">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div class="flex items-center gap-6 sm:gap-10">
            <a href="#top" class="flex items-center gap-3.5 group focus:outline-none">
              <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-400 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform border border-emerald-400/30">
                CL
              </div>
              <span class="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                CLIRISH <span class="text-xs font-sans tracking-widest text-amber-400 uppercase block font-semibold">India Through Foreign Eyes</span>
              </span>
            </a>
            <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
              <a href="#episodes" class="hover:text-amber-400 transition-colors">Episodes (11)</a>
              <a href="#cultures" class="hover:text-amber-400 transition-colors">Cultures</a>
              <a href="#mission" class="hover:text-amber-400 transition-colors">Why This Journey?</a>
            </nav>
          </div>

          <!-- Top Right Login & Sign In Controls -->
          <div class="flex items-center gap-3">
            <ng-container *ngIf="currentUser; else loggedOutTpl">
              <div class="flex items-center gap-3">
                <div class="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-medium shadow-inner">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>All 11 Episodes Unlocked</span>
                </div>
                <div class="flex items-center gap-2 bg-slate-900 border border-white/15 rounded-full pl-2.5 pr-4 py-1.5 shadow-md">
                  <span class="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold uppercase shadow">
                    {{ currentUser.name.charAt(0) }}
                  </span>
                  <span class="text-xs sm:text-sm font-semibold text-slate-200 max-w-[120px] sm:max-w-[160px] truncate">
                    {{ currentUser.name }}
                  </span>
                </div>
                <button
                  type="button"
                  (click)="logout()"
                  class="px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-slate-300 hover:text-white border border-white/15 bg-slate-900 hover:bg-slate-800 transition-all cursor-pointer shadow-md"
                >
                  Log Out
                </button>
              </div>
            </ng-container>

            <ng-template #loggedOutTpl>
              <button
                type="button"
                (click)="openModal('login')"
                class="px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-slate-200 hover:text-white border border-white/15 hover:border-amber-400 bg-slate-900 hover:bg-slate-800 transition-all cursor-pointer shadow-md"
              >
                Log In
              </button>
              <button
                type="button"
                (click)="openModal('signup')"
                class="px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 hover:from-amber-300 hover:to-orange-300 shadow-xl shadow-amber-500/20 transition-all cursor-pointer border border-amber-300/40"
              >
                Sign In / Sign Up
              </button>
            </ng-template>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1">
        <!-- Hero Section with Clear Sliding Background Images & Modern Styling -->
        <section class="relative overflow-hidden border-b border-white/10 py-24 sm:py-36 bg-slate-900">
          <!-- Background Image Slider with Crystal Clear Visibility -->
          <div class="absolute inset-0 z-0 overflow-hidden">
            <div
              *ngFor="let img of heroImages; let i = index"
              class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out scale-100"
              [style.backgroundImage]="'url(' + img + ')'"
              [ngClass]="activeHeroIndex === i ? 'opacity-40 scale-100' : 'opacity-0 scale-105'"
            ></div>
            <!-- Elegant multi-layer gradients to keep images vibrant yet readable -->
            <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/70"></div>
          </div>

          <!-- Hero Content -->
          <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl">
              <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-6 shadow-xl backdrop-blur-md">
                <span>Documentary &amp; Street Interview Series</span>
                <span class="text-amber-400">•</span>
                <span>Season 1</span>
              </div>
              <h1 class="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                India Through
                <span class="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 drop-shadow-sm">
                  Foreign Eyes
                </span>
              </h1>
              <p class="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-light">
                A street interview series exploring how people around the world see India.
              </p>
              <div class="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#episodes"
                  class="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-bold text-sm sm:text-base shadow-2xl shadow-amber-500/30 transition-all border border-amber-300/50"
                >
                  <span>Explore The Journey</span>
                  <span class="text-lg">↓</span>
                </a>
                <ng-container *ngIf="!currentUser; else activeHeroBadge">
                  <button
                    type="button"
                    (click)="openModal('signup')"
                    class="inline-flex items-center gap-2.5 px-7 py-4 rounded-full border border-white/20 bg-white/10 hover:bg-white/15 text-white font-medium text-sm sm:text-base backdrop-blur-md transition-all cursor-pointer shadow-xl"
                  >
                    🔒 Sign In to Unlock All 11 Episodes
                  </button>
                </ng-container>
                <ng-template #activeHeroBadge>
                  <div class="inline-flex items-center gap-2.5 px-6 py-4 rounded-full border border-emerald-400/40 bg-emerald-500/15 text-emerald-300 text-sm font-semibold backdrop-blur-md shadow-xl">
                    ✓ Full Season 1 Access Active
                  </div>
                </ng-template>
              </div>

              <!-- Slider Navigation Dots with Stylish Glow -->
              <div class="mt-14 flex items-center gap-2.5">
                <button
                  type="button"
                  *ngFor="let img of heroImages; let i = index"
                  (click)="activeHeroIndex = i"
                  class="h-2 rounded-full transition-all cursor-pointer shadow-md"
                  [ngClass]="activeHeroIndex === i ? 'w-10 bg-amber-400 ring-2 ring-amber-400/40' : 'w-3 bg-white/30 hover:bg-white/60'"
                  [attr.aria-label]="'Slide ' + (i + 1)"
                ></button>
              </div>
            </div>
          </div>
        </section>

        <!-- Premise Banner -->
        <section class="py-20 border-b border-white/10 bg-slate-900/50">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <span class="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">The Premise</span>
            <h2 class="mt-3 font-serif text-3xl sm:text-5xl font-bold text-white">One Country. Many Perspectives.</h2>
            <p class="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              India is more than stereotypes, headlines and assumptions. Through conversations with people from different countries, this series discovers their thoughts, experiences and curiosity about India.
            </p>
          </div>
        </section>

        <!-- Episodes Section -->
        <section id="episodes" class="py-20 sm:py-28 border-b border-white/10 bg-slate-950">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span class="text-amber-400 text-xs font-semibold uppercase tracking-wider">Episodes • Global Street Interviews</span>
                <h2 class="mt-2 font-serif text-3xl sm:text-5xl font-bold text-white">Season 1 — 11 Conversations</h2>
              </div>
              <div class="flex flex-wrap items-center gap-3">
                <button
                  *ngIf="selectedCountry"
                  type="button"
                  (click)="clearCountryFilter()"
                  class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 text-xs font-semibold cursor-pointer shadow-lg"
                >
                  <span>Showing: {{ selectedCountry }}</span>
                  <span class="text-amber-300 font-bold">✕</span>
                </button>
                <ng-container *ngIf="currentUser; else lockedStatusPill">
                  <span class="px-4.5 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-xs font-semibold shadow-lg">
                    🔓 Unlocked (All 11 episodes visible)
                  </span>
                </ng-container>
                <ng-template #lockedStatusPill>
                  <button
                    type="button"
                    (click)="openModal('login')"
                    class="px-4.5 py-2 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-semibold cursor-pointer shadow-lg hover:bg-amber-500/25 transition-colors"
                  >
                    🔒 Previewing 3 of 11 — Log In to Unlock All
                  </button>
                </ng-template>
              </div>
            </div>

            <!-- Episodes Grid with Stylish Modern Borders -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <!-- Visible / Unlocked Episodes -->
              <article
                *ngFor="let ep of visibleEpisodes"
                (click)="handleEpisodeClick(ep)"
                class="group relative rounded-3xl bg-slate-900/90 border border-white/10 hover:border-amber-400/60 p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/15 cursor-pointer h-full backdrop-blur-md"
              >
                <div>
                  <div class="flex items-center justify-between gap-2 mb-5">
                    <span class="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/30">
                      Episode {{ ep.number }}
                    </span>
                    <span class="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/5 text-slate-300 border border-white/10">
                      {{ ep.status }}
                    </span>
                  </div>
                  <h3 class="font-serif text-2xl font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {{ ep.title }}
                  </h3>
                  <p class="mt-3.5 text-sm text-slate-400 line-clamp-3 leading-relaxed">
                    {{ ep.synopsis }}
                  </p>
                </div>
                <div class="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
                  <div class="flex items-center gap-2.5 text-sm font-medium text-slate-200">
                    <span class="text-xl">{{ ep.flag }}</span>
                    <span>{{ ep.country }}</span>
                  </div>
                  <span class="text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Details →
                  </span>
                </div>
              </article>

              <!-- Locked Teasers (Episodes 4-11 when logged out) -->
              <ng-container *ngIf="!currentUser && !selectedCountry">
                <article
                  *ngFor="let ep of lockedTeasers"
                  (click)="openModal('login')"
                  class="relative rounded-3xl bg-slate-900/90 border border-white/10 p-7 flex flex-col justify-between overflow-hidden cursor-pointer group h-full shadow-xl"
                >
                  <div class="blur-[6px] select-none opacity-40">
                    <div class="flex items-center justify-between gap-2 mb-5">
                      <span class="text-xs font-bold uppercase tracking-wider text-amber-400">Episode {{ ep.number }}</span>
                      <span class="px-3 py-1 rounded-full text-[11px] bg-white/5 text-slate-300">{{ ep.status }}</span>
                    </div>
                    <h3 class="font-serif text-2xl font-bold text-white">{{ ep.title }}</h3>
                    <p class="mt-3.5 text-sm text-slate-400">{{ ep.synopsis }}</p>
                    <div class="mt-8 pt-5 border-t border-white/10 flex items-center gap-2.5 text-sm text-slate-200">
                      <span>{{ ep.flag }}</span>
                      <span>{{ ep.country }}</span>
                    </div>
                  </div>
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/80 to-slate-950/60 flex flex-col items-center justify-center p-6 text-center backdrop-blur-xs">
                    <div class="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-3 group-hover:scale-110 transition-transform shadow-xl">
                      🔒
                    </div>
                    <span class="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Episode {{ ep.number }} • {{ ep.flag }} {{ ep.country }}
                    </span>
                    <p class="mt-1 text-sm font-bold text-white">Member Exclusive Preview</p>
                    <span class="mt-3 text-xs font-semibold text-amber-400 underline underline-offset-4">Log In or Sign In to Unlock</span>
                  </div>
                </article>
              </ng-container>
            </div>

            <!-- Unlock Banner -->
            <div *ngIf="!currentUser" class="mt-14 rounded-3xl border border-amber-400/40 bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
              <div class="text-center lg:text-left max-w-2xl">
                <span class="inline-block px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold mb-4 shadow-lg">
                  🔒 8 More Episodes Waiting
                </span>
                <h3 class="font-serif text-2xl sm:text-4xl font-bold text-white">Log In or Sign In to View All 11 Episodes</h3>
                <p class="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                  Create a free viewer pass in seconds to unlock Episodes 4 through 11—featuring voices from Germany, USA, Japan, Italy, Spain, Canada, Australia, and around the world.
                </p>
              </div>
              <div class="flex items-center gap-4 shrink-0">
                <button
                  type="button"
                  (click)="openModal('login')"
                  class="px-7 py-3.5 rounded-full text-sm font-semibold text-slate-200 border border-white/20 bg-white/5 hover:bg-white/10 transition-all cursor-pointer shadow-lg"
                >
                  Log In
                </button>
                <button
                  type="button"
                  (click)="openModal('signup')"
                  class="px-8 py-3.5 rounded-full text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 shadow-xl shadow-amber-500/25 transition-all cursor-pointer border border-amber-300/40"
                >
                  Sign In Free
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Cultures Filter Section -->
        <section id="cultures" class="py-20 sm:py-28 border-b border-white/10 bg-slate-900/60">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto mb-14">
            <span class="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">Global Voices</span>
            <h2 class="mt-2 font-serif text-3xl sm:text-5xl font-bold text-white">India Seen Through Different Cultures</h2>
            <p class="mt-4 text-sm sm:text-base text-slate-300">Select a country below to highlight conversations from that perspective.</p>
            
            <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button
                *ngFor="let culture of featuredCultures"
                type="button"
                (click)="toggleCulture(culture.country)"
                class="flex items-center gap-3.5 px-6 py-4 rounded-2xl border transition-all cursor-pointer shadow-xl"
                [ngClass]="
                  selectedCountry === culture.country
                    ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-amber-500/25 scale-105'
                    : 'bg-slate-900 border-white/10 hover:border-amber-400/50 text-slate-200 hover:bg-slate-800'
                "
              >
                <span class="text-2xl">{{ culture.flag }}</span>
                <span class="font-medium text-sm sm:text-base">{{ culture.country }}</span>
              </button>
            </div>
          </div>
        </section>

        <!-- Mission Section -->
        <section id="mission" class="py-24 sm:py-32 text-center max-w-4xl mx-auto px-4 sm:px-6 bg-slate-950">
          <span class="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">Our Mission</span>
          <h2 class="mt-3 font-serif text-3xl sm:text-5xl font-bold text-white">Why This Journey?</h2>
          <p class="mt-6 text-base sm:text-xl text-slate-300 leading-relaxed font-light">
            To understand how India is perceived by the world, challenge stereotypes, and create meaningful conversations between cultures.
          </p>
          <blockquote class="mt-12 pt-12 border-t border-white/10 italic text-2xl sm:text-4xl text-amber-300 font-serif">
            "Every country is more than its stereotypes."
          </blockquote>
        </section>
      </main>

      <!-- Footer -->
      <footer class="border-t border-white/10 py-10 bg-slate-950 text-slate-400">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <div class="flex items-center gap-2.5">
            <span class="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">CL</span>
            <span class="font-medium text-slate-300">CLIRISH • India Through Foreign Eyes © 2026</span>
          </div>
          <div class="flex items-center gap-6">
            <a href="#top" class="hover:text-amber-400 transition-colors">Top</a>
            <a href="#episodes" class="hover:text-amber-400 transition-colors">Episodes</a>
            <a href="#cultures" class="hover:text-amber-400 transition-colors">Cultures</a>
          </div>
        </div>
      </footer>

      <!-- Auth Modal -->
      <div *ngIf="authModalMode" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md" (click)="closeModal()">
        <div class="w-full max-w-md rounded-3xl bg-slate-900 border border-white/20 p-7 sm:p-9 shadow-2xl relative" (click)="$event.stopPropagation()">
          <button
            type="button"
            (click)="closeModal()"
            class="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            ✕
          </button>

          <div class="flex p-1.5 rounded-full bg-slate-950 border border-white/10 mb-7 w-fit">
            <button
              type="button"
              (click)="switchModalMode('login')"
              class="px-5 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all"
              [ngClass]="authModalMode === 'login' ? 'bg-amber-400 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200'"
            >
              Log In
            </button>
            <button
              type="button"
              (click)="switchModalMode('signup')"
              class="px-5 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all"
              [ngClass]="authModalMode === 'signup' ? 'bg-amber-400 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200'"
            >
              Sign Up
            </button>
          </div>

          <h3 class="font-serif text-3xl font-bold text-white">
            {{ authModalMode === 'login' ? 'Welcome Back' : 'Unlock All 11 Episodes' }}
          </h3>
          <p class="mt-2 text-sm text-slate-400 font-light">
            {{ authModalMode === 'login' ? 'Log in to access the full Season 1 collection.' : 'Create a free viewer pass in seconds.' }}
          </p>

          <div *ngIf="errorMessage" class="mt-4 p-3.5 rounded-2xl bg-red-500/20 border border-red-500/40 text-xs text-red-300">
            {{ errorMessage }}
          </div>

          <!-- Google Sign In Simulation Button -->
          <div class="mt-7">
            <button
              type="button"
              (click)="loginWithGoogle()"
              class="w-full py-3.5 px-4 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white border border-white/15 font-medium text-sm shadow-xl flex items-center justify-center gap-3 transition-all cursor-pointer"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.15 21.32 7.23 24 12 24z"/>
                <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.18C.43 8.13 0 9.83 0 12s.43 3.87 1.18 5.39l4.09-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.15 2.68 1.18 6.61l4.09 3.15c.95-2.85 3.6-4.96 6.73-4.96z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <div class="relative flex py-5 items-center">
            <div class="flex-grow border-t border-white/10"></div>
            <span class="flex-shrink mx-4 text-xs text-slate-400 uppercase tracking-widest font-medium">or email</span>
            <div class="flex-grow border-t border-white/10"></div>
          </div>

          <form [formGroup]="authForm" (ngSubmit)="submitAuth()" class="space-y-4">
            <div *ngIf="authModalMode === 'signup'">
              <label class="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
              <input
                type="text"
                formControlName="name"
                placeholder="Aarav Sharma"
                class="w-full px-4.5 py-3 rounded-2xl bg-slate-950 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <input
                type="email"
                formControlName="email"
                placeholder="you@gmail.com"
                class="w-full px-4.5 py-3 rounded-2xl bg-slate-950 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <input
                type="password"
                formControlName="password"
                placeholder="••••••••"
                class="w-full px-4.5 py-3 rounded-2xl bg-slate-950 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
              />
            </div>
            <button
              type="submit"
              class="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 cursor-pointer transition-all border border-amber-300/40 mt-2"
            >
              {{ authModalMode === 'login' ? 'Log In & Unlock Episodes' : 'Create Account & Unlock All' }}
            </button>
          </form>

          <div class="mt-6 pt-6 border-t border-white/10 text-center">
            <button
              type="button"
              (click)="demoLogin()"
              class="w-full py-3 rounded-2xl border border-white/15 bg-slate-950 hover:bg-slate-800 text-xs font-semibold text-amber-300 cursor-pointer transition-colors shadow-md"
            >
              ⚡ Instant Guest Explorer Access
            </button>
          </div>
        </div>
      </div>

      <!-- Episode Modal -->
      <div *ngIf="activeEpisode as ep" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md" (click)="closeEpisodeModal()">
        <div class="w-full max-w-2xl rounded-3xl bg-slate-900 border border-white/20 p-7 sm:p-10 shadow-2xl relative" (click)="$event.stopPropagation()">
          <button
            type="button"
            (click)="closeEpisodeModal()"
            class="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            ✕
          </button>
          <div class="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span>Episode {{ ep.number }}</span>
            <span>•</span>
            <span>{{ ep.flag }} {{ ep.country }}</span>
          </div>
          <h3 class="mt-3 font-serif text-3xl sm:text-4xl font-bold text-white">{{ ep.title }}</h3>
          <p class="mt-2 text-xs text-slate-400 font-medium">📍 {{ ep.location }} • Runtime: {{ ep.duration }}</p>
          <p class="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-light">{{ ep.synopsis }}</p>
          <div class="mt-6 rounded-2xl bg-slate-950 border border-white/10 p-5 shadow-inner">
            <h4 class="text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">Highlights</h4>
            <ul class="space-y-2.5 text-sm text-slate-300">
              <li *ngFor="let pt of ep.highlights" class="flex items-start gap-2.5">
                <span class="text-amber-400 font-bold">✦</span>
                <span>{{ pt }}</span>
              </li>
            </ul>
          </div>
          <div class="mt-8 flex justify-end">
            <button
              type="button"
              (click)="closeEpisodeModal()"
              class="px-7 py-3 rounded-full text-xs sm:text-sm font-semibold text-slate-200 border border-white/20 hover:bg-white/10 cursor-pointer shadow-lg transition-colors"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  currentUser: UserProfile | null = this.loadStoredUser();
  authModalMode: 'login' | 'signup' | null = null;
  selectedCountry: string | null = null;
  activeEpisode: Episode | null = null;
  errorMessage: string | null = null;

  activeHeroIndex = 0;
  private heroInterval: any;

  readonly heroImages: string[] = [
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1920&q=85', // Taj Mahal / Heritage
    'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1920&q=85', // Modern Delhi / Architecture
    'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=85', // Vibrant Culture & Festivities
    'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1920&q=85'  // Rising India / Cityscape
  ];

  authForm: FormGroup;

  readonly featuredCultures: CultureBadge[] = [
    { flag: '🇮🇪', country: 'Ireland' },
    { flag: '🇬🇧', country: 'United Kingdom' },
    { flag: '🇫🇷', country: 'France' },
    { flag: '🇩🇪', country: 'Germany' },
    { flag: '🇺🇸', country: 'USA' },
    { flag: '🇯🇵', country: 'Japan' },
    { flag: '🇨🇦', country: 'Canada' },
  ];

  readonly episodes: Episode[] = [
    {
      number: 1,
      title: 'What Comes To Your Mind When You Hear India?',
      flag: '🇮🇪',
      country: 'Ireland',
      status: 'Coming Soon',
      duration: '14 min',
      location: 'Dublin & Galway, Ireland',
      synopsis: 'Unfiltered street reactions across Ireland as locals share the very first images, stories, and emotions that come to mind when they hear the word India.',
      highlights: ['Spontaneous word-association responses', 'Shared cultural warmth and hospitality', 'Curiosity around Indian festivals']
    },
    {
      number: 2,
      title: 'India Beyond Stereotypes',
      flag: '🇬🇧',
      country: 'United Kingdom',
      status: 'Upcoming',
      duration: '16 min',
      location: 'London & Manchester, UK',
      synopsis: 'A candid look at how modern Britain perceives contemporary India—moving past historical clichés toward today’s innovation, art, and everyday life.',
      highlights: ['Generational shifts in UK perceptions', 'British-Indian friendships', 'Surprising modern narratives']
    },
    {
      number: 3,
      title: 'First Impressions of India',
      flag: '🇫🇷',
      country: 'France',
      status: 'Upcoming',
      duration: '15 min',
      location: 'Paris & Lyon, France',
      synopsis: 'From sensory memories of vibrant colors and cinema to philosophical curiosity, French passersby reflect on their first impressions of India.',
      highlights: ['Art and architectural impressions', 'Travelers recounting their first landing', 'What Parisians wish to know']
    },
    {
      number: 4,
      title: 'What Surprises People About India?',
      flag: '🇩🇪',
      country: 'Germany',
      status: 'Upcoming',
      duration: '15 min',
      location: 'Berlin & Munich, Germany',
      synopsis: 'Conversations in Germany uncovering the contrasts that surprise people most—from India’s rapid digital transformation to centuries-old traditions.',
      highlights: ['Reactions to scale and technology', 'Expectations vs lived experiences', 'Reflections on family life']
    },
    {
      number: 5,
      title: 'Questions Foreigners Want To Ask Indians',
      flag: '🇺🇸',
      country: 'USA',
      status: 'Upcoming',
      duration: '18 min',
      location: 'New York & Chicago, USA',
      synopsis: 'Giving people in the United States the microphone to ask the honest, curious, and heartfelt questions they have always wanted to ask Indians.',
      highlights: ['Questions about daily life across 28 states', 'Regional cuisines', 'Open dialogue built on respect']
    },
    {
      number: 6,
      title: 'India Through A Different Lens',
      flag: '🇯🇵',
      country: 'Japan',
      status: 'Upcoming',
      duration: '14 min',
      location: 'Tokyo & Kyoto, Japan',
      synopsis: 'Exploring the subtle cultural threads connecting Japan and India—from ancient spiritual roots to modern mutual admiration.',
      highlights: ['Historical spiritual connections', 'Respect for craftsmanship', 'Stories from Japanese travelers']
    },
    {
      number: 7,
      title: 'Culture, Food And Traditions',
      flag: '🇮🇹',
      country: 'Italy',
      status: 'Upcoming',
      duration: '15 min',
      location: 'Rome & Milan, Italy',
      synopsis: 'Two cultures deeply passionate about family, heritage, and culinary craft come together in lively street conversations across Italy.',
      highlights: ['Regional food pride', 'Celebrations and weddings', 'Why food is a cultural bridge']
    },
    {
      number: 8,
      title: 'Beyond What Media Shows',
      flag: '🇪🇸',
      country: 'Spain',
      status: 'Upcoming',
      duration: '13 min',
      location: 'Madrid & Barcelona, Spain',
      synopsis: 'How headlines shape global perception—and what happens when people look beyond news cycles to discover human stories.',
      highlights: ['Gaps between news and reality', 'Music and human warmth', 'Personal encounters']
    },
    {
      number: 9,
      title: "A Stranger's View Of India",
      flag: '🇨🇦',
      country: 'Canada',
      status: 'Upcoming',
      duration: '16 min',
      location: 'Toronto & Vancouver, Canada',
      synopsis: 'In some of the world’s most multicultural neighborhoods, Canadians share how everyday interactions shape their view of India.',
      highlights: ['Neighborhood stories', 'Festivals bringing communities together', 'Reflections on identity']
    },
    {
      number: 10,
      title: 'India: Reality Vs Expectations',
      flag: '🇦🇺',
      country: 'Australia',
      status: 'Upcoming',
      duration: '17 min',
      location: 'Melbourne & Sydney, Australia',
      synopsis: 'Australians compare what they expected before visiting India with the unforgettable realities they experienced on the ground.',
      highlights: ['Solo backpacker stories', 'Landscapes and people', 'Comfort zone growth']
    },
    {
      number: 11,
      title: 'The World Talks About India',
      flag: '🌎',
      country: 'Global',
      status: 'Upcoming',
      duration: '22 min',
      location: 'Season 1 Finale • Worldwide',
      synopsis: 'The Season 1 finale weaving together voices from every continent into one shared mosaic of curiosity, empathy, and global perspective.',
      highlights: ['Global highlights', 'Common threads uniting the world', 'Looking ahead to Season 2']
    }
  ];

  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {
    this.heroInterval = setInterval(() => {
      this.activeHeroIndex = (this.activeHeroIndex + 1) % this.heroImages.length;
    }, 6000);
  }

  ngOnDestroy(): void {
    if (this.heroInterval) {
      clearInterval(this.heroInterval);
    }
  }

  submitAuth(): void {
    this.errorMessage = null;
    const { name, email, password } = this.authForm.value;

    if (!email || !email.includes('@')) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }
    if (!password || password.length < 4) {
      this.errorMessage = 'Please enter a password of at least 4 characters.';
      return;
    }

    const derivedName =
      (name && name.trim()) ||
      email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());

    this.loginUser({
      name: derivedName,
      email: email.trim()
    });
  }

  loginWithGoogle(): void {
    // Simulate real browser Google Account auto-detection & permission popup
    const accounts = [
      { name: 'Krish Chavare', email: 'krishchavare@gmail.com' },
      { name: 'Explorer User', email: 'user.india@gmail.com' },
      { name: 'Global Guest', email: 'foreign.eyes.viewer@gmail.com' }
    ];

    // Pick primary detected system account or allow quick confirmation
    const detected = accounts[0];
    const confirmed = confirm(`Sign in to India Through Foreign Eyes with Google Account:\n\n👤 ${detected.name}\n📧 ${detected.email}\n\nClick OK to allow access.`);
    
    if (confirmed) {
      this.loginUser({
        name: detected.name,
        email: detected.email
      });
    }
  }

  loginUser(user: UserProfile): void {
    this.currentUser = user;
    localStorage.setItem('itfe_user', JSON.stringify(user));
    this.closeModal();
  }

  get filteredEpisodes(): Episode[] {
    if (!this.selectedCountry) return this.episodes;
    return this.episodes.filter(e => e.country === this.selectedCountry);
  }

  get visibleEpisodes(): Episode[] {
    const list = this.filteredEpisodes;
    if (this.currentUser || this.selectedCountry) return list;
    return list.slice(0, 3);
  }

  get lockedTeasers(): Episode[] {
    if (this.currentUser || this.selectedCountry) return [];
    return this.filteredEpisodes.slice(3, 6);
  }

  openModal(mode: 'login' | 'signup'): void {
    this.authModalMode = mode;
    this.errorMessage = null;
    this.authForm.reset();
  }

  closeModal(): void {
    this.authModalMode = null;
    this.errorMessage = null;
    this.authForm.reset();
  }

  switchModalMode(mode: 'login' | 'signup'): void {
    this.authModalMode = mode;
    this.errorMessage = null;
  }

  demoLogin(): void {
    this.loginUser({ name: 'Guest Explorer', email: 'explorer@indiathroughforeigneyes.com' });
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('itfe_user');
  }

  toggleCulture(country: string): void {
    if (!this.currentUser) {
      const ep = this.episodes.find(e => e.country === country);
      if (ep && ep.number > 3) {
        this.openModal('login');
        return;
      }
    }
    this.selectedCountry = this.selectedCountry === country ? null : country;
  }

  clearCountryFilter(): void {
    this.selectedCountry = null;
  }

  handleEpisodeClick(ep: Episode): void {
    if (!this.currentUser && ep.number > 3) {
      this.openModal('login');
      return;
    }
    this.activeEpisode = ep;
  }

  closeEpisodeModal(): void {
    this.activeEpisode = null;
  }

  private loadStoredUser(): UserProfile | null {
    try {
      const raw = localStorage.getItem('itfe_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}