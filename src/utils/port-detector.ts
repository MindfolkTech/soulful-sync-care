/**
 * Smart port detection utility for development tools
 * Automatically detects which port the dev server is running on
 */

export interface PortDetectionOptions {
  /** Ports to check in order of preference */
  preferredPorts?: number[];
  /** Timeout for each port check in milliseconds */
  timeout?: number;
  /** Whether to log detection attempts */
  verbose?: boolean;
}

export class PortDetector {
  private options: Required<PortDetectionOptions>;

  constructor(options: PortDetectionOptions = {}) {
    this.options = {
      preferredPorts: [5173, 5174, 5175, 3000, 8080, 8088],
      timeout: 2000,
      verbose: false,
      ...options,
    };
  }

  /**
   * Detect the port where the dev server is running
   * @returns Promise<string> - The base URL of the running server
   */
  async detectPort(): Promise<string> {
    if (this.options.verbose) {
      console.log('🔍 Detecting dev server port...');
    }

    for (const port of this.options.preferredPorts) {
      const url = `http://localhost:${port}`;
      
      if (this.options.verbose) {
        console.log(`   Checking ${url}...`);
      }

      try {
        const isRunning = await this.checkPort(url);
        if (isRunning) {
          if (this.options.verbose) {
            console.log(`✅ Found dev server at ${url}`);
          }
          return url;
        }
      } catch (error) {
        if (this.options.verbose) {
          console.log(`   ❌ ${url} not available`);
        }
      }
    }

    throw new Error(
      `No running dev server found on ports: ${this.options.preferredPorts.join(', ')}\n` +
      'Make sure to run "npm run dev" first!'
    );
  }

  /**
   * Check if a specific port is running a dev server
   * @param url - The URL to check
   * @returns Promise<boolean> - Whether the server is running
   */
  private async checkPort(url: string): Promise<boolean> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.options.timeout);

    try {
      const response = await fetch(url, {
        method: 'HEAD',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      clearTimeout(timeoutId);
      return false;
    }
  }

  /**
   * Get the base URL with smart port detection
   * Falls back to default if detection fails
   * @param defaultUrl - Default URL to use if detection fails
   * @returns Promise<string> - The base URL
   */
  async getBaseUrl(defaultUrl: string = 'http://localhost:5173'): Promise<string> {
    try {
      return await this.detectPort();
    } catch (error) {
      console.warn(`⚠️  Port detection failed: ${error.message}`);
      console.warn(`   Using default URL: ${defaultUrl}`);
      return defaultUrl;
    }
  }
}

/**
 * Convenience function to detect port quickly
 * @param options - Detection options
 * @returns Promise<string> - The base URL of the running server
 */
export async function detectDevServerPort(options?: PortDetectionOptions): Promise<string> {
  const detector = new PortDetector(options);
  return detector.detectPort();
}

/**
 * Convenience function to get base URL with fallback
 * @param defaultUrl - Default URL to use if detection fails
 * @param options - Detection options
 * @returns Promise<string> - The base URL
 */
export async function getBaseUrl(
  defaultUrl: string = 'http://localhost:5173',
  options?: PortDetectionOptions
): Promise<string> {
  const detector = new PortDetector(options);
  return detector.getBaseUrl(defaultUrl);
}
