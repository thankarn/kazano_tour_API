import { AzureOpenAI } from "openai";

// โหลด environment variables
// Bun จะโหลด .env ให้อัตโนมัติเมื่อรัน command เช่น `bun run src/index.ts`
const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY;
const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;
const AZURE_OPENAI_DEPLOYMENT_NAME = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;
const OPENAI_API_VERSION = process.env.OPENAI_API_VERSION || "2024-02-01"; // ตรวจสอบเวอร์ชันล่าสุดที่เหมาะสม

if (!AZURE_OPENAI_API_KEY || !AZURE_OPENAI_ENDPOINT || !AZURE_OPENAI_DEPLOYMENT_NAME) {
  throw new Error("Missing Azure OpenAI environment variables. Please check your .env file.");
}

const openai = new AzureOpenAI({
  apiKey: AZURE_OPENAI_API_KEY,
  endpoint: AZURE_OPENAI_ENDPOINT,
  deployment: AZURE_OPENAI_DEPLOYMENT_NAME,
  apiVersion: OPENAI_API_VERSION,
});

export async function getAiResponse(userMessage: string, contextData: string): Promise<string> {
  try {
    // เตรียมข้อมูลที่ AI จะใช้
    // นี่คือส่วนที่คุณจะรวมข้อมูลที่พักและจุดแวะพักจาก API ของคุณ
    // ตัวอย่าง: ถ้า contextData คือ JSON string ของข้อมูลที่พัก/จุดแวะพัก
    const systemPrompt = `
    คุณคือ AI ผู้ช่วยวางแผนการเดินทางและแนะนำโรงแรม โปรดตอบคำถามของผู้ใช้โดยใช้ข้อมูลที่ให้มาเท่านั้น

    สำหรับโรงแรม:
    - 'ราคา' หมายถึงช่วงราคาต่อคืน โดย 'min_price' คือราคาเริ่มต้นที่ถูกที่สุด
    - ให้พิจารณา 'min_price' ในการแนะนำที่พักตามงบประมาณ

    ข้อมูลที่มี:
    ${contextData}

    หากข้อมูลไม่เพียงพอที่จะตอบคำถาม โปรดแจ้งให้ผู้ใช้ทราบ
    `;

    const chatCompletion = await openai.chat.completions.create({
      model: AZURE_OPENAI_DEPLOYMENT_NAME || '', // ใช้ชื่อ deployment ที่ตั้งไว้
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      max_completion_tokens: 500, // จำนวน token สูงสุดของการตอบกลับ
    });

    return chatCompletion.choices[0]?.message?.content || "ขออภัย ไม่สามารถประมวลผลคำขอของคุณได้ในขณะนี้";

  } catch (error) {
    console.error("Error calling Azure OpenAI Service:", error);
    if (error instanceof Error) {
      return `เกิดข้อผิดพลาดในการเชื่อมต่อ AI: ${error.message}`;
    }
    return "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุในการเชื่อมต่อ AI";
  }
}

// ตัวอย่างการใช้งาน (สำหรับทดสอบ)
async function testAiService() {
  const sampleContext = `
  ที่พัก:
  - ชื่อ: The Serene Hotel, ประเภท: โรงแรม, ราคา: 2500-5000 THB, สิ่งอำนวยความสะดวก: Wi-Fi, สระว่ายน้ำ, ฟิตเนส
  - ชื่อ: Riverside Hostel, ประเภท: โฮสเทล, ราคา: 500-800 THB, สิ่งอำนวยความสะดวก: Wi-Fi, คาเฟ่, ห้องครัวส่วนกลาง

  จุดแวะพัก:
  - ชื่อ: วัดอรุณราชวราราม, ประเภท: สถานที่ท่องเที่ยว, เวลาทำการ: 08:00-18:00, ค่าเข้า: 100 THB (ต่างชาติ)
  - ชื่อ: ตลาดนัดจตุจักร, ประเภท: ตลาด, เวลาทำการ: เสาร์-อาทิตย์ 09:00-18:00
  `;

  const userQuery = "แนะนำโรงแรมในกรุงเทพที่ราคาไม่เกิน 3000 บาท และมีสระว่ายน้ำ";
  console.log(`User: ${userQuery}`);
  const response = await getAiResponse(userQuery, sampleContext);
  console.log(`AI: ${response}`);

  const userQuery2 = "ฉันจะไปวัดอรุณกี่โมงได้บ้าง";
  console.log(`User: ${userQuery2}`);
  const response2 = await getAiResponse(userQuery2, sampleContext);
  console.log(`AI: ${response2}`);
}

// เรียกใช้ฟังก์ชันทดสอบ
// testAiService();