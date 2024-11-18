import React from 'react';
import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import moment from 'moment';
import Alert from '@mui/material/Alert';
import myAxios from '../common/myAxios';
import { newsSingleObjectLS } from '../utils/newsStorage';
import Loading from '../components/Loading';
import { ArticleType, singleResultValueType } from '../common/types';
import './Detail.css';

const TIMEDIFF: number = 60 * 60 * 24; // time cache

export const fetchNews = async (id?: string) => {
  const url = `/news/${id}`;
  const response = await myAxios.get(url);
  return response.data;
};

const Detail: React.FC = () => {
  const params = useParams();
  const { id } = params;
  // getting data from jotai
  const [newsResult, setNewsResult] = useAtom(newsSingleObjectLS);
  // local state variable to display the data
  const [news, setNews] = React.useState<singleResultValueType>(null);
  // flag to delay initial fetchihng
  const [flag, setFlag] = React.useState<boolean>(false);
  // loading will show loading icon
  const [loading, setLoading] = React.useState<boolean>(false);
  // error will show if some error occured
  const [error, setError] = React.useState<string | null>(null);

  // creating state key for saving data in jotai cache
  const stateKey: string = React.useMemo(() => {
    return `detail_${id}`;
  }, [id]);

  // saving the data in jotai cache
  const handleStateData = React.useCallback(
    (key: string, data: ArticleType) => {
      setNewsResult((prev) => {
        return { ...prev, [key]: data };
      });
    },
    [setNewsResult]
  );

  // function to get data from server or cache
  const getNews = React.useCallback(
    async (forced?: boolean) => {
      try {
        if (!flag) {
          return;
        }
        setLoading(true);
        setError(null);
        // checking if the data is in cache
        if (newsResult[stateKey] && !forced) {
          const currentDate = new Date().getTime();
          const pastDate = newsResult[stateKey]?.expiryRef;
          // if pastdate is found, that means data is in cache
          if (pastDate) {
            const diff = currentDate - pastDate;
            const diffRound = Math.round(diff / 1000);
            // if expiryRef is crossed time limit then we don't need data from cache, else we need it.
            if (diffRound <= TIMEDIFF) {
              // cache time not expired, return it
              console.log(
                'data from cache: ',
                stateKey,
                ', ',
                newsResult[stateKey]
              );
              setNews(newsResult[stateKey]);
              return;
            }
          }
        }
        console.log('fresh data: ', stateKey);
        // no data in cache, fetching new data from server
        const r = await fetchNews(id);
        // saving it in jotai storage
        handleStateData(stateKey, {
          ...r,
          expiryRef: new Date().getTime(),
          stateKey
        });
        setNews(r);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else if (typeof err === 'string') {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    },
    [id, stateKey, handleStateData, newsResult, flag]
  );

  // on page load, call the news get all
  React.useEffect(() => {
    getNews();
  }, [getNews]);

  // initial setting of flag to delay the fetch call from api so that we should have result from cache first
  React.useEffect(() => {
    setFlag(true);
  }, []);
  return (
    <div className="detail">
      <h3>
        <a
          href={news?.url}
          target="_blank"
          rel="noreferrer"
          className="detail_link">
          {news?.title}
        </a>
      </h3>

      {error && (
        <div>
          <Alert severity="error">{error}</Alert>
        </div>
      )}
      {loading && <Loading />}
      {news && (
        <div>
          <div style={{ gap: '16px', marginTop: '20px' }}>
            {news?.urlToImage && (
              <div style={{ maxWidth: '100%', position: 'relative' }}>
                <img
                  src={news?.urlToImage}
                  alt=""
                  style={{
                    width: '100%'
                  }}
                />
              </div>
            )}

            <div className="detail_content">
              <div className="detail_text">{news?.description}</div>
              <div className="detail_text">
                <div>
                  <b>Content:</b>
                </div>
                <div>{news?.content}</div>
              </div>
              <div className="detail_text">
                <b>Source:</b> {news?.source}
              </div>
              <div className="detail_text">
                <b>Author:</b> {news?.author}
              </div>
              <div className="detail_meta_data">
                <div>
                  <a href={news?.url} target="_blank" rel="noreferrer">
                    View Details
                  </a>
                </div>
                <div>{moment(news?.publishedAt).fromNow()}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
