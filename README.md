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
