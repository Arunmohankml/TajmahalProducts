export interface JournalArticle {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: "handmade-carpets-care-tips",
    title: "Handmade Carpets: Simple Care Tips for Everyday Living",
    excerpt:
      "A hand-knotted rug is a lifelong investment. Learn how to maintain natural lanolin, vacuum without fiber stress, and preserve vibrant vegetal dye luster across generations.",
    image: "/hmc_assets/handmadecarept---Connection-with-Customers.jpg",
    date: "October 12, 2026",
    category: "CARE & PRESERVATION",
    readTime: "4 min read",
    author: "Tajmahal Finishing Desk",
  },
  {
    slug: "geometry-of-persian-knot",
    title: "From Spun Skein to Palace Floor: The Geometry of the Persian Knot",
    excerpt:
      "From hand-combing raw highland mountain wool to chanting the Talim at vertical upright looms in Bhadohi, discover how master knotters engineer heirloom carpets with lasting structural integrity.",
    image: "/hmc_assets/handmade-carpets-traditional-rugs.jpg",
    date: "September 28, 2026",
    category: "THE WEAVING ART",
    readTime: "6 min read",
    author: "Master Weaver Council",
  },
  {
    slug: "women-empowerment-at-the-loom",
    title: "Women at the Loom: Crafting Empowerment & Heritage in Bhadohi",
    excerpt:
      "Celebrating the skilled hands and generational expertise of our master female artisans who shape the finest knot count Gabbeh and Mughal pieces.",
    image: "/hmc_assets/women-empowring-hmc.jpg",
    date: "August 15, 2026",
    category: "ARTISAN SPOTLIGHT",
    readTime: "5 min read",
    author: "Community Liaison",
  },
  {
    slug: "legacy-of-late-haji-jalil-ansari",
    title: "The Six-Generation Legacy of Late Haji Jalil Ahmad Ansari",
    excerpt:
      "Reflecting on over 18 years on the CEPC Committee of Administration and 6 consecutive terms leading the All India Carpet Trade Fair Committee.",
    image: "/images/site/Late_Haji_Jalil_Ahmad_Ansari__found.jpg",
    date: "April 4, 2025",
    category: "FOUNDER TRIBUTE",
    readTime: "7 min read",
    author: "Family Elders",
  },
];
