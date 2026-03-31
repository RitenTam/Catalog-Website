import { getCatalogProducts, Product } from '@/data/products';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export class ChatbotService {
  private products: Product[] = [];

  constructor() {
    this.products = getCatalogProducts();
  }

  // Extract product names from user message
  private extractProductName(message: string): string | null {
    const lowerMessage = message.toLowerCase();
    const productCategories = this.getUniqueCategories();

    for (const category of productCategories) {
      if (lowerMessage.includes(category.toLowerCase())) {
        return category;
      }
    }

    return null;
  }

  // Get unique categories from products
  private getUniqueCategories(): string[] {
    const categories = new Set<string>();
    this.products.forEach((product) => {
      if (product.category) {
        categories.add(product.category);
      }
    });
    return Array.from(categories);
  }

  // Find products matching a category
  private findProductsByCategory(categoryName: string): Product[] {
    const lowerCategory = categoryName.toLowerCase().trim();
    return this.products.filter(
      (product) =>
        product.category?.toLowerCase().trim().includes(lowerCategory) ||
        lowerCategory.includes(product.category?.toLowerCase().trim() || '')
    );
  }

  // Generate response based on user question
  generateResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase().trim();

    // Greeting
    if (
      lowerMessage.includes('hello') ||
      lowerMessage.includes('hi') ||
      lowerMessage.includes('hey')
    ) {
      return 'Hello! 👋 Welcome to ChaurasiyaHojiyari. I can help you find information about our products. Ask me anything about our cardigans, sweaters, coats, shawls, and more!';
    }

    // Help request
    if (
      lowerMessage.includes('help') ||
      lowerMessage.includes('what can you do')
    ) {
      return 'I can help you with:\n- Product availability (e.g., "Is short cardigan available?")\n- Pricing information\n- Colors available\n- Sizes and features\n- Product descriptions\n\nJust ask me about any product!';
    }

    // Extract product name
    const productName = this.extractProductName(userMessage);

    if (!productName) {
      return "I'm here to help! Could you ask me about our products like Long Cardigan, Short Cardigan, Sweater, Shawl, or Coat?";
    }

    const matchingProducts = this.findProductsByCategory(productName);

    if (matchingProducts.length === 0) {
      return `Sorry, I couldn't find information about ${productName}. Please check the product name and try again.`;
    }

    // Check availability
    if (
      lowerMessage.includes('available') ||
      lowerMessage.includes('have') ||
      lowerMessage.includes('stock')
    ) {
      return this.handleAvailabilityQuestion(productName, matchingProducts);
    }

    // Check price
    if (
      lowerMessage.includes('price') ||
      lowerMessage.includes('cost') ||
      lowerMessage.includes('how much')
    ) {
      return this.handlePriceQuestion(productName, matchingProducts);
    }

    // Check colors
    if (
      lowerMessage.includes('color') ||
      lowerMessage.includes('colours')
    ) {
      return this.handleColorQuestion(productName, matchingProducts);
    }

    // Check sizes
    if (lowerMessage.includes('size')) {
      return this.handleSizeQuestion(productName, matchingProducts);
    }

    // Check features
    if (
      lowerMessage.includes('feature') ||
      lowerMessage.includes('description') ||
      lowerMessage.includes('about')
    ) {
      return this.handleFeatureQuestion(productName, matchingProducts);
    }

    // Default product info
    return this.handleGeneralQuestion(productName, matchingProducts);
  }

  private handleAvailabilityQuestion(
    productName: string,
    products: Product[]
  ): string {
    if (products.length === 0) {
      return `${productName} is currently not available.`;
    }

    const productList = products.map((p) => `• ${p.name}`).join('\n');
    return `Yes! ${productName} is available. We have:\n\n${productList}\n\nWould you like to know more about colors, sizes, or pricing?`;
  }

  private handlePriceQuestion(
    productName: string,
    products: Product[]
  ): string {
    return `We have ${products.length} ${productName} style(s) available. For detailed pricing information, please visit our Products page or contact us at contact@chaurasiyahojiyari.com or WhatsApp: 9863651986.`;
  }

  private handleColorQuestion(
    productName: string,
    products: Product[]
  ): string {
    const colorSet = new Set<string>();
    products.forEach((product) => {
      product.colors?.forEach((color) => {
        colorSet.add(color.name);
      });
    });

    const colors = Array.from(colorSet).join(', ');
    return `${productName} is available in these colors:\n${colors}\n\nEach style may have different color options. Visit our Products page for specific details!`;
  }

  private handleSizeQuestion(
    productName: string,
    products: Product[]
  ): string {
    const sizeSet = new Set<string>();
    products.forEach((product) => {
      product.sizes?.forEach((size) => {
        sizeSet.add(size);
      });
    });

    const sizes = Array.from(sizeSet).join(', ');
    return `${productName} is available in these sizes:\n${sizes}\n\nAll our products are crafted to fit comfortably!`;
  }

  private handleFeatureQuestion(
    productName: string,
    products: Product[]
  ): string {
    let response = `Here's what makes our ${productName} special:\n\n`;
    const featuresSet = new Set<string>();

    products.forEach((product) => {
      product.features?.forEach((feature) => {
        featuresSet.add(`• ${feature}`);
      });
    });

    response += Array.from(featuresSet).join('\n');
    return response;
  }

  private handleGeneralQuestion(
    productName: string,
    products: Product[]
  ): string {
    if (products.length > 0) {
      const product = products[0];
      return `${product.name} - ${product.description}\n\nWould you like to know about colors, sizes, or features?`;
    }
    return `We have multiple ${productName} options available. Would you like to know about colors, sizes, or pricing?`;
  }
}
