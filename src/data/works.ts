export type Spec = {
  label: string;
  value: string;
};

export type LogoVisual = {
  kind: "logo";
  src: string;
  width: number;
  height: number;
  alt: string;
  mark: "square" | "wide";
};

export type ConsoleVisual = {
  kind: "console";
};

export type Visual = LogoVisual | ConsoleVisual;

export type Work = {
  slug: string;
  index: string;
  title: string;
  nav: string;
  description: string;
  summary: string;
  lede: string;
  visual: Visual;
  share: string;
  tone: "sun" | "citrus" | "sheet" | "terminal" | "crate" | "node";
  layout: "feature" | "poster" | "band";
  card: string;
  external?: { href: string; label: string };
  paragraphs: string[];
  specs: Spec[];
  tally?: { code: string; label: string; count: number }[];
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
    visual: {
      kind: "logo",
      src: "/media/logo-on-dark.png",
      width: 500,
      height: 200,
      alt: "Suns' Up logo",
      mark: "wide",
    },
    share: "/brand/og-image.png",
    tone: "sun",
    layout: "band",
    card: "This website. A short record of the work.",
    paragraphs: [
      "This site is the portfolio. It represents the activities in a short form.",
      "Suns' Up is an individual project that makes products for small daily problems. The name combines Sun, Sons, and sums up.",
      "Founded July 2023.",
    ],
    specs: [
      { label: "Index", value: "06" },
      { label: "What it is", value: "This website. A short record of the work." },
      { label: "Maker", value: "One person, making products for small everyday problems." },
      { label: "Founded", value: "July 2023." },
      { label: "Name", value: "Sun, Sons, and sums up." },
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
    visual: {
      kind: "logo",
      src: "/media/stylish-neon.png",
      width: 500,
      height: 500,
      alt: "Stylish! logo, a glass with a citrus slice",
      mark: "square",
    },
    share: "/media/stylish.png",
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
    specs: [
      { label: "Index", value: "01" },
      { label: "What it is", value: "A site of alcohol-free drinks for parties." },
      { label: "Public site", value: "stylish.sunsup.me" },
      { label: "Listed bottles", value: "898" },
      { label: "Scene", value: "Something you can take to the next office party as it is." },
      { label: "Appearance", value: "It does not look out of place on a meeting table." },
      { label: "Size", value: "An amount one person can finish." },
      { label: "Taste", value: "Mix juice and soda, and include one bitter drink." },
      {
        label: "After a meeting",
        value:
          "Drinks to serve when a meeting ends. Mixing sweet and not-sweet is recommended, so people who dislike sweet drinks can drink them too. For autumn, grapes, pears, and apples are the focus, with one hojicha mixed in.",
      },
      {
        label: "From the list",
        value: "Photographed bottles are listed first. From the list, you pick one bottle per category.",
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
    visual: {
      kind: "logo",
      src: "/media/easy-ist-neon.png",
      width: 500,
      height: 500,
      alt: "easy.ist logo",
      mark: "square",
    },
    share: "/media/easy-ist.png",
    tone: "sheet",
    layout: "poster",
    card: "Security check sheets, still in development.",
    paragraphs: [
      "A SaaS-type web product is currently being developed to reduce the cost of answering security check sheets by 90%.",
      "This portfolio does not link to a separate easy.ist site.",
    ],
    specs: [
      { label: "Index", value: "03" },
      { label: "What it is", value: "A SaaS web product, currently in development." },
      { label: "Aim", value: "Reduce the cost of answering security check sheets by 90%." },
      { label: "Link", value: "This portfolio does not link to a separate easy.ist site." },
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
    visual: { kind: "console" },
    share: "/brand/og-image.png",
    tone: "terminal",
    layout: "feature",
    card: "A desktop app for simple, secure translation.",
    paragraphs: [
      "The home page describes a Mac desktop app for simple, high-quality, secure translation. The product page also says it runs on Mac and Windows.",
      "You use your own API key. Translation data goes straight to OpenAI through the API. The published description says your data does not touch their servers.",
      "The picture on this page is a graphic of a translation console. It is not a screenshot of the app.",
    ],
    specs: [
      { label: "Index", value: "02" },
      {
        label: "What it is",
        value: "A desktop app for simple, high-quality, secure translation.",
      },
      { label: "Home page", value: "Described as a Mac app." },
      { label: "Product page", value: "Described as running on Mac and Windows." },
      { label: "API key", value: "You use your own API key." },
      { label: "Data path", value: "Translation data goes to OpenAI through the API." },
      {
        label: "Servers",
        value: "The published description says your data does not touch their servers.",
      },
      { label: "Also described", value: "A local app, and access to ChatGPT." },
      {
        label: "Picture",
        value: "A graphic of a translation console. Not a screenshot of the app.",
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
    visual: {
      kind: "logo",
      src: "/media/trading-neon.png",
      width: 500,
      height: 500,
      alt: "Trading logo, a cardboard package",
      mark: "square",
    },
    share: "/media/trading.png",
    tone: "crate",
    layout: "poster",
    card: "Recommended goods, sold on platforms such as Mercari.",
    paragraphs: [
      "I purchased various recommended products and sell them on platforms such as Mercari.",
      "It is similar to what is called thrift stores, personal imports, and individual shops.",
      "This portfolio does not link to a shop page.",
    ],
    specs: [
      { label: "Index", value: "04" },
      { label: "What it is", value: "Recommended products, purchased and then sold." },
      { label: "Platforms", value: "Platforms such as Mercari." },
      {
        label: "Compared with",
        value: "Thrift stores, personal imports, and individual shops.",
      },
      { label: "Shop link", value: "This portfolio does not link to a shop page." },
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
    visual: {
      kind: "logo",
      src: "/media/consulting-neon.png",
      width: 500,
      height: 500,
      alt: "Consulting logo, a handshake",
      mark: "square",
    },
    share: "/media/consulting.png",
    tone: "node",
    layout: "poster",
    card: "Consulting for the IT and SaaS industries.",
    paragraphs: [
      "Consulting and advisory services related to the IT industry and the SaaS industry.",
    ],
    specs: [
      { label: "Index", value: "05" },
      { label: "What it is", value: "Consulting and advisory for the IT and SaaS industries." },
      { label: "Versatile", value: "Excelling at infrastructure, cloud, and SaaS engineering." },
      { label: "Managerial", value: "Inspiring teams via Scrum Master principles." },
      { label: "Operational", value: "Expert in engineering operations and maintenance." },
    ],
    footnote: "These three lines are the skill descriptions on the About page.",
  },
];

export function workBySlug(slug: string): Work | undefined {
  return works.find((work) => work.slug === slug);
}
