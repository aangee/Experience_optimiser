class AudioSource {
    constructor(urlAudio) {
        this.myAudio = document.createElement("audio");
        this.myAudio.src = urlAudio + ".wav";
    }
    play() {
        this.myAudio.play();
        console.log('Play: ' + this.myAudio);
    }
    pause() {
        this.myAudio.pause();

    }
}