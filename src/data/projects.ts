export type ProjectSlug =
  | "co-sac-tan-thanh"
  | "yumi-project"
  | "lhp-debate"
  | "blue-rose"
  | "disabled-film";
export type Project = {
  slug: ProjectSlug;
  name: string;
  shortName: string;
  discipline: string;
  role: string;
  dates: string;
  theme: string;
  headline: string;
  summary: string;
  question: string;
  contribution: string;
  work: { title: string; text: string }[];
  reach: { value: string; label: string }[];
  reachNote: string;
  reflectionPrompt: string;
  mediaSection: string;
  plate: string;
};

export const projects: Project[] = [
  {
    slug: "co-sac-tan-thanh",
    name: "Cổ Sắc Tân Thanh",
    shortName: "Cổ Sắc Tân Thanh",
    discipline: "Cultural communication",
    role: "Founder",
    dates: "September 2025–present",
    theme: "heritage",
    headline: "Giving heritage a new voice.",
    summary:
      "A student-led cultural heritage club bringing Hát Bội, Vietnamese traditional opera, into social content, hands-on workshops and community programs.",
    question:
      "How can a traditional art form become part of a young person’s everyday conversation?",
    contribution:
      "Như Ngọc founded and led a 20-member club, guiding editorial planning, visual content, event communication and community outreach. Her role connected the club’s media work with in-person cultural activities.",
    work: [
      {
        title: "Culture, made accessible",
        text: "The club produced 30 pieces of social content and campaign material. Cultural storytelling and promotion of club activities helped its Facebook page reach 1,200 likes. These are club outputs, developed through a shared effort.",
      },
      {
        title: "From watching to making",
        text: "Ngọc organized a Hát Bội mask-painting workshop for 20 participants and led a related cultural engagement program for 40 children at Tâm Đức Shelter. The club’s work also supported charitable initiatives.",
      },
      {
        title: "Working with the theatre",
        text: "Collaboration with the Ho Chi Minh City Hát Bội Theatre included cultural activities, event photography and promotional materials documenting traditional performances.",
      },
    ],
    reach: [
      { value: "20", label: "club members" },
      { value: "30", label: "social and campaign pieces" },
      { value: "1,200", label: "Facebook page likes" },
      { value: "VND 30m", label: "raised for charitable initiatives" },
    ],
    reachNote:
      "Club and program outcomes from the supplied résumé. The 20 workshop participants and 40 children belong to separate activities; these figures are not a unique-audience total.",
    reflectionPrompt:
      "Which moment in the mask workshop changed how you would introduce Hát Bội to a new audience?",
    mediaSection: "Cultural heritage media club",
    plate: "Hát Bội",
  },
  {
    slug: "yumi-project",
    name: "Yumi Project",
    shortName: "Yumi Project",
    discipline: "Illustration & character design",
    role: "Founder & Designer",
    dates: "January 2025–present",
    theme: "studio",
    headline: "A world drawn by hand.",
    summary:
      "Expressive portraits, cobalt-outlined characters, small visual stories and illustrated keychains. An independent practice moving between the screen and objects people can hold.",
    question:
      "How can a small drawing make an expression immediately recognizable?",
    contribution:
      "As Yumi’s founder and designer, Ngọc develops character illustrations and custom keychain designs, including Hát Bội mask motifs. She designed and produced heritage-inspired keychains as gifts for organizations joining workshops and community programs.",
    work: [
      {
        title: "Portraits with personality",
        text: "The visual portfolio includes The Beauty of a Woman, colorful character portraits, line studies and graphic compositions. Different treatments of color, contour and expression sit alongside one another in the collection.",
      },
      {
        title: "A shared visual language",
        text: "Character systems and sticker expressions use recurring cobalt contours, blush tones and exaggerated faces. The Moving, moving... comic uses six moments to explore pacing and changes in expression.",
      },
      {
        title: "Illustration in the everyday",
        text: "Family and friendship graphics extend the character vocabulary into small messages. Photographs in the private source collection show finished keychain examples. Production quantities and sales are not documented.",
      },
    ],
    reach: [
      { value: "Portraits", label: "editorial and color studies" },
      { value: "Characters", label: "systems and expressions" },
      { value: "Comics", label: "sequential storytelling" },
      { value: "Objects", label: "applied illustration" },
    ],
    reachNote:
      "The 2026 visual portfolio documents the work. No customer, sales, revenue or audience claims are made.",
    reflectionPrompt:
      "How did you decide which details to keep when turning a character into a small keychain?",
    mediaSection: "Yumi project",
    plate: "Yumi",
  },
  {
    slug: "lhp-debate",
    name: "LHP Debate Club",
    shortName: "LHP Debate",
    discipline: "Events & public speaking",
    role: "Chair of Debate Programs",
    dates: "August 2025–September 2026",
    theme: "debate",
    headline: "Giving ideas a stage.",
    summary:
      "Debate program planning, live event delivery and stage communication, supported by a 10-member programs team.",
    question:
      "What does it take to create a well-organized space for competing ideas?",
    contribution:
      "Ngọc led a 10-member programs team in planning, schedules and on-site delivery. She coordinated events with the club, served as master of ceremonies and handled live program changes.",
    work: [
      {
        title: "Planning the room",
        text: "Two in-person open tournaments in 2025 and 2026 brought together 36 teams and more than 200 debaters in total. The programs team worked on the schedules and delivery that enabled those events.",
      },
      {
        title: "Keeping the program moving",
        text: "Ngọc helped manage a combined VND 140 million operating budget supported by four education-center sponsors. This was budget administration, rather than an amount she personally raised.",
      },
      {
        title: "Beyond the physical stage",
        text: "She supported two online tournaments, each with more than 18 teams, and organized the club’s introductory meeting and a creative debate workshop. The introductory meeting received over 100 registrations.",
      },
    ],
    reach: [
      { value: "10", label: "programs team members" },
      { value: "36", label: "teams across two in-person events" },
      { value: "200+", label: "debaters across those events" },
      { value: "VND 140m", label: "operating budget she helped manage" },
    ],
    reachNote:
      "These are club-event results. Separately, Ngọc earned Regional Champion and National Second Runner-up recognition in the 2025 Global Citizen Debate Challenge; those honors are not LHP organizing awards.",
    reflectionPrompt:
      "Describe a live program change you handled. What would you plan differently next time?",
    mediaSection: "LHP DEBATE CLUB",
    plate: "Dialogue",
  },
  {
    slug: "blue-rose",
    name: "Diary of the Blue Rose",
    shortName: "Blue Rose",
    discipline: "Community & youth leadership",
    role: "President",
    dates: "June 2025–present",
    theme: "community",
    headline: "Attention into action.",
    summary:
      "A youth-led service club organizing learning activities, community visits and practical support through three shared initiatives.",
    question:
      "How can a group’s care for a community become a thoughtful, organized activity?",
    contribution:
      "Ngọc led 20 members and 15 collaborators across three service initiatives. Organizing committee members and parents contributed VND 46 million to support the work.",
    work: [
      {
        title: "Learning through participation",
        text: "Hàm Cần Impact Day 2026 brought STEM, financial literacy, mental well-being, language activities and a quiz competition to 160 primary students. The program distributed 160 gifts valued at VND 30 million.",
      },
      {
        title: "Gathering and sharing",
        text: "A Mid-Autumn Festival and sign-language workshop at Kỳ Quang 2 Pagoda involved 50 children, supported by VND 10 million in contributions. These are participation figures, not measured learning outcomes.",
      },
      {
        title: "Practical support",
        text: "The club coordinated more than 100 meals valued at VND 6 million for patients and families at Children’s Hospital 1. The three initiatives were made possible by members, collaborators and contributing families.",
      },
    ],
    reach: [
      { value: "20 + 15", label: "members and collaborators" },
      { value: "160", label: "Hàm Cần primary students" },
      { value: "160", label: "gifts at Hàm Cần Impact Day" },
      { value: "VND 46m", label: "committee and parent contributions" },
    ],
    reachNote:
      "VND 10m, VND 6m and VND 30m are the components of the VND 46m total, not additional contributions. Funding is not attributed solely to Ngọc.",
    reflectionPrompt:
      "How did you adapt an activity to the children participating, and what would you ask the community before returning?",
    mediaSection: "Diary of the Blue Rose",
    plate: "Together",
  },
  {
    slug: "disabled-film",
    name: "Disabled",
    shortName: "Disabled",
    discipline: "Film & performance",
    role: "Lead Actress",
    dates: "April–May 2026",
    theme: "film",
    headline: "From poem to performance.",
    summary:
      "A student film adaptation of Wilfred Owen’s poem Disabled, translating a classroom literary work into an audiovisual performance.",
    question:
      "How can a performance carry an emotion from a poem onto the screen?",
    contribution:
      "Ngọc portrayed the lead female character. Her documented contribution is acting; writing, directing and editing credits are not attributed to her.",
    work: [
      {
        title: "A literary starting point",
        text: "The team adapted Wilfred Owen’s Disabled for the screen during April–May 2026. The project connects literary interpretation with the choices involved in an audiovisual performance.",
      },
      {
        title: "An ensemble achievement",
        text: "The film received the Best Creative Adaptation Award. Ngọc received an individual Best Actress nomination. The team’s adaptation award and her nomination are distinct forms of recognition.",
      },
      {
        title: "Viewing the work",
        text: "The original film is retained privately. A web-ready version with permission from the relevant rights holders and performers, plus accessible captions, is needed before it can be included here.",
      },
    ],
    reach: [
      { value: "Best Creative Adaptation", label: "team award" },
      { value: "Best Actress", label: "individual nomination" },
    ],
    reachNote:
      "Best Actress is a nomination, not a win. The project does not claim audience or distribution figures.",
    reflectionPrompt:
      "Which acting choice helped you translate a specific moment in the poem into a scene?",
    mediaSection: "Film",
    plate: "Disabled",
  },
];

export const student = {
  name: "Đỗ Trần Như Ngọc",
  englishName: "Do Tran Nhu Ngoc",
  email: "yumidotran@gmail.com",
  school: "Le Hong Phong High School for the Gifted",
  location: "Ho Chi Minh City, Vietnam",
};
export const awards = [
  {
    year: "2025",
    title: "Global Citizen Debate Challenge",
    detail: "Regional Champion & National Second Runner-up",
  },
  {
    year: "2026",
    title: "Disabled film adaptation",
    detail:
      "Best Creative Adaptation (team); Best Actress nomination (individual)",
  },
  {
    year: "2025",
    title: "Vietnamese Teachers’ Day performance",
    detail: "First Prize (team)",
  },
  {
    year: "2024",
    title: "Vietnamese conical hat decoration",
    detail: "First Prize (team)",
  },
];
