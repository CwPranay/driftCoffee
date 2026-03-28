'use server';
/**
 * @fileOverview A Genkit flow for generating rich, evocative tasting notes and sensory descriptions for coffee selections.
 *
 * - generateCoffeeFlavorDescription - A function that handles the generation process.
 * - GenerateCoffeeFlavorDescriptionInput - The input type for the generateCoffeeFlavorDescription function.
 * - GenerateCoffeeFlavorDescriptionOutput - The return type for the generateCoffeeFlavorDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCoffeeFlavorDescriptionInputSchema = z.object({
  coffeeName: z
    .string()
    .describe('The name of the coffee selection (e.g., "Ethiopian Yirgacheffe").'),
  origin: z
    .string()
    .describe('The geographical origin of the coffee (e.g., "Yirgacheffe, Ethiopia").'),
  roastLevel: z
    .string()
    .describe('The roast level of the coffee (e.g., "Light", "Medium", "Dark").'),
  flavorProfile: z
    .string()
    .describe(
      'Key flavor characteristics and notes (e.g., "bright citrus, jasmine, blueberry, hint of chocolate").'
    ),
});
export type GenerateCoffeeFlavorDescriptionInput = z.infer<
  typeof GenerateCoffeeFlavorDescriptionInputSchema
>;

const GenerateCoffeeFlavorDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('A rich, evocative tasting note and sensory description for the coffee.'),
});
export type GenerateCoffeeFlavorDescriptionOutput = z.infer<
  typeof GenerateCoffeeFlavorDescriptionOutputSchema
>;

export async function generateCoffeeFlavorDescription(
  input: GenerateCoffeeFlavorDescriptionInput
): Promise<GenerateCoffeeFlavorDescriptionOutput> {
  return generateCoffeeFlavorDescriptionFlow(input);
}

const generateCoffeeFlavorDescriptionPrompt = ai.definePrompt({
  name: 'generateCoffeeFlavorDescriptionPrompt',
  input: {schema: GenerateCoffeeFlavorDescriptionInputSchema},
  output: {schema: GenerateCoffeeFlavorDescriptionOutputSchema},
  prompt: `You are an expert coffee connoisseur and storyteller, skilled in crafting rich, evocative tasting notes and sensory descriptions for premium coffee selections. Your goal is to create compelling product descriptions that highlight unique flavors and premium quality, appealing to sophisticated coffee drinkers.

Coffee Name: {{{coffeeName}}}
Origin: {{{origin}}}
Roast Level: {{{roastLevel}}}
Key Flavor Profile: {{{flavorProfile}}}

Using the information above, write a detailed and captivating description that evokes the unique characteristics and sensory experience of this coffee. Focus on flavor, aroma, body, and acidity. Make it sound premium and enticing. The description should be approximately 3-5 sentences long.`,
});

const generateCoffeeFlavorDescriptionFlow = ai.defineFlow(
  {
    name: 'generateCoffeeFlavorDescriptionFlow',
    inputSchema: GenerateCoffeeFlavorDescriptionInputSchema,
    outputSchema: GenerateCoffeeFlavorDescriptionOutputSchema,
  },
  async input => {
    const {output} = await generateCoffeeFlavorDescriptionPrompt(input);
    return output!;
  }
);
