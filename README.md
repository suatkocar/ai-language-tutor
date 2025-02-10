# AI Language Tutor

An interactive language learning platform built with SvelteKit that provides personalised language tutoring through AI.

## Features

- Interactive chat interface with AI language tutor
- Support for multiple languages with native language selection
- Real-time conversation with context-aware responses
- Progress tracking with daily goals and statistics
- Comprehensive learning tools:
  - Daily Quiz
  - Flashcards
  - Word Games
  - Speaking Practice
  - Grammar Exercises
  - Writing Practice
  - Level Assessment
- Culturally relevant teaching approach
- Dark/Light mode support
- Responsive design for all devices

## Technologies Used

- SvelteKit
- TypeScript
- TailwindCSS
- OpenAI API
- Vercel (Deployment)

## Project Structure

```
src/
├── lib/
│   ├── components/    # UI Components
│   ├── constants/     # App constants and configurations
│   ├── data/         # Static data and test content
│   ├── stores/       # Svelte stores for state management
│   └── types/        # TypeScript type definitions
├── routes/
│   ├── +page.svelte  # Main app page
│   └── api/          # API endpoints for AI integration
└── styles/           # Global styles and Tailwind config
```

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Features in Detail

### Learning Tools
- **Daily Quiz**: Test your knowledge with daily language challenges
- **Flashcards**: Practice vocabulary with interactive flashcards
- **Word Games**: Engage with interactive word games
- **Speaking Practice**: Practice pronunciation and conversation
- **Grammar Exercises**: Learn and practice grammar rules
- **Writing Practice**: Improve your writing skills
- **Level Assessment**: Evaluate your language proficiency

### Progress Tracking
- Track daily word learning progress
- Monitor practice time
- Set and achieve daily goals
- View word of the day

## Design Approach

The UI/UX was designed with the following principles in mind:

- Clean and distraction-free interface
- Dark/Light mode for comfortable learning in any environment
- Responsive design with sidebar navigation
- Real-time visual feedback for user actions
- Progress visualisation with interactive charts
- Accessibility considerations

## API Integration

The application integrates with several API endpoints:
- `/api/chat`: Main language tutoring interaction
- `/api/evaluate-speech`: Speech evaluation
- `/api/speech-to-text`: Voice input processing
- `/api/text-to-speech`: Audio pronunciation

## Future Improvements

- Enhanced speech recognition for better pronunciation practice
- User authentication and profile management
- Expanded language support
- More interactive exercises and games
- Conversation history with search functionality
- Peer learning and language exchange features
- Mobile app version

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
