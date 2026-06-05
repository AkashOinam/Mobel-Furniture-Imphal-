export interface Product {
  id: string;
  name: string;
  category: 'Bed' | 'Sofa' | 'Wardrobe' | 'Showcase' | 'Center Table' | 'Dresser' | 'Dining Table' | 'Mattress' | 'Office Chair' | 'Drawer' | 'Table';
  price: number;
  description: string;
  image: string;
  images?: string[];
  section: 'home' | 'office';
  isHouseManufactured: boolean;
  features: string[];
  specifications: {
    material: string;
    dimensions: string;
    warranty: string;
    assembly: string;
  };
  rating: number;
  reviewsCount: number;
}

export const products: Product[] = [
  {
    id: "bed-royal-teak",
    name: "Royal Teak King Size Bed",
    category: "Bed",
    price: 48500,
    description: "Experience luxury sleep with our premium King Size Bed sourced from Mobel Kolkata. Made with high-grade solid teak wood and a rich mahogany finish, it brings elegance and sturdiness to your master bedroom.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
    ],
    section: "home",
    isHouseManufactured: false,
    features: [
      "Crafted from premium solid teak wood",
      "Hydraulic under-bed storage space",
      "Termite and pest resistant treatment",
      "Elegant curved headboard with upholstery cushioning"
    ],
    specifications: {
      material: "Premium Solid Teak Wood & Velvet Fabric Upholstery",
      dimensions: "78 W x 72 D x 42 H inches (King Size)",
      warranty: "5 Years Manufacturer Warranty",
      assembly: "Professional assembly provided by Mobel team"
    },
    rating: 4.8,
    reviewsCount: 34
  },
  {
    id: "sofa-cloud-comfort",
    name: "Cloud Comfort 3-Seater Sofa",
    category: "Sofa",
    price: 36000,
    description: "Custom crafted in our Imphal workshop. This minimalist 3-seater sofa combines high-density foam cushioning with durable, spill-resistant performance fabric. Tailored for comfort and longevity.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=800&q=80"
    ],
    section: "home",
    isHouseManufactured: true,
    features: [
      "Handcrafted in Imphal, Manipur",
      "Spill-resistant premium textured linen upholstery",
      "Pocket spring suspension system for extra durability",
      "Includes 3 complimentary accent cushions"
    ],
    specifications: {
      material: "Solid Sal Wood Frame, High Density Sleep-well Foam, Linen Fabric",
      dimensions: "84 W x 34 D x 32 H inches",
      warranty: "3 Years Local Workshop Warranty",
      assembly: "Pre-assembled (Leg installation only)"
    },
    rating: 4.9,
    reviewsCount: 52
  },
  {
    id: "wardrobe-classic-4door",
    name: "Imperial 4-Door Wardrobe",
    category: "Wardrobe",
    price: 52000,
    description: "An elegant, spacious wardrobe from the Mobel Kolkata Collection. Featuring sliding door mechanisms, integrated mirrors, and smart compartment layout including security lockers for valuables.",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: false,
    features: [
      "Smooth silent sliding door mechanism",
      "Dual full-length dressing mirrors",
      "Dedicated digital locker compartment",
      "Scratch-resistant premium laminate finish"
    ],
    specifications: {
      material: "Engineered Wood, Toughened Glass, Premium Laminates",
      dimensions: "72 W x 22 D x 80 H inches",
      warranty: "3 Years Manufacturer Warranty",
      assembly: "Required (Assembled at delivery location)"
    },
    rating: 4.7,
    reviewsCount: 28
  },
  {
    id: "showcase-minimal-oak",
    name: "Nordic Oak Glass Showcase",
    category: "Showcase",
    price: 24500,
    description: "Display your books, art, and trophies in style. This clean-lined showcase from Mobel features toughened glass shelving and integrated warm LED strip lighting to highlight your collectibles.",
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: false,
    features: [
      "Shatter-proof tempered glass panels",
      "Built-in soft LED spotlighting",
      "Four adjustable display shelves",
      "Bottom closed cabinet for secret storage"
    ],
    specifications: {
      material: "Oakwood Veneer, Tempered Glass, Powder Coated Steel Fittings",
      dimensions: "36 W x 16 D x 72 H inches",
      warranty: "2 Years Manufacturer Warranty",
      assembly: "Free Installation by Mobel team"
    },
    rating: 4.6,
    reviewsCount: 19
  },
  {
    id: "center-table-tokyo",
    name: "Tokyo Glass Center Table",
    category: "Center Table",
    price: 12800,
    description: "A gorgeous coffee table styled with a floating glass top and solid hardwood legs. Designed by Mobel Kolkata, it serves as the perfect minimalist focal point for your living room configuration.",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: false,
    features: [
      "10mm clear tempered float glass top",
      "Floating geometric shelf design underneath",
      "Rounded wooden corners for child safety",
      "Waterproof protective coating on wood"
    ],
    specifications: {
      material: "Solid Beechwood, Clear Tempered Glass",
      dimensions: "42 W x 24 D x 18 H inches",
      warranty: "1 Year Manufacturer Warranty",
      assembly: "Easy DIY assembly (instructions and tool kit included)"
    },
    rating: 4.5,
    reviewsCount: 43
  },
  {
    id: "dresser-velvet-mirror",
    name: "Velvet Luxe Dresser with LED Mirror",
    category: "Dresser",
    price: 18900,
    description: "Upgrade your vanity setup. This premium dresser features an integrated circular smart-touch LED mirror with 3 color temperatures, felt-lined drawers for jewelry, and a matching cushioned stool.",
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: false,
    features: [
      "Smart Touch LED mirror (Cool, Natural, Warm light settings)",
      "Jewelry organizer drawers with soft-closing sliders",
      "Scratch-resistant gold-toned metal leg supports",
      "Includes comfortable padded dressing stool"
    ],
    specifications: {
      material: "MDF, PU Leather Wrapping, Suede interior lining, Stainless Steel Legs",
      dimensions: "39 W x 16 D x 30 H inches (Dresser height, excluding mirror)",
      warranty: "2 Years Manufacturer Warranty",
      assembly: "Free assembly on delivery"
    },
    rating: 4.7,
    reviewsCount: 22
  },
  {
    id: "dining-table-kanglei",
    name: "Kanglei Solid Wood 6-Seater Dining Table",
    category: "Dining Table",
    price: 45000,
    description: "Named after the historic land of Kangleipak, this dining table is custom crafted in our Imphal facility. Made of heavy-duty, locally seasoned teak wood, it is built to survive generations of family gatherings.",
    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: true,
    features: [
      "In-house designed & crafted at Mobel Imphal",
      "100% seasoned local solid teak wood",
      "Natural grain semi-gloss protective polyurethane coating",
      "Set includes 6 matching high-comfort dining chairs"
    ],
    specifications: {
      material: "Local Solid Teak Wood, High density upholstery seats for chairs",
      dimensions: "66 W x 36 D x 30 H inches",
      warranty: "5 Years Imphal Workshop Warranty",
      assembly: "Delivered fully assembled and installed"
    },
    rating: 5.0,
    reviewsCount: 31
  },
  {
    id: "mattress-ortho-spine",
    name: "OrthoSpine 10-Inch Memory Foam Mattress",
    category: "Mattress",
    price: 19500,
    description: "Sourced from the premium Mobel Kolkata wellness line. Features orthopedic memory foam that adjusts to your spine profile, relieving pressure points and ensuring cool, undisturbed sleep.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: false,
    features: [
      "NASA-certified memory foam technology",
      "Cooling gel-infused breathable top layer",
      "Zero motion transfer for couples",
      "Hypoallergenic organic cotton cover"
    ],
    specifications: {
      material: "Memory Foam, High Resilience Support Foam, Bamboo-Cotton fabric cover",
      dimensions: "78 W x 72 D x 10 H inches (King Size)",
      warranty: "10 Years Manufacturer Warranty",
      assembly: "Unrolls and expands in minutes"
    },
    rating: 4.8,
    reviewsCount: 65
  },
  {
    id: "chair-ergo-summit",
    name: "Summit Premium Ergonomic Task Chair",
    category: "Office Chair",
    price: 14500,
    description: "Our signature in-house ergonomic office chair. Crafted at our Imphal plant with premium imported mesh and a heavy-duty nylon base. Specially designed to support 8+ hours of continuous working.",
    image: "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?auto=format&fit=crop&w=800&q=80",
    section: "office",
    isHouseManufactured: true,
    features: [
      "In-house assembled at Mobel Imphal",
      "Adjustable 3D armrests & active lumbar support",
      "Korean high-elasticity breathable mesh back",
      "Heavy duty Class-4 gas lift for height adjustment"
    ],
    specifications: {
      material: "Reinforced Fiberglass Frame, Nylon Mesh, Chrome Steel Base",
      dimensions: "26 W x 25 D x 45-49 H inches",
      warranty: "3 Years Local Workshop Warranty",
      assembly: "Free assembly at your home/office"
    },
    rating: 4.9,
    reviewsCount: 88
  },
  {
    id: "chair-ergo-basic",
    name: "Aero Lite Ergonomic Chair",
    category: "Office Chair",
    price: 8500,
    description: "An affordable yet highly ergonomic seating solution manufactured in-house. Features responsive back tilt, breathable mesh, and cushioned armrests. Perfect for student study setups.",
    image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=800&q=80",
    section: "office",
    isHouseManufactured: true,
    features: [
      "Compact design for home study desks",
      "Breathable double mesh backing",
      "Padded seat with premium molded foam",
      "Dual-wheel heavy castor wheels"
    ],
    specifications: {
      material: "High Strength Polymer Frame, Mesh, Nylon base",
      dimensions: "24 W x 24 D x 36-41 H inches",
      warranty: "2 Years Local Workshop Warranty",
      assembly: "Easy 10-minute setup (instructions included)"
    },
    rating: 4.7,
    reviewsCount: 41
  },
  {
    id: "drawer-mobile-cabinet",
    name: "Pro-Organize Mobile Drawer Cabinet",
    category: "Drawer",
    price: 7200,
    description: "Compact 3-drawer office cabinet. Fits perfectly under desks to keep folders, files, and stationary close by. Features lockable wheels and centralized locking system for security.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80",
    section: "office",
    isHouseManufactured: false,
    features: [
      "Central lock controls all three drawers",
      "Full extension heavy duty ball-bearing sliders",
      "Anti-tilt castor wheel on bottom drawer",
      "Pen tray and file organizer inside"
    ],
    specifications: {
      material: "Cold-Rolled Steel Sheet, Epoxy Powder Coating",
      dimensions: "16 W x 20 D x 24 H inches",
      warranty: "2 Years Manufacturer Warranty",
      assembly: "Fully assembled"
    },
    rating: 4.4,
    reviewsCount: 15
  },
  {
    id: "table-executive-oak",
    name: "Summit Executive Solid Desk",
    category: "Table",
    price: 28000,
    description: "Manufactured in-house at Imphal. A grand executive writing table crafted from solid blockboard and veneered with premium oak. Features a dedicated cable management box and sleek cable grommets.",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
    section: "office",
    isHouseManufactured: true,
    features: [
      "Proudly manufactured locally in Imphal",
      "Spacious working surface with chamfered edges",
      "Built-in brush-strip cable management tray",
      "Sturdy metal legs with levelling studs"
    ],
    specifications: {
      material: "High Density Blockboard, Oak Wood Veneer, Heavy Steel Legs",
      dimensions: "60 W x 30 D x 30 H inches",
      warranty: "3 Years Local Workshop Warranty",
      assembly: "Installed by Mobel professionals"
    },
    rating: 4.9,
    reviewsCount: 26
  },
  {
    id: "bed-minimalist-queen",
    name: "Modern Minimalist Queen Bed",
    category: "Bed",
    price: 32000,
    description: "Upgrade to clean lines and contemporary styling. This queen size platform bed features a low-profile frame and a solid wood headboard, bringing a minimalist, open-feel layout to your bedroom.",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: true,
    features: [
      "Crafted from premium local hardwood",
      "Low-profile platform structure (no box spring required)",
      "Veneered finish with waterproof polycoat protection",
      "Hidden center legs for robust mattress support"
    ],
    specifications: {
      material: "Premium seasoned Acacia wood & hardwood ply support",
      dimensions: "64 W x 82 D x 36 H inches (Queen Size)",
      warranty: "3 Years Local Workshop Warranty",
      assembly: "Free assembly by Mobel Imphal team"
    },
    rating: 4.7,
    reviewsCount: 18
  },
  {
    id: "bed-classic-poster",
    name: "Vintage Wooden Poster Bed",
    category: "Bed",
    price: 42500,
    description: "Bring timeless grandeur to your room. Featuring elegant, hand-carved corner posts and a seasoned teak frame, this poster bed is designed to be the ultimate focal point of a traditional master bedroom.",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: false,
    features: [
      "Solid seasoned teak wood carvings",
      "Classical four-poster columns support canopy option",
      "Termite-proof multi-layered lacquer finish",
      "Heavy-duty metal key joints for squeak-free setup"
    ],
    specifications: {
      material: "Premium seasoned Teak wood with walnut stain",
      dimensions: "78 W x 84 D x 78 H inches (King Size)",
      warranty: "5 Years Manufacturer Warranty",
      assembly: "Free professional assembly by Mobel team"
    },
    rating: 4.9,
    reviewsCount: 12
  },
  {
    id: "bed-velvet-tufted",
    name: "Luxurious Velvet Tufted Bed",
    category: "Bed",
    price: 55000,
    description: "Indulge in absolute comfort and elegance. The bed features deep diamond button tufting on the headboard, wrapped in velvet-soft performance fabric. Perfect for modern, premium interiors.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: false,
    features: [
      "Plush padded headboard with hand-tufted diamond buttons",
      "Upholstered with premium stain-resistant velvet fabric",
      "Reinforced frame using heavy gauge steel brackets",
      "Sleek polished chrome legs with non-scratch rubber pads"
    ],
    specifications: {
      material: "Solid hardwood frame, plush velvet upholstery, chrome legs",
      dimensions: "80 W x 86 D x 52 H inches (King Size)",
      warranty: "5 Years Manufacturer Warranty",
      assembly: "Professional assembly provided by Mobel team"
    },
    rating: 4.8,
    reviewsCount: 25
  },
  {
    id: "sofa-chesterfield-velvet",
    name: "Chesterfield Royal Velvet 3-Seater",
    category: "Sofa",
    price: 48000,
    description: "The epitome of classic sophistication. Featuring deep button tufting, scrolled arms, and a solid birchwood frame, this Chesterfield sofa is upholstered in performance velvet for unmatched durability.",
    image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: false,
    features: [
      "Classic hand-tufted Chesterfield button back",
      "Robust solid birchwood inner frame",
      "Plush pocket spring foam seat cushions",
      "Elegant turned solid wood legs with brass castors"
    ],
    specifications: {
      material: "Solid Birchwood, Velvet upholstery, High Density Foam",
      dimensions: "86 W x 37 D x 29 H inches",
      warranty: "5 Years Manufacturer Warranty",
      assembly: "Leg attachment required (tools provided)"
    },
    rating: 4.8,
    reviewsCount: 16
  },
  {
    id: "sofa-nordic-sectional",
    name: "Nordic Fabric L-Shaped Sectional",
    category: "Sofa",
    price: 62000,
    description: "Create the ultimate lounging space. This spacious L-shaped sectional sofa from Mobel features clean lines, neutral fabric, and a reversible chaise lounge that can be placed on either the left or right side.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: false,
    features: [
      "Reversible modular chaise configuration",
      "Stain-resistant textured weave linen performance fabric",
      "Sturdy interlocking metal connectors",
      "Modern solid ash wood legs with natural finish"
    ],
    specifications: {
      material: "Linen fabric, Solid Ash wood, High density foam, Steel connectors",
      dimensions: "102 W x 64 D x 34 H inches (Chaise depth: 64 inches)",
      warranty: "3 Years Manufacturer Warranty",
      assembly: "Modular assembly on delivery (free service)"
    },
    rating: 4.9,
    reviewsCount: 22
  },
  {
    id: "sofa-leather-recliner",
    name: "Urban Leather Recliner 2-Seater",
    category: "Sofa",
    price: 42000,
    description: "Unwind in absolute comfort. This compact 2-seater features dual manual recline mechanisms with thick padded armrests, upholstered in premium top-grain leather match for a luxurious feel.",
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: false,
    features: [
      "Dual heavy-duty alloy recline mechanisms",
      "Premium top-grain leather on all seating areas",
      "Thick, high-resilience foam padded headrest & armrest",
      "Wall-hugger design requires only 3 inches of clearance"
    ],
    specifications: {
      material: "Top-grain Leather, Alloy steel mechanism, Solid pine wood structure",
      dimensions: "64 W x 38 D x 40 H inches",
      warranty: "3 Years warranty on mechanism, 2 years on leather",
      assembly: "Free assembly by delivery team"
    },
    rating: 4.7,
    reviewsCount: 14
  },
  {
    id: "sofa-vintage-teak",
    name: "Vintage Teakwood 3-Seater Sofa",
    category: "Sofa",
    price: 29000,
    description: "Crafted in our Imphal workshop. This wooden sofa showcases the rich beauty of local teak wood with clean slats on the back and sides. Complemented by thick, washable cream fabric cushions.",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: true,
    features: [
      "In-house seasoned premium Manipur teak wood",
      "Removable & washable canvas cushion covers",
      "Reinforced Mortise and Tenon wooden joints",
      "Warm teak grain semi-gloss wood finish"
    ],
    specifications: {
      material: "Solid Teak wood, High resilience foam, Cotton-canvas fabric",
      dimensions: "72 W x 32 D x 30 H inches",
      warranty: "5 Years Imphal Workshop Warranty",
      assembly: "Delivered fully assembled"
    },
    rating: 5.0,
    reviewsCount: 19
  },
  {
    id: "sofa-boucle-loveseat",
    name: "Luxury Bouclé Accent Loveseat",
    category: "Sofa",
    price: 22500,
    description: "Add a touch of organic modern design to your space. This cozy 2-seater loveseat is wrapped in textured, loop-woven bouclé fabric with a curved silhouette that complements both modern and classic rooms.",
    image: "https://images.unsplash.com/photo-1512207724213-747424901c37?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: false,
    features: [
      "Plush, cloud-like organic curved frame outline",
      "Upholstered with high-texture premium bouclé fabric",
      "Sturdy webbed suspension seating support",
      "Compact size perfect for bedrooms, offices, or study rooms"
    ],
    specifications: {
      material: "Bouclé fabric, Solid Pine frame, Polyurethane foam padding",
      dimensions: "58 W x 32 D x 31 H inches",
      warranty: "2 Years Manufacturer Warranty",
      assembly: "Fully assembled"
    },
    rating: 4.6,
    reviewsCount: 11
  },
  {
    id: "wardrobe-sliding-mirror",
    name: "Urban Sliding Door Wardrobe",
    category: "Wardrobe",
    price: 45000,
    description: "Sleek and highly functional. This wardrobe features dual sliding doors with custom safety mirrors, maximizing spacing efficiency in compact urban master bedrooms.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: false,
    features: [
      "Zero-clearance silent sliding doors",
      "Full-height integrated dressing mirror",
      "Soft-closing hidden inner drawers",
      "Adjustable shelf configurations"
    ],
    specifications: {
      material: "High density engineered blockwood, anti-rust aluminium tracks",
      dimensions: "60 W x 24 D x 78 H inches",
      warranty: "3 Years Manufacturer Warranty",
      assembly: "Installed by Mobel service team"
    },
    rating: 4.6,
    reviewsCount: 15
  },
  {
    id: "wardrobe-solid-teak",
    name: "Heritage Solid Teak Wardrobe",
    category: "Wardrobe",
    price: 58000,
    description: "Proudly designed and hand-built in our local Imphal facility. Made from locally sourced, seasoned teak wood with intricate brass locks, offering heirloom-quality storage.",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: true,
    features: [
      "100% solid seasoned local teak wood",
      "Custom handmade brass handle and key locks",
      "Traditional lacquer wood-grain finish",
      "Two spacious hanging rails & lockable treasure locker"
    ],
    specifications: {
      material: "Seasoned Teak wood, Solid Brass fittings",
      dimensions: "66 W x 22 D x 76 H inches",
      warranty: "5 Years Imphal Workshop Warranty",
      assembly: "Delivered fully assembled"
    },
    rating: 5.0,
    reviewsCount: 18
  },
  {
    id: "wardrobe-compact-tri",
    name: "Tri-Force Compact Wardrobe",
    category: "Wardrobe",
    price: 26000,
    description: "Compact 3-door wardrobe from Mobel Kolkata. Specially engineered to fit guest bedrooms or children's rooms without sacrificing clothes hanging capacity.",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: false,
    features: [
      "Space-optimized 3-door swinging format",
      "Integrated key lock on central door",
      "Scratch-proof external melamine laminate",
      "Bottom drawers for footwear storage"
    ],
    specifications: {
      material: "Premium Particle Board, Melamine Coating",
      dimensions: "45 W x 20 D x 72 H inches",
      warranty: "2 Years Manufacturer Warranty",
      assembly: "Free assembly by delivery team"
    },
    rating: 4.4,
    reviewsCount: 22
  },
  {
    id: "showcase-retro-walnut",
    name: "Retro Walnut Glass Cabinet",
    category: "Showcase",
    price: 32000,
    description: "A mid-century modern display cabinet featuring warm walnut finishes, tapered solid legs, and sliding glass panel doors. Perfect for organizing dining dinnerware or art books.",
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: false,
    features: [
      "Mid-century modern tapered leg frame",
      "Smooth-slide tempered glass doors",
      "Warm walnut wood grain veneer finish",
      "Spacious lower drawer with magnetic closures"
    ],
    specifications: {
      material: "Walnut Veneer, Solid Beechwood Legs, Toughened Glass",
      dimensions: "42 W x 15 D x 65 H inches",
      warranty: "2 Years Manufacturer Warranty",
      assembly: "Free installation on delivery"
    },
    rating: 4.7,
    reviewsCount: 14
  },
  {
    id: "showcase-corner-luxe",
    name: "Vantage Corner Glass Showcase",
    category: "Showcase",
    price: 21000,
    description: "Make the most of unused corner spaces. This elegant corner display cabinet features full-height viewing glass panes and built-in mirror backing to reflect light beautifully.",
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: false,
    features: [
      "Space-saving 90-degree corner profile",
      "Mirror-backed panels for enhanced display visibility",
      "Three thick tempered glass shelves",
      "Magnetic safety door clasp"
    ],
    specifications: {
      material: "Engineered wood panel, Backing mirror, Tempered Glass",
      dimensions: "24 W x 24 D x 70 H inches",
      warranty: "2 Years Manufacturer Warranty",
      assembly: "Free setup by Mobel team"
    },
    rating: 4.5,
    reviewsCount: 25
  },
  {
    id: "showcase-industrial-metal",
    name: "Metropolis Industrial Showcase",
    category: "Showcase",
    price: 28500,
    description: "A trendy blend of matte black iron framing and warm solid wood shelving. Ideal for adding a contemporary industrial design vibe to your living room or study lounge.",
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: true,
    features: [
      "In-house frame customization in Imphal",
      "Heavy-duty powder-coated iron skeleton frame",
      "Seasoned solid wood shelves with rich lacquer",
      "Industrial wire-mesh rear safety panels"
    ],
    specifications: {
      material: "Wrought Iron, Seasoned Local Hardwood",
      dimensions: "34 W x 16 D x 74 H inches",
      warranty: "3 Years Local Workshop Warranty",
      assembly: "Pre-assembled frame structure"
    },
    rating: 4.8,
    reviewsCount: 17
  },
  {
    id: "center-table-nordic",
    name: "Nordic Solid Oak Coffee Table",
    category: "Center Table",
    price: 14500,
    description: "Clean lines and Scandinavian design. Features a storage shelf below the table top and rounded solid oak wood legs for a sleek family-friendly design.",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: false,
    features: [
      "Minimalist oval platform tabletop layout",
      "Open access lower magazine tray",
      "Splayed round tapered solid wood legs",
      "Non-toxic waterbase wood coat finish"
    ],
    specifications: {
      material: "Solid Oak Wood, White Oak Veneer",
      dimensions: "44 W x 22 D x 16 H inches",
      warranty: "2 Years Manufacturer Warranty",
      assembly: "Legs screw-on (5 mins setup)"
    },
    rating: 4.7,
    reviewsCount: 21
  },
  {
    id: "center-table-marble",
    name: "Carrara Marble Center Table",
    category: "Center Table",
    price: 22000,
    description: "Indulge in premium stone luxury. Features a polished white Carrara marble slab top supported by a geometric gold-finished stainless steel frame.",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: false,
    features: [
      "Natural 15mm white Carrara marble stone top",
      "Heat and scratch-resistant polished top sealer",
      "Geo-frame gold stainless steel base frame",
      "Protective floor pads attached to base feet"
    ],
    specifications: {
      material: "White Carrara Marble, 304 Grade Stainless Steel Frame",
      dimensions: "36 W x 36 D x 18 H inches (Round)",
      warranty: "3 Years Manufacturer Warranty",
      assembly: "Free assembly by delivery team"
    },
    rating: 4.9,
    reviewsCount: 19
  },
  {
    id: "center-table-nesting",
    name: "Helios Nesting Coffee Tables Set",
    category: "Center Table",
    price: 11500,
    description: "Versatile nesting coffee tables. A set of two round tables that can be nested together to save space or separated to offer dual serving areas when guests arrive.",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: true,
    features: [
      "Space-efficient nesting slide-in design",
      "Textured slate laminate tops for simple cleanup",
      "Matte black steel hairpin legs",
      "Assembled locally in Imphal workshop"
    ],
    specifications: {
      material: "Slate texture MDF top, Powder coated steel legs",
      dimensions: "Large: 32\" Dia x 18\" H, Small: 24\" Dia x 16\" H",
      warranty: "2 Years Local Workshop Warranty",
      assembly: "Delivered fully assembled"
    },
    rating: 4.6,
    reviewsCount: 38
  },
  {
    id: "dresser-floating-modern",
    name: "Minimal Floating Vanity Dresser",
    category: "Dresser",
    price: 15500,
    description: "Maximize your floor space. This modern wall-mounted dressing vanity features a drawer with jewelry compartments and a matching round wall mirror.",
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: false,
    features: [
      "Space saving floating wall-mount format",
      "Hidden push-to-open smooth glide drawer",
      "Felt-lined organizer insert included",
      "Sleek round frameless silver back mirror"
    ],
    specifications: {
      material: "High density fiberboard, Frameless Silver Mirror",
      dimensions: "32 W x 14 D x 8 H inches (Dresser cabinet drawer)",
      warranty: "2 Years Manufacturer Warranty",
      assembly: "Wall mounting installation provided free by Mobel team"
    },
    rating: 4.7,
    reviewsCount: 16
  },
  {
    id: "dresser-classical-teak",
    name: "Royal Teak Vanity Mirror Desk",
    category: "Dresser",
    price: 27000,
    description: "A traditional standing dresser handcrafted at our local Imphal facility. Made of seasoned teak wood with a full-length mirror pane and vertical drawer tower.",
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: true,
    features: [
      "100% seasoned solid teak wood panels",
      "Full-length dressing glass mirror panel",
      "Vertical tower with 4 lockable vanity drawers",
      "Hidden storage space behind mirror door"
    ],
    specifications: {
      material: "Local Solid Teak Wood, Polish finishing",
      dimensions: "36 W x 16 D x 72 H inches",
      warranty: "5 Years Imphal Workshop Warranty",
      assembly: "Delivered and installed fully assembled"
    },
    rating: 4.9,
    reviewsCount: 20
  },
  {
    id: "dresser-scandi-compact",
    name: "Aura Scandi Dresser Cabinet",
    category: "Dresser",
    price: 12500,
    description: "Compact dressing desk in light wood oak tones. Features a flip-top lid that opens to reveal a makeup organizer tray and an internal mirror, serving as a laptop desk when closed.",
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: false,
    features: [
      "Dual purpose flip-top desk design",
      "9 compartment makeup grid insert",
      "Soft cushioned dressing stool matches oak tone",
      "Damped gas-spring lid opening hinges"
    ],
    specifications: {
      material: "Solid pine wood legs, Oak veneer paneling",
      dimensions: "32 W x 18 D x 30 H inches (Closed desk state)",
      warranty: "1 Year Manufacturer Warranty",
      assembly: "Legs screw-on (Free assembly provided)"
    },
    rating: 4.5,
    reviewsCount: 29
  },
  {
    id: "dining-table-marble",
    name: "Verona Marble 6-Seater Dining Set",
    category: "Dining Table",
    price: 68000,
    description: "An elegant, modern dining set from Mobel Kolkata. Features a large rectangular white marble tabletop and 6 high-back dining chairs wrapped in premium leatherette.",
    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: false,
    features: [
      "Thick white artificial marble stone slab tabletop",
      "Stain-resistant protective top resin layer",
      "Heavy duty curved steel base framing",
      "Set includes 6 matching leatherette dining chairs"
    ],
    specifications: {
      material: "Engineered Marble Top, Chrome Steel Base, PU Leatherette chairs",
      dimensions: "70 W x 38 D x 30 H inches",
      warranty: "3 Years Manufacturer Warranty",
      assembly: "Free assembly and installation on delivery"
    },
    rating: 4.8,
    reviewsCount: 22
  },
  {
    id: "dining-table-compact",
    name: "Metro Drop-Leaf 4-Seater Dining Table",
    category: "Dining Table",
    price: 18500,
    description: "Ideal for small apartments. This compact dining table features drop-leaf sides that fold down to save space when not in use, converting from a console to a 4-seater dining space.",
    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: false,
    features: [
      "Foldable drop-leaf space-saving tabletop panels",
      "Built-in central storage drawer",
      "Set includes 4 stools that pack inside the frame",
      "Waterproof laminate top prevents food stains"
    ],
    specifications: {
      material: "High density blockwood, Heavy metal folding brackets",
      dimensions: "Fully open: 48 W x 32 D x 30 H inches, Folded: 14 W x 32 D x 30 H inches",
      warranty: "2 Years Manufacturer Warranty",
      assembly: "Delivered pre-assembled by Mobel team"
    },
    rating: 4.5,
    reviewsCount: 17
  },
  {
    id: "dining-table-rustic",
    name: "Timberlands Live-Edge Dining Table",
    category: "Dining Table",
    price: 38000,
    description: "Celebrate nature's designs. Handcrafted at our local Imphal plant using live-edge local cedar slabs and matte black iron legs, creating a statement rustic dining piece.",
    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: true,
    features: [
      "In-house curated live-edge local Cedar slab",
      "Rustic hand-sanded wood textures preserved in epoxy",
      "Heavy duty black steel loop legs support",
      "Delivered with 6 cushioned high-back chairs"
    ],
    specifications: {
      material: "Seasoned local Cedar wood, Epoxy resin finish, Iron legs",
      dimensions: "64 W x 36 D x 30 H inches",
      warranty: "5 Years Imphal Workshop Warranty",
      assembly: "Legs setup at site (Free assembly)"
    },
    rating: 4.9,
    reviewsCount: 14
  },
  {
    id: "mattress-latex-breath",
    name: "EcoGreen 8-Inch Natural Latex Mattress",
    category: "Mattress",
    price: 28000,
    description: "An eco-friendly sleep upgrade. Sourced from the premium Mobel wellness line, featuring 100% natural pin-core latex for cooling airflow and bouncy orthopedic support.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: false,
    features: [
      "100% natural pincore latex cushioning",
      "Breathable bamboo yarn knitted outer cover",
      "Resistant to dust mites and allergens naturally",
      "Dual comfort zones align spine ergonomics"
    ],
    specifications: {
      material: "Natural Latex, Coconut Coir base, Bamboo fabric",
      dimensions: "78 W x 72 D x 8 H inches (King Size)",
      warranty: "10 Years Manufacturer Warranty",
      assembly: "Unrolls and expands automatically"
    },
    rating: 4.8,
    reviewsCount: 36
  },
  {
    id: "mattress-pocket-spring",
    name: "DreamCloud Pocket Spring Mattress",
    category: "Mattress",
    price: 21500,
    description: "Zero partner disturbance. Each pocket spring is individually wrapped to isolate movement, topped with a thick quilted Euro-top layer for cloud-like comfort.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: false,
    features: [
      "Individually pocketed steel coil suspension",
      "High comfort quilted Euro-top memory foam layer",
      "Anti-sagging reinforced borders",
      "Anti-skid bottom fabric keeps mattress stable"
    ],
    specifications: {
      material: "Individually wrapped steel coils, PU Memory foam, Jacquard fabric",
      dimensions: "78 W x 60 D x 8 H inches (Queen Size)",
      warranty: "8 Years Manufacturer Warranty",
      assembly: "Unpack and place on bed frame"
    },
    rating: 4.7,
    reviewsCount: 42
  },
  {
    id: "mattress-dual-comfort",
    name: "DualComfort Reversible Mattress",
    category: "Mattress",
    price: 13500,
    description: "Get the best of both worlds. Features a dual-sided design with a firm orthopedic coir layer on one side, and a soft cushioning foam layer on the reverse.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
    section: "home",
    isHouseManufactured: false,
    features: [
      "Reversible format (Firm support side & Soft cushion side)",
      "High density rubberized coir support core",
      "Breathable cotton quilted cover casing",
      "Lightweight design, easy to flip over"
    ],
    specifications: {
      material: "Rubberized Coir, High Resilience Foam, Knitted Cotton cover",
      dimensions: "75 W x 36 D x 6 H inches (Single Size)",
      warranty: "5 Years Manufacturer Warranty",
      assembly: "Unpack and ready to use"
    },
    rating: 4.6,
    reviewsCount: 51
  },
  {
    id: "chair-executive-leather",
    name: "Vanguard High-Back Leather Chair",
    category: "Office Chair",
    price: 24000,
    description: "Add status and command to your desk. Upholstered in premium full-grain black leather with polished aluminium detailing, and sync-tilt recline mechanisms.",
    image: "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?auto=format&fit=crop&w=800&q=80",
    section: "office",
    isHouseManufactured: false,
    features: [
      "Imported premium full-grain black leather padding",
      "Central sync-tilt mechanism with lock settings",
      "Heavy duty polished aluminium star base",
      "Padded leather wrapped loop armrests"
    ],
    specifications: {
      material: "Genuine Full-grain Leather, Aluminium alloy base, Gas lift",
      dimensions: "28 W x 26 D x 48-52 H inches",
      warranty: "3 Years Manufacturer Warranty",
      assembly: "Delivered pre-assembled"
    },
    rating: 4.9,
    reviewsCount: 32
  },
  {
    id: "chair-task-breathable",
    name: "Helix Breathable Mid-Back Office Chair",
    category: "Office Chair",
    price: 9500,
    description: "Assembled locally in Imphal workshop. Features a responsive mesh back and height adjustable lumbar pad, making it the perfect task chair for long work shifts.",
    image: "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?auto=format&fit=crop&w=800&q=80",
    section: "office",
    isHouseManufactured: true,
    features: [
      "Assembled and checked locally in Imphal",
      "Flexible nylon back with breathable mesh",
      "Padded height-adjustable lumbar lumbar pad support",
      "Premium nylon base frame with 360 castors"
    ],
    specifications: {
      material: "High density mesh, Nylon frame, Gas lift cylinders",
      dimensions: "25 W x 24 D x 38-42 H inches",
      warranty: "2 Years Local Workshop Warranty",
      assembly: "Delivered fully assembled"
    },
    rating: 4.8,
    reviewsCount: 45
  },
  {
    id: "chair-drafting-high",
    name: "Skyline Drafting Height Adjustable Stool",
    category: "Office Chair",
    price: 11000,
    description: "Specialty chair for high desks, counter setups, and designers. Assembled locally, featuring an adjustable metal foot-ring support and ergonomic lumbar seating.",
    image: "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?auto=format&fit=crop&w=800&q=80",
    section: "office",
    isHouseManufactured: true,
    features: [
      "High draft cylinder height range settings",
      "Integrated chrome steel circular foot ring",
      "Compact breathable mid-back mesh layout",
      "Heavy duty static glide base optional"
    ],
    specifications: {
      material: "Mesh fabric seat, Chrome foot-ring, Heavy-duty Gas Lift",
      dimensions: "24 W x 24 D x 42-50 H inches",
      warranty: "2 Years Local Workshop Warranty",
      assembly: "Assembled free at delivery site"
    },
    rating: 4.6,
    reviewsCount: 18
  },
  {
    id: "drawer-steel-lateral",
    name: "SteelForce 2-Drawer Lateral File Cabinet",
    category: "Drawer",
    price: 9800,
    description: "Organize office files efficiently. This heavy-duty steel cabinet features lateral sliding drawers suited for letter or legal size hanging folders.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80",
    section: "office",
    isHouseManufactured: false,
    features: [
      "Wide lateral format fits folders side-by-side",
      "Anti-tilt locking system allows only one drawer open",
      "Central lock security protects confidential files",
      "Rust-proof powder coated steel finish"
    ],
    specifications: {
      material: "Cold-Rolled Steel Sheet, Locking Cylinder",
      dimensions: "30 W x 18 D x 28 H inches",
      warranty: "3 Years Manufacturer Warranty",
      assembly: "Pre-assembled cabinet package"
    },
    rating: 4.5,
    reviewsCount: 19
  },
  {
    id: "drawer-wooden-desk",
    name: "Classic Oak Under-Desk Drawer Unit",
    category: "Drawer",
    price: 6200,
    description: "Crafted in our Imphal workshop. This wooden drawer pedestal features 3 drawers, mobile wheels, and matches warm wood desks to keep stationary handy.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80",
    section: "office",
    isHouseManufactured: true,
    features: [
      "In-house designed & crafted at Mobel Imphal",
      "Seasoned solid pine wood framework",
      "Mobile castor wheels with dual front brakes",
      "Integrated wooden recessed handles"
    ],
    specifications: {
      material: "Solid Pine, Oak wood laminates",
      dimensions: "16 W x 18 D x 23 H inches",
      warranty: "3 Years Local Workshop Warranty",
      assembly: "Fully assembled out of box"
    },
    rating: 4.8,
    reviewsCount: 22
  },
  {
    id: "drawer-slimline-mobile",
    name: "Slimline Mobile Pedestal Unit",
    category: "Drawer",
    price: 5400,
    description: "Ultra-compact mobile drawer unit. At just 12 inches wide, it fits easily into narrow cubicles and under compact desks while providing full lockable storage.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80",
    section: "office",
    isHouseManufactured: false,
    features: [
      "Space-saving 12-inch slimline width profile",
      "Smooth silent ball-bearing runners",
      "Universal lock with dual keys",
      "Sturdy steel base construction"
    ],
    specifications: {
      material: "Alloy Steel, Paint finish coating",
      dimensions: "12 W x 18 D x 24 H inches",
      warranty: "2 Years Manufacturer Warranty",
      assembly: "Fully assembled"
    },
    rating: 4.6,
    reviewsCount: 31
  },
  {
    id: "table-adjustable-standing",
    name: "Apex Auto-Height Electric Standing Desk",
    category: "Table",
    price: 24500,
    description: "Switch seamlessly between sitting and standing. Features a dual-motor electric height adjustment system with 4 memory settings and an anti-collision sensor.",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
    section: "office",
    isHouseManufactured: false,
    features: [
      "Dual powerful silent electric lift motors",
      "Digital keypad interface with 4 memory height presets",
      "Tough scratch-resistant melamine top surface",
      "Active anti-collision auto-stop safety sensor"
    ],
    specifications: {
      material: "Heavy-duty Steel frame, Engineered top panel",
      dimensions: "55 W x 28 D x 25-50 H inches (Height range adjustment)",
      warranty: "3 Years motor warranty, 5 years frame warranty",
      assembly: "Installation and wiring completed by Mobel team"
    },
    rating: 4.9,
    reviewsCount: 41
  },
  {
    id: "table-compact-home",
    name: "Nomad Compact Home Office Writing Desk",
    category: "Table",
    price: 8800,
    description: "Proudly manufactured in our local workshop. Perfect for work-from-home or remote student setups, featuring a compact keyboard shelf and solid wood desk top.",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
    section: "office",
    isHouseManufactured: true,
    features: [
      "Proudly manufactured locally at Imphal facility",
      "Built-in keyboard slide shelf",
      "Solid seasoned local hardwood tabletop",
      "Wire management cable routing grommets"
    ],
    specifications: {
      material: "Seasoned Local Hardwood, Wrought Iron leg structures",
      dimensions: "40 W x 20 D x 30 H inches",
      warranty: "3 Years Local Workshop Warranty",
      assembly: "Free setup by Mobel crew"
    },
    rating: 4.8,
    reviewsCount: 29
  },
  {
    id: "table-conference-modular",
    name: "Boardroom Modular 8ft Conference Table",
    category: "Table",
    price: 45000,
    description: "Create a modern meeting environment. A spacious 8-foot boardroom table featuring integrated power sockets, USB ports, and dual wire routing pathways.",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
    section: "office",
    isHouseManufactured: false,
    features: [
      "Modular design easily extends with leaf inserts",
      "Built-in double power socket strip & USB ports",
      "Sleek curved boat-shape tabletop format",
      "Heavy load-bearing panel leg system"
    ],
    specifications: {
      material: "High density fiberboard, Wood grain veneer finishing",
      dimensions: "96 W x 48 D x 30 H inches",
      warranty: "3 Years Manufacturer Warranty",
      assembly: "Free structural assembly on site"
    },
    rating: 4.7,
    reviewsCount: 15
  }
];
