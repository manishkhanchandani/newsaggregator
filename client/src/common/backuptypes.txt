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
  state: string;
  topic: string;
  keyword: string;
};

export type ArticleSourceType = {
  id: string;
  name: string;
};
export type ArticleType = {
  source: ArticleSourceType;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export type NewsResultType = {
  status: string;
  totalResults: number;
  articles: ArticleType[];
  expiryRef?: number | null;
};

export type resultValueType = NewsResultType | null | undefined;
