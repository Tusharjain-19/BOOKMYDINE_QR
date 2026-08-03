const SITE_URL = "https://bookmydineqr.vercel.app";

// All homepage FAQs — used by both the FAQ section component and schema
export const homepageFaqs = [
  {
    q: "What is BookMyDine QR?",
    a: "BookMyDine QR is a done-for-you digital menu platform that replaces paper menus with beautiful, mobile-optimized QR code menus. We design, host, and manage your restaurant's digital menu so you never need to learn software or maintain a dashboard."
  },
  {
    q: "Is it completely safe? How do I pay?",
    a: "100% Safe! You pay only after our team designs your digital menu and sends you a live preview link to test on your own phone. We do not ask for any upfront credit card details."
  },
  {
    q: "Do I need to learn software or manage a dashboard?",
    a: "No! BookMyDine QR is a done-for-you service. You simply send us your menu items or PDF over WhatsApp, and our operations team handles all designing, updates, and hosting for you."
  },
  {
    q: "How fast are menu updates made?",
    a: "Whenever you change prices or add dishes, message us on WhatsApp. Most updates are live in under 2 to 4 hours during operational hours (9 AM to 10 PM IST)."
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes! There are no lock-in contracts or cancellation penalties. You can pause or cancel your subscription whenever you want by messaging our support team."
  },
  {
    q: "Will my QR code expire?",
    a: "No. Your custom QR code remains active for as long as your subscription is active, and points directly to your hosted digital menu. The QR code itself never changes, even if you update menu content."
  },
  {
    q: "Is there a free plan or free trial?",
    a: "We offer a completely free custom setup — our team designs your full digital menu at no cost before you pay anything. You review the live preview, and only subscribe if you're satisfied. Plans start at just ₹99 per month."
  },
  {
    q: "How much does BookMyDine QR cost?",
    a: "BookMyDine QR offers three plans: Starter at ₹99/month (basic digital menu + QR code), Growth at ₹199/month (photos, tags, 5 updates/month), and Premium at ₹499/month (unlimited updates, custom theme, dedicated manager). Annual billing saves 2 months free."
  },
  {
    q: "What types of restaurants can use BookMyDine QR?",
    a: "BookMyDine QR works for all food service businesses including restaurants, cafes, coffee shops, hotels, resorts, bars, pubs, night clubs, cloud kitchens, bakeries, sweet shops, food courts, juice bars, ice cream parlours, fine dining, fast food outlets, and food trucks."
  },
  {
    q: "Do my customers need to download an app to view the menu?",
    a: "No app download is required. Customers simply scan the QR code with their phone camera, and the digital menu opens instantly in their mobile browser. It works on all smartphones — iPhone, Android, and tablets."
  },
  {
    q: "How do I get started with BookMyDine QR?",
    a: "Getting started is simple: 1) Fill out our 3-step intake form or message us on WhatsApp, 2) Send your menu items (PDF, photo, or text), 3) Our team designs your menu and sends a preview within 24-48 hours. You approve and go live!"
  },
  {
    q: "Can I choose a design theme for my restaurant's menu?",
    a: "Yes! We offer 6 professionally curated themes: Minimalist Cafe, Executive Fine Dining, Heritage Indian, Modern Bistro, Street Food Express, and Premium Dark Lounge. Each theme is optimized for mobile readability and speed."
  },
  {
    q: "Does BookMyDine QR work for cafes and coffee shops?",
    a: "Absolutely. Our Minimalist Cafe theme is specifically designed for coffee shops, bakeries, and artisanal cafes with warm neutral tones and clean typography that matches the cafe aesthetic."
  },
  {
    q: "Can I use BookMyDine QR for my cloud kitchen?",
    a: "Yes. Cloud kitchens benefit greatly from digital menus since there's no physical dine-in space. Your QR menu can be shared via links on delivery platforms, social media, and WhatsApp for direct orders."
  },
  {
    q: "Is BookMyDine QR available across India?",
    a: "Yes, BookMyDine QR serves restaurants across all of India. We have restaurant clients in major cities including Mumbai, Delhi, Bangalore, Hyderabad, Pune, Chennai, Kolkata, Jaipur, Ahmedabad, and Lucknow, as well as tier 2 and tier 3 cities."
  },
  {
    q: "Does the digital menu support veg and non-veg indicators?",
    a: "Yes. Every dish on your digital menu includes clear veg (green) and non-veg (red) indicator badges following Indian food labeling standards. We also support bestseller tags, chef's special badges, and allergen information."
  },
  {
    q: "What if I don't have food photos?",
    a: "That's completely fine. Our Starter plan works great with text-based menus. If you upgrade to Growth or Premium, you can send us dish photos anytime and we'll add them to your menu."
  },
  {
    q: "How is BookMyDine QR different from other QR menu tools?",
    a: "Most QR menu tools require you to learn complex dashboards and build menus yourself. BookMyDine QR is a fully managed service — you send us your menu via WhatsApp, and we handle everything: design, formatting, hosting, updates, and QR code generation. Zero technical skills required."
  },
  {
    q: "Do I get printable QR code graphics for my tables?",
    a: "Yes! With every plan, you receive high-resolution, print-ready QR table tent and standee designs customized with your restaurant logo, brand colors, and table numbers. These are ready to send to any local printer."
  },
  {
    q: "How fast does the digital menu load?",
    a: "Our digital menus are hosted on a high-speed CDN and load in under 1 second on any mobile connection, including 3G networks. No app download or registration is needed — guests see the menu instantly after scanning."
  },
  {
    q: "Can I have multiple QR codes for different areas or tables?",
    a: "Yes. With Growth and Premium plans, we can create multiple QR codes for different table numbers, sections, or even separate menus (e.g., a drinks menu and a food menu for the same restaurant)."
  },
  {
    q: "What happens to my menu if I cancel?",
    a: "Upon cancellation, your digital QR menu link remains active until the last paid date of your billing cycle. After that, the menu goes offline. Your QR code can be reactivated if you resubscribe."
  },
  {
    q: "Can I update my menu myself, or do I have to contact you?",
    a: "BookMyDine QR is designed as a zero-hassle managed service. Simply WhatsApp us your changes (new dish, price update, item removal) and we update your live menu within 2-4 hours. No dashboard login required."
  },
  {
    q: "Is BookMyDine QR suitable for fine dining restaurants?",
    a: "Yes. Our Executive Fine Dining theme features deep obsidian backgrounds with refined metallic gold accents, specifically crafted for upscale establishments. It conveys luxury and elegance while maintaining fast load times."
  },
  {
    q: "Does BookMyDine QR support Hindi or regional languages?",
    a: "Yes, we can create menus in Hindi, Tamil, Telugu, Marathi, Bengali, and other Indian languages. Simply provide your menu items in your preferred language and our team will format them accordingly."
  },
];

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BookMyDine QR",
    alternateName: "BookMyDineQR",
    url: SITE_URL,
    logo: `${SITE_URL}/hero_artistic_showcase.png`,
    description:
      "India's leading done-for-you digital menu platform. We design, host & manage QR code menus for restaurants, cafes, hotels, and cloud kitchens.",
    foundingDate: "2026",
    founders: [
      {
        "@type": "Person",
        name: "BookMySlot Tech Services",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-8005737183",
        contactType: "customer service",
        email: "teambookmydine@gmail.com",
        availableLanguage: ["English", "Hindi"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "09:00",
          closes: "22:00",
        },
      },
    ],
    sameAs: [
      "https://wa.me/918005737183",
    ],
    parentOrganization: {
      "@type": "Organization",
      name: "BookMySlot Tech Services",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SoftwareApplicationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BookMyDine QR",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description:
      "Done-for-you digital menu platform for restaurants, cafes, and hotels. Includes QR code generation, mobile-optimized menu hosting, and managed updates via WhatsApp.",
    offers: [
      {
        "@type": "Offer",
        name: "Starter Plan",
        price: "99",
        priceCurrency: "INR",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        description:
          "Digital menu hosting, printable QR code, 1 menu update per month.",
      },
      {
        "@type": "Offer",
        name: "Growth Plan",
        price: "199",
        priceCurrency: "INR",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        description:
          "Everything in Starter plus dish photos, veg/non-veg tags, up to 5 updates per month, priority WhatsApp support.",
      },
      {
        "@type": "Offer",
        name: "Premium Plan",
        price: "499",
        priceCurrency: "INR",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        description:
          "Everything in Growth plus unlimited updates, 100% custom theme design, dedicated account manager.",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      ratingCount: "127",
    },
    featureList: [
      "6 professionally curated menu themes",
      "QR code table stand graphics",
      "Mobile-optimized instant-loading menus",
      "Veg and non-veg indicator badges",
      "Chef special and bestseller tags",
      "WhatsApp-based menu updates",
      "Done-for-you managed service",
      "99.9% uptime guarantee",
      "No app download required",
      "Multi-language support",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BookMyDine QR",
    url: SITE_URL,
    description:
      "India's leading QR menu platform for restaurants, cafes, hotels and cloud kitchens.",
    publisher: {
      "@type": "Organization",
      name: "BookMyDine QR",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/menu/{slug}`,
      },
      "query-input": "required name=slug",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Done-For-You Digital Menu Service",
    provider: {
      "@type": "Organization",
      name: "BookMyDine QR",
      url: SITE_URL,
    },
    description:
      "A fully managed digital menu creation service. Restaurant owners send their menu via WhatsApp, and our team designs, hosts, and maintains a mobile-optimized QR code menu. Includes custom QR stand graphics, theme selection, and ongoing menu updates.",
    serviceType: "Digital Menu Design & Hosting",
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "BookMyDine QR Plans",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Starter Plan",
            description: "Digital menu hosting with printable QR code and 1 monthly update.",
          },
          price: "99",
          priceCurrency: "INR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "99",
            priceCurrency: "INR",
            billingDuration: "P1M",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Growth Plan",
            description: "Branded QR menu with dish photos, veg/non-veg tags, and 5 monthly updates.",
          },
          price: "199",
          priceCurrency: "INR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "199",
            priceCurrency: "INR",
            billingDuration: "P1M",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Premium Plan",
            description: "Unlimited updates with custom theme design and dedicated account manager.",
          },
          price: "499",
          priceCurrency: "INR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "499",
            priceCurrency: "INR",
            billingDuration: "P1M",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homepageFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function JsonLd() {
  return (
    <>
      <OrganizationSchema />
      <SoftwareApplicationSchema />
      <WebSiteSchema />
      <ServiceSchema />
      <FAQPageSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE_URL },
        ]}
      />
    </>
  );
}
