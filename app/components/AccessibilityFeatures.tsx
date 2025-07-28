import React, { useEffect, useState } from 'react';

const AccessibilityFeatures: React.FC = () => {
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    // Check user's system preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    setReducedMotion(prefersReducedMotion);
    setHighContrast(prefersHighContrast);

    // Apply initial settings
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }
    if (prefersHighContrast) {
      document.documentElement.classList.add('high-contrast');
    }

    // Keyboard navigation listener
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + A to toggle accessibility features
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        setShowFeatures(prev => !prev);
      }
      // Alt + H for high contrast
      if (e.altKey && e.key === 'h') {
        e.preventDefault();
        toggleHighContrast();
      }
      // Alt + M for reduced motion
      if (e.altKey && e.key === 'm') {
        e.preventDefault();
        toggleReducedMotion();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    
    if (newValue) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    localStorage.setItem('accessibility-high-contrast', newValue.toString());
  };

  const toggleReducedMotion = () => {
    const newValue = !reducedMotion;
    setReducedMotion(newValue);
    
    if (newValue) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.style.removeProperty('--animation-duration');
      document.documentElement.classList.remove('reduce-motion');
    }
    
    localStorage.setItem('accessibility-reduced-motion', newValue.toString());
  };

  const increaseFontSize = () => {
    const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const newSize = Math.min(currentSize * 1.1, 24); // Max 24px
    document.documentElement.style.fontSize = `${newSize}px`;
    localStorage.setItem('accessibility-font-size', newSize.toString());
  };

  const decreaseFontSize = () => {
    const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const newSize = Math.max(currentSize * 0.9, 12); // Min 12px
    document.documentElement.style.fontSize = `${newSize}px`;
    localStorage.setItem('accessibility-font-size', newSize.toString());
  };

  const resetFontSize = () => {
    document.documentElement.style.removeProperty('font-size');
    localStorage.removeItem('accessibility-font-size');
  };

  if (!showFeatures) {
    return (
      <button
        onClick={() => setShowFeatures(true)}
        className="fixed top-4 right-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 sr-only focus:not-sr-only"
        aria-label="Show accessibility options (Alt + A)"
        title="Accessibility Options (Alt + A)"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 w-72">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Accessibility Options
        </h3>
        <button
          onClick={() => setShowFeatures(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
          aria-label="Close accessibility options"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {/* High Contrast Toggle */}
        <div className="flex items-center justify-between">
          <label htmlFor="high-contrast" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            High Contrast (Alt + H)
          </label>
          <button
            id="high-contrast"
            onClick={toggleHighContrast}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              highContrast ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
            }`}
            aria-pressed={highContrast}
          >
            <span
              className={`inline-block h-4 w-4 rounded-full bg-white shadow-lg transform transition-transform ${
                highContrast ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Reduced Motion Toggle */}
        <div className="flex items-center justify-between">
          <label htmlFor="reduced-motion" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Reduce Motion (Alt + M)
          </label>
          <button
            id="reduced-motion"
            onClick={toggleReducedMotion}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              reducedMotion ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
            }`}
            aria-pressed={reducedMotion}
          >
            <span
              className={`inline-block h-4 w-4 rounded-full bg-white shadow-lg transform transition-transform ${
                reducedMotion ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Font Size Controls */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
            Font Size
          </label>
          <div className="flex space-x-2">
            <button
              onClick={decreaseFontSize}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
              aria-label="Decrease font size"
            >
              A-
            </button>
            <button
              onClick={resetFontSize}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
              aria-label="Reset font size"
            >
              Reset
            </button>
            <button
              onClick={increaseFontSize}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
              aria-label="Increase font size"
            >
              A+
            </button>
          </div>
        </div>

        {/* Keyboard Shortcuts Info */}
        <div className="text-xs text-gray-600 dark:text-gray-400 border-t pt-3">
          <p className="font-medium mb-1">Keyboard Shortcuts:</p>
          <ul className="space-y-1">
            <li>Alt + A: Toggle this panel</li>
            <li>Alt + H: Toggle high contrast</li>
            <li>Alt + M: Toggle reduced motion</li>
            <li>Tab: Navigate between elements</li>
            <li>Enter/Space: Activate buttons</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityFeatures;