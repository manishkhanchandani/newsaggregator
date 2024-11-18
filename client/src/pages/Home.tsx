import React, { useCallback } from 'react';
import myAxios from '../common/myAxios';
import Alert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';
import FilterBox from '../components/FilterBox';
import { useAtom } from 'jotai';
import Loading from '../components/Loading';
import { newsObjectLS } from '../utils/newsStorage';
import { FilterBoxProps, NewsResultType } from '../common/types';
import ShowItem from '../components/ShowItem';

const TIMEDIFF: number = 60 * 120; // time cache

const max = 100;

export const fetchNews = async ({
  q,
  province,
  topic,
  page
}: {
  q: string;
  province: string;
  topic: string;
  page: number;
}) => {
  const url = `/news?province=${encodeURIComponent(
    province
  )}&topic=${encodeURIComponent(topic)}&search=${encodeURIComponent(
    q
  )}&page=${page}`;
  const response = await myAxios.get(url);
  return response.data;
};

const Home: React.FC = () => {
  // setting some state variables
  // getting data from jotai
  const [newsResult, setNewsResult] = useAtom(newsObjectLS);
  // local state variable to display the data
  const [news, setNews] = React.useState<NewsResultType | null>();
  // search field variables are updated here
  const [vars, setVars]: [
    FilterBoxProps,
    React.Dispatch<React.SetStateAction<FilterBoxProps>>
  ] = React.useState({
    q: '',
    province: '',
    topic: ''
  });
  // flag to delay initial fetchihng
  const [flag, setFlag] = React.useState<boolean>(false);
  // for pagination purpose, page is set from 0 onwards
  const [page, setPage] = React.useState<number>(0);
  // loading will show loading icon
  const [loading, setLoading] = React.useState<boolean>(false);
  // error will show if some error occured
  const [error, setError] = React.useState<string | null>(null);

  // how many pages are there in this query
  const pages = React.useMemo(() => {
    if (!news?.results?.totalPages) {
      return 0;
    }
    return news?.results?.totalPages;
  }, [news?.results?.totalPages]);

  // creating state key for saving data in jotai cache
  const stateKey: string = React.useMemo(() => {
    let key = `${page}_${max}`;
    if (vars.province) {
      key += `_${encodeURIComponent(vars.province)}`;
    }
    if (vars.topic) {
      key += `_${encodeURIComponent(vars.topic)}`;
    }
    if (vars.q) {
      key += `_${encodeURIComponent(vars.q)}`;
    }
    return key;
  }, [page, vars]);

  // on page change we scroll up and update the page state variable and fetch new data for that page
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value - 1);
    window.scrollTo(0, 0);
  };

  // saving the data in jotai cache
  const handleStateData = useCallback(
    (key: string, data: NewsResultType) => {
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
        const r = await fetchNews({ page, ...vars });
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
    [page, vars, stateKey, handleStateData, newsResult, flag]
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
    <div>
      <div id="filter-box">
        <FilterBox setVars={setVars} />
      </div>
      <div id="content">
        {error && (
          <div>
            <Alert severity="error">{error}</Alert>
          </div>
        )}
        {loading && <Loading />}
        {news?.results?.rows && news?.results?.rows?.length > 0 && (
          <>
            <ul>
              {news?.results?.rows?.map((record) => {
                return <ShowItem key={record.objectId} record={record} />;
              })}
            </ul>
            <div>
              <Pagination
                count={pages}
                page={page + 1}
                onChange={handlePageChange}
              />
            </div>
          </>
        )}
        {(!news?.results?.rows || news?.results?.rows.length === 0) &&
          !loading &&
          !error && (
            <div style={{ marginTop: 20 }}>
              <Alert severity="warning">No News Found.</Alert>
            </div>
          )}
      </div>
    </div>
  );
};

export default Home;
