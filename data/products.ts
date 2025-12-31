export interface Product {
    id: string;
    slug: string;
    name: string;
    category: string;
    description: string;
    image: string;
    images?: string[]; // Multiple images for gallery
    color: string;
    features?: string[];
}

export const products: Product[] = [
    {
        id: "1",
        slug: "king-series-touch-panel",
        name: "King Series",
        category: "Touch Panel",
        description: "The pinnacle of sophistication. Sleek touch panel switches that blends luxury with seamless home automation. Featuring a tempered glass finish and responsive capacitive touch.",
        image: "/images/products/king_touch_panel/k_touch_panel.png",
        images: [
            "/images/products/king_touch_panel/k_touch_panel.png",
            "/images/products/king_touch_panel/k_touch_panel.png", // Mock duplicate for gallery demo
        ],
        color: "#00071b",
        features: [
            "Premium Tempered Glass Finish",
            "Capacitive Touch Interface",
            "Wi-Fi Enabled Control",
            "Voice Assistant Compatible (Alexa/Google)",
            "Programmable Scenes & Schedules",
            "LED Status Indicators"
        ]
    },
    {
        id: "2",
        slug: "royal-series-touch-panel",
        name: "Royal Series",
        category: "Touch Panel",
        description: "Intelligent design meets effortless control. Touch and dimmer functionality for a smarter, more elegant living.",
        image: "/images/products/royal_touch_panel/r_touch_panel.png",
        images: [
            "/images/products/royal_touch_panel/r_touch_panel.png",
            "/images/products/royal_touch_panel/r_touch_panel.png"
        ],
        color: "#0142ab",
        features: [
            "Seamless Dimmer Control",
            "Elegant Backlighting",
            "Energy Monitoring",
            "Multi-way Switching Support",
            "Retrofit Compatible"
        ]
    },
    {
        id: "3",
        slug: "smart-series-retrofit",
        name: "Smart Series",
        category: "Retrofit Switch",
        description: "Classic made contemporary. Transform your existing switches into smart, automated elegance without compromise.",
        image: "/images/products/smart_retrofit/s_retrofit.png",
        images: [
            "/images/products/smart_retrofit/s_retrofit.png",
        ],
        color: "#022e67",
        features: [
            "Retains Existing Switch Plates",
            "Compact Module Design",
            "App Control Integration",
            "Schedule Automation",
            "No Neutral Wire Required (Optional)"
        ]
    },
    {
        id: "4",
        slug: "sensor-hub",
        name: "Sensor Hub",
        category: "Automation Hub",
        description: "Smart power saving mode, workflow support, and seamless integration with smart home systems.",
        image: "/images/products/sensor_hub/sensor_hub.png",
        images: [
            "/images/products/sensor_hub/sensor_hub.png",
        ],
        color: "#001453",
        features: [
            "Centralized Zigbee/Matter Control",
            "Offline Processing Capability",
            "High Security Encryption",
            "Supports 100+ Devices",
            "Long Range Connectivity"
        ]
    },
    {
        id: "5",
        slug: "digital-door-lock",
        name: "Digital Door Lock",
        category: "Security",
        description: "Advanced biometric and digital security for your home. Keyless entry with remote access capabilities.",
        image: "/images/products/door_lock/door_lock.png",
        images: [
            "/images/products/door_lock/door_lock.png",
        ],
        color: "#333",
        features: [
            "Fingerprint Biometric Access",
            "PIN Code & RFID Card Entry",
            "App Remote Unlock",
            "Emergency Mechanical Key",
            "Anti-Tamper Alarm"
        ]
    },
    {
        id: "6",
        slug: "intruder-alert-sensor",
        name: "Intruder Alert Sensor",
        category: "Security",
        description: "Real-time security monitoring with instant notifications. Protect your home with smart intruder detection.",
        image: "/images/products/intruder_alert/intruder_alert.png",
        images: [
            "/images/products/intruder_alert/intruder_alert.png"
        ],
        color: "#444",
        features: [
            "Motion Detection",
            "Instant Mobile Alerts",
            "Siren Integration",
            "Low Battery Notification",
            "Easy Peel-and-Stick Installation"
        ]
    },
    {
        id: "7",
        slug: "door-window-sensor",
        name: "Door & Window Sensor",
        category: "Security",
        description: "Compact sensors that monitor entry points. Trigger scenes or alarms when doors or windows are opened.",
        image: "/images/products/door_sensor/door_sensor.png",
        images: [
            "/images/products/door_sensor/door_sensor.png"
        ],
        color: "#555",
        features: [
            "Real-time Open/Close Status",
            "Scene Triggering (e.g. Lights On)",
            "Compact Discreet Design",
            "Long Battery Life",
            "History Log in App"
        ]
    },
    {
        id: "8",
        slug: "automatic-curtain",
        name: "Automatic Curtain",
        category: "Automation",
        description: "Automate your curtains for privacy and energy efficiency. Control via app, voice, or schedule.",
        image: "/images/products/automatic_curtain/automatic_curtain.png",
        images: [
            "/images/products/automatic_curtain/automatic_curtain.png"
        ],
        color: "#666",
        features: [
            "Silent Motor Operation",
            "Touch-to-Move Assist",
            "Sunlight Sensor Integration",
            "Schedule-based Opening",
            "Voice Control Support"
        ]
    }
];
