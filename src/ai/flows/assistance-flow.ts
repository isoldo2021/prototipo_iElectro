'use server';

/**
 * @fileOverview Un agente de IA de asistencia al cliente.
 *
 * - getAssistance - Una función que maneja las consultas de los clientes.
 */
import { ai } from '@/ai/genkit';
import { AssistanceInput, AssistanceOutput, AssistanceInputSchema, AssistanceOutputSchema } from '@/ai/schemas/assistance-schema';

export async function getAssistance(
  input: AssistanceInput
): Promise<AssistanceOutput> {
  return assistanceFlow(input);
}

const assistanceFlow = ai.defineFlow(
  {
    name: 'assistanceFlow',
    inputSchema: AssistanceInputSchema,
    outputSchema: AssistanceOutputSchema,
  },
  async (prompt) => {
    const llmResponse = await ai.generate({
      prompt: `Eres un asistente virtual de Carrefour, una tienda de electrodomésticos. Tu objetivo es ayudar a los usuarios con sus preguntas sobre productos, políticas de la tienda y cualquier otra consulta que puedan tener. Sé amable y conciso.

      Pregunta del usuario: ${prompt}`,
      model: 'googleai/gemini-2.5-flash',
      config: {
        maxOutputTokens: 200,
      },
    });

    return llmResponse.text;
  }
);
