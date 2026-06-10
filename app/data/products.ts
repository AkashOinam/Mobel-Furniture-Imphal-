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
    "id": "royal-walnut-6-seater-dining-set",
    "name": "Royal Walnut 6-Seater Dining Set",
    "category": "Dining Table",
    "price": 0,
    "description": "A modern 6-seater dining set crafted with a rich dark wood finish and upholstered seating for enhanced comfort. The elegant cut-out chair back design and sturdy construction make it a perfect addition to contemporary dining spaces.",
    "image": "https://res.cloudinary.com/dkxfacuxb/image/upload/v1780996938/mobel-furniture-products/home-furniture/dining-table/royal-walnut-6-seater-dining-set/umow5gojzydlg0m9sgya.jpg",
    "images": [],
    "section": "home",
    "isHouseManufactured": false,
    "features": [
      "Seats up to 6 people comfortably",
      "Premium dark walnut finish",
      "Cushioned fabric seats for added comfort",
      "Decorative chair back design",
      "Durable wooden frame construction",
      "Spacious rectangular tabletop",
      "Easy to clean and maintain",
      "Suitable for homes and dining areas"
    ],
    "specifications": {
      "material": "Solid Wood & Fabric Upholstery",
      "dimensions": "72 W × 36 D × 30 H inches (Approx.)",
      "warranty": "3 Years Manufacturer Warranty",
      "assembly": "Assistance Available"
    },
    "rating": 5,
    "reviewsCount": 0
  },
  {
    "id": "luxe-lebanon-sofa-set",
    "name": "Luxe Lebanon Sofa Set",
    "category": "Sofa",
    "price": 0,
    "description": "The Luxe Lebanon Sofa Set is a perfect blend of luxury, comfort, and contemporary design. Crafted with premium materials and exceptional attention to detail, this sofa offers plush seating, elegant styling, and lasting durability. Its sophisticated silhouette and refined upholstery make it an ideal centerpiece for modern living spaces, creating a welcoming environment for relaxation and entertaining guests.",
    "image": "https://res.cloudinary.com/dkxfacuxb/image/upload/v1781067398/mobel-furniture-products/home-furniture/sofa/luxe-lebanon-sofa-set/anomkjexzlqzzfrhsqtf.png",
    "images": [
      "https://res.cloudinary.com/dkxfacuxb/image/upload/v1781067399/mobel-furniture-products/home-furniture/sofa/luxe-lebanon-sofa-set/kvsnijvbloth9jpdfrrr.png",
      "https://res.cloudinary.com/dkxfacuxb/image/upload/v1781067400/mobel-furniture-products/home-furniture/sofa/luxe-lebanon-sofa-set/dsoisbm8y0c7mwdq0wau.png",
      "https://res.cloudinary.com/dkxfacuxb/image/upload/v1781067401/mobel-furniture-products/home-furniture/sofa/luxe-lebanon-sofa-set/yevzjgs5x4o5vrok59pg.png",
      "https://res.cloudinary.com/dkxfacuxb/image/upload/v1781067402/mobel-furniture-products/home-furniture/sofa/luxe-lebanon-sofa-set/vmblxycuuwqteuiexjyn.png"
    ],
    "section": "home",
    "isHouseManufactured": false,
    "features": [
      "Premium-quality upholstered sofa",
      "Contemporary luxury design",
      "High-density foam cushioning for superior comfort",
      "Durable hardwood frame construction",
      "Soft-touch premium fabric upholstery",
      "Spacious and ergonomic seating",
      "Elegant stitching and finishing details",
      "Designed for everyday use and long-lasting performance",
      "Complements modern and classic interiors",
      "Easy to maintain upholstery"
    ],
    "specifications": {
      "material": "Solid Wood Frame, High-Density Foam, Premium Fabric Upholstery",
      "dimensions": "Approx. 84 W × 36 D × 34 H inches",
      "warranty": "1 Year Manufacturing Warranty",
      "assembly": "No Assembly Required"
    },
    "rating": 5,
    "reviewsCount": 0
  },
  {
    "id": "dom-test-product",
    "name": "DOM Test Product",
    "category": "Bed",
    "price": 0,
    "description": "Testing the upload mechanism end-to-end",
    "image": "https://res.cloudinary.com/dkxfacuxb/image/upload/v1781070834/mobel-furniture-products/home-furniture/bed/dom-test-product/ea60nxoknbije5a7iwmb.webp",
    "images": [
      "https://res.cloudinary.com/dkxfacuxb/image/upload/v1781070834/mobel-furniture-products/home-furniture/bed/dom-test-product/ea60nxoknbije5a7iwmb.webp"
    ],
    "section": "home",
    "isHouseManufactured": false,
    "features": [],
    "specifications": {
      "material": "",
      "dimensions": "",
      "warranty": "",
      "assembly": ""
    },
    "rating": 5,
    "reviewsCount": 0
  }
];
