export type LoginTypes = {
  username: string;
  password: string;
  userType: string;
};


export type RegisterTypes = {
  username: string;
  email: string;
  password: string;
  conf_password: string;
  phone: string;
  dial_code: string;
  userType: string;
};

type Property = {
  id: number;
  title: string;
  description: string;
  price: string;
  uploadedAt: string;
  postedBy: string;
  image: string;
}

export type RecentlyPostedData = {
  recentProperties: Property[];
}


type PropertyType = {
  id: number;
  name: string;
}

export type PropertyTypeResponse = {
  propertyTypes: PropertyType[];
}

export type NotificationResponse = {
  notifications: any[]; 
}