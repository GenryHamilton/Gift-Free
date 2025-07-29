// Crypto polyfill for browser environment
if (typeof global === 'undefined') {
  window.global = window;
}

if (typeof process === 'undefined') {
  window.process = { env: {} };
}

// Simple crypto polyfill if needed
if (typeof crypto !== 'undefined' && !crypto.hash) {
  crypto.hash = function(data) {
    // Simple hash implementation for build process
    let hash = 0;
    if (data.length === 0) return hash.toString();
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
  };
} 