import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MessageCircle, Search } from 'lucide-react';
import { getCatalogProducts, type Product } from '@/data/products';
import { getOrCreateAnalyticsSessionId, recordWhatsAppClick } from '@/data/whatsappAnalytics';
import { buildWhatsAppWebUrl } from '@/lib/whatsapp';

type SearchableProduct = Product & {
  category: string;
  keywords: string[];
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchableProduct[]>([]);

  const allProductsWithKeywords = useMemo<SearchableProduct[]>(
    () =>
      getCatalogProducts().map((product) => ({
        ...product,
        category: product.category ?? '',
        keywords: [
          product.name.toLowerCase(),
          product.category?.toLowerCase() ?? '',
          ...product.name.toLowerCase().split(' ')
        ]
      })),
    []
  );

  useEffect(() => {
    if (query) {
      const searchResults = allProductsWithKeywords.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.keywords.some((keyword) => keyword.includes(query.toLowerCase()))
      );
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query, allProductsWithKeywords]);

  const handleWhatsAppInquiry = (product: Product) => {
    recordWhatsAppClick({
      productId: product.id,
      productName: product.name,
      productCategory: product.category,
      source: 'search-results',
      sessionId: getOrCreateAnalyticsSessionId(),
    });

    const message = `Hi, I'm interested in the ${product.name}. Can you provide more details?`;
    const whatsappUrl = buildWhatsAppWebUrl(message);
    window.location.href = whatsappUrl;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Search Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Search Results
              </h1>
              {query && (
                <p className="text-muted-foreground">
                  Showing results for "<span className="text-primary font-semibold">{query}</span>"
                  {results.length > 0 && (
                    <span> - {results.length} {results.length === 1 ? 'product' : 'products'} found</span>
                  )}
                </p>
              )}
            </div>

            {/* Results */}
            {!query ? (
              <div className="text-center py-16">
                <Search className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
                <h2 className="text-2xl font-semibold text-foreground mb-4">Start Your Search</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Use the search bar above to find your perfect sweater from our collection
                </p>
                <Link to="/products">
                  <Button className="btn-hero">Browse All Products</Button>
                </Link>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-16">
                <Search className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
                <h2 className="text-2xl font-semibold text-foreground mb-4">No Results Found</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  We couldn't find any products matching "{query}". Try searching with different keywords or browse our collection.
                </p>
                <div className="space-x-4">
                  <Link to="/products">
                    <Button className="btn-hero">Browse All Products</Button>
                  </Link>
                  <Button variant="outline" onClick={() => window.history.back()}>
                    Go Back
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((product) => (
                  <Card key={product.id} className="product-card group bg-card">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />
                      
                      {/* Quick Actions Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button 
                          className="btn-secondary"
                          onClick={() => handleWhatsAppInquiry(product)}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Inquire
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="mb-2">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">
                          {product.category}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2 text-foreground">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-center">
                        <Link to={`/product/${product.id}`}>
                          <Button size="sm" className="btn-outline w-full">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;