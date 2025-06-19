import { t, type Static } from "elysia";
import { Extract } from "../../utils/common";

export const ExampleModel = Extract(t.Object({
  name: t.String(),
}));

export const ExampleModel2 = Extract(t.Object({
  test: t.String(),
}));

// Schema สำหรับ Accommodation Object ภายใน recommendations_acc
const AccommodationSchema = t.Object({
  name: t.Optional(t.String()),
  location: t.Optional(t.String()),
  city: t.Optional(t.String()),
  province: t.Optional(t.String()),
  latitude: t.Optional(t.Number()),
  longitude: t.Optional(t.Number()),
  price_thb: t.Optional(t.Number()),
  facilities: t.Optional(t.Array(t.String())),
  google_maps: t.Optional(t.String({ format: 'uri' })),
  type: t.Optional(t.String()),
});

// Schema สำหรับ Point of Interest (POI) Object ภายใน recommendations_poi
const PoiSchema = t.Object({
  name: t.Optional(t.String()),
  location: t.Optional(t.String()),
  address: t.Optional(t.String()),
  city: t.Optional(t.String()),
  province: t.Optional(t.String()),
  latitude: t.Optional(t.Number()),
  longitude: t.Optional(t.Number()),
  activities: t.Optional(t.Array(t.String())),
  avg_time_spent: t.Optional(t.String()),
  suitable_for: t.Optional(t.Array(t.String())),
  avg_price_per_person: t.Optional(t.Number()),
  type: t.Optional(t.String()),
});

// Schema สำหรับ Restaurant Object ภายใน recommendations_restaurant
const RestaurantSchema = t.Object({
  name: t.Optional(t.String()),
  location: t.Optional(t.String()),
  address: t.Optional(t.String()),
  city: t.Optional(t.String()),
  province: t.Optional(t.String()),
  latitude: t.Optional(t.Number()),
  longitude: t.Optional(t.Number()),
  google_map: t.Optional(t.String({ format: 'uri' })),
  menu_recommend: t.Optional(t.String()),
  avg_price_per_person: t.Optional(t.Number()),
  suitable_for: t.Optional(t.Array(t.String())),
  type: t.Optional(t.String()),
});

// Schema สำหรับ Response หลักทั้งหมด
export const TripPlanResponseSchema = t.Object({
    aiMessage: t.String(),
    recommendations: t.Array(t.String()), // รายชื่อสถานที่ทั้งหมด (ชื่อเท่านั้น)
    recommendations_detail: t.String(), // รายละเอียดแผนการเดินทาง
    recommendations_acc: t.Array(AccommodationSchema), // รายละเอียดที่พัก
    recommendations_poi: t.Array(PoiSchema), // รายละเอียดสถานที่ท่องเที่ยว/ร้านอาหาร
    recommendations_resturant: t.Array(RestaurantSchema), // รายละเอียดร้านอาหาร
});

export const ReqAskModel = t.Object({
  userMessage: t.String(),
});

export type reqAskModel = Static<typeof ReqAskModel> 
export type resAskModel = Static<typeof TripPlanResponseSchema>
export type accomoModel = Static<typeof AccommodationSchema>
export type poiSchema = Static<typeof PoiSchema>
export type restaurantSchema = Static<typeof RestaurantSchema>