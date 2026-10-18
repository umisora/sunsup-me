export type Shot = {
  src: string;
  small: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export type Fact = {
  title: string;
  text?: string;
  items?: string[];
};

export type Work = {
  slug: string;
  index: string;
  title: string;
  nav: string;
  description: string;
  summary: string;
  lede: string;
  logo: { src: string; width: number; height: number; alt: string };
  logoFit: "contain" | "cover";
  tone: "sun" | "citrus" | "sheet" | "terminal" | "crate" | "node";
  layout: "feature" | "poster" | "band";
  card: string;
  external?: { href: string; label: string };
  paragraphs: string[];
  facts?: Fact[];
  tally?: { code: string; label: string; count: number }[];
  shots?: Shot[];
  footnote?: string;
};

export const showcaseOrder = [
  "stylish",
  "deep-gptl",
  "easy-ist",
  "trading",
  "consulting",
  "portfolio",
] as const;

export function orderedWorks(): Work[] {
  return showcaseOrder.map((slug) => {
    const work = works.find((item) => item.slug === slug);
    if (!work) {
      throw new Error(`Missing work: ${slug}`);
    }
    return work;
  });
}

export const works: Work[] = [
  {
    slug: "portfolio",
    index: "06",
    title: "Portfolio",
    nav: "Portfolio",
    description:
      "This website is the Suns' Up portfolio. It is a short record of the work.",
    summary: "This website is the portfolio.",
    lede: "A short record of the work, on this domain.",
    logo: {
      src: "/brand/header-logo.png",
      width: 500,
      height: 200,
      alt: "Suns' Up logo",
    },
    logoFit: "contain",
    tone: "sun",
    layout: "band",
    card: "This website. A short record of the work.",
    paragraphs: [
      "This site is the portfolio. It represents the activities in a short form.",
      "Suns' Up is an individual project that makes products for small daily problems. The name combines Sun, Sons, and sums up.",
      "Founded July 2023.",
    ],
    facts: [
      {
        title: "Suns' Up",
        text: "One person, making products for small problems that show up in ordinary days.",
      },
      {
        title: "Founded",
        text: "July 2023.",
      },
    ],
  },
  {
    slug: "stylish",
    index: "01",
    title: "Stylish!",
    nav: "Stylish!",
    description:
      "Website for enjoying parties alcohol-free. Alcohol-free drinks chosen by scene, appearance, size, and taste.",
    summary: "Alcohol-free drinks for parties.",
    lede: "A site for someone asked to handle an office drinking party.",
    logo: {
      src: "/media/stylish.png",
      width: 500,
      height: 500,
      alt: "Stylish! logo, a glass with a citrus slice",
    },
    logoFit: "contain",
    tone: "citrus",
    layout: "feature",
    card: "Alcohol-free drinks for parties, chosen by scene.",
    external: {
      href: "https://stylish.sunsup.me/",
      label: "stylish.sunsup.me",
    },
    paragraphs: [
      "Website for enjoying parties alcohol-free. It introduces alcohol-free drinks for different scenes.",
      "The public site is for someone asked to handle an office drinking party. After the workday, non-alcoholic drinks are chosen by scene, appearance, size, and taste.",
      "It sums up what to serve after hours at an open office drinking party. People who are not drinking, and people who still have work, are both in the room.",
    ],
    facts: [
      {
        title: "How to choose",
        items: [
          "Scene: something you can take to the next office party as it is.",
          "Appearance: it does not look out of place on a meeting table.",
          "Size: an amount one person can finish.",
          "Taste: mix juice and soda, and include one bitter drink.",
        ],
      },
      {
        title: "After a meeting",
        text: "Drinks to serve when a meeting ends. Mixing sweet and not-sweet is recommended, so people who dislike sweet drinks can drink them too. For autumn, grapes, pears, and apples are the focus, with one hojicha mixed in.",
      },
      {
        title: "From the list",
        text: "Photographed bottles are listed first. From the list, you pick one bottle per category.",
      },
    ],
    tally: [
      { code: "01", label: "Citrus and soda", count: 131 },
      { code: "02", label: "Grape and berry", count: 106 },
      { code: "03", label: "Juice and nectar", count: 154 },
      { code: "04", label: "Tea and herb", count: 147 },
      { code: "05", label: "Craft bottles", count: 224 },
      { code: "06", label: "Cans for parties", count: 136 },
    ],
  },
  {
    slug: "easy-ist",
    index: "03",
    title: "easy.ist",
    nav: "easy.ist",
    description:
      "A SaaS web product in development, to reduce the cost of answering security check sheets by 90%.",
    summary: "A security check-sheet product in development.",
    lede: "A SaaS web product, still being built.",
    logo: {
      src: "/media/easy-ist.png",
      width: 500,
      height: 500,
      alt: "easy.ist logo",
    },
    logoFit: "contain",
    tone: "sheet",
    layout: "poster",
    card: "Security check sheets, still in development.",
    paragraphs: [
      "A SaaS-type web product is currently being developed to reduce the cost of answering security check sheets by 90%.",
      "This portfolio does not link to a separate easy.ist site.",
    ],
  },
  {
    slug: "deep-gptl",
    index: "02",
    title: "Deep-GPTL",
    nav: "Deep-GPTL",
    description:
      "A desktop translation app. You use your own API key, and translation data goes to OpenAI through that API.",
    summary: "A desktop app for simple, high-quality, secure translation.",
    lede: "A native app. You bring the API key.",
    logo: {
      src: "/media/deep-gptl-dark.jpg",
      width: 1200,
      height: 800,
      alt: "Deep-GPTL in a dark theme, with a glossary and input and output panels",
    },
    logoFit: "cover",
    tone: "terminal",
    layout: "feature",
    card: "A desktop app for simple, secure translation.",
    paragraphs: [
      "The home page describes a Mac desktop app for simple, high-quality, secure translation. The product page also says it runs on Mac and Windows.",
      "You use your own API key. Translation data goes straight to OpenAI through the API. The published description says your data does not touch their servers.",
      "The screenshots show a glossary, side-by-side input and output, and a settings panel. The model name on those screens is gpt-4o.",
    ],
    facts: [
      {
        title: "Local app",
        text: "Described as a local app, for quick performance.",
      },
      {
        title: "API key",
        text: "Your API key is the security boundary the product page describes.",
      },
      {
        title: "OpenAI",
        text: "Translation data goes to OpenAI via the API. The page also describes access to ChatGPT.",
      },
      {
        title: "Servers",
        text: "The published description says your data never contacts their servers.",
      },
      {
        title: "Platforms",
        text: "Mac on the home page. Mac and Windows on the product page.",
      },
    ],
    shots: [
      {
        src: "/media/deep-gptl-light.jpg",
        small: "/media/deep-gptl-light-sm.jpg",
        width: 768,
        height: 1024,
        alt: "Deep-GPTL in a light theme, with a glossary, model set to gpt-4o, an API key field, and input and output panels",
        caption: "Light theme",
      },
      {
        src: "/media/deep-gptl-settings.jpg",
        small: "/media/deep-gptl-settings-sm.jpg",
        width: 1024,
        height: 683,
        alt: "Deep-GPTL settings with the model name gpt-4o and controls for temperature, penalties, max tokens, and timeout",
        caption: "Settings",
      },
      {
        src: "/media/deep-gptl-translate.jpg",
        small: "/media/deep-gptl-translate-sm.jpg",
        width: 1024,
        height: 683,
        alt: "Deep-GPTL translation screen with a paragraph in the main field and a glossary beside it",
        caption: "Translation",
      },
    ],
    footnote: "The Deep-GPTL page is marked © 2024, Deep-GPTL.",
  },
  {
    slug: "trading",
    index: "04",
    title: "Trading",
    nav: "Trading",
    description:
      "Recommended products, purchased and sold on platforms such as Mercari. Close to a thrift store, a personal import shop, or an individual shop.",
    summary: "Recommended products, sold on platforms such as Mercari.",
    lede: "Bought, then sold. No shop page on this portfolio.",
    logo: {
      src: "/media/trading.png",
      width: 500,
      height: 500,
      alt: "Trading logo, a cardboard package",
    },
    logoFit: "contain",
    tone: "crate",
    layout: "poster",
    card: "Recommended goods, sold on platforms such as Mercari.",
    paragraphs: [
      "I purchased various recommended products and sell them on platforms such as Mercari.",
      "It is similar to what is called thrift stores, personal imports, and individual shops.",
      "This portfolio does not link to a shop page.",
    ],
  },
  {
    slug: "consulting",
    index: "05",
    title: "Consulting / Advisory",
    nav: "Consulting",
    description: "Consulting and advisory services related to the IT industry and the SaaS industry.",
    summary: "IT and SaaS consulting.",
    lede: "Consulting and advisory for IT and SaaS.",
    logo: {
      src: "/media/consulting.png",
      width: 500,
      height: 500,
      alt: "Consulting logo, a handshake",
    },
    logoFit: "contain",
    tone: "node",
    layout: "poster",
    card: "Consulting for the IT and SaaS industries.",
    paragraphs: [
      "Consulting and advisory services related to the IT industry and the SaaS industry.",
    ],
    facts: [
      {
        title: "Versatile",
        text: "Excelling at infrastructure, cloud, and SaaS engineering.",
      },
      {
        title: "Managerial",
        text: "Inspiring teams via Scrum Master principles.",
      },
      {
        title: "Operational",
        text: "Expert in engineering operations and maintenance.",
      },
    ],
    footnote: "These three lines are the skill descriptions on the About page.",
  },
];

export function workBySlug(slug: string): Work | undefined {
  return works.find((work) => work.slug === slug);
}
