import { NextResponse } from 'next/server';

type GuardianResult = {
  id: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  sectionName: string;
  fields?: {
    thumbnail?: string;
    trailText?: string;
    headline?: string;
  };
};

// Queries with mandatory relevance keywords in title/description
const QUERIES: { q: string; tag: string; section?: string }[] = [
  { q: 'artificial intelligence technology', tag: 'AI', section: 'technology' },
  { q: 'machine learning model', tag: 'ML', section: 'technology' },
  { q: 'ChatGPT OR "large language model" OR "language model"', tag: 'LLM', section: 'technology' },
  { q: 'OpenAI OR Anthropic Claude OR DeepMind', tag: 'AI', section: 'technology' },
  { q: 'data science analytics', tag: 'Data Science', section: 'technology' },
  { q: '"artificial general intelligence" OR AGI', tag: 'AGI' },
  { q: 'GPT-4 OR GPT-5 OR Gemini AI OR "AI model"', tag: 'LLM', section: 'technology' },
  { q: 'deep learning OR neural network research', tag: 'ML', section: 'science' },
  { q: 'AI regulation policy technology', tag: 'AI', section: 'technology' },
  { q: 'Databricks OR Snowflake OR "big data"', tag: 'Big Data', section: 'technology' },
];

// Strong AI/Data/ML signals — article must have at least one of these
const RELEVANCE_REGEX = /artificial intelligence|\bai\b|machine learning|deep learning|neural network|data science|chatgpt|gpt-\d|gpt\d|llm|large language|openai|anthropic|deepmind|google bard|gemini ai|mistral|llama model|stable diffusion|dall-e|transformer model|agi|generative ai|reinforcement learning|big data|databricks|snowflake|tensorflow|pytorch|computer vision|nlp|natural language processing|data engineering|hugging face|copilot ai/i;

function categorize(title: string, description: string, defaultTag: string): string {
  const text = (title + ' ' + (description || '')).toLowerCase();
  if (/\bagi\b|artificial general intelligence|superintelligence/.test(text)) return 'AGI';
  if (/chatgpt|gpt-\d|gpt\d|llama|claude ai|gemini|llm|large language|copilot ai|mistral|ollama|generative ai/.test(text)) return 'LLM';
  if (/deep learning|neural network|backprop|transformer|bert|diffusion model|computer vision|image recognition|reinforcement learning/.test(text)) return 'ML';
  if (/data science|data engineer|data warehouse|analytics platform|pandas|jupyter|kaggle|tableau|dbt\b/.test(text)) return 'Data Science';
  if (/\bml\b|machine learning|scikit|tensorflow|pytorch|random forest|gradient boost/.test(text)) return 'ML';
  if (/big data|hadoop|spark|databricks|snowflake|kafka|flink|airflow/.test(text)) return 'Big Data';
  if (/aws ai|azure ai|google cloud ai|kubernetes|cloud infrastructure|serverless/.test(text)) return 'Cloud';
  if (/research paper|arxiv|published study|scientists found|breakthrough discovered|ai study/.test(text)) return 'Research';
  if (/artificial intelligence|openai|anthropic|deepmind|ai model|ai system|ai startup/.test(text)) return 'AI';
  return defaultTag;
}

async function fetchGuardian(
  apiKey: string,
  query: string,
  section: string | undefined,
  pageSize = 10
): Promise<GuardianResult[]> {
  const params = new URLSearchParams({
    q: query,
    'api-key': apiKey,
    'page-size': String(pageSize),
    'order-by': 'newest',
    'show-fields': 'thumbnail,trailText,headline',
  });
  if (section) params.set('section', section);

  const res = await fetch(`https://content.guardianapis.com/search?${params}`);
  if (!res.ok) return [];
  const data = await res.json();
  return (data?.response?.results as GuardianResult[]) || [];
}

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY || 'test';

    const allResults: GuardianResult[] = [];
    const seenIds = new Set<string>();

    await Promise.all(
      QUERIES.map(async ({ q, tag, section }) => {
        const results = await fetchGuardian(apiKey, q, section, 10);
        results.forEach(r => {
          if (!seenIds.has(r.id)) {
            seenIds.add(r.id);
            allResults.push(r);
          }
        });
      })
    );

    const articles = allResults
      .sort((a, b) => new Date(b.webPublicationDate).getTime() - new Date(a.webPublicationDate).getTime())
      .map(r => {
        const title = r.fields?.headline || r.webTitle || '';
        const description = r.fields?.trailText || '';
        return { r, title, description };
      })
      // Filter to only articles that are genuinely about AI/Data/ML
      .filter(({ title, description }) => RELEVANCE_REGEX.test(title + ' ' + description))
      .slice(0, 60)
      .map(({ r, title, description }) => {
        const defaultTag = QUERIES.find(({ q }) => {
          const check = (r.webTitle + r.webUrl).toLowerCase();
          return check.includes(q.split(' ')[0].toLowerCase().replace(/"/g, ''));
        })?.tag || 'AI';

        return {
          title,
          description,
          url: r.webUrl,
          urlToImage: r.fields?.thumbnail || null,
          source: 'The Guardian',
          publishedAt: r.webPublicationDate,
          category: categorize(title, description, defaultTag),
        };
      })
      .filter(a => a.title && a.url);

    return NextResponse.json(
      { status: 'ok', total: articles.length, articles },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        },
      }
    );
  } catch (err) {
    console.error('News API error:', err);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
