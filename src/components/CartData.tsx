import badgeImage from "../assets/images/bagdes/AZ-900.png";
import badgeImage204 from "../assets/images/bagdes/AZ-204.png";
import badgeDp900 from "../assets/images/bagdes/DP-900.png";


export const certList = [
    {
        name: "Microsoft Azure Fundamentals",
        code: "AZ-900",
        description:
            "Validate Foundational Knoledge of cloud concepts, Azure services, pricing and security",
        badge: badgeImage,
        url: "https://www.credly.com/badges/5b40ffcc-708a-44ab-82d9-9087735bc3b6/public_url",
        unlocked: true,
        xp: 500,
        rarity: "RARE"
    },

    {
        name: "Azure Developer Associate",
        code: "AZ-204",
        description:
            "Currently in progress. Focused on building cloud solutions using Azure services",
        badge: badgeImage204,
        url: "",
        unlocked: false,
        xp: 0,
        rarity: "LOCKED",
    },
    {
        name: "Azure Data Fundamentals",
        code: "DP-900",
        description:
            "Future certification path, focused on data workloads in Azure",
        badge: badgeDp900,
        url: "",
        unlocked: false,
        xp: 0,
        rarity: "LOCKED",
    },
];