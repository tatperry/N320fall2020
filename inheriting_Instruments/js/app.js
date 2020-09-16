class Instrument {
  constructor(Instrument, duration, pitch) {
    this.Instrument = Instrument;
    this.duration = duration;
    this.pitch = pitch;
  }
  play() {
    console.log(
      this.Instrument +
        " plays " +
        this.pitch +
        " for " +
        this.duration +
        " note "
    );
  }
}

class Violen extends Instrument {
  constructor(Instrument, pitch) {
    super(Instrument, pitch, 1);
  }
}
class Piano extends Instrument {
  constructor(Instrument, pitch) {
    super(Instrument, pitch, 0.5);
  }
}
let myViolen = new Violen(" Violen ", " A ");
let myPiano = new Piano(" Piano ", " D ");

myViolen.play();
myPiano.play();
