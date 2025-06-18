import { NextResponse } from 'next/server';

export async function GET() {
  try {
    if (!process.env.GITHUB_TOKEN) {
      throw new Error('GitHub token is not configured');
    }

    // Fetch contributions data from GitHub API
    const contributionsResponse = await fetch(
      'https://api.github.com/users/Kedhareswer/events',
      {
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    if (!contributionsResponse.ok) {
      throw new Error(`GitHub API error: ${contributionsResponse.statusText}`);
    }

    const events = await contributionsResponse.json();
    
    // Process events into activities
    const activities = events.map((event: any) => {
      let type: 'commit' | 'pr' | 'issue' | 'star' = 'commit';
      
      switch (event.type) {
        case 'PushEvent':
          type = 'commit';
          break;
        case 'PullRequestEvent':
          type = 'pr';
          break;
        case 'IssuesEvent':
          type = 'issue';
          break;
        case 'WatchEvent':
          type = 'star';
          break;
      }

      return {
        type,
        repo: event.repo.name,
        title: event.type,
        url: `https://github.com/${event.repo.name}`,
        date: event.created_at
      };
    });

    // Get contribution statistics (simplified example)
    const contributions = Array.from({ length: 365 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - 365 + i);
      return {
        date: date.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 5),
        level: Math.floor(Math.random() * 5) as 0 | 1 | 2 | 3 | 4
      };
    });

    return NextResponse.json({
      contributions,
      activities: activities.slice(0, 10) // Return only the 10 most recent activities
    });
  } catch (error) {
    console.error('GitHub API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub activity' },
      { status: 500 }
    );
  }
}
