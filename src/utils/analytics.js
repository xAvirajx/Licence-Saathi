// Privacy-First Local Event & Page Analytics Engine
const STORAGE_KEY = 'ls_local_analytics';

const getStore = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { pageViews: {}, events: {}, sessionCount: 1, lastActive: Date.now() };
  } catch (err) {
    return { pageViews: {}, events: {}, sessionCount: 1, lastActive: Date.now() };
  }
};

const saveStore = (store) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (err) {
    console.warn('Local analytics storage quota exceeded or unavailable');
  }
};

/**
 * Tracks route navigation transitions
 * @param {string} pathname 
 */
export const trackPageView = (pathname) => {
  if (!pathname || typeof window === 'undefined') return;
  const store = getStore();
  store.pageViews[pathname] = (store.pageViews[pathname] || 0) + 1;
  store.lastActive = Date.now();
  saveStore(store);
};

/**
 * Tracks key milestone events (e.g. mock test passed, stage unlocked)
 * @param {string} eventName 
 * @param {string|number} [value] 
 */
export const trackEvent = (eventName, value = null) => {
  if (!eventName || typeof window === 'undefined') return;
  const store = getStore();
  if (!store.events[eventName]) {
    store.events[eventName] = { count: 0, lastValue: null, updatedAt: Date.now() };
  }
  store.events[eventName].count += 1;
  if (value !== null) {
    store.events[eventName].lastValue = value;
  }
  store.events[eventName].updatedAt = Date.now();
  saveStore(store);
};

/**
 * Returns aggregated insights for display
 */
export const getAnalyticsSummary = () => {
  const store = getStore();
  const totalViews = Object.values(store.pageViews).reduce((a, b) => a + b, 0);
  const totalEvents = Object.values(store.events).reduce((acc, curr) => acc + curr.count, 0);
  return {
    totalViews,
    totalEvents,
    topPages: Object.entries(store.pageViews)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3),
    lastActive: store.lastActive
  };
};

/**
 * Clears all analytics logs
 */
export const clearAnalytics = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    // Ignore
  }
};