import { writable } from 'svelte/store';
import type { Language, NativeLanguage, ProficiencyLevel, Message } from './types/common';

// UI State
export const darkMode = writable(false);
export const isLoading = writable(false);
export const messages = writable<Message[]>([]);

// Language Settings
export const nativeLanguage = writable<NativeLanguage>('English (UK)');
export const selectedLanguage = writable<Language>('French');
export const proficiencyLevel = writable<ProficiencyLevel>('Beginner');

// Progress Tracking
export const streak = writable(0);
export const messagesToday = writable(0);
export const dailyGoal = writable(10);

// UI State
export const showEncouragement = writable(false);
export const encouragementMessage = writable('');