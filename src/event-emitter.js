'use strict';

class EventEmitter {
    constructor(element) {
        this._element = element;

        this._events = [];
    }

    on(eventName, callback, ...options) {
        this._events.push({
            eventName,
            callback,
        });

        this._element.addEventListener(eventName, callback, ...options);

        return this;
    }

    once(eventName, callback) {
        return this.on(eventName, callback, {
            once: true,
        });
    }

    destroy() {
        this._events.forEach((event) => {
            this._element.removeEventListener(event.eventName, event.callback);
        });
    }
}

try {
    module.exports = EventEmitter;
} catch (e) {
    console.log(e);
}
