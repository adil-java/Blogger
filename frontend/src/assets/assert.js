import react_log from "./react.svg"
import arrow from "./arrow.svg"
import user_icon from "./user_icon.svg"
import uploadArea from "./upload_area.svg"
export const assets={
    react_log,
    arrow,
    user_icon,uploadArea
}
export const blogs_data = [
  {
    
    _id: 1,
    title: 'React in 30 Days',
    author: 'Adil Javed',
    description: `
      <h2>Master React Step-by-Step</h2>
      <p>This blog walks you through a 30-day journey to become confident with React. From basic JSX to state management using hooks, you'll build real projects to reinforce your learning.</p>
      <ul>
        <li>Day 1–10: Fundamentals & JSX</li>
        <li>Day 11–20: Components, Props, State</li>
        <li>Day 21–30: Projects & Routing</li>
      </ul>
      <p>By the end, you'll deploy a complete React app!</p>
      <h3>Bonus Content</h3>
      <p>Includes interview prep, state libraries comparison (Redux vs Zustand), and a checklist for launching your first React site.</p>
    `,
    category: 'Technology',
    img: 'https://res.cloudinary.com/dipjef19s/image/upload/v1731733863/deskon_posts/FuTzR__6738294e07b034b7a7bdc478/taggedcover.jpg',
    isPublished: true,
    createdAt: '2025-04-22T09:40:00.000Z',
    updatedAt: '2025-04-22T10:20:00.000Z',
    __v: 0,
  },
  {
    _id: 2,
    title: 'Healthy Habits for Life',
    author: 'Sara Khan',
    description: `
      <h2>Transform Your Lifestyle</h2>
      <p>Health isn’t just about diet—it’s a way of living. In this guide, you’ll learn simple habits to improve your well-being physically, mentally, and emotionally.</p>
      <p><strong>Topics Covered:</strong></p>
      <ol>
        <li>Morning routines that energize</li>
        <li>Meal planning made easy</li>
        <li>Mindfulness practices</li>
        <li>Hydration and its hidden benefits</li>
      </ol>
      <h3>Expert Advice</h3>
      <p>Featuring routines from certified trainers and nutritionists to help you stay consistent and motivated.</p>
    `,
    category: 'Life Style',
    img: 'https://res.cloudinary.com/dipjef19s/image/upload/v1731733863/deskon_posts/FuTzR__6738294e07b034b7a7bdc478/taggedcover.jpg',
    isPublished: true,
    createdAt: '2025-04-22T09:45:00.000Z',
    updatedAt: '2025-04-22T10:25:00.000Z',
    __v: 0,
  },
  {
    _id: 3,
    title: 'How to Launch a Startup',
    author: 'John Doe',
    description: `
      <h2>Turn Ideas Into Impact</h2>
      <p>Building a startup isn't just about coding—it's about solving real problems. This article shows how to validate ideas, build MVPs, and grow traction without external funding.</p>
      <blockquote>"You don’t need a million dollars to start. You need a million reasons to keep going."</blockquote>
      <p>Includes tools, checklists, and real examples from successful founders.</p>
      <h3>What You’ll Get:</h3>
      <ul>
        <li>Business model templates</li>
        <li>Landing page tools</li>
        <li>Investor pitch tips</li>
      </ul>
    `,
    category: 'Start Up',
    img: 'https://res.cloudinary.com/dipjef19s/image/upload/v1731733863/deskon_posts/FuTzR__6738294e07b034b7a7bdc478/taggedcover.jpg',
    isPublished: true,
    createdAt: '2025-04-22T09:50:00.000Z',
    updatedAt: '2025-04-22T10:30:00.000Z',
    __v: 0,
  },
  {
    _id: 4,
    title: 'The Rise of AI',
    author: 'Emily Raza',
    description: `
      <h2>The Future is Now</h2>
      <p>From smart assistants to self-driving cars, Artificial Intelligence is everywhere. This blog breaks down the evolution of AI and its impact on industries, society, and jobs.</p>
      <h3>What You’ll Learn:</h3>
      <ul>
        <li>History of AI</li>
        <li>How GPT & LLMs work</li>
        <li>Ethical dilemmas of automation</li>
        <li>The role of AI in education and healthcare</li>
      </ul>
      <p>This post also discusses how AI is reshaping the job market and what skills will remain in demand.</p>
    `,
    category: 'Technology',
    img: 'https://res.cloudinary.com/dipjef19s/image/upload/v1731733863/deskon_posts/FuTzR__6738294e07b034b7a7bdc478/taggedcover.jpg',
    isPublished: true,
    createdAt: '2025-04-22T09:55:00.000Z',
    updatedAt: '2025-04-22T10:35:00.000Z',
    __v: 0,
  },
  {
    _id: 5,
    title: 'The Power of Minimalist Living',
    author: 'Ali Abbas',
    description: `
      <h2>Declutter Your Life</h2>
      <p>Minimalism isn't about having less—it’s about making room for more of what matters. Learn how to simplify your space, reduce stress, and increase clarity.</p>
      <h4>Benefits:</h4>
      <ul>
        <li>Improved mental health</li>
        <li>Better financial habits</li>
        <li>More time & energy</li>
        <li>Focus on what truly matters</li>
      </ul>
      <p>Includes tips for minimalist wardrobe, workspace, and digital life.</p>
    `,
    category: 'Life Style',
    img: 'https://res.cloudinary.com/dipjef19s/image/upload/v1731733863/deskon_posts/FuTzR__6738294e07b034b7a7bdc478/taggedcover.jpg',
    isPublished: true,
    createdAt: '2025-04-22T10:00:00.000Z',
    updatedAt: '2025-04-22T10:40:00.000Z',
    __v: 0,
  },
  {
    _id: 6,
    title: 'Photography as a Business',
    author: 'Nimra Shah',
    description: `
      <h2>Turn Your Lens Into Income</h2>
      <p>Learn how to take your photography from passion to profession. This blog covers pricing, portfolio building, finding clients, and marketing strategies.</p>
      <p><em>Bonus: Free downloadable client contract template!</em></p>
      <h4>What You'll Learn:</h4>
      <ul>
        <li>How to price your work</li>
        <li>Online portfolio platforms</li>
        <li>Social media tips to grow following</li>
      </ul>
    `,
    category: 'Other',
    img: 'https://source.unsplash.com/featured/?photography',
    isPublished: false,
    createdAt: '2025-04-22T10:05:00.000Z',
    updatedAt: '2025-04-22T10:45:00.000Z',
    __v: 0,
  },
];
export const comments_data = [
        {
            "_id": "6811ed9e7836a82ba747cb25",
            "blog": blogs_data[0],
            "name": "Michael Scott",
            "content": "This is my new comment",
            "isApproved": false,
            "createdAt": "2025-04-30T09:30:06.918Z",
            "updatedAt": "2025-04-30T09:30:06.918Z",
            "__v": 0
        },
        {
            "_id": "6810a752fbb942aa7cbf4adb",
            "blog": blogs_data[0],
            "name": "John Doe",
            "content": "This is a nice blog",
            "isApproved": false,
            "createdAt": "2025-04-29T10:17:54.832Z",
            "updatedAt": "2025-04-29T10:17:54.832Z",
            "__v": 0
        },
        {
            "_id": "680779aebef75c08f8b4898f",
            "blog": blogs_data[2],
            "name": "Jack London",
            "content": "Hi this blog is must to read",
            "isApproved": true,
            "createdAt": "2025-04-22T11:12:46.547Z",
            "updatedAt": "2025-04-22T11:13:10.015Z",
            "__v": 0
        },
        {
            "_id": "680770aeb2897e5c28bf9b26",
            "blog": blogs_data[3],
            "name": "Sam Smith",
            "content": "This is the best blog, everybody should read it",
            "isApproved": false,
            "createdAt": "2025-04-22T10:34:22.020Z",
            "updatedAt": "2025-04-22T10:34:22.020Z",
            "__v": 0
        },
        {
            "_id": "68076468e32055c94a696cf5",
            "blog": blogs_data[4],
            "name": "Peter Lawrence",
            "content": "Honestly, I did not expect this to work, but it totally did. Saved my project!",
            "isPublished": true,
            "createdAt": "2025-04-22T09:42:00.444Z",
            "updatedAt": "2025-04-22T10:24:55.626Z",
            "__v": 0
        }
    ]


// Keep the category spellings exactly as used above
export const categories = ['All', 'Technology', 'Life Style', 'Start Up', 'Other'];
