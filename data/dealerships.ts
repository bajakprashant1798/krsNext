export interface Dealership {
    id: string;
    name: string;
    city: string;
    country: string;
    address: string;
    position: [number, number]; // [lat, lng]
    contact?: string;
}

export const dealerships: Dealership[] = [
    {
        id: 'london-hq',
        name: 'Kreck Robotics UK',
        city: 'London',
        country: 'United Kingdom',
        address: '123 Innovation Drive, Tech City, London EC1V 2NX',
        position: [51.5074, -0.1278],
        contact: '+44 20 7123 4567'
    },
    {
        id: 'dubai-showroom',
        name: 'Kreck Middle East',
        city: 'Dubai',
        country: 'UAE',
        address: 'Unit 45, Future Tower, Business Bay, Dubai',
        position: [25.2048, 55.2708],
        contact: '+971 4 123 4567'
    },
    {
        id: 'mumbai-flagship',
        name: 'Kreck India HQ',
        city: 'Mumbai',
        country: 'India',
        address: 'B-Wing, Tech Park, Andheri East, Mumbai 400069',
        position: [19.0760, 72.8777],
        contact: '+91 22 1234 5678'
    },
    {
        id: 'sydney-office',
        name: 'Kreck Australia',
        city: 'Sydney',
        country: 'Australia',
        address: 'Level 10, 100 George St, Sydney NSW 2000',
        position: [-33.8688, 151.2093]
    },
    {
        id: 'ahmedabad-office',
        name: 'devnandan desire',
        city: 'Ahmedabad',
        country: 'India',
        address: 'devnandan desire',
        position: [23.101595786219566, 72.59677008304237]
    }
];
