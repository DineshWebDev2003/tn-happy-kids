'use server';

/**
 * @fileOverview Generates quizzes based on stories.
 *
 * - generateQuiz - A function that generates a quiz based on a given story.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizInputSchema = z.object({
  storyContent: z
    .string()
    .describe('The content of the story to generate a quiz from.'),
  quizLength: z
    .number()
    .default(5)
    .describe('The desired number of questions in the quiz.'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const GenerateQuizOutputSchema = z.object({
  quiz: z.array(
    z.object({
      question: z.string().describe('The quiz question.'),
      options: z.array(z.string()).describe('The possible answers.'),
      answer: z.string().describe('The correct answer to the question.'),
    })
  ).describe('The generated quiz questions and answers.'),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}

const generateQuizPrompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {schema: GenerateQuizInputSchema},
  output: {schema: GenerateQuizOutputSchema},
  prompt: `You are an expert quiz generator for children's stories. Based on the story provided, generate a quiz with {{quizLength}} questions.  Each question should have 4 possible answers, and clearly indicate which answer is correct.

Story Content: {{{storyContent}}}

Output the quiz as a JSON array of question objects. Each question object should have a "question" field, an "options" field containing an array of 4 strings, and an "answer" field containing the correct answer as a string. The answer must be one of the strings in the "options" array.
`, 
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async input => {
    const {output} = await generateQuizPrompt(input);
    return output!;
  }
);
