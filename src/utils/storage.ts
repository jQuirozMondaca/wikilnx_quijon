export interface WikiPage {
  slug: string;
  title: string;
  content: string;
}

const STORAGE_KEY = "wiki_pages";

export function loadPages(): WikiPage[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function savePages(pages: WikiPage[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
