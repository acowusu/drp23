export interface SocietyPayload {
  name: string;
  description: string;
  type: string;
  metadata: {
    Instagram: string;
    Whatsapp: string;
    image?: string;
  };
  society_id?: string;
  objectID?: string;
}
export interface EventPayload {
  name: string;
  description: string;
  image_url: string;
  society: string;
  location: string;
  date_time: string;
  ticket_price: number;
  latitude: number;
  longitude: number;
  event_id: string;
  objectID?: string;
  tags: string[];
}
