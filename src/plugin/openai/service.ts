import { getAiResponse } from "../../API/aiService";
import a1 from "../../../data/chiangdao_20.json"; // นำเข้าฟังก์ชันจากไฟล์ที่คุณสร้าง
import a2 from "../../../data/chiangmai_hotels_with_maps.json"; // นำเข้าฟังก์ชันจากไฟล์ที่คุณสร้าง
import a3 from "../../../data/chomthong_doi_inthanon_20.json"; // นำเข้าฟังก์ชันจากไฟล์ที่คุณสร้าง
import a4 from "../../../data/fang_20.json"; // นำเข้าฟังก์ชันจากไฟล์ที่คุณสร้าง
import a5 from "../../../data/mae-rim-sankampaeng_20.json"; // นำเข้าฟังก์ชันจากไฟล์ที่คุณสร้าง
//import r1 from "../../../data/poi.json"; // นำเข้าข้อมูลจุดแวะพัก
import r2 from "../../../data/ร้านอาหารจอมทอง ดอยอินทนนท์.json"; // นำเข้าข้อมูลจุดแวะพัก
import r3 from "../../../data/ร้านอาหารฝาง.json"; // นำเข้าข้อมูลจุดแวะพัก
import r4 from "../../../data/ร้านอาหารเชียงดาว.json"; // นำเข้าข้อมูลจุดแวะพัก
import r5 from "../../../data/ร้านอาหารแม่ริม สันกำแพง.json"; // นำเข้าข้อมูลจุดแวะพัก
import r6 from "../../../data/ร้านอาหารในเมืองเชียงใหม่.json"; // นำเข้าข้อมูลจุดแวะพัก
import t7 from "../../../data/ที่เที่ยวจอมทอง ดอยอินทนนท์.json"; // นำเข้าข้อมูลจุดแวะพัก
import t8 from "../../../data/ที่เที่ยวฝาง.json"; // นำเข้าข้อมูลจุดแวะพัก
import t9 from "../../../data/ที่เที่ยวเชียงดาว.json"; // นำเข้าข้อมูลจุดแวะพัก
import t10 from "../../../data/ที่เที่ยวแม่ริม สันกำแพง.json"; // นำเข้าข้อมูลจุดแวะพัก
import t11 from "../../../data/ที่เที่ยวในเมืองเชียงใหม่.json"; // นำเข้าข้อมูลจุดแวะพัก
import type { accomoModel, reqAskModel, resAskModel, poiSchema, restaurantSchema } from "./model";

class Service {

  public async get() {
    //return await api.getUserProfileByEmail();
  }

  public async askAI(message: reqAskModel) {
    try {

      const a12 = a1 as accomoModel[];

      console.log("a12:", a12);

      const initialContext = await this.formatContextData(
        [...a1 as accomoModel[], ...a2 as accomoModel[], ...a3 as accomoModel[], ...a4 as accomoModel[], ...a5 as accomoModel[]],
        [...r2 as restaurantSchema[], ...r3 as restaurantSchema[], ...r4 as restaurantSchema[], ...r5 as restaurantSchema[], ...r6 as restaurantSchema[]],
        [...t7 as poiSchema[], ...t8 as poiSchema[], ...t9 as poiSchema[], ...t10 as poiSchema[], ...t11 as poiSchema[]]
      );
      const aiResponse = await getAiResponse(message.userMessage, initialContext);
      //const response = await api.askAI(message, context);
      //const response: resAskModel = aiResponse;
      //transform the response to match resAskModel structure
      console.log("AI Response:", aiResponse);
      const tripPlanObject: resAskModel = JSON.parse(aiResponse);
      console.log("AI tripPlanObject:", tripPlanObject);
      return tripPlanObject; // Replace with actual AI response
    } catch (error) {
      console.error("Error asking AI:", error);
      throw new Error("Failed to get AI response");
    }
  }


  private async formatContextData(accommodations: any[], restaurants: any[], pois: any[]) {
    let context = "ข้อมูลที่พัก:\n";
    accommodations.forEach(acc => {
      context += `- ชื่อ: ${acc.name}, ประเภท: ${acc.type}, ราคา: ${acc.price_thb} หน่วยเป็นบาทไทย, สิ่งอำนวยความสะดวก: ${acc.facilities.join(", ")}, ตั้งอยู่ใกล้กับ ${acc.location}, จังหวัด: ${acc.province}, latitude: ${acc.latitude}, longitude: ${acc.longitude}, ตั้งอยู่ที่: ${acc.city}, map: ${acc.google_maps}   \n`;
    });
    context += "\nข้อมูลจุดแวะพัก:\n";
    pois.forEach(poi => {
      context += `- ชื่อ: ${poi.name}, ประเภท: ${poi.type}, เหมาะสำหรับ: ${poi.suitable_for.join(", ")}, ตั้งอยู่ใกล้กับ ${poi.location}, จังหวัด: ${poi.province}, latitude: ${poi.latitude}, longitude: ${poi.longitude}, ตั้งอยู่ที่: ${poi.city}, map: ${poi.google_maps}\n`;
    });
    context += "\nข้อมูลร้านอาหาร:\n";
    restaurants.forEach(rest => {
      context += `- ชื่อ: ${rest.name}, ประเภท: ${rest.type}, เหมาะสำหรับ: ${rest.suitable_for.join(", ")}, ตั้งอยู่ใกล้กับ ${rest.location}, จังหวัด: ${rest.province}, latitude: ${rest.latitude}, longitude: ${rest.longitude}, ตั้งอยู่ที่: ${rest.city}, map: ${rest.google_maps}\n`;
    });
    return context;
  }
}

export default new Service();
