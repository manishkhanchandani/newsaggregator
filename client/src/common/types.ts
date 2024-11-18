import { SelectChangeEvent } from '@mui/material/Select';

export type changeEventProps =
  | SelectChangeEvent
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type SelectBoxOptionsProps = {
  key: string | number;
  label: string;
};

export type SelectBoxProps = {
  value: string;
  handleChange: (e: changeEventProps) => void;
  options: SelectBoxOptionsProps[];
  name: string;
  label: string;
};

export type FilterBoxProps = {
  province: string;
  topic: string;
  q: string;
};

export type ArticleSourceType = {
  id: string;
  name: string;
};
export type ArticleType = {
  id: number;
  source: string;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  publishedAtTime: number;
  reference: string;
  createdAt: string;
  updatedAt: string;
  objectId: string;
  status: number;
};

export type ResultsType = {
  totalRows: number;
  totalPages: number;
  max: number;
  page: number;
  start: number;
  province: string;
  topic: string;
  search: string;
  rows: ArticleType[];
};

export type NewsResultType = {
  success: boolean;
  results: ResultsType;
  expiryRef?: number | null;
};

export type ArticleTypeExt = ArticleType & {
  expiryRef?: number;
};
export type resultValueType = NewsResultType | null | undefined;

export type singleResultValueType = ArticleTypeExt | null | undefined;
