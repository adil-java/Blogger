import {GoogleGenAI} from '@google/genai';
const blogGen = async(req,res)=>{
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});
    const topic= req.body.topic;
    const prompt = `Write a detailed blog post about ${topic}. Include an introduction, main content with subheadings, and a conclusion. Make it engaging and informative.`;
   try {
     const response = await ai.models.generateContent({
         model: 'gemini-2.5-flash',
         contents: prompt,
     });
        res.json({success:true, response:response.text});
     console.log(response.text);
   } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ success: false, message: error.message });
   }
    }


export default blogGen;