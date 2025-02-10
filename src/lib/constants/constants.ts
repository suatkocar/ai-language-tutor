import type { Language } from "../types";

type WelcomeMessageFn = (targetLanguage: Language, level: string) => string;

type WelcomeMessages = {
    [key: string]: WelcomeMessageFn;
};

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
Невахайцеся задаваць пытанні пра граматыку, слоўнікавы запас ці вымаўленне.
Давайце пачнем наша падарожжа ў навучанні!`;
    },
    "Azerbaijani": (targetLanguage, level) => {
        return `Salam! Mən sizin AI dil müəlliminizəm. Görürəm ki, siz ${targetLanguage} öyrənmək istəyirsiniz və səviyyəniz ${level}-dir.
Men sizə praktiki söhbətlər vasitəsilə ${targetLanguage} diliňizi kämilleşdirmäge kömek edəcəyəm.
Grammatika, söz baýlygy ýa-da aýdylyş barada sorag bermekden çekinmäň.
Geliň, öwreniş syýahatymyzy başlalyň!`;
    },
    "Georgian": (targetLanguage, level) => {
        return `გამარჯობა! მე ვარ თქვენი AI ენის მასწავლებელი. ვხედავ, რომ გსურთ ისწავლოთ ${targetLanguage} და თქვენი დონეა ${level}.
დაგეხმარებით გააუმჯობესოთ თქვენი ${targetLanguage} პრაქტიკული საუბრების მეშვეობით.
ნუ მოგერიდებათ დასვათ კითხვები გრამატიკის, ლექსიკის ან გამოთქმის შესახებ.
მოდით დავიწყოთ ჩვენი სასწავლო მოგზაურობა!`;
    },
    "Armenian": (targetLanguage, level) => {
        return `Բարև ձեզ! Ես ձեր AI լեզվի ուսուցիչն եմ: Տեսնում եմ, որ ցանկանում եք սովորել ${targetLanguage} և ձեր մակարդակը ${level} է:
Ես կօգնեմ ձեզ բարելավել ձեր ${targetLanguage} գործնական զրույցների միջոցով:
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
        return `Salom! Men sizning AI til o'qituvchingizman. Ko'rib turibmanki, siz ${targetLanguage} tilini o'rganmoqchisiz va saviyatingiz ${level}.
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
Грамматика, луғат ё талаффуз дар бораи саволҳои пурсидан аз тарс намешавед.
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
    }
};

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
        "Telaffuzumu geliştirmeme yardım et...",
        "Restoranda sipariş verme canlandırması yapalım",
        "Zamanla ilgili deyimler nelerdir?",
        "Bu cümledeki dilbilgisi hatalarımı düzeltir misin?",
        "İş görüşmesi sorularını pratik yapalım",
        "Bana teknoloji ile ilgili kelime hazinesi öğret"
    ],
    "Mongolian": [
        "Өнгөрсөн цагийн үйл үгсийг дадлага хийхэд туслаач?",
        "Миний хобби сонирхлын талаар ярилцъя",
        "Эдгээр төстэй үгсийн ялгааг тайлбарлаач...",
        "Өдөр тутмын хэллэгүүдийг дадлага хийж болох уу?",
        "Миний дуудлагыг сайжруулахад туслаач...",
        "Зоогийн газарт захиалга өгөх дүрд тоглоё",
        "Цагтай холбоотой ямар хэллэгүүд байдаг вэ?",
        "Энэ өгүүлбэрийн грамматикийг засаж өгөөч?",
        "Ажлын ярилцлагын асуултуудыг дадлага хийе",
        "Надад технологийн үгсийн сан заагаач"
    ],
    "Nepali": [
        "के तपाईं मलाई भूतकालका क्रियाहरू अभ्यास गर्न मद्दत गर्न सक्नुहुन्छ?",
        "मेरो रुचिहरूको बारेमा कुरा गरौं",
        "यी समान शब्दहरूको बीचको भिन्नता बताउनुहोस्...",
        "के हामी दैनिक वाक्यांशहरू अभ्यास गर्न सक्छौं?",
        "मेरो उच्चारण सुधार्न मद्दत गर्नुहोस्...",
        "रेस्टुरेन्टमा अर्डर गर्न भूमिका खेलौं",
        "समयसँग सम्बन्धित कुन मुहावराहरू छन्?",
        "के तपाईं यो वाक्यमा व्याकरण सच्याउन सक्नुहुन्छ?",
        "जागिर अन्तर्वार्ताका प्रश्नहरू अभ्यास गरौं",
        "मलाई प्रविधिको शब्दावली सिकाउनुहोस्"
    ],
    "Bengali": [
        "আপনি কি অতীত কালের ক্রিয়াপদগুলি অনুশীলন করতে সাহায্য করতে পারেন?",
        "আমার শখের বিষয়ে কথা বলি",
        "এই সমার্থক শব্দগুলির মধ্যে পার্থক্য ব্যাখ্যা করুন...",
        "আমরা কি দৈনন্দিন অভিব্যক্তিগুলি অনুশীলন করতে পারি?",
        "আমার উচ্চারণ উন্নত করতে সাহায্য করুন...",
        "রেস্তোরাঁয় অর্ডার করার জন্য রোল প্লে করি",
        "সময় সম্পর্কিত কী কী ইডিয়ম আছে?",
        "এই বাক্যে ব্যাকরণ সংশোধন করতে পারবেন?",
        "চাকরির ইন্টারভিউয়ের প্রশ্নগুলি অনুশীলন করি",
        "আমাকে প্রযুক্তি সম্পর্কিত শব্দভাণ্ডার শেখান"
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
    "Turkmen": [
        "Geçmiş zamandaky işlikleri türgenleşdirmäge kömek edip bilersiňizmi?",
        "Geliň, meniň hobbylerim barada gürrüňdeşeliň",
        "Bu meňzeş sözleriň arasyndaky tapawudy düşündiriň...",
        "Gündelik aňlatmalary türgenleşip bilerismi?",
        "Meniň aýdylyşymy gowulandyrmaga kömek ediň...",
        "Restoranda sargyt bermek üçin rol oýunyny oýnalyň",
        "Wagt barada haýsy idiomalar bar?",
        "Bu sözlemde grammatikany düzedip bilersiňizmi?",
        "Iş söhbetdeşliginiň soraglaryny türgenleşeliň",
        "Maňa tehnologiýa boýunça söz baýlygyny öwrediň"
    ]
};