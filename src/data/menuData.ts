import { MenuItem, GalleryPost, VideoReel, VimeoReel, Testimonial } from '../types';

export const SANARA_INFO = {
  name: "Sanara Grill Restaurant",
  tagline: "Sanara grills Mbezi. Nicely done, well served.",
  location: "Jangwani Shopping Centre, Mbezi, Dar es Salaam, Tanzania",
  phonePrimary: "+255 716 110 011",
  phoneAlt: "0746 999 333",
  whatsappNumber: "+255716110011",
  rating: 4.5,
  reviewCount: 670,
  priceRange: "1,000 - 40,000 TZS",
  hours: "Open daily, 7:00 AM - 12:00 AM (Midnight)",
  instagram: "@sanara_grill_restaurant",
  instagramUrl: "https://instagram.com/sanara_grill_restaurant",
  isWomenOwned: true,
};

// High resolution food & restaurant images
export const imgPrawnsMakange = "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1000&q=80";
export const imgFishMakange = "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80";
export const imgSeafoodPlatter = "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80";
export const imgGrilledFishChips = "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=1000&q=80";
export const imgFishTikka = "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1000&q=80";

export const imgBbqChicken = "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1000&q=80";
export const imgBbqSinia = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80";
export const imgMishikakiPlatter = "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80";
export const imgChickenGajjar = "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80";

export const imgBiriani = "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80";
export const imgVegMakange = "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80";
export const imgShawarma = "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=1000&q=80";

export const imgOrangeSlash = "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=1000&q=80";
export const imgAvocadoJuice = "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80";
export const imgMangoShake = "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=1000&q=80";
export const imgCocktails = "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80";

export const imgRooftop = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80";
export const imgGrillMaster = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80";
export const imgCozyAtmosphere = "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80";

export const ALL_MENU_ITEMS: MenuItem[] = [
  // SEAFOOD
  {
    id: 101,
    cat: "Seafood",
    name: "Prawns Makange",
    price: 35000,
    time: 20,
    kcal: 540,
    desc: "Plump ocean jumbo prawns slow-sizzled in Sanara's signature spicy tomato, ginger, garlic and bell pepper makange sauce.",
    badge: "Chef's Special",
    emoji: "shrimp",
    tags: ["Seafood", "Signature", "Fresh Catch"],
    image: imgPrawnsMakange
  },
  {
    id: 102,
    cat: "Seafood",
    name: "Fish Makange",
    price: 28000,
    time: 22,
    kcal: 610,
    desc: "Fresh ocean fish fillet simmered with charred onions, hot peppers, and traditional Tanzanian herbs served steaming hot.",
    badge: "Bestseller",
    emoji: "fish",
    tags: ["Seafood", "Local Flavor"],
    image: imgFishMakange
  },
  {
    id: 103,
    cat: "Seafood",
    name: "Seafood Platter",
    price: 40000,
    time: 25,
    kcal: 890,
    desc: "A feast of grilled prawns, marinated fish tikka skewers, tender calamari, and spicy garlic butter drizzle.",
    badge: "Premium",
    emoji: "lobster",
    tags: ["Seafood", "Platter", "Grill"],
    image: imgSeafoodPlatter
  },
  {
    id: 104,
    cat: "Seafood",
    name: "Sea Food Platters (Family Share)",
    price: 40000,
    time: 30,
    kcal: 1250,
    desc: "Generous ocean platter crafted for 2-3 people, loaded with grilled prawns, whole red snapper portions, fried plantains, masala chips, and house sauces.",
    badge: "Sharing Platter",
    emoji: "crab",
    tags: ["Seafood", "Group Share", "Rooftop Favorite"],
    image: imgSeafoodPlatter
  },
  {
    id: 105,
    cat: "Seafood",
    name: "Grilled Whole Fish and Chips",
    price: 30000,
    time: 25,
    kcal: 780,
    desc: "Whole daily fresh catch charcoal-grilled to perfection with lemon garlic marinade, paired with golden crispy masala chips & tartar sauce.",
    badge: "Popular",
    emoji: "fish",
    tags: ["Seafood", "Charcoal Grill"],
    image: imgGrilledFishChips
  },
  {
    id: 106,
    cat: "Seafood",
    name: "Fish Tikka",
    price: 25000,
    time: 18,
    kcal: 520,
    desc: "Tender boneless sea fish cubes infused with zesty spices, yoghurt marinade, and charred on tandoori skewers.",
    badge: "Tikka Special",
    emoji: "skewer",
    tags: ["Seafood", "Tikka", "Halal"],
    image: imgFishTikka
  },

  // GRILL & BBQ
  {
    id: 201,
    cat: "Grill/BBQ",
    name: "BBQ Chicken",
    price: 22000,
    time: 20,
    kcal: 680,
    desc: "Half flame-grilled chicken glazed with Sanara's house-smoked tangy BBQ marinade and fresh rosemary.",
    badge: "Classic Grill",
    emoji: "chicken",
    tags: ["Grill", "BBQ", "Flame Roasted"],
    image: imgBbqChicken
  },
  {
    id: 202,
    cat: "Grill/BBQ",
    name: "BBQ Sinia XXL",
    price: 40000,
    time: 28,
    kcal: 1450,
    desc: "The ultimate Sanara experience — flame-grilled BBQ chicken, succulent beef mishikaki skewers, tender ribs, fried banana, and loaded spicy chips served on a traditional sinia tray.",
    badge: "Signature Sinia",
    emoji: "flame",
    tags: ["Grill", "Platter", "Bestseller", "Group"],
    image: imgBbqSinia
  },
  {
    id: 203,
    cat: "Grill/BBQ",
    name: "Kisinia Kuku Mishikaki",
    price: 32000,
    time: 22,
    kcal: 980,
    desc: "Tray platter featuring spiced chicken mishikaki skewers, grilled sausages, fragrant yellow rice, and house chili relish.",
    badge: "Customer Fav",
    emoji: "skewer",
    tags: ["Grill", "Mishikaki", "Local Favorite"],
    image: imgMishikakiPlatter
  },
  {
    id: 204,
    cat: "Grill/BBQ",
    name: "Chicken Gajjar with Masala Chips",
    price: 24000,
    time: 20,
    kcal: 760,
    desc: "Juicy charred chicken gajjar leg roasted in aromatic Mbezi herbs, served alongside vibrant hand-cut masala chips.",
    badge: "Grill Special",
    emoji: "chicken",
    tags: ["Grill", "Spicy", "Crispy Chips"],
    image: imgChickenGajjar
  },

  // RICE & MAINS
  {
    id: 301,
    cat: "Rice & Mains",
    name: "Biriani",
    price: 18000,
    time: 15,
    kcal: 790,
    desc: "Authentic coastal Tanzanian Biryani with aromatic cardamom-infused basmati rice, tender spiced meat gravy, and kachumbari salad.",
    badge: "Coastal Classic",
    emoji: "rice",
    tags: ["Rice", "Traditional", "Halal"],
    image: imgBiriani
  },
  {
    id: 302,
    cat: "Rice & Mains",
    name: "Special Veg Makange",
    price: 14000,
    time: 15,
    kcal: 480,
    desc: "Sauteed garden vegetables, bell peppers, fresh paneer, and local herbs simmered in rich coconut tomato gravy.",
    badge: "Vegetarian",
    emoji: "veggie",
    tags: ["Veg", "Vegan Option", "Healthy"],
    image: imgVegMakange
  },
  {
    id: 303,
    cat: "Rice & Mains",
    name: "Shawarma Plate",
    price: 16000,
    time: 15,
    kcal: 650,
    desc: "Shredded flame-roasted chicken shawarma served with house tahini garlic cream, warm pita bread, crisp pickles, and French fries.",
    badge: "Popular",
    emoji: "shawarma",
    tags: ["Mains", "Shawarma", "Quick Bite"],
    image: imgShawarma
  },

  // DRINKS
  {
    id: 401,
    cat: "Drinks",
    name: "Orange Pineapple Slash",
    price: 8000,
    time: 5,
    kcal: 180,
    desc: "Ice-cold frozen slushie freshly pressed from sun-ripened Mbezi oranges and sweet coastal pineapples.",
    badge: "Refreshing",
    emoji: "cocktail",
    tags: ["Fresh Juice", "Cold", "Slashie"],
    image: imgOrangeSlash
  },
  {
    id: 402,
    cat: "Drinks",
    name: "Awakado (Avocado) Juice",
    price: 7000,
    time: 5,
    kcal: 260,
    desc: "Rich, velvety avocado smoothie blended with a hint of local Tanzanian honey and fresh lime zest.",
    badge: "Nutritious",
    emoji: "smoothie",
    tags: ["Smoothie", "Healthy"],
    image: imgAvocadoJuice
  },
  {
    id: 403,
    cat: "Drinks",
    name: "Embe (Mango) Shake",
    price: 7500,
    time: 5,
    kcal: 240,
    desc: "Thick tropical milkshake crafted from sweet ripe Dar es Salaam Alphonso mangos and chilled cream.",
    badge: "Sweet Treat",
    emoji: "shake",
    tags: ["Shake", "Sweet"],
    image: imgMangoShake
  },
  {
    id: 404,
    cat: "Drinks",
    name: "Sanara Signature Cocktails",
    price: 15000,
    time: 8,
    kcal: 210,
    desc: "Handcrafted rooftop cocktails including Sanara Sunset Passion, Classic Mint Mojito, or Spicy Ginger Dawa.",
    badge: "Rooftop Bar",
    emoji: "cocktail",
    tags: ["Cocktails", "Rooftop Bar", "Happy Hour"],
    image: imgCocktails
  },
  {
    id: 405,
    cat: "Drinks",
    name: "Specialty Tanzanian Coffee",
    price: 5000,
    time: 5,
    kcal: 90,
    desc: "Freshly brewed Kilimanjaro Arabica espresso, creamy cappuccino, or aromatic latte.",
    badge: "Great Coffee",
    emoji: "coffee",
    tags: ["Hot Drink", "Coffee"],
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 406,
    cat: "Drinks",
    name: "Spiced African Tangawizi Tea",
    price: 4000,
    time: 5,
    kcal: 70,
    desc: "Traditional hot Tanzanian tea brewed with spicy ginger, cardamom, cloves, and steamed milk.",
    badge: "Cozy Warmth",
    emoji: "tea",
    tags: ["Tea", "Ginger", "Traditional"],
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Amina K.",
    role: "Local Food Explorer & Google Reviewer",
    text: "Sanara Grill is easily the best grill spot in Mbezi! The Prawns Makange and BBQ Sinia XXL are unbelievable. The rooftop atmosphere with live music makes weekends so memorable.",
    summary: "Best Prawns Makange & Rooftop Vibe in Mbezi!",
    rating: 5
  },
  {
    name: "David M.",
    role: "Dar es Salaam Resident",
    text: "Sanara grills Mbezi perfectly! Nicely done, well served is not just a tagline, it's real. Outstanding service, fast delivery, and comfortable family-friendly seating.",
    summary: "Nicely done, well served indeed!",
    rating: 5
  },
  {
    name: "Sarah & Friends",
    role: "Regular Guests",
    text: "Love that Sanara is a women-owned business! You can taste the love in every dish. Great cocktails, superb Biryani, and the staff are incredibly welcoming.",
    summary: "Proudly Women-Owned & Delicious Food!",
    rating: 5
  },
  {
    name: "Emmanuel S.",
    role: "Tourist & Foodie",
    text: "Visited Jangwani Shopping Centre specifically for Sanara Grill after seeing 670+ 4.5 star reviews. The Seafood Platter and Mango Shake exceeded every expectation!",
    summary: "Top-notch Seafood & 4.5 Star Quality",
    rating: 5
  }
];

export const GALLERY_POSTS: GalleryPost[] = [
  {
    id: "g1",
    emoji: "shrimp",
    caption: "Sizzling Prawns Makange cooked to perfection with ocean-fresh ingredients & coconut chili glaze.",
    likes: 342,
    category: "seafood_grill",
    mediaType: "image",
    mediaUrl: imgPrawnsMakange
  },
  {
    id: "g2",
    emoji: "flame",
    caption: "The legendary BBQ Sinia XXL — flame-grilled chicken, mishikaki, ribs & loaded chips for sharing!",
    likes: 512,
    category: "seafood_grill",
    mediaType: "image",
    mediaUrl: imgBbqSinia
  },
  {
    id: "g3",
    emoji: "rice",
    caption: "Biryani Friday Special — tender spiced meat, cardamom basmati rice & fresh kachumbari relish.",
    likes: 489,
    category: "biryani",
    mediaType: "image",
    mediaUrl: imgBiriani
  },
  {
    id: "g4",
    emoji: "sunset",
    caption: "Sunset views on our cozy rooftop seating area with live music & refreshing ocean breeze.",
    likes: 429,
    category: "ambiance",
    mediaType: "image",
    mediaUrl: imgRooftop
  },
  {
    id: "g5",
    emoji: "cocktail",
    caption: "Craft cocktails mixed fresh at Sanara's rooftop bar — perfect pairing for late night grill bites.",
    likes: 289,
    category: "cocktails",
    mediaType: "image",
    mediaUrl: imgCocktails
  },
  {
    id: "g6",
    emoji: "fish",
    caption: "Grilled Whole Red Snapper served hot with masala chips and fresh lemon wedges.",
    likes: 388,
    category: "seafood_grill",
    mediaType: "image",
    mediaUrl: imgGrilledFishChips
  },
  {
    id: "g7",
    emoji: "skewer",
    caption: "Charred Beef & Chicken Mishikaki skewers straight off the charcoal grill with spicy pili pili dip.",
    likes: 415,
    category: "seafood_grill",
    mediaType: "image",
    mediaUrl: imgMishikakiPlatter
  },
  {
    id: "g8",
    emoji: "chef",
    caption: "Our master grill team crafting authentic Tanzanian flame flavors with passion and care.",
    likes: 475,
    category: "ambiance",
    mediaType: "image",
    mediaUrl: imgGrillMaster
  },
  {
    id: "g9",
    emoji: "smoothie",
    caption: "Ice-cold Frozen Orange Pineapple Slashie & tropical avocado fruit smoothies.",
    likes: 310,
    category: "cocktails",
    mediaType: "image",
    mediaUrl: imgOrangeSlash
  }
];

export const VIDEO_REELS: VideoReel[] = [
  {
    id: "v1",
    title: "Seafood Grilling & Lobster Prep",
    caption: "Fresh lionfish & lobster prep live over open charcoal flame grill!",
    thumbnail: imgSeafoodPlatter,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-seafood-in-a-pan-41221-large.mp4",
    duration: "0:28",
    likes: 1240,
    views: "14.2K",
    tag: "Seafood Prep"
  },
  {
    id: "v2",
    title: "Biryani Friday Special",
    caption: "Biryani Friday — Slow-cooked coastal spices, fragrant basmati & succulent meat gravy.",
    thumbnail: imgBiriani,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-dish-with-rice-and-chicken-being-prepared-41220-large.mp4",
    duration: "0:35",
    likes: 1890,
    views: "22.8K",
    tag: "Friday Special"
  },
  {
    id: "v3",
    title: "Choma (BBQ) on the Grill",
    caption: "Choma on the grill — Sizzling BBQ chicken, ribs & mishikaki charcoal magic.",
    thumbnail: imgBbqChicken,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-bbq-meat-cooking-on-a-grill-41219-large.mp4",
    duration: "0:42",
    likes: 2410,
    views: "31.5K",
    tag: "Choma Magic"
  },
  {
    id: "v4",
    title: "Paella & Shellfish Buffet Spread",
    caption: "Paella & shellfish buffet spread — Ocean prawns, mussels & saffron rice.",
    thumbnail: imgPrawnsMakange,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-dish-with-shrimp-41218-large.mp4",
    duration: "0:30",
    likes: 1650,
    views: "18.9K",
    tag: "Buffet Spread"
  },
  {
    id: "v5",
    title: "Octopus Skewers Sizzling",
    caption: "Octopus skewers — Tender ocean octopus marinated in garlic butter and flame charred.",
    thumbnail: imgFishTikka,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cooking-meat-skewer-on-fire-41217-large.mp4",
    duration: "0:25",
    likes: 1980,
    views: "26.1K",
    tag: "Sizzling Skewers"
  },
  {
    id: "v6",
    title: "Barbecue Cooking Process",
    caption: "Barbecue cooking process — Behind the scenes with Sanara's master pitmasters.",
    thumbnail: imgChickenGajjar,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-meat-grilling-over-hot-coals-41216-large.mp4",
    duration: "0:45",
    likes: 3120,
    views: "45.0K",
    tag: "Kitchen Secret"
  }
];

export const VIMEO_REELS: VimeoReel[] = [
  {
    id: "vimeo-1215044988",
    title: "Seafood & Lobster Flame Grill",
    caption: "Fresh lionfish & lobster prep live over open charcoal flame grill at Sanara Grill.",
    vimeoSrc: "https://player.vimeo.com/video/1215044988?badge=0&autopause=0&player_id=0&app_id=58479",
    tag: "Seafood Prep",
    likes: 1420
  },
  {
    id: "vimeo-1215045191",
    title: "Biryani Friday Special",
    caption: "Biryani Friday — Coastal spices, fragrant basmati & tender meat gravy.",
    vimeoSrc: "https://player.vimeo.com/video/1215045191?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
    tag: "Friday Special",
    likes: 1890
  },
  {
    id: "vimeo-1215045141",
    title: "Choma BBQ Magic",
    caption: "Choma on the grill — Sizzling BBQ chicken, beef ribs & mishikaki charcoal fire.",
    vimeoSrc: "https://player.vimeo.com/video/1215045141?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
    tag: "Choma Magic",
    likes: 2410
  },
  {
    id: "vimeo-1215045174",
    title: "Paella & Shellfish Buffet",
    caption: "Paella & shellfish buffet spread — Ocean prawns, mussels & saffron rice.",
    vimeoSrc: "https://player.vimeo.com/video/1215045174?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
    tag: "Buffet Spread",
    likes: 1650
  },
  {
    id: "vimeo-1215045105",
    title: "Octopus Skewers Sizzling",
    caption: "Octopus skewers — Tender ocean octopus marinated in chili garlic butter.",
    vimeoSrc: "https://player.vimeo.com/video/1215045105?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
    tag: "Sizzling Skewers",
    likes: 1980
  },
  {
    id: "vimeo-1215045021",
    title: "Pitmaster Kitchen Secrets",
    caption: "Barbecue cooking process — Behind the scenes with Sanara master pitmasters.",
    vimeoSrc: "https://player.vimeo.com/video/1215045021?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
    tag: "Kitchen Secret",
    likes: 3120
  },
  {
    id: "vimeo-1215045110",
    title: "Rooftop Ambiance & Drinks",
    caption: "Rooftop vibes — Craft cocktails, sunset views & ocean breeze in Mbezi.",
    vimeoSrc: "https://player.vimeo.com/video/1215045110?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
    tag: "Rooftop Bar",
    likes: 2150
  },
  {
    id: "vimeo-1215044992",
    title: "Sanara Platter Fiesta",
    caption: "The ultimate seafood & choma platter served fresh for group dining.",
    vimeoSrc: "https://player.vimeo.com/video/1215044992?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
    tag: "Sanara Feast",
    likes: 2840
  }
];

export const AMENITIES_LIST = [
  {
    category: "Accessibility",
    icon: "accessibility",
    items: ["Wheelchair-accessible seating", "Wheelchair-accessible entrance", "Wheelchair-accessible parking", "Wheelchair-accessible toilet", "Assistive hearing loop"]
  },
  {
    category: "Service Options",
    icon: "delivery",
    items: ["Dine-in", "Takeaway", "Fast Local Delivery", "Drive-through window", "Outdoor rooftop seating"]
  },
  {
    category: "Highlights & Vibe",
    icon: "sparkles",
    items: ["Rooftop outdoor seating", "Live music performances", "Cozy fireplace", "Great craft cocktails", "Specialty coffee & tea", "Sports matches on big screens"]
  },
  {
    category: "Offerings & Dietary",
    icon: "salad",
    items: ["Halal certified meats", "Vegan & vegetarian options", "Organic dishes", "Salad bar", "Happy hour food & drinks", "All-you-can-eat specials", "Late-night food (until 12 AM)", "Quick bites & snacks"]
  },
  {
    category: "Dining Options",
    icon: "utensils",
    items: ["Breakfast", "Brunch", "Lunch", "Dinner", "Counter service", "Table service", "Artisanal desserts"]
  },
  {
    category: "Amenities",
    icon: "wifi",
    items: ["High-speed free Wi-Fi", "Full bar on-site", "Clean gender-neutral restrooms"]
  },
  {
    category: "Atmosphere",
    icon: "flame",
    items: ["Casual & welcoming", "Romantic & scenic", "Upscale-casual grill aesthetic", "Trendy & vibrant", "Cozy corners"]
  },
  {
    category: "Good For",
    icon: "users",
    items: ["Families with children", "Kids' menu & high chairs", "Baby changing tables", "Birthday celebrations", "Solo dining", "Groups & office parties", "Tourists & travelers", "University students"]
  },
  {
    category: "Parking & Pets",
    icon: "parking",
    items: ["Ample free parking lot", "Free street parking", "Dogs allowed (indoors & outdoors)"]
  },
  {
    category: "Payments Accepted",
    icon: "card",
    items: ["NFC Mobile Payments (Apple/Google Pay)", "M-Pesa & Tigo Pesa", "Credit / Debit Cards", "Cash accepted"]
  }
];
