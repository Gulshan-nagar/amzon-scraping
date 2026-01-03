import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { keyword } = await req.json();

    if (!keyword) {
      return new Response(
        JSON.stringify({ success: false, error: 'Keyword is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Scraping Amazon for keyword:', keyword);

    const url = `https://www.amazon.in/s?k=${encodeURIComponent(keyword)}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch Amazon page:', response.status);
      return new Response(
        JSON.stringify({ success: false, error: `Failed to fetch Amazon: ${response.status}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const html = await response.text();
    console.log('Received HTML, length:', html.length);

    // Parse products from HTML using regex patterns
    const products: Array<{
      title: string;
      price: string;
      rating: string;
      image: string;
      link: string;
    }> = [];

    // Match product containers
    const productMatches = html.matchAll(/data-asin="([A-Z0-9]{10})"[^>]*class="[^"]*s-result-item[^"]*"[^>]*>([\s\S]*?)(?=data-asin="[A-Z0-9]{10}"|<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*$)/gi);

    for (const match of productMatches) {
      const asin = match[1];
      const productHtml = match[2];

      // Extract title
      const titleMatch = productHtml.match(/<span[^>]*class="[^"]*a-text-normal[^"]*"[^>]*>([^<]+)<\/span>/i) ||
                         productHtml.match(/<h2[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>/i);
      const title = titleMatch ? titleMatch[1].trim() : null;

      // Extract price
      const priceMatch = productHtml.match(/<span[^>]*class="[^"]*a-price-whole[^"]*"[^>]*>([^<]+)<\/span>/i);
      const price = priceMatch ? priceMatch[1].replace(/,/g, '').trim() : null;

      // Extract rating
      const ratingMatch = productHtml.match(/<span[^>]*class="[^"]*a-icon-alt[^"]*"[^>]*>([^<]+)<\/span>/i) ||
                          productHtml.match(/(\d+\.?\d*)\s*out\s*of\s*5/i);
      const rating = ratingMatch ? ratingMatch[1].trim() : 'No rating';

      // Extract image
      const imageMatch = productHtml.match(/<img[^>]*class="[^"]*s-image[^"]*"[^>]*src="([^"]+)"/i) ||
                         productHtml.match(/<img[^>]*src="(https:\/\/m\.media-amazon\.com[^"]+)"/i);
      const image = imageMatch ? imageMatch[1] : null;

      // Build link
      const link = `https://www.amazon.in/dp/${asin}`;

      if (title && price) {
        products.push({
          title,
          price,
          rating,
          image: image || 'https://via.placeholder.com/200',
          link,
        });
      }
    }

    // Alternative parsing if regex didn't work well
    if (products.length === 0) {
      console.log('Primary parsing failed, trying alternative method...');
      
      // Try to find products with a simpler pattern
      const asinMatches = html.matchAll(/data-asin="([A-Z0-9]{10})"/gi);
      const asins = [...new Set([...asinMatches].map(m => m[1]))].slice(0, 20);
      
      for (const asin of asins) {
        // Find title near ASIN
        const asinIndex = html.indexOf(`data-asin="${asin}"`);
        if (asinIndex === -1) continue;
        
        const chunk = html.slice(asinIndex, asinIndex + 5000);
        
        const titleMatch = chunk.match(/a-text-normal[^>]*>([^<]{10,200})</);
        const priceMatch = chunk.match(/a-price-whole[^>]*>([0-9,]+)/);
        const imageMatch = chunk.match(/s-image[^>]*src="([^"]+)"/);
        
        if (titleMatch && priceMatch) {
          products.push({
            title: titleMatch[1].trim(),
            price: priceMatch[1].replace(/,/g, ''),
            rating: 'N/A',
            image: imageMatch ? imageMatch[1] : 'https://via.placeholder.com/200',
            link: `https://www.amazon.in/dp/${asin}`,
          });
        }
      }
    }

    console.log('Found products:', products.length);

    return new Response(
      JSON.stringify({ success: true, count: products.length, data: products }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error scraping Amazon:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
