// Tajmahal Products — Heritage Catalog & Company Profile
// Six Generations of Handmade Rug Craftsmanship — Bhadohi, India

export interface CarpetProduct {
  id: string;
  title: string;
  collection_id: string;
  collection_name: string;
  image_url: string;
  color: string;
  size: string;
  material: string;
  weave: string;
  finish: string;
  style: string;
  description: string;
  is_featured: boolean;
  stock_status: string;
  order_code: string;
  price_indicator?: string;
  created_at?: string;
}

export interface CarpetCollection {
  id: string;
  num: string;
  name: string;
  heroImg: string;
  desc: string;
  material: string;
  weave: string;
  finish: string;
  style: string;
  origin: string;
}

export interface StaffEmail {
  id: string;
  email: string;
  name: string;
  role: string;
  is_primary: boolean;
  notify_inquiries: boolean;
  created_at: string;
}

export const COMPANY_PROFILE = {
  name: "Tajmahal Products",
  tagline: "Six Generations of Handmade Rug Excellence Since 1967",
  origin: "Bhadohi, Uttar Pradesh, India",
  hub: "The world's largest hand-knotted carpet producing region",
  established: 1967,
  heritage_generations: "Six Generations",
  address: "Chauri Road, Bhadohi — 221401, Uttar Pradesh, India",
  phoneNumbers: ["+91 82995 01435", "+91 89896 97814"],
  whatsappNumber: "918299501435",
  emails: ["tmproducts.bhadohi@gmail.com", "hasxxann@gmail.com"],
  globalPresence: [
    { region: "North America", desc: "Wholesale & high-end design showroom distribution" },
    { region: "Europe", desc: "Heritage galleries and architectural contract partnerships" },
    { region: "Australia", desc: "Bespoke residential interior designers & private commissions" },
    { region: "Middle East", desc: "Palatial estates, luxury villas & hospitality suites" }
  ],
  founder: {
    name: "Late Haji Jalil Ahmad Ansari",
    title: "Founder & Master Craftsman",
    passed: "4 April 2025",
    tribute: "The foundation of Tajmahal Products was strengthened by the vision, dedication, and leadership of the late Mr. Jalil Ahmad Ansari. Beginning his journey in carpet weaving at a young age, he acquired mastery over every stage of the craft — design development, wool dyeing, weaving, washing, clipping, embossing, and finishing.",
    positions: [
      "Honorary Secretary — All India Carpet Manufacturers Association (AICMA), Bhadohi (4 consecutive years)",
      "President — All India Carpet Trade Fair Committee (6 consecutive years)",
      "Elected Member — Committee of Administration, Carpet Export Promotion Council (CEPC), New Delhi (over 18 years)"
    ],
    image: "/images/site/Late_Haji_Jalil_Ahmad_Ansari__found.jpg"
  },
  certifications: [
    {
      id: "cepc",
      name: "Carpet Export Promotion Council (CEPC)",
      subtitle: "Ministry of Textiles, Government of India",
      image: "/images/cepc-mark.png"
    },
    {
      id: "step",
      name: "STEP Fair Trade",
      subtitle: "Certified Fair Trade Handmade Carpets",
      image: "/images/cert-step.svg"
    },
    {
      id: "star-export",
      name: "Star Export House",
      subtitle: "Government-Recognised Export Status",
      image: "/images/cert-star-export.svg"
    },
    {
      id: "dnb",
      name: "Dun & Bradstreet",
      subtitle: "Global Credibility Verified — Decide with Confidence",
      image: "/images/cert-dnb.svg"
    }
  ]
};

export const COLLECTIONS_DATA: Record<string, CarpetCollection> = {
  "gabbeh": {
    "id": "gabbeh",
    "num": "01",
    "name": "Gabbeh",
    "heroImg": "/images/site/Gabbeh_collection_carpet__tribal_mo.jpg",
    "desc": "Coarse, expressive weaves in bold natural tones. Gabbeh rugs are woven with a thicker, looser knot for a soft, tactile pile \u2014 raw texture with a distinctly modern hand, favoured for relaxed, contemporary interiors.",
    "material": "100% Hand-Spun Wool",
    "weave": "Hand-Knotted",
    "finish": "Hand-Washed, Natural Sheen",
    "style": "Tribal / Contemporary",
    "origin": "Bhadohi, India"
  },
  "kazzak": {
    "id": "kazzak",
    "num": "02",
    "name": "Kazzak",
    "heroImg": "/images/kazzak/kazzak_07.jpg",
    "desc": "Tribal geometry and a dense, durable pile, woven in the Caucasian weaving tradition. Kazzak rugs carry bold medallions and saturated colourways, built for spaces that call for pattern with presence.",
    "material": "100% Hand-Spun Wool",
    "weave": "Hand-Knotted",
    "finish": "Hand-Clipped, Low Sheen",
    "style": "Caucasian Tribal Geometric",
    "origin": "Bhadohi, India"
  },
  "tufted": {
    "id": "tufted",
    "num": "03",
    "name": "Tufted",
    "heroImg": "/images/tufted/11-tufted-circle-motif.jpg",
    "desc": "Contemporary hand-tufted construction, built for scale and consistency across large runs. A versatile range suited to retail, hospitality, and volume programs without compromising a handmade finish.",
    "material": "Wool / Wool-Blend",
    "weave": "Hand-Tufted",
    "finish": "Sheared / Carved",
    "style": "Contemporary Geometric",
    "origin": "Bhadohi, India"
  },
  "moroccan": {
    "id": "moroccan",
    "num": "04",
    "name": "Moroccan",
    "heroImg": "/images/moroccan/01-moroccan-bzr.jpg",
    "desc": "Minimal, sculptural pile inspired by the rugs of the Atlas Mountains. Restrained pattern and a plush, high pile bring quiet texture to modern and minimalist interiors alike.",
    "material": "100% Highland Wool",
    "weave": "Hand-Knotted, Low Knot Density",
    "finish": "Hand-Sheared, Plush Trim",
    "style": "Minimal / Berber-Inspired",
    "origin": "Bhadohi, India"
  },
  "mughal": {
    "id": "mughal",
    "num": "05",
    "name": "Mughal",
    "heroImg": "/images/mughal/01-mughal-catalogue-design.jpg",
    "desc": "Ornate period patterns drawn from imperial Indian design tradition. Floral and medallion motifs are hand-knotted with fine detail, honouring the palace weaving styles of the Mughal era.",
    "material": "Wool with Silk Highlights",
    "weave": "Hand-Knotted, Fine Knot Count",
    "finish": "Hand-Finished, Silk Sheen",
    "style": "Traditional Palace / Floral Medallion",
    "origin": "Bhadohi, India"
  },
  "mughal-super": {
    "id": "mughal-super",
    "num": "06",
    "name": "Mughal Super",
    "heroImg": "/images/mughal-super/01-kashan-p109-red-cream.jpg",
    "desc": "Our finest-grade Mughal construction \u2014 a higher knot density and richer finish for the most discerning commissions. Elaborate medallion work in premium wool and silk, made as heirloom pieces.",
    "material": "Premium Blended Wool & Natural Silk",
    "weave": "Hand-Knotted, Highest Knot Density",
    "finish": "Fine Hand-Finished, Lustrous Sheen",
    "style": "Luxury Heirloom / Elaborate Medallion",
    "origin": "Bhadohi, India"
  }
};

export const INITIAL_PRODUCTS: CarpetProduct[] = [
  {
    "id": "gabbeh-01",
    "title": "Gabbeh \u2014 Denim Blue & Tan Tribal",
    "collection_id": "gabbeh",
    "collection_name": "Gabbeh",
    "image_url": "/images/site/Gabbeh_collection_carpet__tribal_mo.jpg",
    "color": "Denim Blue, Tan & Natural Ochre",
    "size": "Bespoke / Standard (6x9, 8x10, 9x12 ft)",
    "material": "100% Hand-Spun Wool",
    "weave": "Hand-Knotted",
    "finish": "Hand-Washed, Natural Sheen",
    "style": "Tribal / Contemporary",
    "description": "A masterwork Gabbeh carpet woven in tribal geometric panels of denim blue, tan, and soft ochre. Thick, plush pile hand-spun from pure virgin wool.",
    "is_featured": true,
    "stock_status": "Custom / Commission",
    "order_code": "TM-GBH-01"
  },
  {
    "id": "gabbeh-02",
    "title": "Gabbeh \u2014 Warm Rust & Earth Field",
    "collection_id": "gabbeh",
    "collection_name": "Gabbeh",
    "image_url": "/images/site/img_0.jpg",
    "color": "Rust, Warm Earth & Natural Cream",
    "size": "Custom Sizes on Request",
    "material": "100% Hand-Spun Wool",
    "weave": "Hand-Knotted",
    "finish": "Hand-Washed, Natural Sheen",
    "style": "Tribal / Contemporary",
    "description": "Expressive natural wool weave showcasing raw artisanal abrash variation. Gentle underfoot with a lustrous herbal wash finish.",
    "is_featured": true,
    "stock_status": "Custom / Commission",
    "order_code": "TM-GBH-02"
  },
  {
    "id": "kazzak-01",
    "title": "Kazzak \u2014 Rust Red & Navy",
    "collection_id": "kazzak",
    "collection_name": "Kazzak",
    "image_url": "/images/kazzak/kazzak_01.jpg",
    "color": "Rust Red & Navy",
    "size": "Custom & Architectural Sizes (5x7 to 12x15 ft)",
    "material": "100% Hand-Spun Wool",
    "weave": "Hand-Knotted",
    "finish": "Hand-Clipped, Low Sheen",
    "style": "Caucasian Tribal Geometric",
    "description": "A hand-knotted Kazzak carpet in a Rust Red & Navy colourway, woven with dense tribal medallions in the authentic Caucasian tradition.",
    "is_featured": true,
    "stock_status": "Available to Order",
    "order_code": "TM-KZK-01"
  },
  {
    "id": "kazzak-02",
    "title": "Kazzak \u2014 Navy & Rust",
    "collection_id": "kazzak",
    "collection_name": "Kazzak",
    "image_url": "/images/kazzak/kazzak_02.jpg",
    "color": "Navy & Rust",
    "size": "Custom & Architectural Sizes (5x7 to 12x15 ft)",
    "material": "100% Hand-Spun Wool",
    "weave": "Hand-Knotted",
    "finish": "Hand-Clipped, Low Sheen",
    "style": "Caucasian Tribal Geometric",
    "description": "A hand-knotted Kazzak carpet in a Navy & Rust colourway, woven with dense tribal medallions in the authentic Caucasian tradition.",
    "is_featured": false,
    "stock_status": "Available to Order",
    "order_code": "TM-KZK-02"
  },
  {
    "id": "kazzak-03",
    "title": "Kazzak \u2014 Burgundy & Ivory",
    "collection_id": "kazzak",
    "collection_name": "Kazzak",
    "image_url": "/images/kazzak/kazzak_03.jpg",
    "color": "Burgundy & Ivory",
    "size": "Custom & Architectural Sizes (5x7 to 12x15 ft)",
    "material": "100% Hand-Spun Wool",
    "weave": "Hand-Knotted",
    "finish": "Hand-Clipped, Low Sheen",
    "style": "Caucasian Tribal Geometric",
    "description": "A hand-knotted Kazzak carpet in a Burgundy & Ivory colourway, woven with dense tribal medallions in the authentic Caucasian tradition.",
    "is_featured": false,
    "stock_status": "Available to Order",
    "order_code": "TM-KZK-03"
  },
  {
    "id": "kazzak-04",
    "title": "Kazzak \u2014 Rust Red & Cream",
    "collection_id": "kazzak",
    "collection_name": "Kazzak",
    "image_url": "/images/kazzak/kazzak_04.jpg",
    "color": "Rust Red & Cream",
    "size": "Custom & Architectural Sizes (5x7 to 12x15 ft)",
    "material": "100% Hand-Spun Wool",
    "weave": "Hand-Knotted",
    "finish": "Hand-Clipped, Low Sheen",
    "style": "Caucasian Tribal Geometric",
    "description": "A hand-knotted Kazzak carpet in a Rust Red & Cream colourway, woven with dense tribal medallions in the authentic Caucasian tradition.",
    "is_featured": false,
    "stock_status": "Available to Order",
    "order_code": "TM-KZK-04"
  },
  {
    "id": "kazzak-05",
    "title": "Kazzak \u2014 Sage Green & Navy",
    "collection_id": "kazzak",
    "collection_name": "Kazzak",
    "image_url": "/images/kazzak/kazzak_05.jpg",
    "color": "Sage Green & Navy",
    "size": "Custom & Architectural Sizes (5x7 to 12x15 ft)",
    "material": "100% Hand-Spun Wool",
    "weave": "Hand-Knotted",
    "finish": "Hand-Clipped, Low Sheen",
    "style": "Caucasian Tribal Geometric",
    "description": "A hand-knotted Kazzak carpet in a Sage Green & Navy colourway, woven with dense tribal medallions in the authentic Caucasian tradition.",
    "is_featured": false,
    "stock_status": "Available to Order",
    "order_code": "TM-KZK-05"
  },
  {
    "id": "kazzak-06",
    "title": "Kazzak \u2014 Warm Grey & Rust",
    "collection_id": "kazzak",
    "collection_name": "Kazzak",
    "image_url": "/images/kazzak/kazzak_06.jpg",
    "color": "Warm Grey & Rust",
    "size": "Custom & Architectural Sizes (5x7 to 12x15 ft)",
    "material": "100% Hand-Spun Wool",
    "weave": "Hand-Knotted",
    "finish": "Hand-Clipped, Low Sheen",
    "style": "Caucasian Tribal Geometric",
    "description": "A hand-knotted Kazzak carpet in a Warm Grey & Rust colourway, woven with dense tribal medallions in the authentic Caucasian tradition.",
    "is_featured": false,
    "stock_status": "Available to Order",
    "order_code": "TM-KZK-06"
  },
  {
    "id": "kazzak-07",
    "title": "Kazzak \u2014 Crimson & Gold",
    "collection_id": "kazzak",
    "collection_name": "Kazzak",
    "image_url": "/images/kazzak/kazzak_07.jpg",
    "color": "Crimson & Gold",
    "size": "Custom & Architectural Sizes (5x7 to 12x15 ft)",
    "material": "100% Hand-Spun Wool",
    "weave": "Hand-Knotted",
    "finish": "Hand-Clipped, Low Sheen",
    "style": "Caucasian Tribal Geometric",
    "description": "A hand-knotted Kazzak carpet in a Crimson & Gold colourway, woven with dense tribal medallions in the authentic Caucasian tradition.",
    "is_featured": true,
    "stock_status": "Available to Order",
    "order_code": "TM-KZK-07"
  },
  {
    "id": "kazzak-08",
    "title": "Kazzak \u2014 Slate Grey & Gold",
    "collection_id": "kazzak",
    "collection_name": "Kazzak",
    "image_url": "/images/kazzak/kazzak_08.jpg",
    "color": "Slate Grey & Gold",
    "size": "Custom & Architectural Sizes (5x7 to 12x15 ft)",
    "material": "100% Hand-Spun Wool",
    "weave": "Hand-Knotted",
    "finish": "Hand-Clipped, Low Sheen",
    "style": "Caucasian Tribal Geometric",
    "description": "A hand-knotted Kazzak carpet in a Slate Grey & Gold colourway, woven with dense tribal medallions in the authentic Caucasian tradition.",
    "is_featured": false,
    "stock_status": "Available to Order",
    "order_code": "TM-KZK-08"
  },
  {
    "id": "kazzak-09",
    "title": "Kazzak \u2014 Rust Brown & Gold",
    "collection_id": "kazzak",
    "collection_name": "Kazzak",
    "image_url": "/images/kazzak/kazzak_09.jpg",
    "color": "Rust Brown & Gold",
    "size": "Custom & Architectural Sizes (5x7 to 12x15 ft)",
    "material": "100% Hand-Spun Wool",
    "weave": "Hand-Knotted",
    "finish": "Hand-Clipped, Low Sheen",
    "style": "Caucasian Tribal Geometric",
    "description": "A hand-knotted Kazzak carpet in a Rust Brown & Gold colourway, woven with dense tribal medallions in the authentic Caucasian tradition.",
    "is_featured": true,
    "stock_status": "Available to Order",
    "order_code": "TM-KZK-09"
  },
  {
    "id": "kazzak-10",
    "title": "Kazzak \u2014 Brick Red & Olive",
    "collection_id": "kazzak",
    "collection_name": "Kazzak",
    "image_url": "/images/kazzak/kazzak_10.jpg",
    "color": "Brick Red & Olive",
    "size": "Custom & Architectural Sizes (5x7 to 12x15 ft)",
    "material": "100% Hand-Spun Wool",
    "weave": "Hand-Knotted",
    "finish": "Hand-Clipped, Low Sheen",
    "style": "Caucasian Tribal Geometric",
    "description": "A hand-knotted Kazzak carpet in a Brick Red & Olive colourway, woven with dense tribal medallions in the authentic Caucasian tradition.",
    "is_featured": false,
    "stock_status": "Available to Order",
    "order_code": "TM-KZK-10"
  },
  {
    "id": "kazzak-11",
    "title": "Kazzak \u2014 Navy & Rust",
    "collection_id": "kazzak",
    "collection_name": "Kazzak",
    "image_url": "/images/kazzak/kazzak_11.jpg",
    "color": "Navy & Rust",
    "size": "Custom & Architectural Sizes (5x7 to 12x15 ft)",
    "material": "100% Hand-Spun Wool",
    "weave": "Hand-Knotted",
    "finish": "Hand-Clipped, Low Sheen",
    "style": "Caucasian Tribal Geometric",
    "description": "A hand-knotted Kazzak carpet in a Navy & Rust colourway, woven with dense tribal medallions in the authentic Caucasian tradition.",
    "is_featured": false,
    "stock_status": "Available to Order",
    "order_code": "TM-KZK-11"
  },
  {
    "id": "kazzak-12",
    "title": "Kazzak \u2014 Dusty Rose & Navy",
    "collection_id": "kazzak",
    "collection_name": "Kazzak",
    "image_url": "/images/kazzak/kazzak_12.jpg",
    "color": "Dusty Rose & Navy",
    "size": "Custom & Architectural Sizes (5x7 to 12x15 ft)",
    "material": "100% Hand-Spun Wool",
    "weave": "Hand-Knotted",
    "finish": "Hand-Clipped, Low Sheen",
    "style": "Caucasian Tribal Geometric",
    "description": "A hand-knotted Kazzak carpet in a Dusty Rose & Navy colourway, woven with dense tribal medallions in the authentic Caucasian tradition.",
    "is_featured": false,
    "stock_status": "Available to Order",
    "order_code": "TM-KZK-12"
  },
  {
    "id": "tufted-01",
    "title": "Tufted Design 01 \u2014 Circle Motif",
    "collection_id": "tufted",
    "collection_name": "Tufted",
    "image_url": "/images/tufted/11-tufted-circle-motif.jpg",
    "color": "Terracotta, charcoal & ivory",
    "size": "Standard & Custom Contract Sizes",
    "material": "Wool / Wool-Blend",
    "weave": "Hand-Tufted",
    "finish": "Sheared / Carved",
    "style": "Contemporary Geometric",
    "description": "Large rounded motifs in a warm terracotta and charcoal palette. Engineered for hospitality, luxury residential, and boutique retail suites.",
    "is_featured": true,
    "stock_status": "Contract / Volume Program",
    "order_code": "TM-TFT-01"
  },
  {
    "id": "tufted-02",
    "title": "Tufted Design 02 \u2014 Linear",
    "collection_id": "tufted",
    "collection_name": "Tufted",
    "image_url": "/images/tufted/12-tufted-linear-charcoal-ivory.jpg",
    "color": "Charcoal & ivory",
    "size": "Standard & Custom Contract Sizes",
    "material": "Wool / Wool-Blend",
    "weave": "Hand-Tufted",
    "finish": "Sheared / Carved",
    "style": "Contemporary Geometric",
    "description": "A high-contrast linear composition in charcoal and ivory. Engineered for hospitality, luxury residential, and boutique retail suites.",
    "is_featured": false,
    "stock_status": "Contract / Volume Program",
    "order_code": "TM-TFT-02"
  },
  {
    "id": "tufted-03",
    "title": "Tufted Design 03 \u2014 Sage Geometry",
    "collection_id": "tufted",
    "collection_name": "Tufted",
    "image_url": "/images/tufted/13-tufted-sage-charcoal-geometry.jpg",
    "color": "Sage, charcoal & ivory",
    "size": "Standard & Custom Contract Sizes",
    "material": "Wool / Wool-Blend",
    "weave": "Hand-Tufted",
    "finish": "Sheared / Carved",
    "style": "Contemporary Geometric",
    "description": "Angular geometric forms combine muted sage, charcoal and ivory. Engineered for hospitality, luxury residential, and boutique retail suites.",
    "is_featured": false,
    "stock_status": "Contract / Volume Program",
    "order_code": "TM-TFT-03"
  },
  {
    "id": "tufted-04",
    "title": "Tufted Design 04 \u2014 Colour Blocks",
    "collection_id": "tufted",
    "collection_name": "Tufted",
    "image_url": "/images/tufted/14-tufted-charcoal-stone-geometry.jpg",
    "color": "Charcoal, stone & warm ivory",
    "size": "Standard & Custom Contract Sizes",
    "material": "Wool / Wool-Blend",
    "weave": "Hand-Tufted",
    "finish": "Sheared / Carved",
    "style": "Contemporary Geometric",
    "description": "A contemporary arrangement of broad colour blocks and curved forms. Engineered for hospitality, luxury residential, and boutique retail suites.",
    "is_featured": true,
    "stock_status": "Contract / Volume Program",
    "order_code": "TM-TFT-04"
  },
  {
    "id": "tufted-05",
    "title": "Tufted Design 05 \u2014 Circle Forms",
    "collection_id": "tufted",
    "collection_name": "Tufted",
    "image_url": "/images/tufted/15-tufted-circle-forms.jpg",
    "color": "Stone grey & ivory",
    "size": "Standard & Custom Contract Sizes",
    "material": "Wool / Wool-Blend",
    "weave": "Hand-Tufted",
    "finish": "Sheared / Carved",
    "style": "Contemporary Geometric",
    "description": "Oversized circular shapes create a soft, graphic pattern. Engineered for hospitality, luxury residential, and boutique retail suites.",
    "is_featured": false,
    "stock_status": "Contract / Volume Program",
    "order_code": "TM-TFT-05"
  },
  {
    "id": "tufted-06",
    "title": "Tufted Design 06 \u2014 Geometric",
    "collection_id": "tufted",
    "collection_name": "Tufted",
    "image_url": "/images/tufted/16-tufted-navy-grey-geometry.jpg",
    "color": "Navy, grey & ivory",
    "size": "Standard & Custom Contract Sizes",
    "material": "Wool / Wool-Blend",
    "weave": "Hand-Tufted",
    "finish": "Sheared / Carved",
    "style": "Contemporary Geometric",
    "description": "Large-scale angular geometry in navy, grey and ivory. Engineered for hospitality, luxury residential, and boutique retail suites.",
    "is_featured": false,
    "stock_status": "Contract / Volume Program",
    "order_code": "TM-TFT-06"
  },
  {
    "id": "tufted-07",
    "title": "Tufted Design 07 \u2014 Mixed Geometry",
    "collection_id": "tufted",
    "collection_name": "Tufted",
    "image_url": "/images/tufted/17-tufted-mixed-linear-geometry.jpg",
    "color": "Grey & ivory",
    "size": "Standard & Custom Contract Sizes",
    "material": "Wool / Wool-Blend",
    "weave": "Hand-Tufted",
    "finish": "Sheared / Carved",
    "style": "Contemporary Geometric",
    "description": "A varied composition of stripes, blocks and clean-edged shapes. Engineered for hospitality, luxury residential, and boutique retail suites.",
    "is_featured": false,
    "stock_status": "Contract / Volume Program",
    "order_code": "TM-TFT-07"
  },
  {
    "id": "tufted-08",
    "title": "Tufted Design 08 \u2014 Ivory Wave",
    "collection_id": "tufted",
    "collection_name": "Tufted",
    "image_url": "/images/tufted/18-tufted-ivory-wave.jpg",
    "color": "Ivory & soft grey",
    "size": "Standard & Custom Contract Sizes",
    "material": "Wool / Wool-Blend",
    "weave": "Hand-Tufted",
    "finish": "Sheared / Carved",
    "style": "Contemporary Geometric",
    "description": "A flowing, tonal wave pattern with a calm textured appearance. Engineered for hospitality, luxury residential, and boutique retail suites.",
    "is_featured": true,
    "stock_status": "Contract / Volume Program",
    "order_code": "TM-TFT-08"
  },
  {
    "id": "tufted-09",
    "title": "Tufted Design 09 \u2014 Soft Grey Wave",
    "collection_id": "tufted",
    "collection_name": "Tufted",
    "image_url": "/images/tufted/19-tufted-soft-grey-wave.jpg",
    "color": "Soft grey & ivory",
    "size": "Standard & Custom Contract Sizes",
    "material": "Wool / Wool-Blend",
    "weave": "Hand-Tufted",
    "finish": "Sheared / Carved",
    "style": "Contemporary Geometric",
    "description": "Layered curved lines form a gentle wave across the field. Engineered for hospitality, luxury residential, and boutique retail suites.",
    "is_featured": false,
    "stock_status": "Contract / Volume Program",
    "order_code": "TM-TFT-09"
  },
  {
    "id": "tufted-10",
    "title": "Tufted Design 10 \u2014 Rose Geometry",
    "collection_id": "tufted",
    "collection_name": "Tufted",
    "image_url": "/images/tufted/20-tufted-rose-sage-geometry.jpg",
    "color": "Rose, sage, charcoal & ivory",
    "size": "Standard & Custom Contract Sizes",
    "material": "Wool / Wool-Blend",
    "weave": "Hand-Tufted",
    "finish": "Sheared / Carved",
    "style": "Contemporary Geometric",
    "description": "Broad diagonal forms pair muted rose and sage with charcoal accents. Engineered for hospitality, luxury residential, and boutique retail suites.",
    "is_featured": false,
    "stock_status": "Contract / Volume Program",
    "order_code": "TM-TFT-10"
  },
  {
    "id": "tufted-11",
    "title": "Tufted Design 11 \u2014 Chevron",
    "collection_id": "tufted",
    "collection_name": "Tufted",
    "image_url": "/images/tufted/21-tufted-charcoal-ivory-chevron.jpg",
    "color": "Charcoal & ivory",
    "size": "Standard & Custom Contract Sizes",
    "material": "Wool / Wool-Blend",
    "weave": "Hand-Tufted",
    "finish": "Sheared / Carved",
    "style": "Contemporary Geometric",
    "description": "A bold, flowing chevron motif in a restrained two-tone palette. Engineered for hospitality, luxury residential, and boutique retail suites.",
    "is_featured": false,
    "stock_status": "Contract / Volume Program",
    "order_code": "TM-TFT-11"
  },
  {
    "id": "tufted-12",
    "title": "Tufted Design 12 \u2014 Charcoal Wave",
    "collection_id": "tufted",
    "collection_name": "Tufted",
    "image_url": "/images/tufted/22-tufted-charcoal-wave.jpg",
    "color": "Charcoal & ivory",
    "size": "Standard & Custom Contract Sizes",
    "material": "Wool / Wool-Blend",
    "weave": "Hand-Tufted",
    "finish": "Sheared / Carved",
    "style": "Contemporary Geometric",
    "description": "A dramatic, organic wave pattern in charcoal and ivory. Engineered for hospitality, luxury residential, and boutique retail suites.",
    "is_featured": false,
    "stock_status": "Contract / Volume Program",
    "order_code": "TM-TFT-12"
  },
  {
    "id": "moroccan-01",
    "title": "Moroccan BZR \u2014 Ivory & charcoal",
    "collection_id": "moroccan",
    "collection_name": "Moroccan",
    "image_url": "/images/moroccan/01-moroccan-bzr.jpg",
    "color": "Ivory & charcoal",
    "size": "Available in 8x10, 9x12, 10x14 ft & Bespoke",
    "material": "100% Highland Wool",
    "weave": "Hand-Knotted, Low Knot Density",
    "finish": "Hand-Sheared, Plush Trim",
    "style": "Minimal / Berber-Inspired",
    "description": "A light ground with a bold charcoal geometric lattice. High-pile Berber-style hand knotting crafted with un-dyed organic highland wool.",
    "is_featured": true,
    "stock_status": "Available to Order",
    "order_code": "TM-MRC-BZR"
  },
  {
    "id": "moroccan-02",
    "title": "Moroccan D \u2014 Cream & light grey",
    "collection_id": "moroccan",
    "collection_name": "Moroccan",
    "image_url": "/images/moroccan/02-moroccan-d-cream-light-grey.jpg",
    "color": "Cream & light grey",
    "size": "Available in 8x10, 9x12, 10x14 ft & Bespoke",
    "material": "100% Highland Wool",
    "weave": "Hand-Knotted, Low Knot Density",
    "finish": "Hand-Sheared, Plush Trim",
    "style": "Minimal / Berber-Inspired",
    "description": "A restrained cream and light-grey colourway with a plush, textured surface. High-pile Berber-style hand knotting crafted with un-dyed organic highland wool.",
    "is_featured": false,
    "stock_status": "Available to Order",
    "order_code": "TM-MRC-D"
  },
  {
    "id": "moroccan-03",
    "title": "Moroccan F \u2014 Cream, grey & natural",
    "collection_id": "moroccan",
    "collection_name": "Moroccan",
    "image_url": "/images/moroccan/03-moroccan-f-cream-grey-natural.jpg",
    "color": "Cream, grey & natural",
    "size": "Available in 8x10, 9x12, 10x14 ft & Bespoke",
    "material": "100% Highland Wool",
    "weave": "Hand-Knotted, Low Knot Density",
    "finish": "Hand-Sheared, Plush Trim",
    "style": "Minimal / Berber-Inspired",
    "description": "A natural cream ground with grey Moroccan-inspired geometric motifs. High-pile Berber-style hand knotting crafted with un-dyed organic highland wool.",
    "is_featured": false,
    "stock_status": "Available to Order",
    "order_code": "TM-MRC-F"
  },
  {
    "id": "moroccan-04",
    "title": "Moroccan F (WC) \u2014 Grey & natural",
    "collection_id": "moroccan",
    "collection_name": "Moroccan",
    "image_url": "/images/moroccan/04-moroccan-f-wc-grey-natural.jpg",
    "color": "Grey & natural",
    "size": "Available in 8x10, 9x12, 10x14 ft & Bespoke",
    "material": "100% Highland Wool",
    "weave": "Hand-Knotted, Low Knot Density",
    "finish": "Hand-Sheared, Plush Trim",
    "style": "Minimal / Berber-Inspired",
    "description": "A grey and natural colourway with an irregular ivory lattice. High-pile Berber-style hand knotting crafted with un-dyed organic highland wool.",
    "is_featured": false,
    "stock_status": "Available to Order",
    "order_code": "TM-MRC-F_WC"
  },
  {
    "id": "moroccan-05",
    "title": "Moroccan H \u2014 Natural grey & ivory",
    "collection_id": "moroccan",
    "collection_name": "Moroccan",
    "image_url": "/images/moroccan/05-moroccan-h.jpg",
    "color": "Natural grey & ivory",
    "size": "Available in 8x10, 9x12, 10x14 ft & Bespoke",
    "material": "100% Highland Wool",
    "weave": "Hand-Knotted, Low Knot Density",
    "finish": "Hand-Sheared, Plush Trim",
    "style": "Minimal / Berber-Inspired",
    "description": "A soft natural-grey ground with an open ivory geometric pattern. High-pile Berber-style hand knotting crafted with un-dyed organic highland wool.",
    "is_featured": true,
    "stock_status": "Available to Order",
    "order_code": "TM-MRC-H"
  },
  {
    "id": "moroccan-06",
    "title": "Moroccan O (WA) \u2014 Cream",
    "collection_id": "moroccan",
    "collection_name": "Moroccan",
    "image_url": "/images/moroccan/06-moroccan-o-wa-cream.jpg",
    "color": "Cream",
    "size": "Available in 8x10, 9x12, 10x14 ft & Bespoke",
    "material": "100% Highland Wool",
    "weave": "Hand-Knotted, Low Knot Density",
    "finish": "Hand-Sheared, Plush Trim",
    "style": "Minimal / Berber-Inspired",
    "description": "A tonal cream design with a subtle raised geometric texture. High-pile Berber-style hand knotting crafted with un-dyed organic highland wool.",
    "is_featured": false,
    "stock_status": "Available to Order",
    "order_code": "TM-MRC-O_WA"
  },
  {
    "id": "moroccan-07",
    "title": "Moroccan Q (WC) \u2014 Beige & ivory",
    "collection_id": "moroccan",
    "collection_name": "Moroccan",
    "image_url": "/images/moroccan/07-moroccan-q-wc-beige.jpg",
    "color": "Beige & ivory",
    "size": "Available in 8x10, 9x12, 10x14 ft & Bespoke",
    "material": "100% Highland Wool",
    "weave": "Hand-Knotted, Low Knot Density",
    "finish": "Hand-Sheared, Plush Trim",
    "style": "Minimal / Berber-Inspired",
    "description": "A beige ground with an expressive ivory motif and dark accents. High-pile Berber-style hand knotting crafted with un-dyed organic highland wool.",
    "is_featured": false,
    "stock_status": "Available to Order",
    "order_code": "TM-MRC-Q_WC"
  },
  {
    "id": "moroccan-08",
    "title": "Moroccan Q \u2014 Cream & blue",
    "collection_id": "moroccan",
    "collection_name": "Moroccan",
    "image_url": "/images/moroccan/08-moroccan-q.jpg",
    "color": "Cream & blue",
    "size": "Available in 8x10, 9x12, 10x14 ft & Bespoke",
    "material": "100% Highland Wool",
    "weave": "Hand-Knotted, Low Knot Density",
    "finish": "Hand-Sheared, Plush Trim",
    "style": "Minimal / Berber-Inspired",
    "description": "A pale cream field with a relaxed blue geometric outline. High-pile Berber-style hand knotting crafted with un-dyed organic highland wool.",
    "is_featured": true,
    "stock_status": "Available to Order",
    "order_code": "TM-MRC-Q"
  },
  {
    "id": "moroccan-09",
    "title": "Moroccan U \u2014 Cream & beige",
    "collection_id": "moroccan",
    "collection_name": "Moroccan",
    "image_url": "/images/moroccan/09-moroccan-u-cream-beige.jpg",
    "color": "Cream & beige",
    "size": "Available in 8x10, 9x12, 10x14 ft & Bespoke",
    "material": "100% Highland Wool",
    "weave": "Hand-Knotted, Low Knot Density",
    "finish": "Hand-Sheared, Plush Trim",
    "style": "Minimal / Berber-Inspired",
    "description": "A quiet cream and beige lattice in a natural palette. High-pile Berber-style hand knotting crafted with un-dyed organic highland wool.",
    "is_featured": false,
    "stock_status": "Available to Order",
    "order_code": "TM-MRC-U"
  },
  {
    "id": "moroccan-10",
    "title": "Moroccan U \u2014 Blue & gold",
    "collection_id": "moroccan",
    "collection_name": "Moroccan",
    "image_url": "/images/moroccan/10-moroccan-u.jpg",
    "color": "Blue & gold",
    "size": "Available in 8x10, 9x12, 10x14 ft & Bespoke",
    "material": "100% Highland Wool",
    "weave": "Hand-Knotted, Low Knot Density",
    "finish": "Hand-Sheared, Plush Trim",
    "style": "Minimal / Berber-Inspired",
    "description": "A blue ground with a repeating gold-toned diamond lattice. High-pile Berber-style hand knotting crafted with un-dyed organic highland wool.",
    "is_featured": false,
    "stock_status": "Available to Order",
    "order_code": "TM-MRC-U"
  },
  {
    "id": "mughal-01",
    "title": "Mughal \u2014 Catalogue Design 01",
    "collection_id": "mughal",
    "collection_name": "Mughal",
    "image_url": "/images/mughal/01-mughal-catalogue-design.jpg",
    "color": "Ivory, gold & navy",
    "size": "Bespoke Sizes upon Consultation",
    "material": "Wool with Silk Highlights",
    "weave": "Hand-Knotted, Fine Knot Count",
    "finish": "Hand-Finished, Silk Sheen",
    "style": "Traditional Palace / Floral Medallion",
    "description": "A light ivory field with an ornate gold-toned border and dark navy accents. Presented from the imperial Mughal catalogue archives, crafted with intricate floral vine and central medallion artistry.",
    "is_featured": true,
    "stock_status": "Commission / Archive",
    "order_code": "TM-MGH-01"
  },
  {
    "id": "mughal-02",
    "title": "Mughal \u2014 Catalogue Design 02",
    "collection_id": "mughal",
    "collection_name": "Mughal",
    "image_url": "/images/mughal/02-mughal-catalogue-design.jpg",
    "color": "Ruby red, cream & navy",
    "size": "Bespoke Sizes upon Consultation",
    "material": "Wool with Silk Highlights",
    "weave": "Hand-Knotted, Fine Knot Count",
    "finish": "Hand-Finished, Silk Sheen",
    "style": "Traditional Palace / Floral Medallion",
    "description": "A rich red field framed by cream detailing and a deep blue border. Presented from the imperial Mughal catalogue archives, crafted with intricate floral vine and central medallion artistry.",
    "is_featured": true,
    "stock_status": "Commission / Archive",
    "order_code": "TM-MGH-02"
  },
  {
    "id": "mughal-03",
    "title": "Mughal \u2014 Catalogue Design 03",
    "collection_id": "mughal",
    "collection_name": "Mughal",
    "image_url": "/images/mughal/03-mughal-catalogue-design.jpg",
    "color": "Navy, cream & muted gold",
    "size": "Bespoke Sizes upon Consultation",
    "material": "Wool with Silk Highlights",
    "weave": "Hand-Knotted, Fine Knot Count",
    "finish": "Hand-Finished, Silk Sheen",
    "style": "Traditional Palace / Floral Medallion",
    "description": "A deep navy ground with a light ornamental border and muted gold details. Presented from the imperial Mughal catalogue archives, crafted with intricate floral vine and central medallion artistry.",
    "is_featured": false,
    "stock_status": "Commission / Archive",
    "order_code": "TM-MGH-03"
  },
  {
    "id": "mughal-04",
    "title": "Mughal \u2014 Catalogue Design 04",
    "collection_id": "mughal",
    "collection_name": "Mughal",
    "image_url": "/images/mughal/04-mughal-catalogue-design.jpg",
    "color": "Crimson, slate blue & cream",
    "size": "Bespoke Sizes upon Consultation",
    "material": "Wool with Silk Highlights",
    "weave": "Hand-Knotted, Fine Knot Count",
    "finish": "Hand-Finished, Silk Sheen",
    "style": "Traditional Palace / Floral Medallion",
    "description": "A central medallion design in crimson and slate blue, with a pale border. Presented from the imperial Mughal catalogue archives, crafted with intricate floral vine and central medallion artistry.",
    "is_featured": true,
    "stock_status": "Commission / Archive",
    "order_code": "TM-MGH-04"
  },
  {
    "id": "mughal-05",
    "title": "Mughal \u2014 Catalogue Design 05",
    "collection_id": "mughal",
    "collection_name": "Mughal",
    "image_url": "/images/mughal/05-mughal-catalogue-design.jpg",
    "color": "Burgundy, charcoal & cream",
    "size": "Bespoke Sizes upon Consultation",
    "material": "Wool with Silk Highlights",
    "weave": "Hand-Knotted, Fine Knot Count",
    "finish": "Hand-Finished, Silk Sheen",
    "style": "Traditional Palace / Floral Medallion",
    "description": "A bold central medallion in warm burgundy and charcoal, edged in cream. Presented from the imperial Mughal catalogue archives, crafted with intricate floral vine and central medallion artistry.",
    "is_featured": false,
    "stock_status": "Commission / Archive",
    "order_code": "TM-MGH-05"
  },
  {
    "id": "mughal-06",
    "title": "Mughal \u2014 Catalogue Design 06",
    "collection_id": "mughal",
    "collection_name": "Mughal",
    "image_url": "/images/mughal/06-mughal-catalogue-design.jpg",
    "color": "Assorted colourways",
    "size": "Bespoke Sizes upon Consultation",
    "material": "Wool with Silk Highlights",
    "weave": "Hand-Knotted, Fine Knot Count",
    "finish": "Hand-Finished, Silk Sheen",
    "style": "Traditional Palace / Floral Medallion",
    "description": "A catalogue design board showing a selection of pattern and colour variations. Presented from the imperial Mughal catalogue archives, crafted with intricate floral vine and central medallion artistry.",
    "is_featured": false,
    "stock_status": "Commission / Archive",
    "order_code": "TM-MGH-06"
  },
  {
    "id": "mughal-07",
    "title": "Mughal \u2014 Catalogue Design 07",
    "collection_id": "mughal",
    "collection_name": "Mughal",
    "image_url": "/images/mughal/07-mughal-catalogue-design.jpg",
    "color": "Cream, blue & soft red",
    "size": "Bespoke Sizes upon Consultation",
    "material": "Wool with Silk Highlights",
    "weave": "Hand-Knotted, Fine Knot Count",
    "finish": "Hand-Finished, Silk Sheen",
    "style": "Traditional Palace / Floral Medallion",
    "description": "A light cream field with blue ornamental details and touches of soft red. Presented from the imperial Mughal catalogue archives, crafted with intricate floral vine and central medallion artistry.",
    "is_featured": false,
    "stock_status": "Commission / Archive",
    "order_code": "TM-MGH-07"
  },
  {
    "id": "mughal-08",
    "title": "Mughal \u2014 Catalogue Design 08",
    "collection_id": "mughal",
    "collection_name": "Mughal",
    "image_url": "/images/mughal/08-mughal-catalogue-design.jpg",
    "color": "Ruby red, navy & cream",
    "size": "Bespoke Sizes upon Consultation",
    "material": "Wool with Silk Highlights",
    "weave": "Hand-Knotted, Fine Knot Count",
    "finish": "Hand-Finished, Silk Sheen",
    "style": "Traditional Palace / Floral Medallion",
    "description": "A richly patterned red field framed with navy and cream borders. Presented from the imperial Mughal catalogue archives, crafted with intricate floral vine and central medallion artistry.",
    "is_featured": false,
    "stock_status": "Commission / Archive",
    "order_code": "TM-MGH-08"
  },
  {
    "id": "mughal-09",
    "title": "Mughal \u2014 Catalogue Design 09",
    "collection_id": "mughal",
    "collection_name": "Mughal",
    "image_url": "/images/mughal/09-mughal-catalogue-design.jpg",
    "color": "Navy & slate blue",
    "size": "Bespoke Sizes upon Consultation",
    "material": "Wool with Silk Highlights",
    "weave": "Hand-Knotted, Fine Knot Count",
    "finish": "Hand-Finished, Silk Sheen",
    "style": "Traditional Palace / Floral Medallion",
    "description": "A dark blue field with a finely repeated pattern and a restrained pale border. Presented from the imperial Mughal catalogue archives, crafted with intricate floral vine and central medallion artistry.",
    "is_featured": false,
    "stock_status": "Commission / Archive",
    "order_code": "TM-MGH-09"
  },
  {
    "id": "mughal-10",
    "title": "Mughal \u2014 Catalogue Design 10",
    "collection_id": "mughal",
    "collection_name": "Mughal",
    "image_url": "/images/mughal/10-mughal-catalogue-design.jpg",
    "color": "Red, navy & cream",
    "size": "Bespoke Sizes upon Consultation",
    "material": "Wool with Silk Highlights",
    "weave": "Hand-Knotted, Fine Knot Count",
    "finish": "Hand-Finished, Silk Sheen",
    "style": "Traditional Palace / Floral Medallion",
    "description": "A traditional medallion design in red and navy, finished with a light border. Presented from the imperial Mughal catalogue archives, crafted with intricate floral vine and central medallion artistry.",
    "is_featured": false,
    "stock_status": "Commission / Archive",
    "order_code": "TM-MGH-10"
  },
  {
    "id": "mughal-11",
    "title": "Mughal \u2014 Catalogue Design 11",
    "collection_id": "mughal",
    "collection_name": "Mughal",
    "image_url": "/images/mughal/11-mughal-catalogue-design.jpg",
    "color": "Rose red, blue & ivory",
    "size": "Bespoke Sizes upon Consultation",
    "material": "Wool with Silk Highlights",
    "weave": "Hand-Knotted, Fine Knot Count",
    "finish": "Hand-Finished, Silk Sheen",
    "style": "Traditional Palace / Floral Medallion",
    "description": "A rose-red field with a central medallion and blue and ivory detailing. Presented from the imperial Mughal catalogue archives, crafted with intricate floral vine and central medallion artistry.",
    "is_featured": false,
    "stock_status": "Commission / Archive",
    "order_code": "TM-MGH-11"
  },
  {
    "id": "mughal-super-01",
    "title": "Kashan P-109 \u2014 Red & Cream",
    "collection_id": "mughal-super",
    "collection_name": "Mughal Super",
    "image_url": "/images/mughal-super/01-kashan-p109-red-cream.jpg",
    "color": "Red & cream",
    "size": "Master Heirloom Sizes (9x12 to 14x20 ft & Custom)",
    "material": "Premium Blended Wool & Natural Silk",
    "weave": "Hand-Knotted, Highest Knot Density",
    "finish": "Fine Hand-Finished, Lustrous Sheen",
    "style": "Luxury Heirloom / Elaborate Medallion",
    "description": "A Kashan P-109 design with a deep red field and a light cream border. Our highest knot count density with luminous pure silk reliefs, taking master weavers over a year to complete.",
    "is_featured": true,
    "stock_status": "Master Heirloom / Commission",
    "order_code": "TM-MGHS-01"
  },
  {
    "id": "mughal-super-02",
    "title": "Kashan P-109 \u2014 Black & Beige",
    "collection_id": "mughal-super",
    "collection_name": "Mughal Super",
    "image_url": "/images/mughal-super/02-kashan-p109-black-beige.jpg",
    "color": "Black & beige",
    "size": "Master Heirloom Sizes (9x12 to 14x20 ft & Custom)",
    "material": "Premium Blended Wool & Natural Silk",
    "weave": "Hand-Knotted, Highest Knot Density",
    "finish": "Fine Hand-Finished, Lustrous Sheen",
    "style": "Luxury Heirloom / Elaborate Medallion",
    "description": "A Kashan P-109 design with a dark field and a warm beige border. Our highest knot count density with luminous pure silk reliefs, taking master weavers over a year to complete.",
    "is_featured": false,
    "stock_status": "Master Heirloom / Commission",
    "order_code": "TM-MGHS-02"
  },
  {
    "id": "mughal-super-03",
    "title": "Kashan P-109 \u2014 Teal Green & Cream",
    "collection_id": "mughal-super",
    "collection_name": "Mughal Super",
    "image_url": "/images/mughal-super/03-kashan-p109-teal-green-cream.jpg",
    "color": "Teal green & cream",
    "size": "Master Heirloom Sizes (9x12 to 14x20 ft & Custom)",
    "material": "Premium Blended Wool & Natural Silk",
    "weave": "Hand-Knotted, Highest Knot Density",
    "finish": "Fine Hand-Finished, Lustrous Sheen",
    "style": "Luxury Heirloom / Elaborate Medallion",
    "description": "A Kashan P-109 design in teal green, finished with a light cream border. Our highest knot count density with luminous pure silk reliefs, taking master weavers over a year to complete.",
    "is_featured": true,
    "stock_status": "Master Heirloom / Commission",
    "order_code": "TM-MGHS-03"
  },
  {
    "id": "mughal-super-04",
    "title": "B-04 \u2014 Cream & Beige",
    "collection_id": "mughal-super",
    "collection_name": "Mughal Super",
    "image_url": "/images/mughal-super/04-b04-cream-beige.jpg",
    "color": "Cream & beige",
    "size": "Master Heirloom Sizes (9x12 to 14x20 ft & Custom)",
    "material": "Premium Blended Wool & Natural Silk",
    "weave": "Hand-Knotted, Highest Knot Density",
    "finish": "Fine Hand-Finished, Lustrous Sheen",
    "style": "Luxury Heirloom / Elaborate Medallion",
    "description": "The B-04 design in a calm cream and beige palette. Our highest knot count density with luminous pure silk reliefs, taking master weavers over a year to complete.",
    "is_featured": false,
    "stock_status": "Master Heirloom / Commission",
    "order_code": "TM-MGHS-04"
  },
  {
    "id": "mughal-super-05",
    "title": "B-05 \u2014 Midnight Blue & Cream",
    "collection_id": "mughal-super",
    "collection_name": "Mughal Super",
    "image_url": "/images/mughal-super/05-b05-midnight-blue-cream.jpg",
    "color": "Midnight blue & cream",
    "size": "Master Heirloom Sizes (9x12 to 14x20 ft & Custom)",
    "material": "Premium Blended Wool & Natural Silk",
    "weave": "Hand-Knotted, Highest Knot Density",
    "finish": "Fine Hand-Finished, Lustrous Sheen",
    "style": "Luxury Heirloom / Elaborate Medallion",
    "description": "The B-05 design pairs a rich blue centre with a light cream border. Our highest knot count density with luminous pure silk reliefs, taking master weavers over a year to complete.",
    "is_featured": true,
    "stock_status": "Master Heirloom / Commission",
    "order_code": "TM-MGHS-05"
  },
  {
    "id": "mughal-super-06",
    "title": "Kashan B-01 \u2014 Cream & Beige",
    "collection_id": "mughal-super",
    "collection_name": "Mughal Super",
    "image_url": "/images/mughal-super/06-kashan-b01-cream-beige.jpg",
    "color": "Cream & beige",
    "size": "Master Heirloom Sizes (9x12 to 14x20 ft & Custom)",
    "material": "Premium Blended Wool & Natural Silk",
    "weave": "Hand-Knotted, Highest Knot Density",
    "finish": "Fine Hand-Finished, Lustrous Sheen",
    "style": "Luxury Heirloom / Elaborate Medallion",
    "description": "The Kashan B-01 design in a soft cream and beige colourway. Our highest knot count density with luminous pure silk reliefs, taking master weavers over a year to complete.",
    "is_featured": false,
    "stock_status": "Master Heirloom / Commission",
    "order_code": "TM-MGHS-06"
  },
  {
    "id": "mughal-super-07",
    "title": "Archive Design \u2014 1055",
    "collection_id": "mughal-super",
    "collection_name": "Mughal Super",
    "image_url": "/images/mughal-super/07-archive-design-1055.jpg",
    "color": "Imperial Multi-tone",
    "size": "Master Heirloom Sizes (9x12 to 14x20 ft & Custom)",
    "material": "Premium Blended Wool & Natural Silk",
    "weave": "Hand-Knotted, Highest Knot Density",
    "finish": "Fine Hand-Finished, Lustrous Sheen",
    "style": "Luxury Heirloom / Elaborate Medallion",
    "description": "An archive design photographed on 24 November 2012, preserving historical palace motifs. Our highest knot count density with luminous pure silk reliefs, taking master weavers over a year to complete.",
    "is_featured": false,
    "stock_status": "Master Heirloom / Commission",
    "order_code": "TM-MGHS-07"
  },
  {
    "id": "mughal-super-08",
    "title": "Archive Design \u2014 1056",
    "collection_id": "mughal-super",
    "collection_name": "Mughal Super",
    "image_url": "/images/mughal-super/08-archive-design-1056.jpg",
    "color": "Lapis & Ochre Silk",
    "size": "Master Heirloom Sizes (9x12 to 14x20 ft & Custom)",
    "material": "Premium Blended Wool & Natural Silk",
    "weave": "Hand-Knotted, Highest Knot Density",
    "finish": "Fine Hand-Finished, Lustrous Sheen",
    "style": "Luxury Heirloom / Elaborate Medallion",
    "description": "An archive design photographed on 24 November 2012, showcasing museum-calibre density. Our highest knot count density with luminous pure silk reliefs, taking master weavers over a year to complete.",
    "is_featured": false,
    "stock_status": "Master Heirloom / Commission",
    "order_code": "TM-MGHS-08"
  },
  {
    "id": "mughal-super-09",
    "title": "Archive Design \u2014 1060",
    "collection_id": "mughal-super",
    "collection_name": "Mughal Super",
    "image_url": "/images/mughal-super/09-archive-design-1060.jpg",
    "color": "Burgundy & Gold Leaf",
    "size": "Master Heirloom Sizes (9x12 to 14x20 ft & Custom)",
    "material": "Premium Blended Wool & Natural Silk",
    "weave": "Hand-Knotted, Highest Knot Density",
    "finish": "Fine Hand-Finished, Lustrous Sheen",
    "style": "Luxury Heirloom / Elaborate Medallion",
    "description": "An archive design photographed on 24 November 2012, woven for regal palatial chambers. Our highest knot count density with luminous pure silk reliefs, taking master weavers over a year to complete.",
    "is_featured": false,
    "stock_status": "Master Heirloom / Commission",
    "order_code": "TM-MGHS-09"
  }
];

export const DEFAULT_STAFF_EMAILS: StaffEmail[] = [
  {
    id: "staff-1",
    email: "tmproducts.bhadohi@gmail.com",
    name: "Tajmahal Products Inquiries Desk",
    role: "Head of Export & Sales",
    is_primary: true,
    notify_inquiries: true,
    created_at: "2026-01-01T00:00:00.000Z"
  },
  {
    id: "staff-2",
    email: "hasxxann@gmail.com",
    name: "Managing Director",
    role: "Director / 6th Generation Leadership",
    is_primary: false,
    notify_inquiries: true,
    created_at: "2026-01-01T00:00:00.000Z"
  }
];

// Helper to construct WhatsApp Inquiry link
export function createWhatsAppInquiryLink(product: CarpetProduct, customSize?: string, clientNote?: string): string {
  const phone = COMPANY_PROFILE.whatsappNumber;
  const message = `*Namaste Tajmahal Products,*\n\n` +
    `I would like to inquire about the following handcrafted carpet:\n\n` +
    `• *Piece:* ${product.title}\n` +
    `• *Collection:* ${product.collection_name}\n` +
    `• *SKU / Code:* ${product.order_code}\n` +
    `• *Colorway:* ${product.color}\n` +
    `• *Weave & Material:* ${product.weave} | ${product.material}\n` +
    (customSize ? `• *Desired Dimensions:* ${customSize}\n` : `• *Standard Size:* ${product.size}\n`) +
    (clientNote ? `• *Notes:* ${clientNote}\n\n` : `\n`) +
    `Please share pricing, lead time, and high-resolution inspection photos / swatch availability.\n\n` +
    `Thank you.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// Helper to construct Email Inquiry link
export function createEmailInquiryLink(product: CarpetProduct, customSize?: string, clientNote?: string): string {
  const primaryEmail = COMPANY_PROFILE.emails[0];
  const subject = `Carpet Quote Inquiry: ${product.title} [${product.order_code}]`;
  const body = `Dear Tajmahal Products Team,\n\n` +
    `I am writing to request a quotation and production availability for the following handmade rug:\n\n` +
    `Piece: ${product.title}\n` +
    `Code: ${product.order_code}\n` +
    `Collection: ${product.collection_name}\n` +
    `Color: ${product.color}\n` +
    `Material: ${product.material}\n` +
    `Weave: ${product.weave}\n` +
    (customSize ? `Requested Size: ${customSize}\n` : `Standard Size: ${product.size}\n`) +
    (clientNote ? `Special Requirements / Inquiries:\n${clientNote}\n\n` : `\n`) +
    `Please provide quotation, dispatch timeline from Bhadohi, and freight options.\n\n` +
    `Kind regards,`;

  return `mailto:${primaryEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
