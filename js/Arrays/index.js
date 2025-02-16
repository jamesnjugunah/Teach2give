// Array map-reduce-filter-some etc question
// You're building a data analysis dashboard for a social media platform. The API provides an array of user objects, each containing properties like id, name, location, friends (an array of friend IDs), and posts (an array of post objects with content, timestamp, and likes count).
// Challenge:
// Develop a single function using map, reduce, and filter to achieve the following:
// 1.	Filter Active Users: Identify users who have posted at least once in the past week (based on timestamp).
// 2.	Extract Popular Posts: From the active users' posts, filter out those with less than 10 likes.
// 3.	Calculate Average Likes per User: Reduce the remaining popular posts to a single value representing the average number of likes per active user across all their popular posts.
// Constraints:
// •	Use only map, reduce, and filter (no explicit loops).
// •	Handle potential edge cases (e.g., empty arrays, invalid dates).
// •	Aim for code clarity, efficiency, and readability.
// Bonus:
// •	Extend the function to return an object containing: 
// o	The number of active users.
// o	The total number of popular posts.
// o	The average likes per user.
 const users = [
  {
    id: 1,
    name: "John",
    location: "New York",
    friends: [2, 3, 4],
    posts: [
      { content: "Great day at Central Park!", timestamp: "2025-02-1T12:00:00", likes: 15 },
      { content: "Loving the vibes in NYC!", timestamp: "2025-01-10T08:30:00", likes: 8 },
      { content: "Visited the Statue of Liberty today!", timestamp: "2025-02-05T17:45:00", likes: 20 }
    ]
  },
  {
    id: 2,
    name: "Alice",
    location: "San Francisco",
    friends: [1, 3],
    posts: [
      { content: "Hiking in the Bay Area!", timestamp: "2025-02-12T14:20:00", likes: 12 },
      { content: "Enjoying the sunny weather!", timestamp: "2025-01-14T11:10:00", likes: 6 }
    ]
  },
  {
    id: 3,
    name: "Emily",
    location: "Los Angeles",
    friends: [1, 2, 4],
    posts: [
      { content: "Beach day in LA!", timestamp: "2025-01-08T09:45:00", likes: 25 },
      { content: "Exploring Hollywood!", timestamp: "2025-02-8T16:55:00", likes: 5 }
    ]
  },
  {
    id: 4,
    name: "David",
    location: "Chicago",
    friends: [2],
    posts: [
      { content: "Deep dish pizza is the best!", timestamp: "2025-01-11T10:30:00", likes: 18 },
      { content: "Trying out a new jazz club tonight!", timestamp: "2025-02-13T20:00:00", likes: 3 }
    ]
  },
  {
    id: 5,
    name: "Sarah",
    location: "Seattle",
    friends: [3, 1],
    posts: [
      { content: "Coffee time in the Pacific Northwest!", timestamp: "2025-01-09T15:15:00", likes: 9 },
      { content: "Exploring the Olympic National Park!", timestamp: "2025-01-12T07:00:00", likes: 11 }
    ]
  }
];

function analyzeData(users) {
    const now = new Date();
    const pastWeek = new Date(now - 7*24*60*60*1000 );
    const activeUsers = users.filter(user => user.posts.some(post => new Date(post.timestamp) >= pastWeek));
    const popularPosts = activeUsers.flatMap(user => user.posts).filter(post => post.likes >= 10);
    const totalLikes = popularPosts.reduce((acc, post) => acc + post.likes, 0);
    const averageLikes = totalLikes / activeUsers.length;
    return {
        activeUsers: activeUsers.length,
        totalPopularPosts: popularPosts.length,
        averageLikesPerUser: averageLikes
    };
    }
console.log(analyzeData(users));
