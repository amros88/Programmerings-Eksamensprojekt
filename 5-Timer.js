class Timer {
  constructor(duration) {
    this.duration = duration;
    this.startTime = millis();
  }

  isFinished() {
    return millis() - this.startTime >= this.duration;
  }

  remaining() {
    return max(0, this.duration - (millis() - this.startTime));
  }
}