import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewsCard from './components/newscard';
import axios from 'axios';

function App() {
  const [activeTab, setActiveTab] = useState("top-stories");
  const [newsArr, setNewsArr] = useState([]);
  const feeds = [
		{
			value: "top-stories",
			name: "Top Stories",
			content: "Top Stories content here.",
		},
		{
			value: "most-recent-stories",
			name: "Most Recent Stories",
			content: "Most Recent Stories content here.",
		},
		{ value: "india", name: "India", content: "India content here." },
		{ value: "world", name: "World", content: "World content here." },
		{ value: "nri", name: "NRI", content: "NRI content here." },
		{
			value: "business",
			name: "Business",
			content: "Business content here.",
		},
		{ value: "us", name: "US", content: "US content here." },
		{ value: "cricket", name: "Cricket", content: "Cricket content here." },
		{ value: "sports", name: "Sports", content: "Sports content here." },
		{ value: "science", name: "Science", content: "Science content here." },
		{
			value: "environment",
			name: "Environment",
			content: "Environment content here.",
		},
		{ value: "tech", name: "Tech", content: "Tech content here." },
		{
			value: "education",
			name: "Education",
			content: "Education content here.",
		},
		{
			value: "entertainment",
			name: "Entertainment",
			content: "Entertainment content here.",
		},
		{
			value: "life-style",
			name: "Life & Style",
			content: "Life & Style content here.",
		},
		{
			value: "most-read",
			name: "Most Read",
			content: "Most Read content here.",
		},
		{
			value: "most-shared",
			name: "Most Shared",
			content: "Most Shared content here.",
		},
		{
			value: "most-commented",
			name: "Most Commented",
			content: "Most Commented content here.",
		},
		{
			value: "astrology",
			name: "Astrology",
			content: "Astrology content here.",
		},
		{ value: "auto", name: "Auto", content: "Auto content here." },
  ];

  async function fetchNews(newsFeed){
    const res = await axios.get(`http://localhost:3000/${newsFeed}`);
    console.log(res.data);
    setNewsArr(res.data);
  }

  function formatDate(dateString){
    const formattedDate = new Date(dateString);
    return formattedDate.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  useEffect(()=>{
    console.log("Active tab: " + activeTab);
    fetchNews(activeTab);
  }, [activeTab]);

  return (
		<>
			<Tabs defaultValue="top-stories" className="w-full">
				<TabsList className="w-full grid grid-cols-8 gap-2 mb-4">
					{feeds.map((feed) => (
						<TabsTrigger
							key={feed.value}
							value={feed.value}
							onClick={() => setActiveTab(feed.value)}
						>
							{feed.name}
						</TabsTrigger>
					))}
				</TabsList>
				<div className="w-full mt-14">
					{feeds.map((feed) => (
						<TabsContent
							key={feed.value}
							value={feed.value}
							className="grid grid-cols-3 gap-5 p-5"
						>
							{newsArr.length > 0
								? newsArr.map((news) => (
										<a
											href={`${news.link}`}
											key={news.guid}
											className="block"
										>
											<div className='py-5'>
											<NewsCard
												title={news.title}
												description={news.description}
												pubDate={formatDate(news.pubDate)}
											/>
                							</div>
										</a>
								  ))
								: "No News to Display"}
						</TabsContent>
					))}
				</div>
			</Tabs>
		</>
  );
}

export default App
