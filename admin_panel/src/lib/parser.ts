import type { MenuCategory, MenuItem, RestaurantDetails } from '../types/menu';

export interface ParsedMenuResult {
  restaurantDetails?: Partial<RestaurantDetails>;
  categories: MenuCategory[];
  detectedCount: number;
}

/**
 * Robust Smart Text Parser: Converts any pasted menu text, AI text, or OCR raw text 
 * into structured categories, items, prices, descriptions, and dietary tags.
 */
export function parseRawTextToMenu(text: string): ParsedMenuResult {
  if (!text || !text.trim()) {
    return { categories: [], detectedCount: 0 };
  }

  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const categoriesMap: Map<string, MenuItem[]> = new Map();
  let currentCategory = 'General Menu';
  let totalCount = 0;

  const extractedDetails: Partial<RestaurantDetails> = {};

  // Step 1: Detect Restaurant Metadata (Name, Tagline, Address, Phone, Notice) from top lines
  for (let i = 0; i < Math.min(lines.length, 10); i++) {
    const line = lines[i];

    // Phone
    const phoneMatch = line.match(/(?:📞|Phone:|Tel:|\+?\d{1,4}[-.\s]?)?\(?\d{2,5}\)?[-.\s]?\d{3,5}[-.\s]?\d{3,5}/i);
    if (phoneMatch && line.replace(/[^\d]/g, '').length >= 10 && !extractedDetails.phone) {
      extractedDetails.phone = line.replace(/📞|Phone:|Tel:/gi, '').trim();
      continue;
    }

    // Address
    if ((line.includes('📍') || /Road|Street|St\.|Ave|Sector|Block|Nagar|Marg|City|Bihar|Gaya|Delhi|Mumbai|Bangalore|Jaipur/i.test(line)) && !extractedDetails.address) {
      extractedDetails.address = line.replace(/📍|Address:|Loc:/gi, '').trim();
      continue;
    }

    // Notice / Timings
    if ((line.includes('🕒') || /AM\s*-\s*PM|Timings|Hours|Open|Daily/i.test(line)) && !extractedDetails.notice) {
      extractedDetails.notice = line.replace(/🕒|Timings:|Hours:/gi, '').trim();
      continue;
    }

    // Restaurant Name & Tagline (First 2 clean non-price lines)
    if (!extractedDetails.name && !/\d{2,}/.test(line) && line.length < 50 && !line.includes('http')) {
      extractedDetails.name = line.replace(/^[^\w\s]+/, '').trim();
      continue;
    }

    if (extractedDetails.name && !extractedDetails.tagline && !/\d{2,}/.test(line) && line.length < 80 && !line.includes('http')) {
      extractedDetails.tagline = line.replace(/^[^\w\s]+/, '').trim();
      continue;
    }
  }

  // Helper to parse dietary & tag flags from string
  const getDietaryFlags = (str: string) => {
    const s = str.toLowerCase();
    const isNonVeg = s.includes('non-veg') || s.includes('non veg') || s.includes('nonveg') || s.includes('n.v') || s.includes('[nv]') ||
                     s.includes('chicken') || s.includes('mutton') || s.includes('fish') || s.includes('prawn') || s.includes('keema');
    const isEgg = !isNonVeg && (s.includes('egg') || s.includes('omelette'));
    const isVegan = s.includes('vegan');
    const isVeg = !isNonVeg && !isEgg && (s.includes('veg') || s.includes('(v)') || s.includes('[v]') || isVegan);

    const isSpicy = s.includes('spicy') || s.includes('chilli') || s.includes('hot') || s.includes('tikka');
    const isChefSpecial = s.includes('special') || s.includes('chef') || s.includes('signature') || s.includes('royal');
    const isBestseller = s.includes('bestseller') || s.includes('popular') || s.includes('star') || s.includes('favorite');

    return { isVeg, isNonVeg, isEgg, isVegan, isSpicy, isChefSpecial, isBestseller };
  };

  // Helper to clean item names
  const cleanItemName = (name: string): string => {
    return name
      .replace(/^\d+[\.\)\-]\s*/, '') // Remove leading list numbers e.g. "1. " or "1) "
      .replace(/^[•\*\-\+\s]+/, '')    // Remove leading bullets
      .replace(/[\.\-\:\*\s]+$/, '')    // Remove trailing dots/dashes
      .replace(/\((?:veg|non-veg|non veg|egg|vegan|spicy|bestseller|chef special)\)/gi, '')
      .replace(/\[(?:veg|non-veg|non veg|egg|vegan|spicy|bestseller|chef special)\]/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Step 2: Main Line-by-Line Parser
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // Skip header metadata lines if already captured
    if (line === extractedDetails.name || line === extractedDetails.tagline || line === extractedDetails.address || line === extractedDetails.phone || line === extractedDetails.notice) {
      i++;
      continue;
    }

    // Category Header Detection:
    // A category header is a line without prices, under 45 chars, or wrapped in brackets/headers, or ends with ':'
    const containsPrice = /(?:[\$€£₹]|rs\.?|inr)?\s*\d{1,5}(?:\.\d{1,2})?(?:\s*(?:\/\-|rs\.?|inr))?$/i.test(line) ||
                          /\b\d{2,4}\b/.test(line.split(/\s+/).pop() || '');

    const isExplicitHeader = /^[\#\*\[\-\=]{1,3}\s*.+\s*[\#\*\]\-\=]{1,3}$/.test(line) || line.endsWith(':');
    const isShortHeader = !containsPrice && line.length > 2 && line.length < 45 && !line.includes('http');

    if ((isExplicitHeader || isShortHeader) && !containsPrice) {
      const headerName = line.replace(/^[\#\*\[\-\=:\s]+|[\#\*\]\-\=:\s]+$/g, '').trim();
      if (headerName.length >= 2 && !/total|subtotal|tax|bill/i.test(headerName)) {
        currentCategory = headerName.charAt(0).toUpperCase() + headerName.slice(1);
        if (!categoriesMap.has(currentCategory)) {
          categoriesMap.set(currentCategory, []);
        }
        i++;
        continue;
      }
    }

    // Attempt Item Parsing:
    // Regex matches prices at end of line, e.g. "Paneer Tikka - ₹250", "Paneer Tikka 250", "Paneer Tikka ... 250/-", "Paneer Tikka Rs 250"
    const endPriceRegex = /(?:(?:[\$€£₹]|rs\.?|inr)\s*)?(\d{1,5}(?:\.\d{1,2})?)(?:\s*(?:\/\-|rs\.?|inr))?$/i;
    let priceMatch = line.match(endPriceRegex);
    let itemName = '';
    let itemPrice = '';
    let itemDesc = '';

    if (priceMatch && priceMatch[1]) {
      itemPrice = priceMatch[1];
      const namePart = line.substring(0, priceMatch.index).trim();
      itemName = cleanItemName(namePart);
    } else {
      // Check if price is in format "Paneer Tikka - 250 (Delicious cottage cheese)"
      const inlinePriceMatch = line.match(/^(.*?)(?:[\-:\.\s]+)(?:[\$€£₹]|rs\.?|inr)?\s*(\d{1,5}(?:\.\d{1,2})?)(?:\s*(?:\/\-|rs\.?|inr))?\s*(?:\((.*?)\))?$/i);
      if (inlinePriceMatch) {
        itemName = cleanItemName(inlinePriceMatch[1]);
        itemPrice = inlinePriceMatch[2];
        itemDesc = inlinePriceMatch[3] || '';
      }
    }

    // Lookahead for next line as description if no description captured yet
    if (itemName && itemPrice) {
      if (!itemDesc && i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        const nextIsPrice = endPriceRegex.test(nextLine);
        const nextIsHeader = !nextIsPrice && (nextLine.length < 40 && !/\d/.test(nextLine));
        if (!nextIsPrice && !nextIsHeader && nextLine.length > 5 && nextLine.length < 150) {
          itemDesc = nextLine;
          i++;
        }
      }

      const flags = getDietaryFlags(`${line} ${itemDesc}`);

      const newItem: MenuItem = {
        id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        name: itemName,
        description: itemDesc,
        price: itemPrice,
        category: currentCategory,
        isVeg: flags.isVeg,
        isNonVeg: flags.isNonVeg,
        isSpicy: flags.isSpicy,
        spicyLevel: flags.isSpicy ? 2 : undefined,
        isChefSpecial: flags.isChefSpecial,
        isBestseller: flags.isBestseller,
        tags: flags.isEgg ? ['egg'] : flags.isVegan ? ['vegan'] : undefined,
      };

      if (!categoriesMap.has(currentCategory)) {
        categoriesMap.set(currentCategory, []);
      }
      categoriesMap.get(currentCategory)!.push(newItem);
      totalCount++;
    } else if (line.length > 2 && !containsPrice) {
      // Line doesn't have a price directly, check if the NEXT line has a price
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        const nextPriceMatch = nextLine.match(/^(?:(?:[\$€£₹]|rs\.?|inr)\s*)?(\d{1,5}(?:\.\d{1,2})?)(?:\s*(?:\/\-|rs\.?|inr))?$/i);
        if (nextPriceMatch) {
          itemName = cleanItemName(line);
          itemPrice = nextPriceMatch[1];
          i++; // Consume next price line

          const flags = getDietaryFlags(`${itemName}`);
          const newItem: MenuItem = {
            id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            name: itemName,
            description: '',
            price: itemPrice,
            category: currentCategory,
            isVeg: flags.isVeg,
            isNonVeg: flags.isNonVeg,
            isSpicy: flags.isSpicy,
            spicyLevel: flags.isSpicy ? 2 : undefined,
            isChefSpecial: flags.isChefSpecial,
            isBestseller: flags.isBestseller,
            tags: flags.isEgg ? ['egg'] : flags.isVegan ? ['vegan'] : undefined,
          };

          if (!categoriesMap.has(currentCategory)) {
            categoriesMap.set(currentCategory, []);
          }
          categoriesMap.get(currentCategory)!.push(newItem);
          totalCount++;
        }
      }
    }

    i++;
  }

  // Convert categories map to Array
  const categories: MenuCategory[] = [];
  categoriesMap.forEach((items, catName) => {
    if (items.length > 0) {
      categories.push({
        id: `cat-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        name: catName,
        items,
      });
    }
  });

  return {
    restaurantDetails: extractedDetails,
    categories,
    detectedCount: totalCount,
  };
}
