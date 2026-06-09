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

export const products: Product[] = [    {
    id: "royal-walnut-6-seater-dining-set",
    name: "Royal Walnut 6-Seater Dining Set",
    category: "Dining Table",
    price: 0,
    description: "A modern 6-seater dining set crafted with a rich dark wood finish and upholstered seating for enhanced comfort. The elegant cut-out chair back design and sturdy construction make it a perfect addition to contemporary dining spaces.",
    image: "https://res.cloudinary.com/dkxfacuxb/image/upload/v1780996938/mobel-furniture-products/home-furniture/dining-table/royal-walnut-6-seater-dining-set/umow5gojzydlg0m9sgya.jpg",
    images: [
      
    ],
    section: "home",
    isHouseManufactured: false,
    features: [
      "Seats up to 6 people comfortably",
      "Premium dark walnut finish",
      "Cushioned fabric seats for added comfort",
      "Decorative chair back design",
      "Durable wooden frame construction",
      "Spacious rectangular tabletop",
      "Easy to clean and maintain",
      "Suitable for homes and dining areas"
    ],
    specifications: {
      material: "Solid Wood & Fabric Upholstery",
      dimensions: "72 W × 36 D × 30 H inches (Approx.)",
      warranty: "3 Years Manufacturer Warranty",
      assembly: "Assistance Available"
    },
    rating: 5.0,
    reviewsCount: 0
  },
];
