import { getAiResponse } from "../../API/aiService";
import AccommodationData from "../../../data/accommodation.json"; // นำเข้าฟังก์ชันจากไฟล์ที่คุณสร้าง
import PoiData from "../../../data/poi.json"; // นำเข้าข้อมูลจุดแวะพัก
import type { reqAskModel } from "./model";

class Service {

  public async get() {
    //return await api.getUserProfileByEmail();
  }

  public async askAI(message: reqAskModel) {
    try {
      const initialContext = await this.formatContextData(AccommodationData, PoiData);
      const aiResponse = await getAiResponse(message.userMessage, initialContext);

      //const response = await api.askAI(message, context);
      return aiResponse; // Replace with actual AI response
    } catch (error) {
      console.error("Error asking AI:", error);
      throw new Error("Failed to get AI response");
    }
  }


  private async formatContextData(accommodations: any[], pois: any[]) {
    let context = "ข้อมูลที่พัก:\n";
    accommodations.forEach(acc => {
      context += `- ชื่อ: ${acc.name}, ประเภท: ${acc.type}, ราคา: สูงสุดคือ ${acc.price_range.max_price}
         ${acc.price_range.currency} และต่ำสุดคือ ${acc.price_range.min_price} ${acc.price_range.currency}, สิ่งอำนวยความสะดวก: ${acc.amenities.join(", ")}\n`;
    });
    context += "\nข้อมูลจุดแวะพัก:\n";
    pois.forEach(poi => {
      context += `- ชื่อ: ${poi.name}, ประเภท: ${poi.type}, เวลาทำการ: ${poi.opening_hours[0]?.day || ''} <span class="math-inline">\{poi\.opening\_hours\[0\]?\.open \|\| ''\}\-</span>{poi.opening_hours[0]?.close || ''}, ค่าเข้า: <span class="math-inline">\{poi\.price\_range\.min\_price\}\-</span>{poi.price_range.max_price} ${poi.price_range.currency}\n`;
    });
    return context;
  }
}

export default new Service();
