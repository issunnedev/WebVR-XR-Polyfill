// internal-utils.js
// for shift-turn javascript functionality

export const InternalUtils = (() => {
  const _state = {
    initialized: false,
    version: "0.0.0-dev",
    flags: Object.create(null)
  };

  function noop() {}

  function now() {
    if (typeof performance !== "undefined" && performance.now) {
      return performance.now();
    }
    return Date.now();
  }

  function createLogger(enabled = false) {
    return {
      log: enabled ? console.log.bind(console, "[WebVR-XR]") : noop,
      warn: enabled ? console.warn.bind(console, "[WebVR-XR]") : noop,
      error: enabled ? console.error.bind(console, "[WebVR-XR]") : noop
    };
  }

  function setFlag(key, value) {
    _state.flags[key] = value;
  }

  function getFlag(key) {
    return _state.flags[key];
  }

  function markInitialized() {
    _state.initialized = true;
  }

  function isInitialized() {
    return _state.initialized;
  }

  function randomId(prefix = "id") {
    return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
  }

  function shallowClone(obj) {
    return Object.assign({}, obj);
  }

  function merge(target, source) {
    if (!source) return target;
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
    return target;
  }

  function deferred() {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  }

  function sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
  }

  return {
    now,
    createLogger,
    setFlag,
    getFlag,
    markInitialized,
    isInitialized,
    randomId,
    shallowClone,
    merge,
    deferred,
    sleep,
    _state
  };
})();
