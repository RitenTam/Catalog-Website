export type AnalyticsSource = "product-details" | "best-sellers" | "search-results" | "other";

export type AnalyticsDateFilter = "daily" | "weekly" | "monthly";

export type WhatsAppClickEvent = {
  id: string;
  productId: number;
  productName: string;
  productCategory: string;
  source: AnalyticsSource;
  timestamp: string;
  sessionId?: string;
  converted: boolean;
  convertedAt?: string;
};

export type ProductAnalyticsRow = {
  productId: number;
  productName: string;
  productCategory: string;
  clicks: number;
  convertedOrders: number;
  conversionRate: number;
};

export type AnalyticsSnapshot = {
  totalClicks: number;
  totalConverted: number;
  overallConversionRate: number;
  clicksPerProduct: ProductAnalyticsRow[];
  topProducts: ProductAnalyticsRow[];
  mostClickedProduct: ProductAnalyticsRow | null;
  bestConvertingProduct: ProductAnalyticsRow | null;
  recentInquiries: WhatsAppClickEvent[];
  trendPoints: Array<{ label: string; clicks: number; converted: number }>;
};

const STORAGE_KEY = "catalog-whatsapp-analytics-events";
const SESSION_KEY = "catalog-whatsapp-session-id";
const CHANGE_EVENT = "catalog-whatsapp-analytics-updated";

function safeReadEvents(): WhatsAppClickEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as WhatsAppClickEvent[];
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((event) =>
      Boolean(
        event &&
          typeof event.id === "string" &&
          typeof event.productId === "number" &&
          typeof event.productName === "string" &&
          typeof event.timestamp === "string"
      )
    );
  } catch {
    return [];
  }
}

function safeWriteEvents(events: WhatsAppClickEvent[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

function dispatchChange() {
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function getDateCutoff(filter: AnalyticsDateFilter) {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  if (filter === "daily") return now - oneDay;
  if (filter === "weekly") return now - oneDay * 7;
  return now - oneDay * 30;
}

function toPercent(part: number, total: number) {
  if (total <= 0) return 0;
  return Number(((part / total) * 100).toFixed(2));
}

function formatTrendLabel(date: Date, filter: AnalyticsDateFilter) {
  if (filter === "daily") {
    return `${String(date.getHours()).padStart(2, "0")}:00`;
  }
  return `${date.getDate()}/${date.getMonth() + 1}`;
}

export function getOrCreateAnalyticsSessionId() {
  const existing = sessionStorage.getItem(SESSION_KEY);
  if (existing) return existing;

  const created = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  sessionStorage.setItem(SESSION_KEY, created);
  return created;
}

export function recordWhatsAppClick(input: {
  productId: number;
  productName: string;
  productCategory?: string;
  source?: AnalyticsSource;
  sessionId?: string;
}) {
  const events = safeReadEvents();
  const event: WhatsAppClickEvent = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    productId: input.productId,
    productName: input.productName,
    productCategory: input.productCategory?.trim() || "Uncategorized",
    source: input.source || "other",
    timestamp: new Date().toISOString(),
    sessionId: input.sessionId,
    converted: false,
  };

  events.push(event);
  safeWriteEvents(events);
  dispatchChange();

  return event;
}

export function markWhatsAppInquiryConverted(eventId: string) {
  const events = safeReadEvents();
  const updated = events.map((event) => {
    if (event.id !== eventId || event.converted) return event;
    return {
      ...event,
      converted: true,
      convertedAt: new Date().toISOString(),
    };
  });

  safeWriteEvents(updated);
  dispatchChange();
}

export function subscribeToWhatsAppAnalytics(callback: () => void) {
  const onLocal = () => callback();
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) callback();
  };

  window.addEventListener(CHANGE_EVENT, onLocal);
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener(CHANGE_EVENT, onLocal);
    window.removeEventListener("storage", onStorage);
  };
}

export function getWhatsAppAnalyticsSnapshot(options: {
  dateFilter: AnalyticsDateFilter;
  categoryFilter?: string;
  topLimit: number;
}): AnalyticsSnapshot {
  const events = safeReadEvents();
  const cutoff = getDateCutoff(options.dateFilter);

  const dateFiltered = events.filter((event) => new Date(event.timestamp).getTime() >= cutoff);
  const categoryFiltered =
    options.categoryFilter && options.categoryFilter !== "all"
      ? dateFiltered.filter((event) => event.productCategory === options.categoryFilter)
      : dateFiltered;

  const map = new Map<number, ProductAnalyticsRow>();

  for (const event of categoryFiltered) {
    const current = map.get(event.productId);
    if (!current) {
      map.set(event.productId, {
        productId: event.productId,
        productName: event.productName,
        productCategory: event.productCategory,
        clicks: 1,
        convertedOrders: event.converted ? 1 : 0,
        conversionRate: 0,
      });
    } else {
      current.clicks += 1;
      if (event.converted) current.convertedOrders += 1;
    }
  }

  const clicksPerProduct = Array.from(map.values())
    .map((row) => ({
      ...row,
      conversionRate: toPercent(row.convertedOrders, row.clicks),
    }))
    .sort((a, b) => b.clicks - a.clicks);

  const totalClicks = categoryFiltered.length;
  const totalConverted = categoryFiltered.filter((event) => event.converted).length;

  const topProducts = clicksPerProduct.slice(0, Math.max(1, options.topLimit));

  const mostClickedProduct = clicksPerProduct.length > 0 ? clicksPerProduct[0] : null;

  const bestConvertingProduct =
    clicksPerProduct
      .filter((row) => row.clicks > 0)
      .sort((a, b) => {
        if (b.conversionRate === a.conversionRate) return b.clicks - a.clicks;
        return b.conversionRate - a.conversionRate;
      })[0] || null;

  const recentInquiries = [...categoryFiltered]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 20);

  const trendBuckets = new Map<string, { label: string; clicks: number; converted: number }>();

  for (const event of categoryFiltered) {
    const date = new Date(event.timestamp);
    const bucketDate = new Date(date);

    if (options.dateFilter === "daily") {
      bucketDate.setMinutes(0, 0, 0);
    } else {
      bucketDate.setHours(0, 0, 0, 0);
    }

    const key = bucketDate.toISOString();
    const existing = trendBuckets.get(key);
    if (existing) {
      existing.clicks += 1;
      if (event.converted) existing.converted += 1;
    } else {
      trendBuckets.set(key, {
        label: formatTrendLabel(bucketDate, options.dateFilter),
        clicks: 1,
        converted: event.converted ? 1 : 0,
      });
    }
  }

  const trendPoints = Array.from(trendBuckets.entries())
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .map((entry) => entry[1]);

  return {
    totalClicks,
    totalConverted,
    overallConversionRate: toPercent(totalConverted, totalClicks),
    clicksPerProduct,
    topProducts,
    mostClickedProduct,
    bestConvertingProduct,
    recentInquiries,
    trendPoints,
  };
}

export function exportAnalyticsEventsToCsv(events: WhatsAppClickEvent[]) {
  const headers = [
    "Event ID",
    "Product ID",
    "Product Name",
    "Category",
    "Source",
    "Timestamp",
    "Session ID",
    "Converted",
    "Converted At",
  ];

  const lines = events.map((event) => {
    const values = [
      event.id,
      String(event.productId),
      event.productName,
      event.productCategory,
      event.source,
      event.timestamp,
      event.sessionId || "",
      event.converted ? "Yes" : "No",
      event.convertedAt || "",
    ];

    return values
      .map((value) => `"${String(value).replace(/"/g, '""')}"`)
      .join(",");
  });

  return [headers.join(","), ...lines].join("\n");
}

export function getFilteredAnalyticsEvents(options: {
  dateFilter: AnalyticsDateFilter;
  categoryFilter?: string;
}) {
  const events = safeReadEvents();
  const cutoff = getDateCutoff(options.dateFilter);
  const dateFiltered = events.filter((event) => new Date(event.timestamp).getTime() >= cutoff);

  if (!options.categoryFilter || options.categoryFilter === "all") {
    return dateFiltered;
  }

  return dateFiltered.filter((event) => event.productCategory === options.categoryFilter);
}
