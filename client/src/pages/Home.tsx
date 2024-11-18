import React, { useCallback } from 'react';
import myAxios from '../common/myAxios';
import Alert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';
import FilterBox from '../components/FilterBox';
import { useAtom } from 'jotai';
import Loading from '../components/Loading';
import { newsObjectLS } from '../utils/newsStorage';
import { NewsResultType } from '../common/types';
import ShowItem from '../components/ShowItem';

const TIMEDIFF: number = 60 * 120; // time cache

const max = 100;

export const getTotalPages = (
  count: number,
  recordsPerPage: number
): number => {
  return Math.floor(count / recordsPerPage);
};

export const fetchNews = async ({ q, page }: { q: string; page: number }) => {
  const url = `/news?province=&topic=&search=${encodeURIComponent(
    q
  )}&page=${page}`;
  const response = await myAxios.get(url);
  return response.data;
};

const Home: React.FC = () => {
  const [newsResult, setNewsResult] = useAtom(newsObjectLS);
  const [news, setNews] = React.useState<NewsResultType | null>();
  const [q, setQ] = React.useState<string>('');
  const [page, setPage] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const pages = React.useMemo(() => {
    if (!news?.results?.totalPages) {
      return 0;
    }
    return news?.results?.totalPages;
  }, [news?.results?.totalPages]);

  const stateKey: string = React.useMemo(() => {
    return `${encodeURIComponent(q)}_${page}_${max}`;
  }, [page, q]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value - 1);
    window.scrollTo(0, 0);
  };

  const handleStateData = useCallback(
    (key: string, data: NewsResultType) => {
      setNewsResult((prev) => {
        return { ...prev, [key]: data };
      });
    },
    [setNewsResult]
  );

  const getNews = React.useCallback(
    async (forced?: boolean) => {
      try {
        setLoading(true);
        setError(null);
        if (newsResult[stateKey] && !forced) {
          const currentDate = new Date().getTime();
          const pastDate = newsResult[stateKey]?.expiryRef;
          if (pastDate) {
            const diff = currentDate - pastDate;
            const diffRound = Math.round(diff / 1000);
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
        const r = await fetchNews({ page, q });
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
    [page, q, stateKey, handleStateData, newsResult]
  );

  React.useEffect(() => {
    getNews();
  }, [getNews]);

  return (
    <div>
      <div id="filter-box">
        <FilterBox setQ={setQ} />
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
            {' '}
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
