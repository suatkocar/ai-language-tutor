import { writable } from 'svelte/store';
import type { Language, NativeLanguage, ProficiencyLevel, Message } from './types';

// UI State
export const darkMode = writable(false);
export const isLoading = writable(false);
export const showEncouragement = writable(false);

// User Preferences
export const selectedLanguage = writable<Language>('French');
export const nativeLanguage = writable<NativeLanguage>('English (UK)');
export const proficiencyLevel = writable<ProficiencyLevel>('Beginner');

// Progress Tracking
export const streak = writable(0);
export const messagesToday = writable(0);
export const dailyGoal = writable(10);

// Chat State
export const messages = writable<Message[]>([]);
export const encouragementMessage = writable(''); 