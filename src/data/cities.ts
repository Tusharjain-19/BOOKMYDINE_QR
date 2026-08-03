export interface CityData {
  slug: string;
  name: string;
  state: string;
  description: string;
  diningCulture: string;
  popularTypes: string[];
  faqs: { q: string; a: string }[];
}

export const cities: CityData[] = [
  {
    slug: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    description:
      "Mumbai, India's financial capital, is home to over 80,000 restaurants, cafes, and street food stalls serving everything from iconic vada pav to Michelin-worthy fine dining. With one of the highest diner footfall rates in Asia, Mumbai's restaurant industry is rapidly adopting digital solutions to serve tech-savvy customers who expect instant access to menus on their smartphones.",
    diningCulture:
      "From Colaba's upscale eateries to Juhu's beachside chaat stalls, Mumbai's dining scene thrives on speed and convenience. The city's fast-paced culture makes QR code menus a natural fit — diners want to scan, browse, and order without waiting for a server to bring a physical menu.",
    popularTypes: [
      "Street Food Stalls",
      "Fine Dining",
      "Irani Cafes",
      "Seafood Restaurants",
      "Cloud Kitchens",
      "Rooftop Bars",
      "South Indian Restaurants",
    ],
    faqs: [
      {
        q: "How can restaurants in Mumbai benefit from QR menus?",
        a: "Mumbai restaurants deal with high customer volumes and fast table turnover. A QR menu eliminates wait times for physical menus, reduces printing costs (especially important with frequently changing prices), and creates a modern impression that matches Mumbai's cosmopolitan dining culture.",
      },
      {
        q: "Does BookMyDine QR work for Mumbai street food stalls?",
        a: "Yes! Our Street Food Express theme is specifically designed for fast food outlets, chaat stalls, and food trucks. Even small stalls can benefit from a digital menu that customers access via a simple QR code scan — no app needed.",
      },
      {
        q: "Can I get QR menu setup in Mumbai quickly?",
        a: "Absolutely. Our team delivers a live preview within 24-48 hours. Since BookMyDine QR is a fully managed service, you just WhatsApp us your menu items and we handle the rest — no matter where you are in Mumbai.",
      },
    ],
  },
  {
    slug: "delhi",
    name: "Delhi",
    state: "Delhi NCR",
    description:
      "Delhi NCR, encompassing New Delhi, Gurgaon, Noida, and Faridabad, is one of India's largest restaurant markets with over 100,000 food establishments. From the legendary street food of Chandni Chowk to the fine dining corridors of Khan Market and Cyber Hub, Delhi's restaurant owners are increasingly turning to digital menus to reduce costs and enhance the guest experience.",
    diningCulture:
      "Delhi's dining culture is a unique blend of Mughlai heritage, modern gastropubs, and international cuisine. Restaurant owners in Delhi face intense competition and need every advantage — a professional QR menu instantly elevates perceived quality while saving thousands on reprinting costs every season.",
    popularTypes: [
      "Mughlai Restaurants",
      "North Indian Restaurants",
      "Gastropubs",
      "Cafes & Bakeries",
      "Fine Dining",
      "Cloud Kitchens",
      "Kebab Joints",
    ],
    faqs: [
      {
        q: "Why should Delhi restaurants use BookMyDine QR?",
        a: "Delhi's dining market is extremely competitive. A professional digital QR menu helps restaurants stand out, reduces printing costs by 100%, and lets owners update prices instantly when ingredient costs change — a common need in Delhi's dynamic food market.",
      },
      {
        q: "Is BookMyDine QR suitable for Mughlai and kebab restaurants in Delhi?",
        a: "Absolutely. Our Heritage Indian theme with terracotta and warm amber aesthetics is perfect for traditional North Indian and Mughlai restaurants. It captures the authentic dining ambiance while providing a modern, fast-loading digital menu experience.",
      },
      {
        q: "Can Delhi NCR restaurants in Gurgaon and Noida also use this service?",
        a: "Yes, BookMyDine QR serves all of Delhi NCR including Gurgaon, Noida, Faridabad, and Ghaziabad. Our service is entirely remote — you WhatsApp your menu and we deliver your digital menu anywhere.",
      },
    ],
  },
  {
    slug: "bangalore",
    name: "Bangalore",
    state: "Karnataka",
    description:
      "Bangalore, India's tech capital, has a thriving cafe and restaurant scene with over 50,000 food establishments. The city's tech-savvy population actively expects digital-first experiences, making QR code menus a natural extension of Bangalore's innovation-driven dining culture. From Indiranagar's trendy cafes to Koramangala's brewery scene, digital menus are becoming the standard.",
    diningCulture:
      "Bangalore's dining scene is defined by its thriving cafe culture, craft beer revolution, and diverse cuisine options ranging from traditional South Indian to global fusion. With a young, affluent, and tech-forward customer base, restaurants that adopt QR menus see higher customer satisfaction and faster table turnover.",
    popularTypes: [
      "Cafes & Coffee Shops",
      "Microbreweries",
      "South Indian Restaurants",
      "Pizza & Italian",
      "Cloud Kitchens",
      "Fine Dining",
      "Food Trucks",
    ],
    faqs: [
      {
        q: "Why is BookMyDine QR popular among Bangalore restaurants?",
        a: "Bangalore's tech-savvy diners expect seamless digital experiences. QR menus fit naturally into the city's innovation culture. Restaurants, especially the 5,000+ cafes in areas like Indiranagar and HSR Layout, use BookMyDine QR to match their customers' expectations for modern, contactless dining.",
      },
      {
        q: "Can Bangalore microbreweries use BookMyDine QR?",
        a: "Yes! Our Premium Dark Lounge theme with ambient motion effects is specifically designed for bars, breweries, and night lounges. It features a futuristic dark mode that perfectly complements Bangalore's vibrant nightlife and craft beer scene.",
      },
      {
        q: "Does BookMyDine QR support Bangalore cloud kitchens?",
        a: "Absolutely. Bangalore has one of India's highest concentrations of cloud kitchens. Our digital menus can be shared via direct links on WhatsApp, social media, and aggregator platforms, helping cloud kitchens establish a direct ordering presence.",
      },
    ],
  },
  {
    slug: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    description:
      "Jaipur, the Pink City and capital of Rajasthan, has a vibrant restaurant scene blending traditional Rajasthani cuisine with modern dining concepts. With over 15,000 food establishments and a rapidly growing tourism industry attracting millions of visitors annually, Jaipur's restaurants are uniquely positioned to benefit from QR menus that serve both local diners and international tourists.",
    diningCulture:
      "Jaipur's dining culture revolves around rich Rajasthani thalis, dal baati churma, and rooftop restaurants overlooking historic forts. Tourist-heavy areas like Hawa Mahal, Amer, and MI Road see diverse clientele who appreciate multi-language digital menus. QR menus also help heritage restaurants maintain a traditional ambiance while offering modern convenience.",
    popularTypes: [
      "Rajasthani Thali Restaurants",
      "Rooftop Dining",
      "Sweet Shops",
      "Cafes",
      "Heritage Hotels",
      "Street Food",
      "Fine Dining",
    ],
    faqs: [
      {
        q: "How does BookMyDine QR help Jaipur's tourist restaurants?",
        a: "Jaipur attracts millions of domestic and international tourists. A QR menu with clear dish photos, descriptions, and veg/non-veg indicators helps tourists navigate menus without language barriers. Our menus load instantly, even on hotel Wi-Fi connections.",
      },
      {
        q: "Is BookMyDine QR suitable for Rajasthani thali restaurants?",
        a: "Perfectly suited! Our Heritage Indian theme with terracotta and warm amber aesthetics was designed specifically for traditional Indian restaurants. It captures the authentic Rajasthani dining experience while presenting your thali offerings beautifully on mobile screens.",
      },
      {
        q: "Can Jaipur sweet shops use QR menus?",
        a: "Yes, sweet shops and mithai outlets benefit enormously from QR menus. Customers can browse your full sweets catalog with images and prices before ordering at the counter, speeding up service during peak festivals like Diwali and Holi.",
      },
    ],
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    description:
      "Hyderabad, famous for its iconic biryani and rich culinary heritage, has over 40,000 food establishments ranging from historic Irani cafes in the Old City to tech-park restaurants in HITEC City. The city's blend of traditional Deccani cuisine and modern IT-driven dining culture creates strong demand for digital menu solutions.",
    diningCulture:
      "Hyderabad's food identity is dominated by biryani, haleem, and Deccani cuisine, but the city also has a rapidly growing cafe and modern dining scene around Jubilee Hills, Banjara Hills, and Gachibowli. IT professionals working in HITEC City prefer quick, digital-first dining experiences.",
    popularTypes: [
      "Biryani Restaurants",
      "Irani Cafes",
      "Fine Dining",
      "Cloud Kitchens",
      "Cafes & Bakeries",
      "Street Food",
      "Family Restaurants",
    ],
    faqs: [
      {
        q: "Can BookMyDine QR showcase a biryani restaurant's menu effectively?",
        a: "Absolutely. Our digital menus highlight dish photos beautifully, which is perfect for showcasing biryani varieties, kebab platters, and Hyderabadi specialties. Customers see vivid images before ordering, increasing average order values.",
      },
      {
        q: "Do Hyderabad IT park restaurants use QR menus?",
        a: "Yes, restaurants in HITEC City and Gachibowli are among the fastest adopters of QR menus. Tech-savvy diners in IT parks expect contactless, instant menu access — BookMyDine QR delivers exactly that with sub-second load times.",
      },
      {
        q: "Is BookMyDine QR affordable for small Hyderabad eateries?",
        a: "Our Starter plan at ₹99/month is designed for small restaurants, street food joints, and family eateries. That's less than the cost of printing 50 paper menus, and the digital menu never goes out of date.",
      },
    ],
  },
  {
    slug: "pune",
    name: "Pune",
    state: "Maharashtra",
    description:
      "Pune, Maharashtra's cultural capital, has a dynamic food scene driven by its large student population, growing IT sector, and rich Maharashtrian culinary traditions. With over 30,000 restaurants and cafes, Pune is one of India's fastest-growing dining markets where QR menus help establishments stay competitive and modern.",
    diningCulture:
      "Pune's dining culture uniquely blends traditional Maharashtrian cuisine (misal pav, puran poli) with a booming cafe scene in areas like Koregaon Park and FC Road. The city's student-heavy demographics mean diners are tech-first and price-conscious — QR menus address both needs.",
    popularTypes: [
      "Maharashtrian Restaurants",
      "Cafes & Coffee Shops",
      "Bakeries",
      "Cloud Kitchens",
      "Microbreweries",
      "Fast Food",
      "Family Restaurants",
    ],
    faqs: [
      {
        q: "Why are Pune cafes adopting QR menus?",
        a: "Pune's cafe culture is booming, especially in areas like Koregaon Park, FC Road, and Viman Nagar. Young, tech-savvy customers expect digital experiences. BookMyDine QR's Minimalist Cafe theme is the top choice for Pune's artisanal coffee shops and bakeries.",
      },
      {
        q: "Can Pune's street food vendors use BookMyDine QR?",
        a: "Yes! Even small food stalls and misal pav joints benefit from QR menus. Customers can view the full menu and pricing on their phones, reducing order confusion during busy hours. Our Starter plan at ₹99/month is perfect for budget-conscious vendors.",
      },
      {
        q: "Does BookMyDine QR serve the entire Pune metropolitan area?",
        a: "Absolutely. We serve restaurants across Pune including Kothrud, Hinjewadi, Baner, Wakad, Hadapsar, and Pimpri-Chinchwad. Our service is fully remote — you just WhatsApp your menu details.",
      },
    ],
  },
  {
    slug: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    description:
      "Chennai, the gateway to South India, has a thriving food scene with over 35,000 restaurants specializing in authentic South Indian cuisine, Chettinad flavors, and an emerging modern dining segment. The city's restaurant industry is embracing digital transformation, with QR menus becoming increasingly common across all dining categories.",
    diningCulture:
      "Chennai's food culture is deeply rooted in tradition — idli, dosa, filter coffee, and Chettinad cuisine define the city's culinary identity. However, neighborhoods like T. Nagar, Anna Nagar, and OMR Road also host modern cafes and international restaurants where digital menus are expected.",
    popularTypes: [
      "South Indian Restaurants",
      "Chettinad Restaurants",
      "Filter Coffee Cafes",
      "Bakeries & Sweet Shops",
      "Cloud Kitchens",
      "Seafood Restaurants",
      "Family Restaurants",
    ],
    faqs: [
      {
        q: "Can BookMyDine QR display Tamil menu items?",
        a: "Yes! We support Tamil language menus. Send us your menu in Tamil and we'll format it beautifully on your digital menu. This is especially popular with traditional South Indian restaurants that serve local clientele.",
      },
      {
        q: "Is BookMyDine QR used by Chennai's famous South Indian restaurants?",
        a: "Many South Indian restaurants in Chennai use our Heritage Indian theme to present their traditional dosa, idli, and thali menus digitally. The warm aesthetic perfectly complements the authentic dining experience while offering modern convenience.",
      },
      {
        q: "How does BookMyDine QR help Chennai cloud kitchens?",
        a: "Chennai has a rapidly growing cloud kitchen segment along OMR and IT corridors. Our QR menus serve as direct ordering catalogs — customers browse the full menu with photos and prices before calling or messaging to order.",
      },
    ],
  },
  {
    slug: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    description:
      "Kolkata, the City of Joy, is famous for its rich culinary heritage spanning Bengali cuisine, Chinese-Indian fusion, and legendary sweet shops. With over 25,000 food establishments, Kolkata's restaurant owners are recognizing the value of digital menus to modernize their service while preserving the city's beloved food traditions.",
    diningCulture:
      "Kolkata's food culture is a celebration of flavor — from Park Street's iconic restaurants to College Street's adda-style cafes, food is central to the city's identity. The city's sweet shops (mishti dokan) and rolls joints are as famous as its fine dining, and all benefit from QR menu adoption.",
    popularTypes: [
      "Bengali Restaurants",
      "Sweet Shops",
      "Rolls & Street Food",
      "Chinese-Indian Restaurants",
      "Cafes",
      "Fine Dining",
      "Family Restaurants",
    ],
    faqs: [
      {
        q: "Can Kolkata sweet shops use BookMyDine QR?",
        a: "Absolutely! Kolkata's legendary sweet shops can showcase their full mishti catalog with high-resolution images, prices, and weight options on a beautiful digital menu. Customers browse on their phone before ordering at the counter — perfect for busy shops during festivals.",
      },
      {
        q: "Does BookMyDine QR support Bengali language menus?",
        a: "Yes, we support Bengali language menus. Provide your menu items in Bengali and our team will format them with proper typography on your digital menu, maintaining the authentic Bengali dining experience.",
      },
      {
        q: "Is QR menu technology popular in Kolkata?",
        a: "QR menu adoption is growing rapidly in Kolkata, especially among restaurants in Salt Lake, New Town, and Park Street. As diners become more tech-aware, digital menus are replacing traditional printed cards across all restaurant categories.",
      },
    ],
  },
  {
    slug: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    description:
      "Ahmedabad, Gujarat's commercial capital and India's first UNESCO World Heritage City, has a distinctive vegetarian-dominant food culture with over 20,000 restaurants, street food stalls, and cafes. The city's restaurant industry is modernizing rapidly, with QR menus becoming essential for establishments looking to serve Ahmedabad's increasingly digital-first customer base.",
    diningCulture:
      "Ahmedabad is famous for its Gujarati thalis, Kathiawadi cuisine, and an unmatched street food culture (khakhra, fafda, dhokla). The city has a strong vegetarian food tradition, and restaurants here need menus that clearly highlight vegetarian options — exactly what BookMyDine QR's veg badges provide.",
    popularTypes: [
      "Gujarati Thali Restaurants",
      "Street Food Stalls",
      "Cafes & Bakeries",
      "Sweet & Snack Shops",
      "Family Restaurants",
      "Fast Food",
      "Ice Cream Parlours",
    ],
    faqs: [
      {
        q: "Is BookMyDine QR suitable for vegetarian restaurants in Ahmedabad?",
        a: "Perfectly suited! Our menus include prominent veg indicator badges (green dot) on every item, which is essential for Ahmedabad's predominantly vegetarian dining culture. Customers instantly identify veg-only items without asking staff.",
      },
      {
        q: "Can Ahmedabad's thali restaurants display their full thali menu digitally?",
        a: "Yes! Our Heritage Indian theme beautifully presents multi-item thali menus with dish photos, descriptions, and pricing. Customers can see exactly what's included in the thali before ordering.",
      },
      {
        q: "How affordable is BookMyDine QR for small Ahmedabad food stalls?",
        a: "Our Starter plan at ₹99/month is designed for small businesses. That's less than what most fafda-jalebi stalls spend on a single batch of printed menu cards. And the digital menu never needs reprinting.",
      },
    ],
  },
  {
    slug: "lucknow",
    name: "Lucknow",
    state: "Uttar Pradesh",
    description:
      "Lucknow, the City of Nawabs, is renowned for its legendary Awadhi cuisine, kebab culture, and refined culinary traditions. With over 15,000 food establishments ranging from heritage restaurants in Hazratganj to modern cafes near Gomti Nagar, Lucknow's dining scene beautifully blends centuries-old recipes with contemporary dining trends.",
    diningCulture:
      "Lucknow's food heritage is unmatched — galawati kebabs, tunday kababi, biryani, and chaat define the city's culinary identity. Restaurants here take pride in tradition, and a QR menu helps showcase this heritage digitally without losing the authentic charm. Our Heritage Indian theme is especially popular among Lucknow's traditional restaurants.",
    popularTypes: [
      "Awadhi Cuisine",
      "Kebab Restaurants",
      "Biryani Outlets",
      "Sweet Shops",
      "Street Food",
      "Cafes",
      "Family Restaurants",
    ],
    faqs: [
      {
        q: "Can BookMyDine QR capture the heritage feel of Lucknow restaurants?",
        a: "Absolutely. Our Heritage Indian theme uses terracotta and warm amber aesthetics that beautifully complement Lucknow's Awadhi dining culture. It presents your kebab and biryani menus with the elegance they deserve while providing modern mobile convenience.",
      },
      {
        q: "Is BookMyDine QR useful for Lucknow's famous kebab joints?",
        a: "Yes! Kebab joints with extensive menus benefit greatly from QR menus. Customers can browse all varieties with photos and prices on their phones, reducing wait times during busy hours and helping first-time visitors discover your specialties.",
      },
      {
        q: "Does BookMyDine QR serve restaurants in Gomti Nagar and Hazratganj?",
        a: "We serve restaurants across all of Lucknow including Gomti Nagar, Hazratganj, Aminabad, Chowk, and Aliganj. Our service is fully remote — just WhatsApp your menu and we handle the rest within 24-48 hours.",
      },
    ],
  },
];
