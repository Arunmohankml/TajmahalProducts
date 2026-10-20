// Tajmahal Products | Intelligent Atelier Concierge Knowledge & Fuzzy NLP Engine
// Six Generations of Master Weaving in Bhadohi, India (Since 1967)

export interface BotAction {
  label: string;
  type: "whatsapp" | "email" | "link" | "call" | "inquiry";
  url?: string;
  payload?: string;
  isPrimary?: boolean;
}

export interface ChatBotAnswer {
  id: string;
  title: string;
  reply: string;
  actions?: BotAction[];
  suggestedQuestions?: string[];
}

// Common typo corrections & phonetic synonyms
const SYNONYM_MAP: Record<string, string> = {
  // Contact & WhatsApp
  watsap: "whatsapp",
  whatapp: "whatsapp",
  wtsp: "whatsapp",
  whtsapp: "whatsapp",
  whatsap: "whatsapp",
  watsapp: "whatsapp",
  watspp: "whatsapp",
  wapp: "whatsapp",
  fone: "phone",
  phne: "phone",
  phon: "phone",
  cel: "phone",
  mob: "phone",
  mobil: "phone",
  numbr: "phone",
  cal: "call",
  kontact: "contact",
  cantact: "contact",
  cntact: "contact",
  contect: "contact",
  emai: "email",
  eml: "email",
  mail: "email",
  adress: "address",
  addres: "address",
  adres: "address",
  locashun: "address",
  locaton: "address",

  // Pricing & Buying
  prce: "price",
  pric: "price",
  priz: "price",
  prive: "price",
  coste: "cost",
  moni: "money",
  budgt: "budget",
  qoute: "quote",
  quot: "quote",
  quotatn: "quotation",
  rat: "rate",
  rates: "price",
  bying: "buy",
  bay: "buy",
  purchese: "purchase",
  purches: "purchase",
  oder: "order",
  ordr: "order",
  moq: "moq",
  minimam: "minimum",
  minumum: "minimum",

  // Customization
  custm: "custom",
  cuztom: "custom",
  custome: "custom",
  cusom: "custom",
  bespok: "bespoke",
  bespk: "bespoke",
  sise: "size",
  siz: "size",
  dimensn: "dimension",
  mesur: "measure",
  colr: "color",
  colur: "color",
  shpe: "shape",
  runnr: "runner",
  pantone: "pantone",

  // Shipping
  sheepng: "shipping",
  shiping: "shipping",
  shippin: "shipping",
  shipment: "shipping",
  delivry: "delivery",
  delvery: "delivery",
  delivary: "delivery",
  frieght: "freight",
  fret: "freight",
  dispach: "dispatch",
  leadtim: "leadtime",
  tim: "time",
  duratn: "duration",

  // Materials & Quality
  woool: "wool",
  woll: "wool",
  wol: "wool",
  silke: "silk",
  slik: "silk",
  coton: "cotton",
  cutton: "cotton",
  knoted: "knotted",
  kntted: "knotted",
  knot: "knot",
  weav: "weave",
  qualty: "quality",
  clening: "cleaning",
  cleen: "clean",
  washe: "wash",
  washeng: "wash",
  spil: "spill",

  // Place & Heritage
  bhadhohi: "bhadohi",
  badhohi: "bhadohi",
  bhadoi: "bhadohi",
  badhoi: "bhadohi",
  badoi: "bhadohi",
  bikaner: "bikaner",
  mirzapur: "mirzapur",
  tajmahl: "tajmahal",
  tajmahel: "tajmahal",
  taj: "tajmahal",
  haji: "haji",
  jalil: "jalil",
  ansari: "ansari",
  generatn: "generation",
  legaci: "legacy",
  certficate: "certification",
  cepc: "cepc",
  step: "step",

  // Collections
  mughl: "mughal",
  mogul: "mughal",
  kazzak: "kazak",
  kazak: "kazak",
  gabbh: "gabbeh",
  gabeh: "gabbeh",
  berbr: "berber",
  dhurie: "dhurrie",
  kelim: "kilim",
  persn: "persian",
  persia: "persian",
};

// Levenshtein distance algorithm for spelling mistake tolerance
export function levenshteinDistance(s1: string, s2: string): number {
  if (s1 === s2) return 0;
  if (!s1.length) return s2.length;
  if (!s2.length) return s1.length;

  const row = Array.from({ length: s2.length + 1 }, (_, i) => i);

  for (let i = 0; i < s1.length; i++) {
    let prev = i + 1;
    for (let j = 0; j < s2.length; j++) {
      const cost = s1[i] === s2[j] ? 0 : 1;
      const current = Math.min(
        row[j + 1] + 1, // deletion
        prev + 1, // insertion
        row[j] + cost // substitution
      );
      row[j] = prev;
      prev = current;
    }
    row[s2.length] = prev;
  }

  return row[s2.length];
}

// Normalize user query by removing noise, collapsing repeating letters, and resolving typos
export function cleanAndNormalizeQuery(input: string): string[] {
  if (!input) return [];

  // 1. Lowercase and strip punctuation
  const cleaned = input
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .trim();

  // 2. Tokenize
  const rawWords = cleaned.split(/\s+/).filter(Boolean);

  // 3. Process each word
  return rawWords.map((word) => {
    // Collapse 3+ repeating letters (e.g., "ruuuugs" -> "rugs")
    const collapsed = word.replace(/(.)\1{2,}/g, "$1$1");

    // Check direct dictionary synonym
    if (SYNONYM_MAP[collapsed]) {
      return SYNONYM_MAP[collapsed];
    }

    // Check fuzzy match against known dictionary terms
    const dictKeys = Object.keys(SYNONYM_MAP);
    for (const key of dictKeys) {
      if (Math.abs(key.length - collapsed.length) <= 2) {
        const dist = levenshteinDistance(key, collapsed);
        if (dist <= 1 || (collapsed.length >= 6 && dist <= 2)) {
          return SYNONYM_MAP[key];
        }
      }
    }

    return collapsed;
  });
}

// Intent rules definitions
interface IntentRule {
  id: string;
  keywords: string[];
  phrases?: string[];
  handler: () => ChatBotAnswer;
}

const INTENT_RULES: IntentRule[] = [
  // 1. Reach Us / WhatsApp / Direct Contact / Phone
  {
    id: "contact_reach_us",
    keywords: ["whatsapp", "phone", "contact", "call", "email", "number", "reach", "talk", "chat", "msg", "message", "inquiry", "desk"],
    phrases: ["how to reach", "contact you", "talk to someone", "phone number", "whatsapp number", "email address", "call me", "how can i contact", "sales team", "export desk"],
    handler: () => ({
      id: "contact_reach_us",
      title: "Contact & Atelier Direct Access",
      reply: `You can connect directly with our Bhadohi atelier through any of our dedicated channels:\n\n` +
        `• **WhatsApp Direct (Fastest):** [+91 82995 01435](https://wa.me/918299501435) for instant replies, high-res loom photos, and video consultations.\n` +
        `• **Secondary Line:** +91 89896 97814\n` +
        `• **Export Desk Email:** [tmproducts.bhadohi@gmail.com](mailto:tmproducts.bhadohi@gmail.com)\n` +
        `• **Atelier Coordinates:** Taj Mahal Products, Chauri Road, Bhadohi 221401, Uttar Pradesh, India.\n\n` +
        `We provide live video tours of our weaving sheds and graph drafting studios upon request.`,
      actions: [
        {
          label: "Chat on WhatsApp (+91 82995 01435)",
          type: "whatsapp",
          url: "https://wa.me/918299501435?text=Namaste%20Tajmahal%20Products%2C%20I%20am%20reaching%20out%20via%20your%20website%20concierge%20to%20inquire%20about%20your%20handmade%20rugs.",
          isPrimary: true,
        },
        {
          label: "Email Export Desk",
          type: "email",
          url: "mailto:tmproducts.bhadohi@gmail.com?subject=Inquiry%20from%20Website%20Concierge&body=Hello%20Tajmahal%20Products%20Team%2C%0A%0AI%20would%20like%20to%20connect%20regarding...",
        },
        {
          label: "Call Now",
          type: "call",
          url: "tel:+918299501435",
        },
      ],
      suggestedQuestions: ["Can I order custom sizes?", "What is your pricing & MOQ?", "Do you ship worldwide?"],
    }),
  },

  // 2. Pricing, Cost, Rates, MOQ & Quotes
  {
    id: "pricing_quotes",
    keywords: ["price", "cost", "money", "rate", "quote", "quotation", "budget", "moq", "minimum", "wholesale", "discount", "order", "buy", "purchase", "expensive", "cheap", "range"],
    phrases: ["how much", "what is the price", "price list", "minimum order", "moq", "cost per square foot", "trade pricing", "designer discount", "wholesale price"],
    handler: () => ({
      id: "pricing_quotes",
      title: "Transparent Pricing & Trade Terms",
      reply: `Because every Tajmahal rug is individually woven by hand with custom knot densities, sizes, and fibers, our pieces are priced **On Request**:\n\n` +
        `• **Direct Manufacturer Advantage:** As a 6th-generation producer with our own loom sheds in Bhadohi, our rates are direct manufacturer wholesale with zero intermediary markups.\n` +
        `• **Minimum Order Quantity (MOQ):** \n` +
        `  - Custom / Master Bespoke Commissions: **1 single piece**.\n` +
        `  - Hospitality & Commercial Projects: Flexible container-tier pricing.\n` +
        `• **Trade Privileges:** We provide exclusive pricing programs for interior designers, architects, and luxury rug showrooms worldwide.\n\n` +
        `Send us your dimensions or shortlisted design, and our export desk will compute a formal CIF/FOB quote within 2 to 4 hours.`,
      actions: [
        {
          label: "Request Instant WhatsApp Quote",
          type: "whatsapp",
          url: "https://wa.me/918299501435?text=Hello%2C%20I%20would%20like%20to%20receive%20a%20pricing%20quote%20for%20a%20handmade%20rug.",
          isPrimary: true,
        },
        {
          label: "Browse Catalog & Shortlist",
          type: "link",
          url: "/shop",
        },
      ],
      suggestedQuestions: ["Can I order custom sizes?", "How long does weaving take?", "What materials do you use?"],
    }),
  },

  // 3. Custom Sizes, Bespoke Weaving, Colors & CAD Graphs
  {
    id: "custom_bespoke",
    keywords: ["custom", "bespoke", "size", "dimension", "measure", "color", "colour", "shape", "runner", "round", "large", "oversize", "pantone", "cad", "graph", "drawing", "dye", "tailor", "specific"],
    phrases: ["custom size", "made to order", "different color", "hallway runner", "circular rug", "oversized rug", "pantone matching", "can i customize", "bespoke order"],
    handler: () => ({
      id: "custom_bespoke",
      title: "Bespoke Sizing & Atelier Customization",
      reply: `**Yes, custom dimensions are our core specialty!** Over 60% of our production is entirely custom-commissioned:\n\n` +
        `• **Any Dimension:** Hallway runners, circular rugs, palatial 14×20 ft sizes, or irregular architectural contours.\n` +
        `• **Color Matching:** Exact matching to your scheme via Pantone TPX/TCX chips or physical fabric samples.\n` +
        `• **CAD Graph Approval:** Before a single knot is tied, our master draftsmen generate a colored point-paper grid for your final sign-off.\n` +
        `• **Sample Strike-offs:** We weave physical 1×1 ft or 2×2 ft strike-offs for touch, sheen, and color validation within 2 to 3 weeks.`,
      actions: [
        {
          label: "Discuss Custom Size on WhatsApp",
          type: "whatsapp",
          url: "https://wa.me/918299501435?text=Namaste%20Tajmahal%20Products%2C%20I%20am%20interested%20in%20a%20custom%20bespoke%20rug%20order.%20My%20desired%20size%20is...",
          isPrimary: true,
        },
        {
          label: "Email Custom Requirements",
          type: "email",
          url: "mailto:tmproducts.bhadohi@gmail.com?subject=Custom%20Rug%20Commission%20Inquiry&body=Hello%20Tajmahal%20Atelier%2C%0A%0AMy%20custom%20rug%20specifications%20are%3A%0ASize%3A%20%0AColors%3A%20%0AStyle%3A%20%0AProject%20Location%3A%20",
        },
      ],
      suggestedQuestions: ["How long does custom weaving take?", "What materials do you use?", "Do you ship worldwide?"],
    }),
  },

  // 4. International Shipping, Logistics & Delivery Time
  {
    id: "shipping_delivery",
    keywords: ["shipping", "delivery", "freight", "dispatch", "leadtime", "time", "duration", "courier", "air", "sea", "container", "usa", "europe", "uk", "dubai", "uae", "australia", "duty", "customs", "export", "tracking"],
    phrases: ["how long does it take", "international shipping", "do you ship to", "delivery time", "shipping cost", "sea cargo", "air freight", "door to door"],
    handler: () => ({
      id: "shipping_delivery",
      title: "Insured Worldwide Freight & Timelines",
      reply: `We deliver door-to-door to over 45 countries worldwide, backed by Government of India Star Export House credentials:\n\n` +
        `• **Destinations:** USA, UK, Germany, France, Italy, UAE, Saudi Arabia, Australia, Canada, Japan, and beyond.\n` +
        `• **Shipping Modes:**\n` +
        `  - **Express Air Cargo (DHL / FedEx / Air Freight):** 7–10 business days directly to your doorstep.\n` +
        `  - **Ocean Container Logistics:** 20ft / 40ft FCL or LCL consolidation for commercial & wholesale volume.\n` +
        `• **Production Timelines:**\n` +
        `  - **In-Stock Heirlooms:** Dispatched within 48 to 72 hours.\n` +
        `  - **Custom Hand-Knotted Pieces:** 6 to 14 weeks depending on knot density and surface area.\n` +
        `• **Packaging:** Double-layer heavy waterproof tarpaulin with sealed inner poly lining to ensure mint condition arrival.`,
      actions: [
        {
          label: "Inquire Freight to Your Country",
          type: "whatsapp",
          url: "https://wa.me/918299501435?text=Hello%2C%20could%20you%20please%20quote%20freight%20and%20delivery%20time%20to%20my%20country...",
          isPrimary: true,
        },
      ],
      suggestedQuestions: ["What is your pricing & MOQ?", "Can I order custom sizes?", "How do I care for my rug?"],
    }),
  },

  // 5. Materials, Fibers, Wool, Silk & Knot Densities
  {
    id: "materials_craftsmanship",
    keywords: ["wool", "silk", "cotton", "knot", "knotted", "density", "kpsi", "material", "fiber", "bikaner", "newzealand", "quality", "vegetal", "dye", "abrash", "handmade", "tufted", "persian", "turkish"],
    phrases: ["what materials", "pure wool", "natural silk", "knot count", "how is it made", "is it authentic", "vegetable dyes", "hand knotted vs machine"],
    handler: () => ({
      id: "materials_craftsmanship",
      title: "Noble Fibers & Master Hand-Knotting",
      reply: `Our ateliers strictly uphold natural, authentic fiber standards with zero synthetic petrochemical fillers:\n\n` +
        `• **Pure Highland Wool:** Long-staple virgin mountain wool naturally rich in lanolin, offering organic stain-resistance and generational resilience.\n` +
        `• **Natural Mulberry Silk:** Luminous pure silk hand-knotted as reliefs or 100% silk warps for palatial reflective depth.\n` +
        `• **Knot Architecture:** \n` +
        `  - Asymmetrical **Persian (Senneh)** knots for intricate floral filigree.\n` +
        `  - Symmetrical **Turkish (Ghiordes)** knots for bold tribal geometry.\n` +
        `  - Knot densities range from 60 KPSI (tribal Gabbeh) up to **400+ KPSI** (Mughal Super Fine).\n` +
        `• **Vegetal Washing:** Herbal river washing in running waters and open-air sun curing to bring out deep organic abrash patina.`,
      actions: [
        {
          label: "Ask About Wool & Knot Densities",
          type: "whatsapp",
          url: "https://wa.me/918299501435?text=Hello%20Tajmahal%20Products%2C%20I%20would%20like%20to%20know%20more%20about%20your%20wool%20and%20knot%20densities.",
          isPrimary: true,
        },
        {
          label: "Explore Collections",
          type: "link",
          url: "/shop",
        },
      ],
      suggestedQuestions: ["How do I clean and care for the rug?", "Can I order custom sizes?", "Where are you located?"],
    }),
  },

  // 6. Care, Cleaning, Washing, Stain Removal & Longevity
  {
    id: "care_cleaning",
    keywords: ["cleaning", "clean", "wash", "washing", "spill", "stain", "dirt", "care", "vacuum", "moth", "protect", "maintain", "maintenance", "pet", "water", "damage", "wine", "coffee"],
    phrases: ["how to clean", "how to wash", "cleaning instructions", "spilled coffee", "spilled wine", "pet stains", "vacuum cleaner", "how to care"],
    handler: () => ({
      id: "care_cleaning",
      title: "Artisan Care & Maintenance Guide",
      reply: `Because authentic hand-knotted wool is packed with natural lanolin, it naturally repels dirt. Here is how to keep your heirloom pristine for decades:\n\n` +
        `1. **Vacuuming:** Vacuum once or twice weekly in the direction of the pile. **Do not use a rotating beater bar** (use flat suction nozzle).\n` +
        `2. **Spills & Liquids:** Blot immediately with a dry, clean white cotton cloth or paper towel. **Never rub or scrub.** Press firmly to absorb.\n` +
        `3. **Spot Cleaning:** For stubborn marks, dab with lukewarm water and a drop of neutral wool shampoo. Blot dry with a dry towel.\n` +
        `4. **Sunlight & Rotation:** Rotate your carpet 180° once a year for even foot traffic wear, and occasionally air it out in indirect morning sun.\n` +
        `5. **Professional Washing:** Wash every 3 to 5 years by a specialized oriental rug cleaner (never standard dry cleaning).`,
      actions: [
        {
          label: "Ask Care Advice on WhatsApp",
          type: "whatsapp",
          url: "https://wa.me/918299501435?text=Hello%2C%20I%20need%20care%20or%20stain-removal%20advice%20for%20my%20wool%20rug.",
          isPrimary: true,
        },
      ],
      suggestedQuestions: ["What materials do you use?", "Can I order custom sizes?", "What is your pricing & MOQ?"],
    }),
  },

  // 7. Heritage, History, Bhadohi & Founder Haji Jalil
  {
    id: "heritage_history",
    keywords: ["bhadohi", "history", "heritage", "legacy", "founder", "haji", "jalil", "ansari", "generation", "six", "1967", "story", "about", "who", "family", "atelier", "workshop", "shed", "india"],
    phrases: ["who are you", "about tajmahal products", "history of company", "six generations", "who is the founder", "where in bhadohi", "carpet city"],
    handler: () => ({
      id: "heritage_history",
      title: "Six Generations of Bhadohi Mastery",
      reply: `**Tajmahal Products** represents six generations of ancestral hand-weaving heritage in Bhadohi, Uttar Pradesh, the historic carpet capital of India:\n\n` +
        `• **Established 1967:** Formally established by **Late Haji Jalil Ahmad Ansari**, legendary master craftsman who served 18+ years on the Committee of Administration of the CEPC (Ministry of Textiles) and President of the All India Carpet Trade Fair.\n` +
        `• **Ancestral Continuity:** Today, 6th-generation leadership oversees active master looms, carrying ancestral craft into the 21st century.\n` +
        `• **Social Responsibility:** Over 400 weaver families are supported under ethical, fair-trade standards with zero child labour (certified under Label STEP).`,
      actions: [
        {
          label: "Read Full Heritage Story",
          type: "link",
          url: "/about",
          isPrimary: true,
        },
        {
          label: "Speak with Our Leadership",
          type: "whatsapp",
          url: "https://wa.me/918299501435?text=Namaste%2C%20I%20would%20love%20to%20learn%20more%20about%20Tajmahal%20Products%20heritage.",
        },
      ],
      suggestedQuestions: ["Can I visit your Bhadohi atelier?", "What certifications do you have?", "Browse Collections"],
    }),
  },

  // 8. Visiting Bhadohi Atelier / Loom Inspections
  {
    id: "visiting_atelier",
    keywords: ["visit", "visiting", "location", "address", "map", "directions", "factory", "loom", "inspection", "appointment", "airport", "varanasi", "tour"],
    phrases: ["can i visit", "visit the factory", "where are you located", "factory address", "how to visit bhadohi", "video tour"],
    handler: () => ({
      id: "visiting_atelier",
      title: "Visit Our Bhadohi Loom Sheds",
      reply: `We warmly welcome interior designers, architects, and private collectors to visit our historic workshops:\n\n` +
        `• **Atelier Location:** Taj Mahal Products, Chauri Road, Bhadohi 221401, Uttar Pradesh, India.\n` +
        `• **Travel Access:** Bhadohi is located approximately **45 km from Lal Bahadur Shastri International Airport (Varanasi / VNS)**. We gladly arrange chauffeur transfers for visiting trade clients.\n` +
        `• **Virtual Video Loom Inspections:** If you cannot travel in person, we host scheduled high-definition WhatsApp video calls straight from our loom sheds so you can watch your carpet being woven knot-by-knot.`,
      actions: [
        {
          label: "Schedule Atelier Visit / Video Loom Call",
          type: "whatsapp",
          url: "https://wa.me/918299501435?text=Hello%20Tajmahal%20Products%2C%20I%20would%20like%20to%20schedule%20an%20atelier%20visit%20or%20live%20video%20loom%20inspection.",
          isPrimary: true,
        },
        {
          label: "Open Contact Page",
          type: "link",
          url: "/contact",
        },
      ],
      suggestedQuestions: ["How to reach on WhatsApp?", "What is your pricing & MOQ?", "Can I order custom sizes?"],
    }),
  },

  // 9. Certifications, Fair Trade, CEPC & Quality Marks
  {
    id: "certifications_fairtrade",
    keywords: ["certification", "certified", "fairtrade", "fair", "trade", "step", "cepc", "star", "export", "dnb", "dun", "bradstreet", "ethical", "child", "labor", "labour", "authentic"],
    phrases: ["are you certified", "fair trade certificate", "cepc registered", "star export house", "ethical weaving", "child labour policy"],
    handler: () => ({
      id: "certifications_fairtrade",
      title: "Government Accreditations & Fair Trade",
      reply: `Tajmahal Products is internationally verified and accredited by recognized regulatory bodies:\n\n` +
        `• **Star Export House:** Recognized by the Ministry of Commerce & Industry, Government of India for exceptional export integrity.\n` +
        `• **CEPC Accredited:** Certified member of the Carpet Export Promotion Council (Ministry of Textiles, Govt. of India).\n` +
        `• **Label STEP Fair Trade:** Strict independent compliance guaranteeing zero child labor, fair living wages, and healthy working environments for our artisans.\n` +
        `• **Dun & Bradstreet:** Global financial and credibility verification for seamless international banking and contracts.`,
      actions: [
        {
          label: "Inquire Compliance & Paperwork",
          type: "whatsapp",
          url: "https://wa.me/918299501435?text=Hello%2C%20I%20am%20inquiring%20about%20your%20export%20certifications%20and%20compliance%20documentation.",
          isPrimary: true,
        },
      ],
      suggestedQuestions: ["What is your pricing & MOQ?", "Do you ship worldwide?", "Browse Collections"],
    }),
  },

  // 10. Samples, Swatches & Pompom Boxes
  {
    id: "samples_swatches",
    keywords: ["sample", "swatch", "strikeoff", "pompom", "box", "touch", "feel", "color", "approval", "designer", "test"],
    phrases: ["can i get a sample", "send samples", "order swatches", "color pompoms", "touch and feel"],
    handler: () => ({
      id: "samples_swatches",
      title: "Architectural Swatches & Pompom Kits",
      reply: `We regularly prepare custom physical swatches for trade clients and private commissions:\n\n` +
        `• **Yarn Pompom Boxes:** True dyed wool and silk pompoms for exact spatial lighting evaluation.\n` +
        `• **Woven Strike-Offs (1×1 ft or 2×2 ft):** Real hand-knotted samples showing true knot density, pile height, and finish.\n` +
        `• **Express Dispatch:** Sample kits ship worldwide via DHL Express within 7–14 days.`,
      actions: [
        {
          label: "Request Swatch Box on WhatsApp",
          type: "whatsapp",
          url: "https://wa.me/918299501435?text=Hello%20Tajmahal%20Products%2C%20I%20would%20like%20to%20request%20a%20sample%20swatch%20or%20yarn%20pompom%20kit.",
          isPrimary: true,
        },
      ],
      suggestedQuestions: ["Can I order custom sizes?", "What is your pricing & MOQ?", "Contact & Reach Us"],
    }),
  },

  // 11. Collections & Styles (Mughal, Kazzak, Gabbeh, etc.)
  {
    id: "collections_styles",
    keywords: ["collection", "collections", "style", "styles", "catalog", "catalogue", "mughal", "kazak", "kazzak", "gabbeh", "berber", "tribal", "floral", "medallion", "flatweave", "kilim", "dhurrie", "modern", "traditional", "antique"],
    phrases: ["what styles do you have", "show me rugs", "mughal carpets", "tribal rugs", "modern gabbeh", "browse catalog"],
    handler: () => ({
      id: "collections_styles",
      title: "Our Signature Curated Collections",
      reply: `Our ateliers craft a wide spectrum of heritage and contemporary rug styles:\n\n` +
        `• **Mughal Super Fine Knots:** Historic 16th-century imperial floral court motifs with luminous silk highlights.\n` +
        `• **Caucasian Kazzak Tribal:** Geometric medallions, bold talismans, and saturated madder red and indigo natural dyes.\n` +
        `• **Modern Gabbeh:** Minimalist, thick plush wool carpets with soft organic abrash fields for contemporary spaces.\n` +
        `• **Architectural Flatweaves & Dhurries:** Reversible, lightweight geometric weaves perfect for coastal or high-traffic settings.\n` +
        `• **Bespoke Commissions:** Custom archive reproductions from 1967 sketches.`,
      actions: [
        {
          label: "View All Products in Shop",
          type: "link",
          url: "/shop",
          isPrimary: true,
        },
        {
          label: "Request PDF Digital Catalog",
          type: "whatsapp",
          url: "https://wa.me/918299501435?text=Hello%20Tajmahal%20Products%2C%20please%20send%20your%20latest%20high-res%20PDF%20catalog.",
        },
      ],
      suggestedQuestions: ["What is your pricing & MOQ?", "Can I order custom sizes?", "How long does weaving take?"],
    }),
  },

  // 12. Friendly Greetings
  {
    id: "greetings",
    keywords: ["hello", "hi", "hey", "namaste", "goodmorning", "goodafternoon", "goodevening", "howdy", "salaam", "hola", "bonjour"],
    phrases: ["hello", "hi there", "good morning", "good evening", "namaste", "can you help me"],
    handler: () => ({
      id: "greetings",
      title: "Namaste & Welcome",
      reply: `Namaste! Welcome to **Tajmahal Products**. We bring six generations of handmade carpet excellence from Bhadohi, India.\n\n` +
        `I am your direct Atelier Concierge. How may I assist you today?\n\n` +
        `• Looking for custom dimensions or bespoke weaving?\n` +
        `• Inquiring about wholesale rates, MOQ, or trade privileges?\n` +
        `• Inquiring about international freight and lead times?\n` +
        `• Connecting directly with our master export desk on WhatsApp?`,
      actions: [
        {
          label: "Chat on WhatsApp (+91 82995 01435)",
          type: "whatsapp",
          url: "https://wa.me/918299501435?text=Namaste%20Tajmahal%20Products%2C%20I%20am%20exploring%20your%20rugs%20and%20would%20like%20to%20learn%20more.",
          isPrimary: true,
        },
        {
          label: "Explore Catalog",
          type: "link",
          url: "/shop",
        },
      ],
      suggestedQuestions: ["Can I order custom sizes?", "What is your pricing & MOQ?", "Do you ship worldwide?"],
    }),
  },
];

// Fallback response with intelligent matching summary
function generateFallbackResponse(query: string): ChatBotAnswer {
  return {
    id: "fallback_help",
    title: "Direct Atelier Concierge Support",
    reply: `Thank you for your question. While I am learning every day, our master weavers and export desk in Bhadohi are ready right now to provide exact details for your project:\n\n` +
      `• **WhatsApp Direct (Instant):** [+91 82995 01435](https://wa.me/918299501435) for quick photos, custom dimension quotes, and inventory availability.\n` +
      `• **Export Desk:** [tmproducts.bhadohi@gmail.com](mailto:tmproducts.bhadohi@gmail.com)\n` +
      `• **Direct Phone:** +91 82995 01435 / +91 89896 97814\n\n` +
      `Feel free to click any of the quick options below or send us a quick message!`,
    actions: [
      {
        label: "Chat on WhatsApp with Export Desk",
        type: "whatsapp",
        url: `https://wa.me/918299501435?text=${encodeURIComponent("Hello Tajmahal Products, I had a question on your website: " + query)}`,
        isPrimary: true,
      },
      {
        label: "Email Export Desk",
        type: "email",
        url: `mailto:tmproducts.bhadohi@gmail.com?subject=Website%20Inquiry&body=${encodeURIComponent("Hello Tajmahal Products,\n\nI am inquiring regarding:\n" + query)}`,
      },
      {
        label: "Browse All Collections",
        type: "link",
        url: "/shop",
      },
    ],
    suggestedQuestions: [
      "Can I order custom sizes?",
      "What is your pricing & MOQ?",
      "Do you ship internationally?",
      "How to reach you on WhatsApp?",
    ],
  };
}

// Master query matcher with scoring and spell tolerance
export function findBestResponse(userQuery: string): ChatBotAnswer {
  if (!userQuery || !userQuery.trim()) {
    return INTENT_RULES.find((r) => r.id === "greetings")!.handler();
  }

  const rawLower = userQuery.toLowerCase().trim();
  const normalizedTokens = cleanAndNormalizeQuery(userQuery);

  let bestRule: IntentRule | null = null;
  let highestScore = 0;

  for (const rule of INTENT_RULES) {
    let score = 0;

    // 1. Check exact phrase matches (high weight)
    if (rule.phrases) {
      for (const phrase of rule.phrases) {
        if (rawLower.includes(phrase)) {
          score += 15;
        }
      }
    }

    // 2. Check token matches
    for (const token of normalizedTokens) {
      if (rule.keywords.includes(token)) {
        score += 5;
      } else {
        // Fuzzy token match against rule keywords
        for (const kw of rule.keywords) {
          if (Math.abs(kw.length - token.length) <= 2) {
            const dist = levenshteinDistance(kw, token);
            if (dist <= 1) {
              score += 4;
              break;
            } else if (token.length >= 6 && dist <= 2) {
              score += 2;
              break;
            }
          }
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestRule = rule;
    }
  }

  // Threshold check: need at least a meaningful score to avoid false positives
  if (bestRule && highestScore >= 4) {
    return bestRule.handler();
  }

  return generateFallbackResponse(userQuery);
}
