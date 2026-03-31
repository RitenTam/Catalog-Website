# Chatbot Testing Guide

## Quick Test Scenarios

Test the enhanced chatbot by trying these example questions in order:

### 1. **Product Discovery**
**Q:** "What products do you have?"
OR "What do you offer?"
- **Expected:** Lists all product categories available

### 2. **Availability Questions**
**Q:** "Is Short Cardigan available?"
- **Expected:** Confirms availability and lists specific styles

**Q:** "Do you have Long Cardigan in stock?"
- **Expected:** Shows available Long Cardigan styles

### 3. **Color Questions**
**Q:** "What colors does Cardigan come in?"
- **Expected:** Lists colors for each Cardigan style (e.g., Pink, White, Navy)

**Q:** "Available shades for Sweater?"
- **Expected:** Shows all color options for Sweater category

**Q:** "Color options for Short Cardigan?"
- **Expected:** Shows Maroon, Teal, Cream for Short Cardigan

### 4. **Size Questions**
**Q:** "What sizes are available for Long Cardigan?"
- **Expected:** Shows XS, S, M, L, XL, XXL

**Q:** "Does Sweater come in XL?"
- **Expected:** Confirms size availability and mentions comfortable fit

**Q:** "Size options for Short Cardigan?"
- **Expected:** Lists all available sizes

### 5. **Material & Features Questions**
**Q:** "Tell me about Sweater materials"
- **Expected:** Lists features like "100% Premium Merino Wool", "Hand-knitted with care", etc.

**Q:** "What's Long Cardigan made of?"
- **Expected:** Shows features and materials for Long Cardigan

**Q:** "Describe Cardigan fabrics"
- **Expected:** Provides fabric details and care instructions

### 6. **Style & Variant Questions**
**Q:** "What styles of Cardigan do you have?"
- **Expected:** Lists different Cardigan styles available

**Q:** "Types of Sweater available?"
- **Expected:** Shows different Sweater variants

### 7. **Price Questions**
**Q:** "How much does Cardigan cost?"
- **Expected:** Provides pricing contact info (WhatsApp, Email) and number of styles

**Q:** "What's the price of Short Cardigan?"
- **Expected:** Shows contact methods for pricing

### 8. **Comprehensive Questions**
**Q:** "Tell me about Short Cardigan"
- **Expected:** Provides name, description, colors, sizes, and next steps

**Q:** "Describe Sweater"
- **Expected:** Multi-field information about the Sweater category

### 9. **Help & Guidance**
**Q:** "Help"
- **Expected:** Shows all available categories and question types with examples

**Q:** "What can you do?"
- **Expected:** Lists all chatbot capabilities with usage examples

## What to Look For

✅ **Good Indicators:**
- Bot responds with relevant information
- Uses emoji indicators (🎨 for colors, 📏 for sizes, etc.)
- Lists product-specific details
- Offers follow-up suggestions
- Contact information appears when relevant
- Formatted with clear spacing and bullet points

❌ **Issues to Report:**
- Bot responds with generic message instead of specific info
- Missing product details
- Misspelled or incomplete information
- Contact information not showing
- Unclear formatting

## Testing with Different Product Categories

The chatbot should work with any of these categories:
- Turtleneck
- Cardigan
- Pullover
- Long Cardigan
- Short Cardigan
- (And any other categories in your products.ts file)

## Expected Bot Knowledge

The chatbot can answer about each product:
- **Name:** Full product name
- **Colors:** All available color options
- **Sizes:** Size range (XS-XXL)
- **Materials:** Fabric types and composition
- **Features:** Special characteristics, care instructions
- **Description:** Marketing description
- **Availability:** Stock status
- **Pricing:** Contact methods (not actual prices in chatbot)
- **Styles:** Different variants available

## Conversation Flow Example

```
User: "Hi, what do you have?"
Bot: Shows greeting and offers to help

User: "What colors does Short Cardigan come in?"
Bot: Lists colors - Maroon, Teal, Cream

User: "What sizes?"
Bot: [May need to re-ask for product] Lists all sizes XS-XXL

User: "Tell me about the materials"
Bot: Shows premium materials and features

User: "How much?"
Bot: Provides WhatsApp/Email contact for pricing
```

## Notes

- The chatbot is case-insensitive (works with ANY capitalization)
- Questions can be casual and natural
- Keywords aren't required to be exact - synonyms work (e.g., "fabric" = "material")
- Product category names should be mentioned for accurate responses
- The bot will suggest relevant follow-up questions
