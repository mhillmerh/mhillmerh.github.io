import moveSound from "../assets/sounds/doom_chat.wav";
import selectSound from "../assets/sounds/doom_powerup.wav";
import doorSound from "../assets/sounds/doom_door.wav";
import modemSound from "../assets/sounds/modem.mp3";
import shotSound from "../assets/sounds/doom_shot.wav";
import hoverSound from "../assets/sounds/doom_chat.wav";
import themeSound from "../assets/sounds/At Doom's Gate.wav";
import creditsSound from "../assets/sounds/Victory.wav";



class SoundManager {
    private moveAudio: HTMLAudioElement;
    private selectAudio: HTMLAudioElement;
    private doorAudio: HTMLAudioElement;
    private modemAudio: HTMLAudioElement;
    private shotAudio: HTMLAudioElement;
    private hoverAudio: HTMLAudioElement;

    private musicAudio: HTMLAudioElement | null = null;
    private muted = false;

    constructor() {
        this.moveAudio = new Audio(moveSound);
        this.moveAudio.volume = 0.4;

        this.selectAudio = new Audio(selectSound);
        this.selectAudio.volume = 0.7;

        this.doorAudio = new Audio(doorSound);
        this.doorAudio.volume = 0.8;

        this.modemAudio = new Audio(modemSound);
        this.modemAudio.volume = 0.3;
        this.modemAudio.loop = true;

        this.shotAudio = new Audio(shotSound);
        this.shotAudio.volume = 0.6;

        this.hoverAudio = new Audio(hoverSound);
        this.hoverAudio.volume = 0.4;
    }

    playMove() {
        const sound = this.moveAudio.cloneNode(true) as HTMLAudioElement;
        sound.play();
    }

    playSelect() {
        this.selectAudio.currentTime = 0;
        this.selectAudio.play();
    }

    playDoor() {
        this.doorAudio.currentTime = 0;
        this.doorAudio.play();
    }

    playModem() {
        this.modemAudio.currentTime = 0;
        this.modemAudio.play();
    }

    stopModem() {
        this.modemAudio.pause();
        this.modemAudio.currentTime = 0;
    }

    playStart() {
        this.shotAudio.currentTime = 0;
        this.shotAudio.play();
    }

    playHover() {
        const sound = this.hoverAudio.cloneNode(true) as HTMLAudioElement;
        sound.play();
    }

    playTheme() {
        this.playMusic(themeSound, 0.25);
    }

    playCreditsMusic() {
        this.playMusic(creditsSound, 0.35);
    }

    private playMusic(src: string, volume: number) {
        if (this.muted) return;

        this.stopMusic();

        this.musicAudio = new Audio(src);
        this.musicAudio.loop = true;
        this.musicAudio.volume = volume;
        this.musicAudio.play();
    }

    stopMusic() {
        if (!this.musicAudio) return;

        this.musicAudio.pause();
        this.musicAudio.currentTime = 0;
        this.musicAudio = null;
    }

    toggleMute() {
        this.muted = !this.muted;

        if (this.muted) {
            this.stopMusic();
        }else{
            this.playTheme();
        }

        return this.muted;
    }

    isMuted() {
        return this.muted;
    }
}

export const sounds = new SoundManager();