import { useEffect } from 'react';

interface PerformanceData {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    // Only run in production
    if (import.meta.env.DEV) return;

    const performanceData: PerformanceData = {};

    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
      performanceData.lcp = lastEntry.startTime;
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'first-input') {
          const fidEntry = entry as PerformanceEntry & { processingStart: number; startTime: number };
          performanceData.fid = fidEntry.processingStart - fidEntry.startTime;
        }
      });
    });
    fidObserver.observe({ type: 'first-input', buffered: true });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'layout-shift') {
          const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
          }
        }
      });
      performanceData.cls = clsValue;
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });

    // First Contentful Paint (FCP)
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          performanceData.fcp = entry.startTime;
        }
      });
    });
    fcpObserver.observe({ type: 'paint', buffered: true });

    // Time to First Byte (TTFB)
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      performanceData.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
    }

    // Send performance data to analytics
    const sendPerformanceData = () => {
      if (window.gtag) {
        // Send to Google Analytics 4
        Object.entries(performanceData).forEach(([metric, value]) => {
          if (value !== undefined) {
            window.gtag('event', 'web_vitals', {
              custom_parameter_1: metric,
              value: Math.round(value),
              custom_parameter_2: 'core_web_vitals'
            });
          }
        });
      }

      // Send to Google Tag Manager dataLayer
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'core_web_vitals',
          ...performanceData
        });
      }
    };

    // Send data after page load
    if (document.readyState === 'complete') {
      setTimeout(sendPerformanceData, 1000);
    } else {
      window.addEventListener('load', () => {
        setTimeout(sendPerformanceData, 1000);
      });
    }

    // Cleanup observers
    return () => {
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
      fcpObserver.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
};

// Extend the Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export default PerformanceMonitor;