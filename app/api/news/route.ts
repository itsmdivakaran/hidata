import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Fetch news from NewsAPI about Data Science, AI, ML
    const queries = [
      'artificial intelligence',
      'machine learning',
      'data science',
      'deep learning',
      'AI research'
    ];

    const allArticles: any[] = [];

    for (const query of queries) {
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        query
      )}&sortBy=publishedAt&language=en&pageSize=5&apiKey=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.articles) {
        allArticles.push(...data.articles);
      }
    }

    // Remove duplicates and sort by date
    const uniqueArticles = Array.from(
      new Map(allArticles.map((article) => [article.url, article])).values()
    )
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
      .slice(0, 20);

    return NextResponse.json({
      status: 'ok',
      articles: uniqueArticles.map((article) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        source: article.source.name,
        publishedAt: article.publishedAt,
      })),
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
