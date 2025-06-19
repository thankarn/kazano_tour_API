import { serve } from "bun";
import { getAiResponse } from "./src/API/aiService"; // นำเข้าฟังก์ชันจากไฟล์ที่คุณสร้าง
import AccommodationData from "./data/chiangmai_hotels_with_maps.json"; // นำเข้าข้อมูลที่พัก
import PoiData from "./data/ที่เที่ยวในเมืองเชียงใหม่.json"; // นำเข้าข้อมูลจุดแวะพัก

// ฟังก์ชัน helper สำหรับแปลงข้อมูล mock เป็น text string ที่ AI อ่านได้
function formatContextData(accommodations: any[], pois: any[]): string {
    let context = "ข้อมูลที่พัก:\n";
    accommodations.forEach(acc => {
        context += `- ชื่อ: ${acc.name}, ประเภท: ${acc.type}, ราคา: ${acc.price_thb} บาท, สิ่งอำนวยความสะดวก: ${acc.facilities.join(", ")}, ตำแหน่ง: ${acc.location}\n`;
    });
    context += "\nข้อมูลจุดแวะพัก:\n";
    pois.forEach(poi => {
        context += `- ชื่อ: ${poi.name}, ประเภท: ${poi.type}, กิจกรรม: ${poi.activities.join(", ")}, ราคาเฉลี่ย: ${poi.avg_price_per_person} บาท, เวลาที่เหมาะสม: ${poi.avg_time_spent}\n`;
    });
    return context;
}

const initialContext = formatContextData(AccommodationData, PoiData);

console.log("acc", initialContext)

serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    if (req.method === "POST" && url.pathname === "/chat") {
      try {
        const body = await req.json();
        const userMessage = body.message;

        if (!userMessage) {
          return new Response(JSON.stringify({ error: "Message is required." }), {
            headers: { "Content-Type": "application/json" },
            status: 400,
          });
        }

        // ในส่วนนี้ คุณจะดึงข้อมูลที่เกี่ยวข้องจาก Database/JSON ของคุณ
        // และส่งไปให้ AI ด้วย
        const aiResponse = await getAiResponse(userMessage, initialContext); // ส่งข้อมูล mock ไปก่อน

        return new Response(JSON.stringify({ response: aiResponse }), {
          headers: { "Content-Type": "application/json" },
          status: 200,
        });

      } catch (error) {
        console.error("Error processing chat request:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
          headers: { "Content-Type": "application/json" },
          status: 500,
        });
      }
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log("Bun server listening on http://localhost:3000");