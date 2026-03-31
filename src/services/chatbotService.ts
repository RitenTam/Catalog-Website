import { getCatalogProducts, Product } from '@/data/products';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export class ChatbotService {
  private products: Product[] = [];
  private categories: Map<string, Product[]> = new Map();

  constructor() {
    this.products = getCatalogProducts();
    this.buildCategoryIndex();
  }

  // Build an index of products by category for faster lookups
  private buildCategoryIndex(): void {
    this.categories.clear();
    this.products.forEach((product) => {
      if (product.category) {
        const key = product.category.toLowerCase().trim();
        if (!this.categories.has(key)) {
          this.categories.set(key, []);
        }
        this.categories.get(key)?.push(product);
      }
    });
  }

  // Extract product names from user message
  private extractProductName(message: string): string | null {
    const lowerMessage = message.toLowerCase();
    
    // Check for exact category matches first (most specific)
    for (const categoryKey of this.categories.keys()) {
      if (lowerMessage.includes(categoryKey)) {
        return categoryKey;
      }
    }

    return null;
  }

  // Get all available product categories
  private getUniqueCategories(): string[] {
    return Array.from(this.categories.keys());
  }

  // Find products matching a category
  private findProductsByCategory(categoryName: string): Product[] {
    const lowerCategory = categoryName.toLowerCase().trim();
    return this.categories.get(lowerCategory) || [];
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
      return this.getHelpMessage();
    }

    // Check if asking for browsing options
    if (
      lowerMessage.includes('what do you have') ||
      lowerMessage.includes('what products') ||
      lowerMessage.includes('what do we offer')
    ) {
      return this.getAllProductCategories();
    }

    // Extract product category
    const productName = this.extractProductName(userMessage);

    if (!productName) {
      const availableProducts = this.getAllProductCategories();
      return availableProducts;
    }

    const matchingProducts = this.findProductsByCategory(productName);

    if (matchingProducts.length === 0) {
      return `Sorry, I couldn't find information about ${productName}. Please check the product name and try again.`;
    }

    // Route to specific question handlers based on keywords
    return this.routeQuestion(lowerMessage, productName, matchingProducts);
  }

  // Route user question to appropriate handler
  private routeQuestion(
    message: string,
    productName: string,
    products: Product[]
  ): string {
    // Check availability
    if (
      message.includes('available') ||
      message.includes('have') ||
      message.includes('stock') ||
      message.includes('in stock')
    ) {
      return this.handleAvailabilityQuestion(productName, products);
    }

    // Check price
    if (
      message.includes('price') ||
      message.includes('cost') ||
      message.includes('how much') ||
      message.includes('rate')
    ) {
      return this.handlePriceQuestion(productName, products);
    }

    // Check colors
    if (
      message.includes('color') ||
      message.includes('colours') ||
      message.includes('shade') ||
      message.includes('hue')
    ) {
      return this.handleColorQuestion(productName, products);
    }

    // Check sizes
    if (
      message.includes('size') ||
      message.includes('fit') ||
      message.includes('dimension')
    ) {
      return this.handleSizeQuestion(productName, products);
    }

    // Check features
    if (
      message.includes('feature') ||
      message.includes('description') ||
      message.includes('about') ||
      message.includes('material') ||
      message.includes('fabric') ||
      message.includes('made')
    ) {
      return this.handleFeatureQuestion(productName, products);
    }

    // Check for style/variant questions
    if (
      message.includes('style') ||
      message.includes('variant') ||
      message.includes('type')
    ) {
      return this.handleStyleQuestion(productName, products);
    }

    // Default: provide comprehensive product info
    return this.handleComprehensiveQuestion(productName, products);
  }

  private getHelpMessage(): string {
    const categories = Array.from(this.categories.keys())
      .map(
        (cat) =>
          `• ${cat.charAt(0).toUpperCase() + cat.slice(1)}`
      )
      .join('\n');

    return `I can help you with:\n\n📦 Available Product Categories:\n${categories}\n\n❓ I can answer questions about:\n- Availability and stock\n- Colors available\n- Sizes & fit\n- Material and features\n- Styles and variants\n- Product descriptions\n\nJust ask me anything like:\n"What colors does Long Cardigan come in?"\n"What sizes are available for Short Cardigan?"\n"Tell me about Sweater materials"`;
  }

  private getAllProductCategories(): string {
    if (this.categories.size === 0) {
      return 'I apologize, but I currently have no products available. Please try again later!';
    }

    const categoryList = Array.from(this.categories.entries())
      .map(([category, products]) => {
        const productNames = products
          .map((p) => `${p.name}`)
          .join(', ');
        return `• ${category.charAt(0).toUpperCase() + category.slice(1)}: ${productNames}`;
      })
      .join('\n');

    return `Here are all the products we offer:\n\n${categoryList}\n\nWould you like to know more about any specific product? I can tell you about colors, sizes, features, availability, and more!`;
  }

  private handleAvailabilityQuestion(
    productName: string,
    products: Product[]
  ): string {
    if (products.length === 0) {
      return `${productName} is currently not available. Would you like to know about our other products?`;
    }

    const productList = products
      .map((p) => `• ${p.name}`)
      .join('\n');
    return `✅ Yes! ${productName.charAt(0).toUpperCase() + productName.slice(1)} is available in these styles:\n\n${productList}\n\nWould you like to know about colors, sizes, features, or pricing?`;
  }

  private handlePriceQuestion(
    productName: string,
    products: Product[]
  ): string {
    return `💰 We have ${products.length} ${productName} style(s) available. For detailed pricing information, please:\n\n📱 WhatsApp: 9863651986\n📧 Email: contact@chaurasiyahojiyari.com\n🌐 Visit our Products page\n\nI'd also be happy to tell you about other details like colors, sizes, and materials!`;
  }

  private handleColorQuestion(
    productName: string,
    products: Product[]
  ): string {
    const colorInfo = products
      .map((product) => {
        const colors = product.colors
          ?.map((c) => c.name)
          .join(', ');
        return `${product.name}: ${colors || 'Various colors'}`;
      })
      .join('\n');

    return `🎨 ${productName.charAt(0).toUpperCase() + productName.slice(1)} is available in these colors:\n\n${colorInfo}\n\nEach style may have different color options. Would you like to know about sizes, materials, or other details?`;
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
    return `📏 ${productName.charAt(0).toUpperCase() + productName.slice(1)} is available in these sizes:\n${sizes}\n\nAll our products are crafted to fit comfortably! Would you like to know about colors, materials, or other details?`;
  }

  private handleFeatureQuestion(
    productName: string,
    products: Product[]
  ): string {
    let response = `✨ Here's what makes our ${productName} special:\n\n`;
    
    // Collect unique features with product names
    const featureMap = new Map<string, string[]>();
    products.forEach((product) => {
      product.features?.forEach((feature) => {
        if (!featureMap.has(feature)) {
          featureMap.set(feature, []);
        }
        featureMap.get(feature)?.push(product.name);
      });
    });

    // Format features with product info
    const featureList = Array.from(featureMap.entries())
      .map(([feature]) => `• ${feature}`)
      .join('\n');

    response += featureList;

    if (products.length > 0) {
      response += '\n\n📝 Description: ' + products[0].description;
    }

    return response;
  }

  private handleStyleQuestion(
    productName: string,
    products: Product[]
  ): string {
    if (products.length === 0) {
      return `No styles available for ${productName}.`;
    }

    const styles = products
      .map((p) => `• ${p.name}`)
      .join('\n');
    return `👗 We have these ${productName} styles available:\n\n${styles}\n\nWould you like to know more about any specific style? I can tell you about colors, sizes, and features!`;
  }

  private handleComprehensiveQuestion(
    productName: string,
    products: Product[]
  ): string {
    if (products.length === 0) {
      return `I don't have information about that ${productName}. Please ask about a different product!`;
    }

    let response = `📦 ${productName.charAt(0).toUpperCase() + productName.slice(1)} Information:\n\n`;

    products.forEach((product, index) => {
      if (index < 2) {
        // Limit to first 2 products for readability
        response += `**${product.name}**\n`;
        response += `${product.description}\n`;

        if (product.colors && product.colors.length > 0) {
          const colors = product.colors
            .map((c) => c.name)
            .join(', ');
          response += `🎨 Colors: ${colors}\n`;
        }

        if (product.sizes && product.sizes.length > 0) {
          response += `📏 Sizes: ${product.sizes.join(', ')}\n`;
        }

        response += '\n';
      }
    });

    response += `What else would you like to know? I can help with:\n- 🎨 Colors\n- 📏 Sizes\n- ✨ Features/Materials\n- 💰 Pricing\n- 📱 Contact & Orders`;

    return response;
  }

  private handleGeneralQuestion(
    productName: string,
    products: Product[]
  ): string {
    if (products.length > 0) {
      const product = products[0];
      return `${product.name}\n\n${product.description}\n\nWould you like to know about colors, sizes, or features?`;
    }
    return `We have multiple ${productName} options available. Would you like to know about colors, sizes, or pricing?`;
  }
}
