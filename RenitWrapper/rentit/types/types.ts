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

export type LoginResponseProp = {
  accessToken: string;
  refreshToken: string;
  status: number;
}

export type LoginRequestProps = {
  username: string;
  password: string;
  userType: string;
}

export type RegisterResponseProp = {
  id: number;
  username: string;
  email: string;
  phone: string;
  dial_code: string;
  userType: string;
  createdAt: string;
  updatedAt: string;
  status: number;
}

export type RegisterRequestProps = {
  username: string;
  email: string;
  password: string;
  phone: string;
  dial_code: string;
  userType: string;
}
