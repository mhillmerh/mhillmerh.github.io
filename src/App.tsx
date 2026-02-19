import { useEffect, useState} from 'react'
import { sounds } from './components/SoundManager';

import StartScreen from './pages/StartScreen';
import MenuScreen from './pages/MenuScreen';
import AboutScreen from './pages/AboutScreen';
import TechScreen from './pages/TechScreen';
import SocialScreen from './pages/SocialScreen';
import CertificationsScreen from './pages/CertificationsScreen';
import ProjectsScreen from './pages/ProjectsScreen';
import CreditsScreen from './pages/CreditsScreen';


import DoorTransition from './components/DoorTransition';
import Footer from './components/Footer';
import MusicToggle from './components/MusicToggle';


export default function App() {
  const [screen, setScreen] = useState("start");

  const [doorActive, setDoorActive] = useState(false);
  const [phase, setPhase] = useState<"closing" | "opening">("closing");

  function changeScreen(nextScreen: string) {
    setDoorActive(true);
    setPhase("opening");

    setTimeout(() => {
      setPhase("closing");
      sounds.playDoor();
    }, 50);

    setTimeout(() =>{
      setScreen(nextScreen);
    }, 1050)

    setTimeout(() => {
      setPhase("opening");
    }, 1250)

    setTimeout(() => {
      setDoorActive(false);
    }, 2200);
  }
  
  useEffect(() => {
    sounds.playTheme();
    return () => sounds.stopMusic();
  },[]);

  return (
    <>
      <DoorTransition active={doorActive} phase={phase} />
      
      {screen === "start" && (
        <StartScreen onStart={() => changeScreen("menu")} />
      )}

      {screen === "menu" && (
        <MenuScreen 
        onSelect={(section) => changeScreen(section)}/>
      )}

      {screen === "about" && (
        <AboutScreen onBack={() => changeScreen("menu")}/>)}

      {screen === "cert" && (
        <CertificationsScreen onBack={() => changeScreen("menu")}/>)}

      {screen === "projects" && (
        <ProjectsScreen onBack={() => changeScreen("menu")}/>)}

      {screen === "tech" && (
        <TechScreen onBack={() => changeScreen("menu")}/>)}

      {screen === "social" && (
        <SocialScreen onBack={() => changeScreen("menu")}/>)}

      {screen === "credits" && (
        <CreditsScreen onBack={() => changeScreen("menu")}/>)}

      <MusicToggle/>
      <Footer/>
      
    </>
  )
}