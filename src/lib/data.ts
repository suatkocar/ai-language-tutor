import type { Language, NativeLanguage } from './types/common';

export const languages = [
    "Afrikaans",
    "Albanian",
    "Arabic",
    "Armenian",
    "Azerbaijani",
    "Basque",
    "Belarusian",
    "Bengali",
    "Bosnian",
    "Bulgarian",
    "Catalan",
    "Cebuano",
    "Chinese (Simplified)",
    "Chinese (Traditional)",
    "Croatian",
    "Czech",
    "Danish",
    "Dutch",
    "English (UK)",
    "English (US)",
    "English (Australian)",
    "English (Canadian)",
    "English (Indian)",
    "English (Irish)",
    "English (New Zealand)",
    "English (Scottish)",
    "English (South African)",
    "Esperanto",
    "Estonian",
    "Filipino",
    "Finnish",
    "French",
    "French (Canadian)",
    "French (Belgian)",
    "French (Swiss)",
    "Galician",
    "Georgian",
    "German",
    "German (Austrian)",
    "German (Swiss)",
    "Greek",
    "Gujarati",
    "Haitian Creole",
    "Hausa",
    "Hebrew",
    "Hindi",
    "Hmong",
    "Hungarian",
    "Icelandic",
    "Igbo",
    "Indonesian",
    "Irish",
    "Italian",
    "Italian (Swiss)",
    "Japanese",
    "Javanese",
    "Kannada",
    "Kazakh",
    "Khmer",
    "Korean",
    "Lao",
    "Latin",
    "Latvian",
    "Lithuanian",
    "Macedonian",
    "Malay",
    "Malayalam",
    "Maltese",
    "Maori",
    "Marathi",
    "Mongolian",
    "Nepali",
    "Norwegian",
    "Persian",
    "Polish",
    "Portuguese",
    "Portuguese (Brazilian)",
    "Portuguese (European)",
    "Punjabi",
    "Romanian",
    "Russian",
    "Serbian",
    "Slovak",
    "Slovenian",
    "Somali",
    "Spanish",
    "Spanish (Latin American)",
    "Spanish (European)",
    "Swahili",
    "Swedish",
    "Tamil",
    "Telugu",
    "Thai",
    "Turkish",
    "Ukrainian",
    "Urdu",
    "Uzbek",
    "Vietnamese",
    "Welsh",
    "Yiddish",
    "Yoruba",
    "Zulu"
] as const;

export const nativeLanguages = [...languages] as const;

export const levels = ["Beginner", "Intermediate", "Advanced"] as const;

// Language groups (different variations of the same language)
export const languageGroups: Record<string, Language[]> = {
    "English": [
        "English (UK)",
        "English (US)",
        "English (Australian)",
        "English (Canadian)",
        "English (Indian)",
        "English (Irish)",
        "English (New Zealand)",
        "English (Scottish)",
        "English (South African)"
    ],
    "French": [
        "French",
        "French (Canadian)",
        "French (Belgian)",
        "French (Swiss)"
    ],
    "German": [
        "German",
        "German (Austrian)",
        "German (Swiss)"
    ],
    "Italian": [
        "Italian",
        "Italian (Swiss)"
    ],
    "Portuguese": [
        "Portuguese",
        "Portuguese (Brazilian)",
        "Portuguese (European)"
    ],
    "Spanish": [
        "Spanish",
        "Spanish (Latin American)",
        "Spanish (European)"
    ],
    "Chinese": [
        "Chinese (Simplified)",
        "Chinese (Traditional)"
    ]
} as const;

// Function to determine which languages should not be matched together
export function getExcludedLanguages(nativeLanguage: Language): Language[] {
    // Find the base language (e.g., English (UK) -> English)
    const baseLanguage = Object.entries(languageGroups).find(([base, variants]) =>
        variants.includes(nativeLanguage as any)
    )?.[0];

    if (baseLanguage) {
        // If the language is in a group, exclude all variations in that group
        return languageGroups[baseLanguage];
    } else {
        // If the language is not in a group, only exclude itself
        return [nativeLanguage];
    }
}

type CommonPhrases = {
    [key in Language]?: string[];
};

export const commonPhrases: CommonPhrases = {
    "English": [
        "Hello, how are you?",
        "Nice to meet you",
        "What's your name?",
        "Where are you from?",
        "How was your day?",
        "Thank you very much",
        "Could you help me?",
        "I don't understand",
        "Could you repeat that?",
        "What does this mean?",
        "How do you say ... in English?",
        "Can you explain that?"
    ],
    "Spanish": [
        "¡Hola! ¿Cómo estás?",
        "Mucho gusto",
        "¿Cómo te llamas?",
        "¿De dónde eres?",
        "¿Qué tal tu día?",
        "Muchas gracias",
        "¿Me podrías ayudar?",
        "No entiendo",
        "¿Podrías repetir eso?",
        "¿Qué significa esto?",
        "¿Cómo se dice ... en español?",
        "¿Puedes explicar eso?"
    ],
    "French": [
        "Bonjour, comment allez-vous?",
        "Enchanté(e)",
        "Comment vous appelez-vous?",
        "D'où venez-vous?",
        "Comment s'est passée votre journée?",
        "Merci beaucoup",
        "Pourriez-vous m'aider?",
        "Je ne comprends pas",
        "Pourriez-vous répéter?",
        "Qu'est-ce que ça veut dire?",
        "Comment dit-on ... en français?",
        "Pouvez-vous expliquer cela?"
    ],
    "German": [
        "Hallo, wie geht es dir?",
        "Freut mich",
        "Wie heißt du?",
        "Woher kommst du?",
        "Wie war dein Tag?",
        "Vielen Dank",
        "Könntest du mir helfen?",
        "Ich verstehe nicht",
        "Könntest du das wiederholen?",
        "Was bedeutet das?",
        "Wie sagt man ... auf Deutsch?",
        "Kannst du das erklären?"
    ],
    "Turkish": [
        "Merhaba, nasılsın?",
        "Tanıştığıma memnun oldum",
        "Adın ne?",
        "Nerelisin?",
        "Günün nasıl geçti?",
        "Çok teşekkür ederim",
        "Yardımcı olabilir misin?",
        "Anlamadım",
        "Tekrar eder misin?",
        "Bu ne anlama geliyor?",
        "... Türkçe'de nasıl söylenir?",
        "Bunu açıklayabilir misin?"
    ],
    "Italian": [
        "Ciao, come stai?",
        "Piacere di conoscerti",
        "Come ti chiami?",
        "Di dove sei?",
        "Com'è stata la tua giornata?",
        "Grazie mille",
        "Potresti aiutarmi?",
        "Non capisco",
        "Puoi ripetere?",
        "Cosa significa questo?",
        "Come si dice ... in italiano?",
        "Puoi spiegare questo?"
    ],
    "Portuguese": [
        "Olá, como está?",
        "Prazer em conhecê-lo",
        "Qual é o seu nome?",
        "De onde você é?",
        "Como foi seu dia?",
        "Muito obrigado(a)",
        "Pode me ajudar?",
        "Não entendo",
        "Pode repetir isso?",
        "O que significa isto?",
        "Como se diz ... em português?",
        "Pode explicar isso?"
    ],
    "Russian": [
        "Здравствуйте, как дела?",
        "Приятно познакомиться",
        "Как вас зовут?",
        "Откуда вы?",
        "Как прошёл ваш день?",
        "Большое спасибо",
        "Не могли бы вы помочь?",
        "Я не понимаю",
        "Не могли бы вы повторить?",
        "Что это значит?",
        "Как сказать ... по-русски?",
        "Можете объяснить это?"
    ],
    "Chinese": [
        "你好，你好吗？",
        "很高兴认识你",
        "你叫什么名字？",
        "你是哪里人？",
        "你今天过得怎么样？",
        "非常感谢",
        "你能帮我吗？",
        "我不明白",
        "你能重复一遍吗？",
        "这是什么意思？",
        "...用中文怎么说？",
        "你能解释一下吗？"
    ],
    "Japanese": [
        "こんにちは、お元気ですか？",
        "はじめまして",
        "お名前は何ですか？",
        "出身はどちらですか？",
        "今日はどうでしたか？",
        "ありがとうございます",
        "手伝っていただけますか？",
        "分かりません",
        "もう一度言っていただけますか？",
        "これはどういう意味ですか？",
        "...は日本語で何と言いますか？",
        "説明していただけますか？"
    ],
    "Korean": [
        "안녕하세요, 어떠세요?",
        "만나서 반갑습니다",
        "이름이 뭐예요?",
        "어디 출신이에요?",
        "오늘 하루 어땠어요?",
        "정말 감사합니다",
        "도와주실 수 있나요?",
        "이해가 안 돼요",
        "다시 말씀해 주시겠어요?",
        "이게 무슨 뜻이에요?",
        "...를 한국어로 어떻게 말해요?",
        "설명해 주실 수 있나요?"
    ]
}; 