'use strict';

class Timer {
    constructor(callback, timeout) {
        this.callback = callback;
        this.timeout = timeout;
        this.stamp = Date.now();

        this.schedule();
    }

    get paused() {
        if (this._paused === undefined) {
            this._paused = false;
        }

        return this._paused;
    }

    set paused(value) {
        if (typeof value !== 'boolean') {
            throw new TypeError('accepts only booleans');
        }

        if (this._paused === true) {
            this.stamp = Date.now();
        }

        this._paused = value;
    }

    schedule() {
        const stamp = Date.now();
        const interval = stamp - this.stamp;

        this.timeout -= interval;
        this.stamp = stamp;

        clearTimeout(this.timer);

        if (this.paused) {
            return;
        } else if(this.timeout > 0) {
            this.timer = setTimeout(this.schedule.bind(this), this.timeout);
        } else {
            this.callback();
        }
    }

    pause() {
        this.paused = true;
        this.schedule();
    }

    resume() {
        this.paused = false;
        this.schedule();
    }
}

try {
    module.exports = Timer;
} catch (e) {
    console.log(e)
}
