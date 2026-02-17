import DoomPortfolio from "../assets/images/projects/DoomForlio.png";
import apiImages from "../assets/images/projects/API.png";
import NekoWallet from "../assets/images/projects/neko_wallet.png";
import rptsBoot from "../assets/images/projects/rpts.png"

export const projects = [
    {
        name: "Doom PortFolio",
        description: "Portafolio con un estilo de videojuego retro, inspidado en Doom.",
        tech: ["React", "TypeScript", "HTML", "CSS"],
        status: "COMPLETED",
        url: "https://mhillmerh.github.io/",
        image: DoomPortfolio,
        locked: false,
    },
    {
        name: "RobotPentester",
        description: "Proyecto de titulo, en el cual se automatiza el escaneo de vulnerabilidades.",
        tech: ["Python", "Docker", "Jmeter", "Owasp Zap"],
        status: "COMPLETED",
        url: "https://github.com/mhillmerh/rpts",
        image: rptsBoot,
        locked: true,
    },
    {
        name: "Wallet Digital",
        description: "Proyecto que simula una billetera digital. autenticación, gestión de saldo, depósitos, retiros, transferencias y visualización de movimientos.",
        tech: ["HTML", "CSS","JavaScript", "JQuery"],
        status: "IN PROGRESS...",
        url: "https://github.com/mhillmerh/wallet-jquery",
        image: NekoWallet,
        locked: false,
    },
    {
        name: "API PassengerFlight",
        description: "API REST para gestionar información de los vuelos y pasajeros, desarrollada como parte de la prueba técnica.",
        tech: ["Python", "Flask", "MySQL", "Docker", "Render"],
        status: "COMPLETED",
        url: "https://github.com/mhillmerh/api-passengersflight",
        image: apiImages,
        locked: true,
    }
]