import express from "express";
import cors from "cors";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
const app = express();
const port = 3000;
const parser = new XMLParser();

app.use(cors());

const categories = {
	"top-stories": "rssfeedstopstories",
	"most-recent-stories": "rssfeedmostrecent",
	india: "rssfeeds/-2128936835",
	world: "rssfeeds/296589292",
	nri: "rssfeeds/7098551",
	business: "rssfeeds/1898055",
	us: "rssfeeds_us/72258322",
	cricket: "rssfeeds/54829575",
	sports: "rssfeeds/4719148",
	science: "rssfeeds/-2128672765",
	environment: "rssfeeds/2647163",
	tech: "rssfeeds/66949542",
	education: "rssfeeds/913168846",
	entertainment: "rssfeeds/1081479906",
	"life-style": "rssfeeds/2886704",
	"most-read": "rssfeedmostread",
	"most-shared": "rssfeedmostshared",
	"most-commented": "rssfeedmostcommented",
	astrology: "rssfeeds/65857041",
	auto: "rssfeeds/74317216",
};

export default categories;

function parseXML(response){
    return parser.parse(response.data);
}

function parseDescription(description) {
	const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/;
	const imgMatch = description.match(imgRegex);
	const img = imgMatch ? imgMatch[1] : null;

    const anchorRegex = /<a[^>]*>(.*?)<\/a>/;
	const text = description
		.replace(anchorRegex, "$1")
		.replace(imgRegex, "")
		.trim();
	return { img, description: text };
}

app.get("/", async (req, res) => {

    res.send("Backend is Working");
});

app.get("/:category", async (req, res) => {
    const { category } = req.params;
    if(category in categories){
        const response = await axios.get(
			`https://timesofindia.indiatimes.com/${categories[category]}.cms`
		);
        const parsedXML = parseXML(response);
        console.log(parsedXML.rss.channel.item);

        const items = parsedXML.rss.channel.item.map((news) => {
            const { img, description } = parseDescription(news.description);
			return { ...news, img, description };
        });

        res.send(items);
    }
    else{
        res.status(404).send("Invalid Category");
    }
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
