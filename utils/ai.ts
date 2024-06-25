import { OpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import z from 'zod'

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood: z.string().describe('the mood of the person who wrote the journal entry.'),
        summary: z.string().describe('quick summary of the entire entry.'),
        negative: z.boolean().describe('is the journal entry negative? (i.e. does it contain negative emotions?).'),
        subject: z.string().describe('the subject of the journal entry.'),
        color: z.string().describe('a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'),
        sentimentScore: z.number().describe('sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'),

    })
) 

const getChain =() => {
    const prompt = PromptTemplate.fromTemplate("Analyze the following journal entry. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}")

    const model = new OpenAI({
        temperature: 0,
        modelName: 'gpt-3.5-turbo-16k',
        apiKey: process.env.OPENAI_API_KEY
    })

    const chain = RunnableSequence.from([
        prompt,
        model,
        parser,
      ]);
    
return chain
}


export const analyze = async (prompt: string) => {
   
    try {
        const chain = getChain()

        const response = await chain.invoke({
            entry: prompt,
            format_instructions: parser.getFormatInstructions()
        });

        console.log(response)
        return response

        
    } catch (error) {
        console.log(error)
    }   
}