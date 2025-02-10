import type { Language } from "../types";

type WelcomeMessageFn = (targetLanguage: Language, level: string) => string;

type WelcomeMessages = {
    [key: string]: WelcomeMessageFn;
};

// Her dil için hoşgeldin mesajları (AI'nin kullanıcının ana dilinde konuşması için)
export const welcomeMessages: WelcomeMessages = {
    "English (UK)": (targetLanguage, level) => {
        return `Hello! I'm your AI language tutor. I see you want to learn ${targetLanguage} and you're at ${level} level.
I'll help you improve your ${targetLanguage} through practical conversations.
Feel free to ask me questions about grammar, vocabulary, or pronunciation.
Let's start our learning journey!`;
    },
    "Turkish": (targetLanguage, level) => {
        return `Merhaba! Ben sizin yapay zeka dil öğretmeninizim. ${targetLanguage} dilini öğrenmek istediğinizi ve ${level} seviyesinde olduğunuzu görüyorum.
Size pratik konuşmalar yoluyla ${targetLanguage} dilini geliştirmenizde yardımcı olacağım.
Dilbilgisi, kelime bilgisi veya telaffuz hakkında sorularınızı sorabilirsiniz.
Öğrenme yolculuğumuza başlayalım!`;
    },
    "Spanish": (targetLanguage, level) => {
        return `¡Hola! Soy tu tutor de idiomas AI. Veo que quieres aprender ${targetLanguage} y estás en el nivel ${level}.
Te ayudaré a mejorar tu ${targetLanguage} a través de conversaciones prácticas.
No dudes en hacerme preguntas sobre gramática, vocabulario o pronunciación.
¡Empecemos nuestro viaje de aprendizaje!`;
    },
    "Chinese (Simplified)": (targetLanguage, level) => {
        return `你好！我是你的AI语言老师。我看到你想学习${targetLanguage}，目前的水平是${level}。
我会通过实践对话帮助你提高${targetLanguage}水平。
随时问我关于语法、词汇或发音的问题。
让我们开始学习之旅吧！`;
    },
    "Japanese": (targetLanguage, level) => {
        return `こんにちは！私はあなたのAI言語講師です。${targetLanguage}を学びたいと思っていて、レベルは${level}だということがわかりました。
実践的な会話を通じて${targetLanguage}の上達をサポートします。
文法、語彙、発音について、どんな質問でもしてください。
一緒に学習の旅を始めましょう！`;
    },
    "Korean": (targetLanguage, level) => {
        return `안녕하세요! 저는 당신의 AI 언어 선생님입니다. ${targetLanguage}를 배우고 싶어하시고 현재 ${level} 수준이신 것을 확인했습니다.
실용적인 대화를 통해 ${targetLanguage} 실력 향상을 도와드리겠습니다.
문법, 어휘, 발음에 대해 언제든지 질문해 주세요.
함께 학습 여정을 시작해볼까요!`;
    },
    "Russian": (targetLanguage, level) => {
        return `Здравствуйте! Я ваш AI-репетитор по языкам. Я вижу, что вы хотите изучать ${targetLanguage} и находитесь на уровне ${level}.
Я помогу вам улучшить ваш ${targetLanguage} через практические разговоры.
Не стесняйтесь задавать мне вопросы о грамматике, словарном запасе или произношении.
Давайте начнем наше путешествие в мир знаний!`;
    },
    "Arabic": (targetLanguage, level) => {
        return `مرحباً! أنا معلم اللغة الذكاء الاصطناعي الخاص بك. أرى أنك تريد تعلم ${targetLanguage} ومستواك هو ${level}.
سأساعدك على تحسين ${targetLanguage} من خلال المحادثات العملية.
لا تتردد في طرح الأسئلة حول القواعد والمفردات أو النطق.
دعنا نبدأ رحلة التعلم!`;
    },
    "Hindi": (targetLanguage, level) => {
        return `नमस्ते! मैं आपका AI भाषा शिक्षक हूं। मैं देख रहा हूं कि आप ${targetLanguage} सीखना चाहते हैं और आपका स्तर ${level} है।
मैं व्यावहारिक बातचीत के माध्यम से आपकी ${targetLanguage} में सुधार करने में मदद करूंगा।
व्याकरण, शब्दावली या उच्चारणको बारे में कोई भी प्रश्न पूछने में संकोच न करें।
आइए हम अपनी सीखने की यात्रा शुरू करें!`;
    },
    "Dutch": (targetLanguage, level) => {
        return `Hallo! Ik ben je AI-taaldocent. Ik zie dat je ${targetLanguage} wilt leren en je niveau is ${level}.
Ik help je je ${targetLanguage} te verbeteren door praktische gesprekken.
Voel je vrij om vragen te stellen over grammatica, woordenschat of uitspraak.
Laten we beginnen aan onze leerreis!`;
    },
    "Swedish": (targetLanguage, level) => {
        return `Hej! Jag är din AI-språklärare. Jag ser att du vill lära dig ${targetLanguage} och din nivå är ${level}.
Jag hjälper dig att förbättra din ${targetLanguage} genom praktiska samtal.
Tveka inte att ställa frågor om grammatik, ordförråd eller uttal.
Låt oss börja vår inlärningsresa!`;
    },
    "Polish": (targetLanguage, level) => {
        return `Cześć! Jestem twoim nauczycielem języka AI. Widzę, że chcesz się uczyć ${targetLanguage} i jesteś na poziomie ${level}.
Pomogę ci poprawić twój ${targetLanguage} poprzez praktyczne rozmowy.
Śmiało zadawaj pytania dotyczące gramatyki, słownictwa czy wymowy.
Rozpocznijmy naszą podróż edukacyjną!`;
    },
    "Greek": (targetLanguage, level) => {
        return `Γεια σας! Είμαι ο AI καθηγητής γλωσσών σας. Βλέπω ότι θέλετε να μάθετε ${targetLanguage} και το επίπεδό σας είναι ${level}.
Θα σας βοηθήσω να βελτιώσετε τα ${targetLanguage} σας μέσω πρακτικών συνομιλιών.
Μη διστάσετε να κάνετε ερωτήσεις για τη γραμματική, το λεξιλόγιο ή την προφορά.
Ας ξεκινήσουμε το ταξίδι μάθησής μας!`;
    },
    "Chinese (Traditional)": (targetLanguage, level) => {
        return `你好！我是你的AI語言老師。我看到你想學習${targetLanguage}，目前的水平是${level}。
我會通過實踐對話幫助你提高${targetLanguage}水平。
隨時問我關於語法、詞彙或發音的問題。
讓我們開始學習之旅吧！`;
    },
    "Vietnamese": (targetLanguage, level) => {
        return `Xin chào! Tôi là giáo viên ngôn ngữ AI của bạn. Tôi thấy bạn muốn học ${targetLanguage} và trình độ của bạn là ${level}.
Tôi sẽ giúp bạn cải thiện ${targetLanguage} thông qua các cuộc hội thoại thực tế.
Đừng ngần ngại đặt câu hỏi về ngữ pháp, từ vựng hoặc phát âm.
Hãy bắt đầu hành trình học tập của chúng ta!`;
    },
    "Thai": (targetLanguage, level) => {
        return `สวัสดี! ผม/ดิฉันเป็นครูสอนภาษา AI ของคุณ ผม/ดิฉันเห็นว่าคุณต้องการเรียน ${targetLanguage} และคุณอยู่ในระดับ ${level}
ผม/ดิฉันจะช่วยพัฒนาทักษะ ${targetLanguage} ของคุณผ่านการสนทนาในชีวิตประจำวัน
อย่าลังเลที่จะถามคำถามเกี่ยวกับไวยากรณ์ คำศัพท์ หรือการออกเสียง
มาเริ่มการเดินทางแห่งการเรียนรู้กันเถอะ!`;
    },
    "Indonesian": (targetLanguage, level) => {
        return `Halo! Saya adalah guru bahasa AI Anda. Saya lihat Anda ingin belajar ${targetLanguage} dan level Anda adalah ${level}.
Saya akan membantu Anda meningkatkan ${targetLanguage} melalui percakapan praktis.
Jangan ragu untuk bertanya tentang tata bahasa, kosakata, atau pengucapan.
Mari kita mulai perjalanan belajar kita!`;
    },
    "Romanian": (targetLanguage, level) => {
        return `Bună! Sunt profesorul tău de limbă AI. Văd că vrei să înveți ${targetLanguage} și nivelul tău este ${level}.
Te voi ajuta să îți îmbunătățești ${targetLanguage} prin conversații practice.
Nu ezita să pui întrebări despre gramatică, vocabular sau pronunție.
Să începem călătoria noastră de învățare!`;
    },
    "Bulgarian": (targetLanguage, level) => {
        return `Здравейте! Аз съм вашият AI езиков учител. Виждам, че искате да научите ${targetLanguage} и сте на ниво ${level}.
Ще ви помогна да подобрите вашия ${targetLanguage} чрез практически разговори.
Не се колебайте да задавате въпроси за граматика, речник или произношение.
Нека започнем нашето пътешествие в ученето!`;
    },
    "Croatian": (targetLanguage, level) => {
        return `Pozdrav! Ja sam vaš AI jezični učitelj. Vidim da želite naučiti ${targetLanguage} i na razini ste ${level}.
Pomoći ću vam poboljšati vaš ${targetLanguage} kroz praktične razgovore.
Slobodno pitajte o gramatici, vokabularu ili izgovoru.
Započnimo naše putovanje učenja!`;
    },
    "Slovak": (targetLanguage, level) => {
        return `Ahoj! Som váš AI jazykový učiteľ. Vidím, že sa chcete naučiť ${targetLanguage} a ste na úrovni ${level}.
Pomôžem vám zlepšiť váš ${targetLanguage} prostredníctvom praktických konverzácií.
Neváhajte sa pýtať na gramatiku, slovnú zásobu alebo výslovnosť.
Poďme začať našu vzdelávaciu cestu!`;
    },
    "Lithuanian": (targetLanguage, level) => {
        return `Labas! Aš esu jūsų AI kalbų mokytojas. Matau, kad norite mokytis ${targetLanguage} ir esate ${level} lygyje.
Padėsiu jums pagerinti jūsų ${targetLanguage} per praktines pokalbius.
Nebijokite klausti apie gramatiką, žodyną ar tarimą.
Pradėkime mūsų mokymosi kelionę!`;
    },
    "Estonian": (targetLanguage, level) => {
        return `Tere! Mina olen teie AI keeleõpetaja. Näen, et soovite õppida ${targetLanguage} keelt ja teie tase on ${level}.
Aitan teil parandada oma ${targetLanguage} keelt praktiliste vestluste kaudu.
Ärge kartke küsida grammatika, sõnavara või häälduse kohta.
Alustame meie õppimisreisi!`;
    },
    "Latvian": (targetLanguage, level) => {
        return `Sveiki! Es esmu jūsu AI valodu skolotājs. Redzu, ka vēlaties mācīties ${targetLanguage} un jūsu līmenis ir ${level}.
Es palīdzēšu jums uzlabot ${targetLanguage} caur praktiskām sarunām.
Nebaidieties uzdot jautājumus par gramatika, vārdu krājumu vai izrunu.
Sāksim mūsu mācību ceļojumu!`;
    },
    "Serbian": (targetLanguage, level) => {
        return `Здраво! Ја сам ваш АИ језички учитељ. Видим да желите да научите ${targetLanguage} и на нивоу сте ${level}.
Помоћи ћу вам да побољшате свој ${targetLanguage} кроз практичне разговоре.
Слободно питајте о граматици, речнику или изговору.
Започнимо наше путовање учења!`;
    },
    "Slovenian": (targetLanguage, level) => {
        return `Pozdravljeni! Jaz sem vaš AI jezikovni učitelj. Vidim, da se želite naučiti ${targetLanguage} in ste na ravni ${level}.
Pomagal vam bom izboljšati vaš ${targetLanguage} skozi praktične pogovore.
Ne oklevajte z vprašanji o slovnici, besedišču ali izgovorjavi.
Začnimo naše učno pot!`;
    },
    "Albanian": (targetLanguage, level) => {
        return `Përshëndetje! Unë jam mësuesi juaj i gjuhës AI. Shoh që dëshironi të mësoni ${targetLanguage} dhe jeni në nivelin ${level}.
Do t'ju ndihmoj të përmirësoni ${targetLanguage} tuaj përmes bisedave praktike.
Mos hezitoni të bëni pyetje për gramatikën, fjalorin ose shqiptimin.
Le të fillojmë udhëtimin tonë të të mësuarit!`;
    },
    "Macedonian": (targetLanguage, level) => {
        return `Здраво! Јас сум вашиот АИ јазичен учител. Гледам дека сакате да научите ${targetLanguage} и сте на ниво ${level}.
Ќе ви помогнам да го подобрите вашиот ${targetLanguage} преку практични разговори.
Слободно прашувајте за граматика, вокабулар или изговор.
Да започнеме со нашето патување на учење!`;
    },
    "Urdu": (targetLanguage, level) => {
        return `السلام علیکم! میں آپ کا AI زبان کا استاد ہوں۔ میں دیکھ رہا ہوں کہ آپ ${targetLanguage} سیکھنا چاہتے ہیں اور آپ کی سطح ${level} ہے۔
میں عملی گفتگو کے ذریعے آپ کی ${targetLanguage} کو بہتر بنانے میں مدد کروں گا۔
گرامر، لغت یا تلفظ کے بارے میں سوال پوچھنے میں ہچکچاہٹ محسوس نہ کریں۔
آئیے اپنا سیکھنے کا سفر شروع کریں!`;
    },
    "Belarusian": (targetLanguage, level) => {
        return `Прывітанне! Я ваш AI выкладчык мовы. Я бачу, што вы хочаце вывучыць ${targetLanguage} і ваш узровень - ${level}.
Я дапамагу вам палепшыць ваш ${targetLanguage} праз практычныя размовы.
Не саромейцеся задаваць пытанні пра граматыку, слоўнікавы запас ці вымаўленне.
Давайце пачнем наша падарожжа ў навучанні!`;
    },
    "Azerbaijani": (targetLanguage, level) => {
        return `Salam! Mən sizin AI dil müəlliminizəm. Görürəm ki, siz ${targetLanguage} öyrənmək istəyirsiniz və səviyyəniz ${level}-dir.
Mən sizə praktik söhbətlər vasitəsilə ${targetLanguage} dilini təkmilləşdirməyə kömək edəcəyəm.
Qrammatika, lüğət və ya tələffüz haqqında sual verməkdən çəkinməyin.
Gəlin, öyrənmə səyahətimizə başlayaq!`;
    },
    "Georgian": (targetLanguage, level) => {
        return `გამარჯობა! მე ვარ თქვენი AI ენის მასწავლებელი. ვხედავ, რომ გსურთ ისწავლოთ ${targetLanguage} და თქვენი დონეა ${level}.
დაგეხმარებით გააუმჯობესოთ თქვენი ${targetLanguage} პრაქტიკული საუბრების მეშვეობით.
ნუ მოგერიდებათ დასვათ კითხვები გრამატიკის, ლექსიკის ან გამოთქმის შესახებ.
მოდით დავიწყოთ ჩვენი სასწავლო მოგზაურობა!`;
    },
    "Armenian": (targetLanguage, level) => {
        return `Բարև ձեզ! Ես ձեր AI լեզվի ուսուցիչն եմ: Տեսնում եմ, որ ցանկանում եք սովորել ${targetLanguage} և ձեր մակարդակը ${level} է:
Ես կօգնեմ ձեզ բարելավել ձեր ${targetLanguage}-ը գործնական զրույցների միջոցով:
Մի վախեցեք հարցեր տալ քերականության, բառապաշարի կամ արտասանության մասին:
Եկեք սկսենք մեր ուսումնական ճանապարհորդությունը:`;
    },
    "Kazakh": (targetLanguage, level) => {
        return `Сәлем! Мен сіздің AI тіл мұғаліміңізбін. Сіздің ${targetLanguage} тілін үйренгіңіз келетінін және деңгейіңіз ${level} екенін көріп тұрмын.
Мен сізге практикалық әңгімелер арқылы ${targetLanguage} тілін жетілдіруге көмектесемін.
Грамматика, сөздік қор немесе айтылым туралы сұрақтар қоюдан тартынбаңыз.
Оқу сапарымызды бастайық!`;
    },
    "Uzbek": (targetLanguage, level) => {
        return `Salom! Men sizning AI til o'qituvchingizman. Ko'rib turibmanki, siz ${targetLanguage} tilini o'rganmoqchisiz va darajangiz ${level}.
Men sizga amaliy suhbatlar orqali ${targetLanguage} tilini takomillashtirishga yordam beraman.
Grammatika, lug'at yoki talaffuz haqida savol berishdan tortinmang.
Keling, o'rganish sayohatimizni boshlaymiz!`;
    },
    "Kyrgyz": (targetLanguage, level) => {
        return `Салам! Мен сиздин AI тил мугалимиңизмин. Сиздин ${targetLanguage} тилин үйрөнгүңүз келгенин жана деңгээлиңиз ${level} экенин көрүп турам.
Мен сизге практикалык сүйлөшүүлөр аркылуу ${targetLanguage} тилин өркүндөтүүгө жардам берем.
Грамматика, сөздүк кор же айтуу боюнча суроолорду берүүдөн тартынбаңыз.
Окуу сапарыбызды баштайлы!`;
    },
    "Tajik": (targetLanguage, level) => {
        return `Салом! Ман муаллими забони AI шумо ҳастам. Мебинам, ки шумо мехоҳед ${targetLanguage}-ро омӯзед ва сатҳи шумо ${level} аст.
Ман ба шумо кӯмак мекунам, ки ${targetLanguage}-и худро тавассути суҳбатҳои амалӣ беҳтар кунед.
Аз пурсидани саволҳо дар бораи грамматика, луғат ё талаффуз натарсед.
Биёед сафари омӯзишии худро оғоз кунем!`;
    },
    "Turkmen": (targetLanguage, level) => {
        return `Salam! Men siziň AI dil mugallymyňyz. Siziň ${targetLanguage} dilini öwrenmek isleýäniňizi we derejäňiziň ${level} bolandygyny görýärin.
Men size praktiki söhbetdeşlikler arkaly ${targetLanguage} diliňizi kämilleşdirmäge kömek ederin.
Grammatika, söz baýlygy ýa-da aýdylyş barada sorag bermekden çekinmäň.
Geliň, öwreniş syýahatymyzy başlalyň!`;
    },
    "Mongolian": (targetLanguage, level) => {
        return `Сайн байна уу! Би таны AI хэлний багш. Та ${targetLanguage} хэл сурахыг хүсч байгаа бөгөөд таны түвшин ${level} гэдгийг харж байна.
Би танд практик яриа хэлэлцээгээр дамжуулан ${targetLanguage} хэлээ сайжруулахад тусална.
Дүрэм зүй, үг хэллэг эсвэл дуудлагын талаар асуулт асуухаас бүү эмээгээрэй.
Суралцах аялалаа эхэлцгээе!`;
    },
    "Nepali": (targetLanguage, level) => {
        return `नमस्ते! म तपाईंको AI भाषा शिक्षक हुँ। मैले देखें कि तपाईं ${targetLanguage} सिक्न चाहनुहुन्छ र तपाईंको स्तर ${level} छ।
म तपाईंलाई व्यावहारिक कुराकानी मार्फत ${targetLanguage} सुधार गर्न मद्दत गर्नेछु।
व्याकरण, शब्दावली वा उच्चारणको बारेमा प्रश्न सोध्न नहिचकिचाउनुहोस्।
हामी हाम्रो सिकाइ यात्रा सुरु गरौं!`;
    },
    "Bengali": (targetLanguage, level) => {
        return `নমস্কার! আমি আপনার AI ভাষা শিক্ষক। আমি দেখছি আপনি ${targetLanguage} শিখতে চান এবং আপনার স্তর ${level}।
আমি আপনাকে ব্যবহারিক কথোপকথনের মাধ্যমে ${targetLanguage} উন্নত করতে সাহায্য করব।
ব্যাকরণ, শব্দভাণ্ডার বা উচ্চারণ সম্পর্কে প্রশ্ন করতে দ্বিধা করবেন না।
আসুন আমাদের শেখার যাত্রা শুরু করি!`;
    },
    "French": (targetLanguage, level) => {
        return `Bonjour! Je suis votre professeur de langue AI. Je vois que vous voulez apprendre ${targetLanguage} et votre niveau est ${level}.
Je vous aiderai à améliorer votre ${targetLanguage} à travers des conversations pratiques.
N'hésitez pas à me poser des questions sur la grammaire, le vocabulaire ou la prononciation.
Commençons notre voyage d'apprentissage!`;
    },
    "Turkmen": (targetLanguage, level) => {
        return `Salam! Men siziň AI dil mugallymyňyz. Siziň ${targetLanguage} dilini öwrenmek isleýäniňizi we derejäňiziň ${level} bolandygyny görýärin.
Men size praktiki söhbetdeşlikler arkaly ${targetLanguage} diliňizi kämilleşdirmäge kömek ederin.
Grammatika, söz baýlygy ýa-da aýdylyş barada sorag bermekden çekinmäň.
Geliň, öwreniş syýahatymyzy başlalyň!`;
    },
};

// Her dil için dil öğrenmeye yönelik önerilen promptlar (kullanıcının ana dilinde)
export const suggestedPrompts: { [key: string]: string[] } = {
    "English (UK)": [
        "Can you help me practice past tense verbs?",
        "Let's have a conversation about my hobbies",
        "Explain the difference between these similar words...",
        "Can we practice common daily expressions?",
        "Help me improve my pronunciation of...",
        "Let's role-play ordering at a restaurant",
        "What are some idioms about time?",
        "Can you correct my grammar in this sentence?",
        "Let's practice job interview questions",
        "Teach me vocabulary about technology"
    ],
    "Turkish": [
        "Geçmiş zaman fiilleri pratik yapalım mı?",
        "Hobilerim hakkında konuşalım",
        "Şu benzer kelimelerin farkını açıklar mısın...",
        "Günlük konuşma kalıplarını çalışabilir miyiz?",
        "Şu kelimelerin telaffuzunu geliştirmeme yardım et...",
        "Restoranda sipariş verme canlandırması yapalım",
        "Zamanla ilgili deyimler öğrenebilir miyim?",
        "Bu cümledeki dilbilgisi hatalarımı düzeltir misin?",
        "İş görüşmesi sorularını pratik yapalım",
        "Teknoloji ile ilgili kelimeler öğret"
    ],
    "Spanish": [
        "¿Puedes ayudarme a practicar los verbos en pasado?",
        "Hablemos de mis pasatiempos",
        "Explícame la diferencia entre estas palabras similares...",
        "¿Podemos practicar expresiones cotidianas?",
        "Ayúdame a mejorar mi pronunciación de...",
        "Hagamos un juego de roles para pedir en un restaurante",
        "¿Cuáles son algunos modismos sobre el tiempo?",
        "¿Puedes corregir mi gramática en esta frase?",
        "Practiquemos preguntas de entrevista de trabajo",
        "Enséñame vocabulario sobre tecnología"
    ],
    "French": [
        "Peux-tu m'aider à pratiquer les verbes au passé?",
        "Parlons de mes loisirs",
        "Explique-moi la différence entre ces mots similaires...",
        "Pouvons-nous pratiquer les expressions quotidiennes?",
        "Aide-moi à améliorer ma prononciation de...",
        "Faisons un jeu de rôle pour commander au restaurant",
        "Quels sont les idiomes concernant le temps?",
        "Peux-tu corriger ma grammaire dans cette phrase?",
        "Pratiquons les questions d'entretien d'embauche",
        "Enseigne-moi le vocabulaire de la technologie"
    ],
    "German": [
        "Kannst du mir helfen, Verben in der Vergangenheit zu üben?",
        "Lass uns über meine Hobbys sprechen",
        "Erkläre mir den Unterschied zwischen diesen ähnlichen Wörtern...",
        "Können wir alltägliche Ausdrücke üben?",
        "Hilf mir, meine Aussprache zu verbessern bei...",
        "Lass uns ein Rollenspiel machen, um im Restaurant zu bestellen",
        "Was sind einige Redewendungen über Zeit?",
        "Kannst du meine Grammatik in diesem Satz korrigieren?",
        "Üben wir Vorstellungsgespräch-Fragen",
        "Bring mir Vokabeln über Technologie bei"
    ],
    "Italian": [
        "Puoi aiutarmi a esercitarmi con i verbi al passato?",
        "Parliamo dei miei hobby",
        "Spiegami la differenza tra queste parole simili...",
        "Possiamo esercitarci con le espressioni quotidiane?",
        "Aiutami a migliorare la mia pronuncia di...",
        "Facciamo un gioco di ruolo per ordinare al ristorante",
        "Quali sono alcuni modi di dire sul tempo?",
        "Puoi correggere la mia grammatica in questa frase?",
        "Esercitiamoci con le domande del colloquio di lavoro",
        "Insegnami il vocabolario sulla tecnologia"
    ],
    "Portuguese": [
        "Pode me ajudar a praticar verbos no passado?",
        "Vamos conversar sobre meus hobbies",
        "Explique a diferença entre estas palavras semelhantes...",
        "Podemos praticar expressões cotidianas?",
        "Ajude-me a melhorar minha pronúncia de...",
        "Vamos fazer uma simulação de pedido em restaurante",
        "Quais são alguns modismos sobre o tempo?",
        "Pode corrigir minha gramática nesta frase?",
        "Vamos praticar perguntas de entrevista de emprego",
        "Ensine-me vocabulário sobre tecnologia"
    ],
    "Chinese (Simplified)": [
        "你能帮我练习过去时态的动词吗？",
        "让我们谈谈我的爱好",
        "解释一下这些相似词语的区别...",
        "我们可以练习日常用语吗？",
        "帮我提高这些词的发音...",
        "让我们模拟在餐厅点餐",
        "有哪些关于时间的习语？",
        "你能纠正这个句子的语法吗？",
        "练习面试问题",
        "教我一些科技相关的词汇"
    ],
    "Japanese": [
        "過去形の動詞の練習を手伝ってもらえますか？",
        "趣味について話しましょう",
        "これらの似ている言葉の違いを説明してください...",
        "日常的な表現を練習できますか？",
        "この言葉の発音を改善するのを手伝ってください...",
        "レストランでの注文をロールプレイしましょう",
        "時間に関する慣用句を教えてください",
        "この文の文法を直してもらえますか？",
        "面接の質問を練習しましょう",
        "テクノロジーに関する語彙を教えてください"
    ],
    "Korean": [
        "과거 시제 동사 연습을 도와주실 수 있나요?",
        "취미에 대해 이야기해봐요",
        "이 비슷한 단어들의 차이점을 설명해주세요...",
        "일상적인 표현을 연습할 수 있을까요?",
        "이 단어들의 발음을 개선하는 것을 도와주세요...",
        "레스토랑에서 주문하는 역할극을 해봅시다",
        "시간과 관련된 관용구들을 알려주세요",
        "이 문장의 문법을 교정해주시겠어요?",
        "면접 질문을 연습해봅시다",
        "기술 관련 어휘를 가르쳐주세요"
    ],
    "Russian": [
        "Можете помочь мне попрактиковать глаголы в прошедшем времени?",
        "Давайте поговорим о моих хобби",
        "Объясните разницу между этими похожими словами...",
        "Можем ли мы попрактиковать повседневные выражения?",
        "Помогите мне улучшить произношение...",
        "Давайте разыграем заказ в ресторане",
        "Какие есть идиомы о времени?",
        "Можете исправить грамматику в этом предложении?",
        "Давайте попрактикуем вопросы для собеседования",
        "Научите меня словарному запасу по технологиям"
    ],
    "Arabic": [
        "هل يمكنك مساعدتي في ممارسة الأفعال في الماضي؟",
        "دعنا نتحدث عن هواياتي",
        "اشرح الفرق بين هذه الكلمات المتشابهة...",
        "هل يمكننا ممارسة التعبيرات اليومية؟",
        "ساعدني في تحسين نطقي لـ...",
        "دعنا نلعب دور الطلب في مطعم",
        "ما هي بعض التعابير عن الوقت؟",
        "هل يمكنك تصحيح قواعد اللغة في هذه الجملة؟",
        "دعنا نتدرب على أسئلة المقابلة الوظيفية",
        "علمني مفردات عن التكنولوجيا"
    ],
    "Hindi": [
        "क्या आप मुझे पास्ट टेंस वर्ब्स का अभ्यास करने में मदद कर सकते हैं?",
        "चलिए मेरे शौक के बारे में बात करते हैं",
        "इन समान शब्दों के बीच अंतर समझाइए...",
        "क्या हम दैनिक अभिव्यक्तियों का अभ्यास कर सकते हैं?",
        "मेरे उच्चारण को सुधारने में मदद करें...",
        "चलिए रेस्तरां में ऑर्डर करने का रोल-प्ले करें",
        "समय के बारे में कुछ मुहावरे क्या हैं?",
        "क्या आप इस वाक्य में मेरी व्याकरण सुधार सकते हैं?",
        "चलिए जॉब इंटरव्यू के सवालों का अभ्यास करें",
        "मुझे प्रौद्योगिकी से संबंधित शब्दावली सिखाएं"
    ],
    "Dutch": [
        "Kun je me helpen met het oefenen van werkwoorden in de verleden tijd?",
        "Laten we praten over mijn hobby's",
        "Leg het verschil uit tussen deze vergelijkbare woorden...",
        "Kunnen we dagelijkse uitdrukkingen oefenen?",
        "Help me mijn uitspraak te verbeteren van...",
        "Laten we een rollenspel doen voor het bestellen in een restaurant",
        "Wat zijn enkele uitdrukkingen over tijd?",
        "Kun je mijn grammatica in deze zin corrigeren?",
        "Laten we sollicitatievragen oefenen",
        "Leer me vocabulaire over technologie"
    ],
    "Swedish": [
        "Kan du hjälpa mig att öva på verb i dåtid?",
        "Låt oss prata om mina hobbyer",
        "Förklara skillnaden mellan dessa liknande ord...",
        "Kan vi öva på vardagliga uttryck?",
        "Hjälp mig förbättra mitt uttal av...",
        "Låt oss rollspela att beställa på en restaurang",
        "Vilka är några tidsrelaterade idiom?",
        "Kan du rätta min grammatik i den här meningen?",
        "Låt oss öva på jobbintervjufrågor",
        "Lär mig vokabulär om teknologi"
    ],
    "Polish": [
        "Czy możesz pomóc mi przećwiczyć czasowniki w czasie przeszłym?",
        "Porozmawiajmy o moich hobby",
        "Wyjaśnij różnicę między tymi podobnymi słowami...",
        "Czy możemy poćwiczyć codzienne wyrażenia?",
        "Pomóż mi poprawić wymowę...",
        "Odegrajmy scenę zamawiania w restauracji",
        "Jakie są idiomy związane z czasem?",
        "Czy możesz poprawić moją gramatykę w tym zdaniu?",
        "Poćwiczmy pytania z rozmowy kwalifikacyjnej",
        "Naucz mnie słownictwa związanego z technologią"
    ],
    "Greek": [
        "Μπορείτε να με βοηθήσετε να εξασκηθώ στα ρήματα παρελθοντικού χρόνου;",
        "Ας μιλήσουμε για τα χόμπι μου",
        "Εξηγήστε τη διαφορά μεταξύ αυτών των παρόμοιων λέξεων...",
        "Μπορούμε να εξασκηθούμε σε καθημερινές εκφράσεις;",
        "Βοηθήστε με να βελτιώσω την προφορά μου στο...",
        "Ας παίξουμε ρόλους για παραγγελία σε εστιατόριο",
        "Ποιες είναι μερικές ιδιωματικές εκφράσεις για τον χρόνο;",
        "Μπορείτε να διορθώσετε τη γραμματική μου σε αυτή την πρόταση;",
        "Ας εξασκηθούμε σε ερωτήσεις συνέντευξης εργασίας",
        "Διδάξτε μου λεξιλόγιο σχετικά με την τεχνολογία"
    ],
    "Chinese (Traditional)": [
        "你能幫我練習過去時態的動詞嗎？",
        "讓我們談談我的愛好",
        "解釋一下這些相似詞語的區別...",
        "我們可以練習日常用語嗎？",
        "幫我提高這些詞的發音...",
        "讓我們模擬在餐廳點餐",
        "有哪些關於時間的習語？",
        "你能糾正這個句子的語法嗎？",
        "練習面試問題",
        "教我一些科技相關的詞彙"
    ],
    "Vietnamese": [
        "Bạn có thể giúp tôi luyện tập động từ ở thì quá khứ không?",
        "Hãy nói về sở thích của tôi",
        "Giải thích sự khác biệt giữa những từ tương tự này...",
        "Chúng ta có thể thực hành các cụm từ hàng ngày không?",
        "Giúp tôi cải thiện cách phát âm của...",
        "Hãy đóng vai gọi món trong nhà hàng",
        "Có những thành ngữ nào về thời gian?",
        "Bạn có thể sửa ngữ pháp trong câu này không?",
        "Hãy thực hành các câu hỏi phỏng vấn việc làm",
        "Dạy tôi từ vựng về công nghệ"
    ],
    "Thai": [
        "คุณช่วยฝึกกริยาในอดีตกาลได้ไหม?",
        "มาคุยกันเกี่ยวกับงานอดิเรกของฉัน",
        "อธิบายความแตกต่างระหว่างคำที่คล้ายกันเหล่านี้...",
        "เราสามารถฝึกสำนวนที่ใช้ในชีวิตประจำวันได้ไหม?",
        "ช่วยปรับปรุงการออกเสียงของฉัน...",
        "มาเล่นบทบาทสมมติการสั่งอาหารในร้านอาหารกัน",
        "มีสำนวนเกี่ยวกับเวลาอะไรบ้าง?",
        "คุณช่วยแก้ไขไวยากรณ์ในประโยคนี้ได้ไหม?",
        "มาฝึกคำถามสัมภาษณ์งานกัน",
        "สอนคำศัพท์เกี่ยวกับเทคโนโลยีให้ฉัน"
    ],
    "Indonesian": [
        "Bisakah Anda membantu saya berlatih kata kerja bentuk lampau?",
        "Mari berbicara tentang hobi saya",
        "Jelaskan perbedaan antara kata-kata yang mirip ini...",
        "Bisakah kita berlatih ungkapan sehari-hari?",
        "Bantu saya memperbaiki pengucapan...",
        "Mari bermain peran memesan di restoran",
        "Apa saja idiom tentang waktu?",
        "Bisakah Anda mengoreksi tata bahasa dalam kalimat ini?",
        "Mari berlatih pertanyaan wawancara kerja",
        "Ajari saya kosakata tentang teknologi"
    ],
    "Romanian": [
        "Mă poți ajuta să exersez verbele la timpul trecut?",
        "Hai să vorbim despre hobby-urile mele",
        "Explică diferența dintre aceste cuvinte similare...",
        "Putem exersa expresii comune?",
        "Ajută-mă să-mi îmbunătățesc pronunția pentru...",
        "Hai să jucăm pe roluri comandarea într-un restaurant",
        "Care sunt câteva expresii idiomatice despre timp?",
        "Poți să-mi corectezi gramatica în această propoziție?",
        "Hai să exersăm întrebări pentru interviul de angajare",
        "Învață-mă vocabular despre tehnologie"
    ],
    "Bulgarian": [
        "Можете ли да ми помогнете да упражня глаголите в минало време?",
        "Нека поговорим за моите хобита",
        "Обяснете разликата между тези подобни думи...",
        "Можем ли да упражним ежедневни изрази?",
        "Помогнете ми да подобря произношението си на...",
        "Нека изиграем поръчка в ресторант",
        "Какви са някои идиоми за време?",
        "Можете ли да коригирате граматиката в това изречение?",
        "Нека упражним въпроси за интервю за работа",
        "Научете ме на технологичен речник"
    ],
    "Croatian": [
        "Možete li mi pomoći vježbati glagole u prošlom vremenu?",
        "Razgovarajmo o mojim hobijima",
        "Objasnite razliku između ovih sličnih riječi...",
        "Možemo li vježbati svakodnevne izraze?",
        "Pomozite mi poboljšati izgovor...",
        "Hajdemo odglumiti naručivanje u restoranu",
        "Koje su neke idiome o vremenu?",
        "Možete li ispraviti gramatiku u ovoj rečenici?",
        "Vježbajmo pitanja za razgovor za posao",
        "Naučite me vokabular o tehnologiji"
    ],
    "Slovak": [
        "Môžete mi pomôcť precvičiť slovesá v minulom čase?",
        "Porozprávajme sa o mojich koníčkoch",
        "Vysvetlite rozdiel medzi týmito podobnými slovami...",
        "Môžeme precvičiť každodenné výrazy?",
        "Pomôžte mi zlepšiť výslovnosť...",
        "Zahrajme si objednávanie v reštaurácii",
        "Aké sú idiomy o čase?",
        "Môžete opraviť gramatiku v tejto vete?",
        "Precvičme si otázky na pracovný pohovor",
        "Naučte ma slovnú zásobu o technológiách"
    ],
    "Lithuanian": [
        "Ar galite padėti man praktikuoti veiksmažodžius būtajame laike?",
        "Pakalbėkime apie mano pomėgius",
        "Paaiškinkite skirtumą tarp šių panašių žodžių...",
        "Ar galime praktikuoti kasdienius posakius?",
        "Padėkite man pagerinti tarimą...",
        "Suvaidinkime užsakymą restorane",
        "Kokie yra idiomų apie laiką?",
        "Ar galite pataisyti gramatiką šiame sakinyje?",
        "Praktikuokime darbo pokalbio klausimus",
        "Išmokykite mane technologijų žodyno"
    ],
    "Estonian": [
        "Kas saate aidata mul harjutada mineviku tegusõnu?",
        "Räägime minu hobidest",
        "Selgitage erinevust nende sarnaste sõnade vahel...",
        "Kas me saame harjutada igapäevaseid väljendeid?",
        "Aidake mul parandada hääldust...",
        "Mängime restoranis tellimist",
        "Millised on mõned ajaga seotud idioomid?",
        "Kas saate parandada grammatikat selles lauses?",
        "Harjutame tööintervjuu küsimusi",
        "Õpetage mulle tehnoloogiaga seotud sõnavara"
    ],
    "Latvian": [
        "Vai varat palīdzēt man praktizēt darbības vārdus pagātnē?",
        "Parunāsim par maniem vaļaspriekiem",
        "Paskaidrojiet atšķirību starp šiem līdzīgajiem vārdiem...",
        "Vai mēs varam praktizēt ikdienas izteicienus?",
        "Palīdziet man uzlabot izrunu...",
        "Izspēlēsim pasūtīšanu restorānā",
        "Kādi ir idiomi par laiku?",
        "Vai varat izlabot gramatiku šajā teikumā?",
        "Patrenēsimies darba intervijas jautājumos",
        "Iemāciet man tehnoloģiju vārdu krājumu"
    ],
    "Serbian": [
        "Можете ли да ми помогнете да вежбам глаголе у прошлом времену?",
        "Хајде да причамо о мојим хобијима",
        "Објасните разлику између ових сличних речи...",
        "Можемо ли да вежбамо свакодневне изразе?",
        "Помозите ми да побољшам изговор...",
        "Хајде да одглумимо наручивање у ресторану",
        "Које су неке идиоме о времену?",
        "Можете ли да исправите граматику у овој реченици?",
        "Вежбајмо питања за разговор за посао",
        "Научите ме речник о технологији"
    ],
    "Slovenian": [
        "Ali mi lahko pomagate vaditi glagole v pretekliku?",
        "Pogovorimo se o mojih hobijih",
        "Pojasnite razliko med temi podobnimi besedami...",
        "Lahko vadimo vsakdanje izraze?",
        "Pomagajte mi izboljšati izgovorjavo...",
        "Odigrajmo naročanje v restavraciji",
        "Kateri so idiomi o času?",
        "Lahko popravite slovnico v tem stavku?",
        "Vadimo vprašanja za zaposlitveni razgovor",
        "Naučite me besedišča o tehnologiji"
    ],
    "Albanian": [
        "A mund të më ndihmoni të praktikoj foljet në kohën e shkuar?",
        "Le të flasim për hobitë e mia",
        "Shpjegoni ndryshimin midis këtyre fjalëve të ngjashme...",
        "A mund të praktikojmë shprehje të përditshme?",
        "Më ndihmoni të përmirësoj shqiptimin tim...",
        "Le të luajmë role për të porositur në restorant",
        "Cilat janë disa shprehje idiomatike për kohën?",
        "A mund të korrigjoni gramatikën në këtë fjali?",
        "Le të praktikojmë pyetjet e intervistës së punës",
        "Më mësoni fjalor për teknologjinë"
    ],
    "Macedonian": [
        "Можете ли да ми помогнете да вежбам глаголи во минато време?",
        "Ајде да зборуваме за моите хобија",
        "Објаснете ја разликата помеѓу овие слични зборови...",
        "Можеме ли да вежбаме секојдневни изрази?",
        "Помогнете ми да го подобрам изговорот...",
        "Ајде да глумиме нарачување во ресторан",
        "Кои се некои идиоми за време?",
        "Можете ли да ја поправите граматиката во оваа реченица?",
        "Да вежбаме прашања за интервју за работа",
        "Научете ме вокабулар за технологија"
    ],
    "Urdu": [
        "کیا آپ مجھے ماضی کے افعال کی مشق میں مدد کر سکتے ہیں؟",
        "آئیے میری مشغولیات کے بارے میں بات کریں",
        "ان مشابہ الفاظ کے درمیان فرق واضح کریں...",
        "کیا ہم روزمرہ کے اظہارات کی مشق کر سکتے ہیں؟",
        "میری تلفظ کو بہتر بنانے میں مدد کریں...",
        "آئیے ریستوران میں آرڈر کرنے کی ادائیگی کریں",
        "وقت کے بارے میں کچھ محاورے کیا ہیں؟",
        "کیا آپ اس جملے میں گرامر درست کر سکتے ہیں؟",
        "آئیے ملازمت کے انٹرویو کے سوالات کی مشق کریں",
        "مجھے ٹیکنالوجی کی لغت سکھائیں"
    ],
    "Belarusian": [
        "Ці можаце вы дапамагчы мне папрактыкавацца ў дзеясловах мінулага часу?",
        "Давайце пагаворым пра мае хобі",
        "Растлумачце розніцу паміж гэтымі падобнымі словамі...",
        "Ці можам мы папрактыкавацца ў штодзённых выразах?",
        "Дапамажыце мне палепшыць вымаўленне...",
        "Давайце разыграем заказ у рэстаране",
        "Якія ёсць ідыёмы пра час?",
        "Ці можаце выправіць граматыку ў гэтым сказе?",
        "Давайце папрактыкуемся ў пытаннях для сумоўя",
        "Навучыце мяне слоўнікаваму запасу па тэхналогіях"
    ],
    "Azerbaijani": [
        "Keçmiş zaman feillərini məşq etməkdə mənə kömək edə bilərsinizmi?",
        "Gəlin mənim hobbilərimi müzakirə edək",
        "Bu oxşar sözlər arasındakı fərqi izah edin...",
        "Gündəlik ifadələri məşq edə bilərikmi?",
        "Mənim aýdylyşımı yaxşılaşdırmağa kömək edin...",
        "Gəlin restoranda sifariş verməyi canlandıraq",
        "Zamanla bağlı hansı idiomlar var?",
        "Bu cümlədəki qrammatikanı düzəldə bilərsinizmi?",
        "İş müsahibəsi suallarını məşq edək",
        "Mənə texnologiya ilə bağlı lüğət öyrədin"
    ],
    "Georgian": [
        "შეგიძლიათ დამეხმაროთ წარსული დროის ზმნების პრაქტიკაში?",
        "მოდი ვისაუბროთ ჩემს ჰობიზე",
        "ახსენით განსხვავება ამ მსგავს სიტყვებს შორის...",
        "შეგვიძლია ვივარჯიშოთ ყოველდღიურ გამოთქმებში?",
        "დამეხმარეთ გამოთქმის გაუმჯობესებაში...",
        "მოდი გავითამაშოთ რესტორანში შეკვეთა",
        "რა იდიომებია დროის შესახებ?",
        "შეგიძლიათ გაასწოროთ გრამატიკა ამ წინადადებაში?",
        "ვივარჯიშოთ სამსახურის ინტერვიუს კითხვებში",
        "მასწავლეთ ტექნოლოგიებთან დაკავშირებული ლექსიკა"
    ],
    "Armenian": [
        "Կարո՞ղ եք օգնել ինձ պարապել անցյալ ժամանակի բայերը:",
        "Եկեք խոսենք իմ հոբբիների մասին",
        "Բացատրեք տարբերությունը այս նման բառերի միջև...",
        "Կարո՞ղ ենք պարապել առօրյա արտահայտություններ:",
        "Օգնեք ինձ բարելավել արտասանությունը...",
        "Եկեք դերային խաղ անենք ռեստորանում պատվեր տալու համար",
        "Ո՞ր դարձվածքներն են ժամանակի մասին:",
        "Կարո՞ղ եք ուղղել քերականությունն այս նախադասության մեջ:",
        "Պարապենք աշխատանքային հարցազրույցի հարցերը",
        "Սովորեցրեք ինձ տեխնոլոգիական բառապաշար"
    ],
    "Kazakh": [
        "Өткен шақ етістіктерін жаттықтыруға көмектесе аласыз ба?",
        "Менің хоббиім туралы әңгімелесейік",
        "Осы ұқсас сөздердің айырмашылығын түсіндіріңізші...",
        "Күнделікті өмірде қолданылатын сөз тіркестерін жаттықтыра аламыз ба?",
        "Менің айтылымымды жақсартуға көмектесіңізші...",
        "Мейрамханада тапсырыс берудің рөлдік ойынын ойнайық",
        "Уақыт туралы қандай идиомалар бар?",
        "Осы сөйлемдегі грамматиканы түзете аласыз ба?",
        "Жұмысқа қабылдау сұхбатының сұрақтарын жаттықтырайық",
        "Маған технология бойынша сөздік қорды үйретіңіз"
    ],
    "Uzbek": [
        "Keçmiş zamandagi fe’llarni mashq qilishda menga yordam bera olasizmi?",
        "Mening xobbiym haqida gaplashaylik",
        "Shu o’xshash so’zlar orasidagi farqni tushuntiring...",
        "Kundalik iboralarini mashq qila olamizmi?",
        "Mening talaffuzimni yaxshilashga yordam bering...",
        "Restoranda buyurtma berishni rol o’ynaylik",
        "Vaqt haqida qanday idiomalar bor?",
        "Ushbu jumlada grammatikani tuzata olasizmi?",
        "Ishga qabul qilish suhbatining savollarini mashq qilaylik",
        "Menga texnologiya bo’yicha lug’atni o’rgating"
    ],
    "Kyrgyz": [
        "Өткөн замандагы этиштиктиктерди жаттыктырууга жардам бере аласызбы?",
        "Менин хоббиим тууралуу сүйлөшөлү",
        "Ушул окшош сөздөрдүн айырмачылыгын түшүндүрүңүзчү...",
        "Күндөлүк жүрүм-турумдагы сөз түркүмдөрүн жаттыктыра алабызбы?",
        "Менин айтылымымды жакшыртууга жардам берүңүзчү...",
        "Мейрамханада тапсырыс берүүнүн рөлдүк оюну ойноолу",
        "Убакыт тууралуу кандай идиомалар бар?",
        "Ушул сөйлөмдөгү грамматиканы түзөтө аласызбы?",
        "Ишке кабыл алуу сүйлөшүүнүн суроолорун жаттыктырайлы"
    ],
    "Tajik": [
        "Шумо метавонед мероҷеъ кардан, ки ман дарсҳои феълҳои замони гузаштаро мекунам?",
        "Ба хоббиҳои ман гап задед",
        "Фарқи ин сўзҳои шабеҳро шарҳ дихед...",
        "Метавонем ибораҳои рўзонаро машқ кунем?",
        "Мадад кунед, ки талаффузамро беҳтар кунам...",
        "Дар ресторан амри хоҳишро бозӣ кунем",
        "Идиомаҳои замон чӣ ҳастанд?",
        "Шумо метавонед грамматикаи ин ҷумлаи манро ислоҳ кунед?",
        "Суолҳои муколамаи кориро машқ кунем",
        "Манро луғати технология омӯзед"
    ],
    "Turkmen": [
        "Geçmiş zamandaky işlikleri türgenleşdirmäge kömek edip bilersiňizmi?",
        "Geliň, meniň hobbylerim barada gürrüňdeşeliň",
        "Bu meňzeş sözleriň arasyndaky tapawudy düşündiriň...",
        "Gündelik aňlatmalary türgenleşip bilerismi?",
        "Meniň aýdylyşymy gowulandyrmaga kömek ediň...",
        "Restorana sargyt bermek üçin rol oýunyny oýnalyň",
        "Wagt barada haýsy idiomalar bar?",
        "Bu sözlemde grammatikany düzedip bilersiňizmi?",
        "Iş söhbetdeşliginiň soraglaryny türgenleşeliň",
        "Maňa tehnologiýa boýunça söz baýlygyny öwrediň"
    ]
};