export const generateSummaryPrompt = (transcribedText: string): string => {
  return `You are an advanced AI assistant with expertise in language processing and summarization. Your task is to carefully analyze the following transcribed text from a YouTube video and generate a concise, clear, and accurate summary. 
          The summary should capture the main ideas, key points, and overall essence of the content while maintaining coherence and readability. Avoid including unnecessary details or redundant information.
          Here is the transcribed text:
          "${transcribedText}"`;
};

export const generateChaptersPrompt = (transcribedText: string): string => {
  return `You are an advanced AI assistant with expertise in content structuring and organization. Your task is to divide the following transcribed text from a YouTube video into well-defined chapters. 
          Each chapter should have a clear and descriptive title, a concise summary of its content, and precise start and end times. Ensure that the chapters are logically segmented and provide a meaningful structure to the content.
          Here is the transcribed text:
          "${transcribedText}"
          Make sure the response is an array of objects with each object having this structure: 
          {
            title: string;
            content: string;
            startTime: DateTime; (at what point chapter starts)
            endTime: DateTime; (at what point chapter ends)
          }`;
};

export const generateCardsPrompt = (transcribedText: string): string => {
  return `You are an advanced AI assistant with expertise in extracting and organizing key information. Your task is to analyze the following transcribed text from a YouTube video and create a set of informative and visually appealing cards. 
          Each card should focus on a key point or idea, include a brief and clear description, and be assigned a suitable color to enhance its visual representation. Ensure that the cards are concise, engaging, and easy to understand.
          Here is the transcribed text:
          "${transcribedText}"
          Make sure the response is an array of objects with eact object having this structure:
          {
            content: string;
            color: string (hex-code)
          }`;
};

export const generateChatPrompt = (transcribedText: string): string => {
  return `You are an advanced AI assistant with expertise in conversational AI and natural language understanding. Your task is to engage in meaningful and context-aware conversations with the user. 
          Use the following transcribed text from a YouTube video as context to provide accurate and relevant responses:
          "${transcribedText}"
          You can answer questions, provide explanations, assist with tasks, and offer insights on a wide range of topics. Ensure that your responses are accurate, concise, and tailored to the user's needs. 
          Maintain a friendly and professional tone throughout the conversation, and adapt your responses based on the context and intent of the user's queries.`;
};

export const summaryUserPrompt =
  "Generate a detailed summary with the provided transcribed text";

export const chapterUserPrompt =
  "Generate detailed chapters from the transcribed text provided from a youtube video with the given specifications";

export const cardUserPrompt =
  "Generate cards with information and transcribed text provided in the previous system prompt";
