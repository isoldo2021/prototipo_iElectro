/**
 * @fileOverview Schemas and types for the assistance flow.
 *
 * - AssistanceInputSchema - Zod schema for the assistance input.
 * - AssistanceOutputSchema - Zod schema for the assistance output.
 * - AssistanceInput - The TypeScript type for the input.
 * - AssistanceOutput - The TypeScript type for the output.
 */
import { z } from 'zod';

export const AssistanceInputSchema = z.string();
export const AssistanceOutputSchema = z.string();

export type AssistanceInput = z.infer<typeof AssistanceInputSchema>;
export type AssistanceOutput = z.infer<typeof AssistanceOutputSchema>;
