// @mui
import PropTypes from 'prop-types';
import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';
// utils
import * as React from 'react';

import { fDateTime } from '../../../utils/formatTime';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

// ----------------------------------------------------------------------

AppOrderTimeline.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppOrderTimeline({ title, subheader, list, ...other }) {

  const user = useSelector((state) => state.auth);
// const [value, setValue] = useState(3);
function compare(a, b) {
  if (a._id < b._id) {
    return 1;
  }
  if (a._id > b._id) {
    return -1;
  }
  return 0;
}

const { items: data, status } = useSelector((state) => state.products);
const dispatch = useDispatch();
const navigate = useNavigate();
const [users, setUsers] = React.useState([]);
const [orders, setOrders] = React.useState([]);
// const { data, error, isLoading } = useGetAllProductsQuery();
// const duration = moment.duration(endTime.diff(startTime));

  // Format the duration as hours, minutes, and seconds
  // const formattedDuration = `${duration.hours()} hours, ${duration.minutes()} minutes, ${duration.seconds()} seconds`;

React.useEffect(() => {
  async function fetchData() {
    try {
      const res = await axios.get(
        `https://ecommerce-lxo3.onrender.com/api`
      );

      res.data.sort(compare);
      // const result = res.data.filter((_, index) => index < 5);
      setUsers(res.data);
      console.log('orders',users);
    } catch (error) {
      console.log(error);
    }
  }
  fetchData();
}, []);


  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent
        sx={{
          '& .MuiTimelineItem-missingOppositeContent:before': {
            display: 'none',
          },
        }}
      >
        <div>
          {list.map((item, index) => (
            <OrderItem key={item.id} item={item} isLast={index === list.length - 1} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  isLast: PropTypes.bool,
  item: PropTypes.shape({
    time: PropTypes.instanceOf(Date),
    title: PropTypes.string,
    type: PropTypes.string,
  }),
};

function OrderItem({ item, isLast }) {
  const { type, title,name,amount, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={
            (type === 'order1' && 'primary') ||
            (type === 'order2' && 'success') ||
            (type === 'order3' && 'info') ||
            (type === 'order4' && 'warning') ||
            'error'
          }
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent >
      <Typography style={{fontSize:'1.5rem'}} variant="subtitle2">{title}</Typography>
      <Typography style={{fontSize:'1.5rem'}} variant="subtitle2">${amount}</Typography>

      <Typography style={{fontSize:'1.5rem'}} variant="subtitle2">{name}</Typography>

        <Typography style={{fontSize:'1.5rem'}} variant="caption" sx={{ color: 'text.secondary' }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
