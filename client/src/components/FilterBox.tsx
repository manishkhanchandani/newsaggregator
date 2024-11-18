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

const FilterBox = ({
  setVars
}: {
  setVars: React.Dispatch<React.SetStateAction<FilterBoxProps>>;
}) => {
  const [inputState, setInputState] = React.useState<FilterBoxProps>({
    province: '',
    topic: '',
    q: ''
  });

  const handleChange = (e: changeEventProps) => {
    setInputState((prev: FilterBoxProps) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVars(inputState);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, md: 3 }}>
            <Item>
              <SelectBox
                name="province"
                label="State"
                options={[
                  { key: 'california', label: 'California' },
                  { key: 'indiana', label: 'Indiana' }
                ]}
                value={inputState.province}
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
                name="q"
                label="Keyword"
                variant="outlined"
                type="search"
                placeholder="keyword to search"
                value={inputState.q}
                onChange={handleChange}
                fullWidth
              />
            </Item>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Item>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                onClick={handleSubmit}
                sx={{ height: 55 }}>
                Search
              </Button>
            </Item>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default FilterBox;
