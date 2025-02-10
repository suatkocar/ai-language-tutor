export type TestQuestion = {
    id: number;
    question: string;
    context?: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    level: "A1" | "A2" | "B1" | "B2" | "C1";
    skill: "Grammar" | "Vocabulary" | "Reading" | "Comprehension";
};

export const frenchQuestions: TestQuestion[] = [
    {
        id: 1,
        question: "Choose the correct conjugation of the verb 'être' (to be) in present tense:",
        options: ["Je suis", "Je es", "Je est", "Je sommes"],
        correctAnswer: "Je suis",
        explanation: "With the pronoun 'Je' (I), the correct form of 'être' is 'suis'. This is first person singular.",
        level: "A1",
        skill: "Grammar"
    },
    {
        id: 2,
        question: "What is the feminine form of the adjective 'petit' (small)?",
        options: ["petite", "petit", "petits", "petites"],
        correctAnswer: "petite",
        explanation: "To form the feminine of adjectives ending in a consonant, we generally add an 'e'.",
        level: "A1",
        skill: "Grammar"
    },
    {
        id: 3,
        question: "Complete with the correct definite article:",
        context: "Fill in: '___ table'",
        options: ["la", "le", "les", "l'"],
        correctAnswer: "la",
        explanation: "'Table' is a feminine noun in French, so we use the definite article 'la'.",
        level: "A1",
        skill: "Grammar"
    },
    {
        id: 4,
        question: "Choose the correct subject pronoun:",
        context: "Fill in: '___ mangeons une pomme.' (we eat an apple)",
        options: ["Nous", "Je", "Tu", "Il"],
        correctAnswer: "Nous",
        explanation: "The verb 'mangeons' is conjugated in first person plural, so we need the pronoun 'nous' (we).",
        level: "A1",
        skill: "Grammar"
    },
    {
        id: 5,
        question: "What is the plural form of 'journal' (newspaper)?",
        options: ["journaux", "journals", "journales", "journal"],
        correctAnswer: "journaux",
        explanation: "Nouns ending in '-al' typically form their plural with '-aux'.",
        level: "A2",
        skill: "Grammar"
    },
    {
        id: 6,
        question: "Complete with the correct passé composé form:",
        context: "Fill in: 'Hier, je ___ au cinéma.' (Yesterday, I went to the cinema)",
        options: ["suis allé", "ai allé", "suis aller", "ai aller"],
        correctAnswer: "suis allé",
        explanation: "The verb 'aller' uses être as its auxiliary in passé composé: être + past participle (allé).",
        level: "A2",
        skill: "Grammar"
    },
    {
        id: 7,
        question: "Choose the correct relative pronoun:",
        context: "Fill in: 'C'est le livre ___ j'ai lu hier.' (It's the book that I read yesterday)",
        options: ["que", "qui", "dont", "où"],
        correctAnswer: "que",
        explanation: "We use 'que' when the relative pronoun is the direct object of the verb in the relative clause.",
        level: "A2",
        skill: "Grammar"
    },
    {
        id: 8,
        question: "Complete with the correct imparfait (imperfect) form:",
        context: "Fill in: 'Quand j'étais petit, je ___ beaucoup de chocolat.' (When I was young, I ate a lot of chocolate)",
        options: ["mangeais", "mange", "ai mangé", "mangerais"],
        correctAnswer: "mangeais",
        explanation: "The imparfait is used to describe habitual actions in the past. For -er verbs, we use the stem + -ais.",
        level: "B1",
        skill: "Grammar"
    },
    {
        id: 9,
        question: "Choose the correct subjunctive form:",
        context: "Fill in: 'Il faut que tu ___ tes devoirs.' (You must do your homework)",
        options: ["fasses", "fais", "fait", "faire"],
        correctAnswer: "fasses",
        explanation: "After 'il faut que', we must use the subjunctive mood. The subjunctive of 'faire' is 'fasse'.",
        level: "B1",
        skill: "Grammar"
    },
    {
        id: 10,
        question: "Complete with the correct conditional form:",
        context: "Fill in: 'Si j'avais le temps, je ___ au cinéma.' (If I had time, I would go to the cinema)",
        options: ["irais", "vais", "irai", "allais"],
        correctAnswer: "irais",
        explanation: "In a hypothetical sentence with 'si + imparfait', we use the conditional present in the main clause.",
        level: "B1",
        skill: "Grammar"
    },
    {
        id: 11,
        question: "Choose the correct gerund form:",
        context: "Fill in: 'Il parle ___ les mains.' (He speaks moving his hands)",
        options: ["en bougeant", "en bougant", "en bouger", "de bougeant"],
        correctAnswer: "en bougeant",
        explanation: "The gerund in French is formed with 'en' + present participle (stem + -ant).",
        level: "B2",
        skill: "Grammar"
    },
    {
        id: 12,
        question: "Complete with the correct plus-que-parfait (pluperfect) form:",
        context: "Fill in: 'Quand je suis arrivé, elle ___ déjà.' (When I arrived, she had already left)",
        options: ["était partie", "est partie", "a parti", "partait"],
        correctAnswer: "était partie",
        explanation: "The plus-que-parfait is formed with the imparfait of the auxiliary + past participle.",
        level: "B2",
        skill: "Grammar"
    },
    {
        id: 13,
        question: "Choose the correct form of the past participle:",
        context: "Fill in: 'Les lettres que j'ai ___.' (The letters that I wrote)",
        options: ["écrites", "écrit", "écrite", "écrits"],
        correctAnswer: "écrites",
        explanation: "The past participle agrees with the direct object when it comes before the verb avoir.",
        level: "B2",
        skill: "Grammar"
    },
    {
        id: 14,
        question: "Complete with the correct past subjunctive:",
        context: "Fill in: 'Je doute qu'il ___ la vérité.' (I doubt that he told the truth)",
        options: ["ait dit", "a dit", "avait dit", "aura dit"],
        correctAnswer: "ait dit",
        explanation: "The past subjunctive is formed with the present subjunctive of the auxiliary + past participle.",
        level: "C1",
        skill: "Grammar"
    },
    {
        id: 15,
        question: "Choose the correct passive construction:",
        context: "Fill in: 'Ce livre ___ par un auteur français.' (This book was written by a French author)",
        options: ["a été écrit", "est écrit", "était écrit", "a écrit"],
        correctAnswer: "a été écrit",
        explanation: "The passive voice is formed with être in the desired tense + past participle of the main verb.",
        level: "C1",
        skill: "Grammar"
    }
];

export function determineLevel(correctAnswers: number): "Beginner" | "Intermediate" | "Advanced" {
    const percentage = (correctAnswers / frenchQuestions.length) * 100;

    if (percentage < 40) {
        return "Beginner";
    } else if (percentage < 75) {
        return "Intermediate";
    } else {
        return "Advanced";
    }
}

export function getFeedback(level: "Beginner" | "Intermediate" | "Advanced"): string {
    switch (level) {
        case "Beginner":
            return "You're at the beginning of your French journey! Focus on basic grammar, everyday vocabulary, and simple conversations. Keep practicing!";
        case "Intermediate":
            return "You have a good foundation in French! Work on complex grammar structures, expand your vocabulary, and practice more advanced conversations.";
        case "Advanced":
            return "Excellent! You have a strong command of French. Continue to refine your skills with advanced literature, cultural topics, and native materials.";
    }
} 