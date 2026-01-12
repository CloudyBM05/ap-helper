const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
  const genAI = new GoogleGenerativeAI('AIzaSyDEIYeVvM4XuUtAMVAWSBx8XLf8FfVB5W8');
  
  // Try different model names
  const modelNames = [
    'gemini-pro',
    'gemini-1.0-pro', 
    'text-bison-001',
    'models/gemini-pro',
    'models/text-bison-001'
  ];
  
  for (const modelName of modelNames) {
    try {
      console.log(`\nTesting model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Hello, can you respond?");
      const response = await result.response;
      const text = response.text();
      console.log(`✅ SUCCESS with ${modelName}: ${text.substring(0, 100)}...`);
      break; // Stop on first success
    } catch (error) {
      console.log(`❌ FAILED with ${modelName}: ${error.message}`);
    }
  }
}

testGemini();
