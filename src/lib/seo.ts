// Pomocnicze funkcje SEO: wyciąganie FAQ z Markdown i dobieranie powiązanych artykułów.

export interface FaqItem {
  q: string;
  a: string;
}

/** Usuwa podstawowe znaczniki Markdown, zostawiając czysty tekst. */
function stripMarkdown(s: string): string {
  return s
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Wyciąga pytania i odpowiedzi z sekcji FAQ w treści Markdown.
 * Zakłada format: nagłówek "### Pytanie?" + akapit odpowiedzi.
 * Brane są tylko nagłówki kończące się znakiem "?".
 */
export function extractFaq(markdown: string): FaqItem[] {
  const lines = markdown.split(/\r?\n/);
  const items: FaqItem[] = [];
  let current: { q: string } | null = null;
  let answer: string[] = [];

  const flush = () => {
    if (current) {
      const q = stripMarkdown(current.q);
      const a = stripMarkdown(answer.join(' '));
      if (q.endsWith('?') && a) items.push({ q, a });
      current = null;
      answer = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith('### ')) {
      flush();
      current = { q: line.slice(4) };
      answer = [];
    } else if (line.startsWith('## ') || line.startsWith('# ')) {
      flush();
    } else if (current && line.trim() !== '') {
      answer.push(line.trim());
    }
  }
  flush();
  return items;
}

interface ArticleLike {
  id: string;
  data: {
    title: string;
    description: string;
    seoKeyword: string;
    publishDate: Date;
    tags: string[];
  };
}

/**
 * Dobiera powiązane artykuły wg liczby wspólnych tagów.
 * Jeśli brak wspólnych tagów, zwraca najnowsze artykuły.
 */
export function relatedArticles(
  all: ArticleLike[],
  current: ArticleLike,
  limit = 3,
): ArticleLike[] {
  const scored = all
    .filter((a) => a.id !== current.id)
    .map((entry) => ({
      entry,
      score: entry.data.tags.filter((t) => current.data.tags.includes(t)).length,
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.entry.data.publishDate.valueOf() - a.entry.data.publishDate.valueOf(),
    );

  const byTags = scored.filter((x) => x.score > 0);
  const chosen = byTags.length > 0 ? byTags : scored;
  return chosen.slice(0, limit).map((x) => x.entry);
}
