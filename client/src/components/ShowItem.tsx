import React from 'react';
import moment from 'moment';
import { ArticleType } from '../common/types';

const nofoundimage =
  'https://www.pngitem.com/pimgs/m/439-4390399_placeholder-image-newsletter-clipart-hd-png-download.png';

const ShowItem = ({ record }: { record: ArticleType }) => {
  return (
    <li style={{ marginBottom: '30px' }}>
      <div style={{ display: 'flex', gap: '16px' }}>
        <div style={{ maxWidth: '150px', position: 'relative' }}>
          <img
            src={record.urlToImage ?? nofoundimage}
            alt=""
            style={{
              width: '100%'
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}>
          <div
            style={{
              fontWeight: 'bold',
              fontSize: '14px',
              marginBottom: '10px'
            }}>
            {record.title}
          </div>
          <div
            style={{
              fontSize: '12px',
              marginBottom: '10px'
            }}>
            {record.description}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'baseline',
              fontSize: '11px'
            }}>
            {moment(record.publishedAt).fromNow()}
          </div>
        </div>
      </div>
    </li>
  );
};

export default ShowItem;
