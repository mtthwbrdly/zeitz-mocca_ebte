import puppeteer, { type Browser, type LaunchOptions } from "puppeteer";
import chromium from "@sparticuz/chromium";

let browserPromise: Promise<Browser> | null = null;

export async function getPdfBrowser(): Promise<Browser> {
  if (browserPromise) {
    const browser = await browserPromise;
    if (browser.connected) {
      return browser;
    }
    browserPromise = null;
  }

  const isVercel = Boolean(process.env.VERCEL);
  const launchOptions: LaunchOptions = isVercel
    ? {
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
        ignoreHTTPSErrors: true
      }
    : {
        headless: true
      };

  browserPromise = puppeteer.launch(launchOptions);
  return browserPromise;
}
