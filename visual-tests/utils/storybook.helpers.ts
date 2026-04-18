import type { StorybookEntry } from './storybook.types';
import { config } from './config';

export async function fetchStorybookEntries() {
  const res = await fetch(`${config.storybookUrl}/index.json`);

  if (!res.ok) {
    throw new Error('Failed to fetch Storybook index.json');
  }

  const data = (await res.json()) as {
    entries: Record<string, StorybookEntry>;
  };

  return Object.values(data.entries);
}

export function filterStoriesByComponent(
  entries: StorybookEntry[],
  componentTitle: string
) {
  return entries.filter((entry) => {
    return (
      entry.title === componentTitle &&
      !['playground', 'docs'].some((exclude) => entry.id.includes(exclude))
    );
  });
}

export function groupStoriesByComponent(entries: StorybookEntry[]) {
  const map = new Map<string, StorybookEntry[]>();

  for (const entry of entries) {
    if (['playground', 'docs'].some((exclude) => entry.id.includes(exclude))) {
      continue;
    }

    if (!map.has(entry.title)) {
      map.set(entry.title, []);
    }

    map.get(entry.title)!.push(entry);
  }

  return map;
}
