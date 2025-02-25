import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL || process.env.API_URL;

// export const fetchHomeStaticData = async () => (await axios.get(`${API_URL}/home-static`)).data;

export const fetchRecentlyPosted = async () => {
    return {
        status: 200,
        recentProperties: [
            {
                id: 1,
                title: "Slide 1",
                description: "tomato",
                price: "₹ 9,000/Mo",
                uploadedAt: "2 sec ago",
                postedBy: "Agent",
                image: "https://picsum.photos/200/300"
            },

            {
                id: 2,
                title: "Slide 2",
                description: "skyblue",
                price: "₹ 4,000/Mo",
                uploadedAt: "5 hrs ago",
                postedBy: "Landlord",
                image: "https://picsum.photos/200/300"
            },

            {
                id: 3,
                title: "Slide 3",
                description: "lightgreen",
                price: "₹ 7,000/Mo",
                uploadedAt: "6 days ago",
                postedBy: "Agent",
                image: "https://picsum.photos/200/300"
            },
        ],
    }
};

export const fetchPropertyType = async () => {
    return {
        status: 200,
        propertyTypes: [
            { id: 1, name: "PG" },
            { id: 2, name: "Bunglow" },
            { id: 3, name: "Appartment/Flat" },
            { id: 4, name: "Shop" },
            { id: 5, name: "Office" },
            { id: 6, name: "Other" },
        ]
    }
};

export const fetchCuratedRentalProperty = async () => {
    return {
        status: 200,
        curatedProperties: [
            { id: 1, title: "For Family", description: "+1800 properties", image: "@/assets/images/curated/curated-1.png" },

            { id: 2, title: "For Single Woman", description: "+1500 properties", image: "@/assets/images/curated/curated-2.png" },
        ],
    }
};

export const fetchNotifications = async (userId: string) => {
    return {
        status: 200,
        notifications: [
            {
                id: 1,
                title: "Notification 1",
                description: "Notification 1 Description"
            },
            {
                id: 2,
                title: "Notification 2",
                description: "Notification 2 Description"
            },
            {
                id: 3,
                title: "Notification 3",
                description: "Notification 3 Description"
            }
        ]
    }
};

// export const fetchNotifications = async (userId: string) => (await axios.get(`${API_URL}/notifications/${userId}`)).data;