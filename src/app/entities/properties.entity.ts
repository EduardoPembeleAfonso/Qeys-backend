export default interface PropertiesEntity {
  id: string;
  address: string;
  title: string;
  description: string;
  areaProperty: number;
  isForSale: boolean;
  price: string;
  photo: string;
  numberBedrooms: number;
  numberBathrooms: number;
  likes: number;
  coordinates: string;
  // photos: string[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
