export type RoadmapTopic = {
  id: string;
  title: string;
  theme: string;
  stage: "Discover" | "Build" | "Use" | "Validate";
  summary: string;
  outcomes: Array<{
    label: string;
    href: string;
  }>;
  practicePrompts: string[];
  position: {
    x: number;
    y: number;
  };
};

export type Roadmap = {
  slug: string;
  title: string;
  level: string;
  description: string;
  target: string;
  topics: RoadmapTopic[];
};

export const frenchA1Roadmap: Roadmap = {
  slug: "french-a1",
  title: "French A1",
  level: "CEFR A1",
  description:
    "A practical route through the foundations needed to understand and use everyday French.",
  target:
    "Handle greetings, personal details, simple needs, familiar places, short messages, and basic conversations.",
  topics: [
    {
      id: "sounds",
      title: "Sounds and spelling",
      theme: "Pronunciation",
      stage: "Discover",
      summary:
        "Map French letters to sounds, hear nasal vowels, and build confidence reading aloud.",
      outcomes: [
        {
          label: "Alphabet",
          href: "https://french-grammar.com/en/alphabet/",
        },
        {
          label: "Accent marks",
          href: "https://www.lawlessfrench.com/pronunciation/accents/",
        },
        {
          label: "Nasal vowels",
          href: "https://elon.io/grammar/french/pronunciation/nasal-vowels",
        },
        {
          label: "Final consonants",
          href: "https://www.lawlessfrench.com/pronunciation/final-consonants/",
        },
      ],
      practicePrompts: ["Read short names aloud", "Compare ou, u, on, an"],
      position: { x: 12, y: 12 },
    },
    {
      id: "greetings",
      title: "Greetings and politeness",
      theme: "Social basics",
      stage: "Discover",
      summary:
        "Start and end simple exchanges with the right level of formality.",
      outcomes: [
        {
          label: "Bonjour / salut",
          href: "https://www.lawlessfrench.com/vocabulary/greetings/",
        },
        {
          label: "Tu vs vous",
          href: "https://www.lawlessfrench.com/grammar/subject-pronouns-tu-vs-vous/",
        },
        {
          label: "Please and thanks",
          href: "https://www.lawlessfrench.com/vocabulary/politeness/",
        },
        {
          label: "Goodbyes",
          href: "https://www.lawlessfrench.com/vocabulary/greetings/",
        },
      ],
      practicePrompts: ["Introduce yourself to a stranger", "Make a polite request"],
      position: { x: 31, y: 36 },
    },
    {
      id: "identity",
      title: "Identity and personal details",
      theme: "Core communication",
      stage: "Build",
      summary:
        "Give your name, nationality, job, age, languages, and contact details.",
      outcomes: [
        {
          label: "Je m'appelle",
          href: "https://progress.lawlessfrench.com/learn/theme/320",
        },
        {
          label: "Etre and avoir",
          href: "https://www.francaisfacile.com/cgi2/myexam/voir2.php?id=129261",
        },
        {
          label: "Nationalities",
          href: "https://www.frenchlearner.com/vocabulary/nationalities/",
        },
        {
          label: "Numbers 0-100",
          href: "https://www.lawlessfrench.com/vocabulary/numbers-and-counting/",
        },
      ],
      practicePrompts: ["Create a profile card", "Ask for a phone number"],
      position: { x: 61, y: 12 },
    },
    {
      id: "people",
      title: "People and family",
      theme: "Everyday vocabulary",
      stage: "Build",
      summary:
        "Describe people around you using simple nouns, adjectives, and possessives.",
      outcomes: [
        {
          label: "Family words",
          href: "https://www.lawlessfrench.com/vocabulary/family/",
        },
        {
          label: "Adjective agreement",
          href: "https://www.lawlessfrench.com/grammar/adjectives/",
        },
        {
          label: "Possessives",
          href: "https://www.lawlessfrench.com/grammar/possessive-adjectives/",
        },
        {
          label: "Basic descriptions",
          href: "https://www.lawlessfrench.com/vocabulary/descriptions/",
        },
      ],
      practicePrompts: ["Describe a friend", "Draw and label a family tree"],
      position: { x: 83, y: 36 },
    },
    {
      id: "routine",
      title: "Daily routine",
      theme: "Time and habits",
      stage: "Build",
      summary:
        "Talk about regular activities, days, times, and simple schedules.",
      outcomes: [
        {
          label: "Present tense -er verbs",
          href: "https://www.fluentu.com/blog/french/french-er-verbs/",
        },
        {
          label: "Common irregular verbs",
          href: "https://www.lawlessfrench.com/grammar/irregular-verbs/",
        },
        {
          label: "Days",
          href: "https://www.lawlessfrench.com/vocabulary/days-of-the-week/",
        },
        {
          label: "Clock time",
          href: "https://www.lawlessfrench.com/vocabulary/telling-time/",
        },
      ],
      practicePrompts: ["Explain your morning", "Ask when a class starts"],
      position: { x: 70, y: 55 },
    },
    {
      id: "places",
      title: "Places and directions",
      theme: "Navigation",
      stage: "Use",
      summary:
        "Name common places, locate things, and understand simple directions.",
      outcomes: [
        {
          label: "Il y a",
          href: "https://www.lawlessfrench.com/expressions/il-y-a/",
        },
        {
          label: "Prepositions",
          href: "https://www.lawlessfrench.com/grammar/prepositions/",
        },
        {
          label: "City places",
          href: "https://www.lawlessfrench.com/vocabulary/around-town/",
        },
        {
          label: "Left / right / straight",
          href: "https://www.lawlessfrench.com/vocabulary/directions/",
        },
      ],
      practicePrompts: ["Ask for the station", "Describe what is near your home"],
      position: { x: 54, y: 72 },
    },
    {
      id: "food",
      title: "Food, shops, and prices",
      theme: "Transactions",
      stage: "Use",
      summary:
        "Order food, buy basic items, ask prices, and express simple preferences.",
      outcomes: [
        {
          label: "Articles",
          href: "https://www.lawlessfrench.com/grammar/articles/",
        },
        {
          label: "Quantity words",
          href: "https://www.lawlessfrench.com/grammar/expressions-of-quantity/",
        },
        {
          label: "Je voudrais",
          href: "https://www.lawlessfrench.com/expressions/je-voudrais/",
        },
        {
          label: "Money",
          href: "https://www.lawlessfrench.com/vocabulary/money/",
        },
      ],
      practicePrompts: ["Order breakfast", "Buy fruit at a market"],
      position: { x: 26, y: 55 },
    },
    {
      id: "home",
      title: "Home and objects",
      theme: "Familiar environment",
      stage: "Use",
      summary:
        "Talk about rooms, belongings, colors, and simple locations inside a home.",
      outcomes: [
        {
          label: "Rooms",
          href: "https://www.lawlessfrench.com/vocabulary/house/",
        },
        {
          label: "Common objects",
          href: "https://www.lawlessfrench.com/vocabulary/household-items/",
        },
        {
          label: "Colors",
          href: "https://www.lawlessfrench.com/vocabulary/colors/",
        },
        {
          label: "This / that",
          href: "https://www.lawlessfrench.com/grammar/demonstrative-adjectives/",
        },
      ],
      practicePrompts: ["Describe your room", "Say where an object is"],
      position: { x: 12, y: 72 },
    },
    {
      id: "messages",
      title: "Short messages",
      theme: "Reading and writing",
      stage: "Validate",
      summary:
        "Understand and write simple notes, forms, invitations, and confirmations.",
      outcomes: [
        {
          label: "Basic connectors",
          href: "https://www.lawlessfrench.com/grammar/conjunctions/",
        },
        {
          label: "Dates",
          href: "https://www.lawlessfrench.com/vocabulary/dates/",
        },
        {
          label: "Forms",
          href: "https://www.lawlessfrench.com/vocabulary/personal-information/",
        },
        {
          label: "Text message style",
          href: "https://www.lawlessfrench.com/vocabulary/texting/",
        },
      ],
      practicePrompts: ["Write a short invitation", "Fill in a hotel form"],
      position: { x: 20, y: 92 },
    },
    {
      id: "a1-task",
      title: "A1 conversation task",
      theme: "Assessment readiness",
      stage: "Validate",
      summary:
        "Combine the roadmap into a short exchange about yourself and immediate needs.",
      outcomes: [
        {
          label: "Ask and answer questions",
          href: "https://www.lawlessfrench.com/grammar/questions/",
        },
        {
          label: "Repair phrases",
          href: "https://www.lawlessfrench.com/vocabulary/essential-french/",
        },
        {
          label: "Listening for gist",
          href: "https://www.lawlessfrench.com/listening/",
        },
        {
          label: "Simple role-play",
          href: "https://www.lawlessfrench.com/learn-french/french-for-beginners/",
        },
      ],
      practicePrompts: ["Two-minute self introduction", "Role-play a cafe or reception desk"],
      position: { x: 70, y: 92 },
    },
  ],
};

export const roadmaps = [frenchA1Roadmap];
