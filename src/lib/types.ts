import type { ComponentType } from "svelte";

export type Language = string;
export type NativeLanguage = string;

export type Message = {
    role: 'user' | 'assistant';
    content: string;
};

export type Conversation = {
    id: string;
    title: string;
    messages: Message[];
};

export type ProficiencyLevel = "Beginner" | "Elementary" | "Intermediate" | "Upper Intermediate" | "Advanced" | "Proficient";