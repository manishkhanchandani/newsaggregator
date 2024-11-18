Demo is visible at:
http://parseserver.us:4001/

Github url is at
https://github.com/manishkhanchandani/newsaggregator

Root Folder
yarn install

client folder
yarn install

Development

go to root folder, run
yarn run both

or terminal 1
yarn run dev

and terminal 2
cd client
yarn run start

For Server:
http://localhost:4000/
and for client:
http://localhost:3000/

Production:
client folder

yarn run build

root folder
yarn run build
yarn run prod

Go to http://localhost:4001/

Features:
Use of Typescript on Node js and React layer.
Server is on Node JS
Client is on React (in client folder)

    React:
        Use of BrowserRouting,
        Use of Material UI,
        Use of Axios
        Use of jotai local storage for caching data for 30 mins (we can change this based on requirement)

News Create Api
Locally: http://localhost:4000/news or http://parseserver.us:4000/news

    Method POST

    Request Data:
        {
            "province": "CA",
            "topic": "polictics",
            "title": "Donald Trum is new president",
            "description": "The stock market has soared during the presidential campaign. Will it continue?",
            "url": "https://abcnews.go.com/Business/kamala-harris-donald-trump-victory-stock-market/story?id=115018990",
            "urlToImage": "https://i.abcnewsfe.com/a/4d1079f3-ace7-4d1b-8000-393a5f8233b5/kamala-trump-election-gty-lv-241022_1729621193640_hpMain_16x9.jpg?w=1600",
            "author": "Max Zahn",
            "content": "The stock market has climbed over the course of the presidential campaign, raising questions about whether the rally will continue depending upon which candidate wins: Vice President Kamala Harris or… [+4537 chars]",
            "publishedAt": "2024-10-22T20:27:01Z",
            "reference": "manual",
            "source": "abc-news",
            "objectId": "3"
        }
        objectId is the unique key

Api's
Get All
http://localhost:4000/news?province=&topic=&search=&page=0

Get One
http://localhost:4000/news/1

Answers:

4.System Design Considerations: [via README file

News Aggregation: Describe in your README how you would aggregate news
articles from multiple sources. How would you handle deduplication, store
articles, and ensure fresh data?

    A. Aggregate News:
        We can call api for each news source and run a cron job at regular interval to fetch the data from different sources. I put sample fetch (commented for now) in file \src\routes\News.routes.ts at the bottom of the page. We can add more sources here to fetch the data at regular interval.

        We can use selenium or puppeeteer or php to scrap html news page who don't provide api. Some websites block api after few scrapping and so we can use the tool IP Changer to let them believe that we are new user after some time.

        We can call batch processing to process the data using cron job, (i integrated cron job in one sample file mentioned above)

    B. Deduplication
        To avoid duplication of entries, i added objectId in the database, and i convert news url to hash using crypto library and save it in objectId field and check this id before inserting in the database to avoid duplicate entries.

        Fresh data can be brought by calling api at regular intervals using cron.

    C. Storing data
        We can use mysql, mongo db or any db to store the data, i used mysql db in current project, but we can use any project. If data crosses millions and billions of records, we can do bucketing of the database based on state and topics. Also if we need to improve search experience then we need to use either SOLR SEARCH ENGINE OR ELASTIC SEARCH. We can also use redis to cache the data.

        We can also use prometheus and grafana to visualize the system and applications.

Scalability: Discuss how the system could handle thousands of news articles
across multiple states and topics. Would you index the articles? What storage
strategies would you use?

    ANSWER:
    We can use mysql, mongo db or any db to store the data, i used mysql db in current project, but we can use any project. If data crosses millions and billions of records, we can do bucketing of the database based on state and topics. Also if we need to improve search experience then we need to use either SOLR SEARCH ENGINE OR ELASTIC SEARCH. We can also use redis to cache the data.

Search Optimization: Consider how you would make searching through
potentially large datasets efficient.

    ANSWER:
    We can use mysql, mongo db or any db to store the data, i used mysql db in current project, but we can use any project. If data crosses millions and billions of records, we can do bucketing of the database based on state and topics. Also if we need to improve search experience then we need to use either SOLR SEARCH ENGINE OR ELASTIC SEARCH. We can also use redis to cache the data.

5.  Performance and Caching:
    ○ Implement basic caching for news articles to avoid repeatedly fetching or
    processing the same data, especially if simulating API calls or fetching from an
    external source.
    ○ Discuss or implement pagination for the news list if there are many articles

        ANSWER:
            I used jotai with storage to cache data on client side, we can use caching mechanism like redis or memcache or file based caching on server side to cache data for some time to avoid api calls from external source.

            I already implemented pagination on both server and client side. We have to pass page parameter to backend which will fetch only limited records based on the page and max records per page.

6.  Security Considerations (Optional):
    ○ Ensure that user input for filtering and searching is properly sanitized to avoid
    injection attacks.
    ○ (Optional) Implement rate-limiting on the news fetching endpoints to prevent
    abuse.

        ANSWER:
            I already use parameteric query on mysql on backend side which will prevent sql injection. Also we need to prevent XSS attack when displaying the results on client side, generally react automatically does that for us but if we need to do manually, we have to escape the output before rendering it in html.

            To limit the rate on news fetching, we can use express-rate-limit on node js side, which will prevent the n number of calls in m number of seconds to prevent unnecessary calls.

            We can use authentication and authorization to prevent guest users from scamming us.

            We need to use https.

            We need to log on server side about who is accessing.

7.  Bonus Points (Optional Features):
    ○ Real-time Updates: Simulate real-time updates to the news list to notify users
    when new articles are published.
    ○ User Personalization: Implement a way for users to save their preferred states
    and topics, so they automatically see relevant articles when they return to the
    site.
    ○ Newsletter Subscription: Allow users to subscribe to a daily email summary of
    the latest news articles related to their saved states/topics.

        ANSWER:
            We can use socket connection to update the real time updates to the users for any new articles published.

            We can also save user preference in db or localStorage for topics and states they like see next time.

            We can save in db about subscription for daily email summary of latest news articles related to saved topics and states. And we can use cron job to check new news articles and send email to the users.


