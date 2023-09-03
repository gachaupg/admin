import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import * as React from 'react';

import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
import moment from 'moment';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const [startTime, setStartTime] = React.useState(moment()); // Set your start time
  const [endTime, setEndTime] = React.useState(moment()); 


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
const duration = moment.duration(endTime.diff(startTime));

  // Format the duration as hours, minutes, and seconds
  const formattedDuration = `${duration.hours()} hours, ${duration.minutes()} minutes, ${duration.seconds()} seconds`;

console.log(formattedDuration);
React.useEffect(() => {
  async function fetchData() {
    try {
      const res = await axios.get(
        `https://ecommerce-lxo3.onrender.com/api`
      );

      res.data.sort(compare);
      const result = res.data.filter((_, index) => index < 5);
      setUsers(result);
      console.log('orders',users);
    } catch (error) {
      console.log(error);
    }
  }
  fetchData();
}, []);
React.useEffect(() => {
  async function fetchData() {
    try {
      const res = await axios.get(
        `https://ecommerce-lxo3.onrender.com/api/users/stats/all`
      );

      res.data.sort(compare);
      // const result = res.data.filter((_, index) => index < 20);
      setOrders(res.data);
      console.log('orders',users);
    } catch (error) {
      console.log(error);
    }
  }
  fetchData();
}, []);
const totalPrice = users.reduce((sum, user) => sum + user.cartTotalAmount, 0);

// console.log(users[0].createdAt);

const dateString = '2023-08-27T10:29:08.732Z';

// Parse the ISO date string into a JavaScript Date object
const dateObject = new Date(dateString);

// Calculate the total minutes
const totalMinutes = dateObject.getHours() 
console.log(totalMinutes);


  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back {user.name}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
           {/* {users.map((mary)=>{
            return(
              <>
              {new Date}
              </>
            )
           })} */}
            <AppWidgetSummary title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={orders.length} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={users.length} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

      <div style={{width:'27rem'}}>
       {
        users.map((user)=>{
          return (
            <>
            <MDBTable className='caption-top'>
      <caption>List of users</caption>
      <MDBTableHead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>First</th>
          <th scope='col'>Last</th>
          <th scope='col'>Handle</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <th scope='row'>1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope='row'>2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope='row'>3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </MDBTableBody>
    </MDBTable>
            </>
          )
        })
       }
      </div>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
