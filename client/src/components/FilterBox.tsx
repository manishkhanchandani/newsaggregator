import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SelectBox from '../common/SelectBox';
import { changeEventProps, FilterBoxProps } from '../common/types';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027'
  })
}));

const FilterBox = ({ setQ }: { setQ: (val: string) => void }) => {
  const [inputState, setInputState] = React.useState<FilterBoxProps>({
    state: '',
    topic: '',
    keyword: ''
  });

  const handleChange = (e: changeEventProps) => {
    setInputState((prev: FilterBoxProps) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = () => {
    console.log('inputState: ', inputState);
    setQ(inputState.keyword);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 3 }}>
          <Item>
            <SelectBox
              name="state"
              label="State"
              options={[
                { key: 'california', label: 'California' },
                { key: 'indiana', label: 'Indiana' }
              ]}
              value={inputState.state}
              handleChange={handleChange}
            />
          </Item>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Item>
            <SelectBox
              name="topic"
              label="Topic"
              options={[
                { key: 'business', label: 'Business' },
                { key: 'entertainment', label: 'Entertainment' },
                { key: 'general', label: 'General' },
                { key: 'health', label: 'Health' },
                { key: 'sports', label: 'Sports' },
                { key: 'technology', label: 'Technology' }
              ]}
              value={inputState.topic}
              handleChange={handleChange}
            />
          </Item>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Item>
            <TextField
              name="keyword"
              label="Keyword"
              variant="outlined"
              placeholder="keyword to search"
              value={inputState.keyword}
              onChange={handleChange}
            />
          </Item>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Item>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              sx={{ height: 55 }}>
              Search
            </Button>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterBox;
