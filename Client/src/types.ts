export interface Item {
  _id: string;
  name: string;
  description: string;
  location: string;
  type: string;
  image?: string;
  price: number; 
  propertyType?: string;
  area?: number;
  rooms?: number;
  brand?: string;
  model?: string;
  year?: number;
  mileage?: number;
  serviceType?: string;
  experience?: number;
  workSchedule?: string;
  userId?: {
    _id: string;
    username: string;
    email: string;
  };
}
