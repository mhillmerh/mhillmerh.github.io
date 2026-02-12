import pythonIcon from "../assets/icons/pythonicon.svg";
import typeScriptIcon from "../assets/icons/typescripticon.svg";
import javaScriptIcon from "../assets/icons/javascripticon.svg";
import javaIcon from "../assets/icons/javaicon.svg";
import jqueryIcon from "../assets/icons/jqueryicon.svg";
import html5Icon from "../assets/icons/html5icon.svg";
import cssIcon from "../assets/icons/cssicon.svg";
import bootStrapIcon from "../assets/icons/bootstrapicon.svg";
import dockerIcon from "../assets/icons/dockericon.svg";
import postgresIcon from "../assets/icons/postgresqlicon.svg";
import mysqlIcon from "../assets/icons/mysqlicon.svg";
import angularIcon from "../assets/icons/angularicon.svg";
import ionicIcon from "../assets/icons/ionicicon.svg";
import reactIcon from "../assets/icons/reacticon.svg";
import jmeterIcon from "../assets/icons/apachejmetericon.svg";
import metasploitIcon from "../assets/icons/metasploiticon.svg";
import selemiunIcon from "../assets/icons/seleniumicon.svg";
import linuxIcon from "../assets/icons/linuxicon.svg";
import ubuntuIcon from "../assets/icons/ubuntuicon.svg";
import gitIcon from "../assets/icons/giticon.svg";
import githubIcon from "../assets/icons/githubicon.svg";

import "../index.css";

export type TechItem = {
    name: string;
    level: "Bajo" | "Medio" | "Alto";
    icon: string;
    description: string;
};

export const techlist: TechItem[] = [
    {name: "Python", level: "Medio", icon: pythonIcon, description: ""},
    {name: "JavaScript", level: "Medio", icon: javaScriptIcon, description: ""},
    {name: "TypeScript", level: "Medio", icon: typeScriptIcon, description: ""},
    {name: "Java", level: "Medio", icon: javaIcon, description: ""},

    {name: "HTML5", level: "Alto", icon: html5Icon, description: ""},
    {name: "CSS", level: "Alto", icon: cssIcon, description: ""},
    {name: "Bootstrap", level: "Medio", icon: bootStrapIcon, description: ""},
    {name: "jQuery", level: "Bajo", icon: jqueryIcon, description: ""},

    {name: "React", level: "Bajo", icon: reactIcon, description: ""},
    {name: "Angular", level: "Bajo", icon: angularIcon, description: ""},
    {name: "Ionic", level: "Medio", icon: ionicIcon, description: ""},

    {name: "Docker", level: "Medio", icon: dockerIcon, description: ""},
    {name: "PostgreSQL", level: "Medio", icon: postgresIcon, description: ""},
    {name: "MySQL", level: "Medio", icon: mysqlIcon, description: ""},

    {name: "Apache Jmeter", level: "Medio", icon: jmeterIcon, description: ""},
    {name: "Metasploit", level: "Bajo", icon: metasploitIcon, description: ""},
    {name: "Selenium", level: "Medio", icon: selemiunIcon, description: ""},

    {name: "Linux", level: "Medio", icon: linuxIcon, description: ""},
    {name: "Ubuntu", level: "Medio", icon: ubuntuIcon, description: ""},

    {name: "Git", level: "Medio", icon: gitIcon, description: ""},
    {name: "GitHub", level: "Medio", icon: githubIcon, description: ""},
];


