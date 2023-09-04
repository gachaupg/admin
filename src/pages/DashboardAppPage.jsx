import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// components
import Iconify from "../components/iconify";
import moment from "moment";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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
} from "../sections/@dashboard/app";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Title from "./Title";

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
  const [time, setTime] = React.useState([]);
  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`https://ecommerce-lxo3.onrender.com/api`);

        res.data.sort(compare);
        const result = res.data.filter((_, index) => index < 5);
        setTime(result);
        console.log("orders", users);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const [week,setWeek]=React.useState([])
  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`https://ecommerce-lxo3.onrender.com/api`);

        res.data.sort(compare);
        const result = res.data.filter((_, index) => index < 4);
        setWeek(result);
        console.log("orders", users);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`https://ecommerce-lxo3.onrender.com/api`);

        res.data.sort(compare);
        const result = res.data.filter((_, index) => index < 12);
        setUsers(result);
        console.log("orders", users);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://ecommerce-lxo3.onrender.com/api/products`
        );

        res.data.sort(compare);
        const result = res.data.filter((_, index) => index < 12);
        setProducts(res.data);
        // console.log('orders',users);
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
        console.log("orders", users);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const totalPrice = users.reduce((sum, user) => sum + user.cartTotalAmount, 0);
  const TotalDay = week.reduce((sum, user) => sum + user.cartTotalAmount, 0);
  const totalPriceByMonth = Array.from({ length: 7 }, (_, month) => {
    // Filter users for the specified month (from June to December)
    const usersInMonth = users.filter(user => {
      const userMonth = new Date(user.date).getMonth() + 1; // +1 because getMonth() returns 0-based month index
      return userMonth === (month + 6); // Add 6 to match June (6) to December (12)
    });
  
    // Calculate the total price for the users in this month
    const totalInMonth = usersInMonth.reduce((sum, user) => sum + user.cartTotalAmount, 0);
  
    return totalInMonth;
  });
  
  console.log('hehe', totalPriceByMonth);
  
  // console.log(users[0].createdAt);

  const dateString = "2023-08-27T10:29:08.732Z";

  // Parse the ISO date string into a JavaScript Date object
  const dateObject = new Date(dateString);

  // Calculate the total minutes
  const totalMinutes = dateObject.getHours();
  console.log(totalMinutes);
  function formatCreatedAt(dateString) {
    const date = new Date(dateString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    return date.toLocaleDateString(undefined, options);
  }

  // Call the function with a date string and log the result
  // const formattedDate = formatCreatedAt('2023-09-02T12:30:00'); // Replace '2023-09-02T12:30:00' with your actual date string
  // console.log(formattedDate);

  const theme = useTheme();
  // Function to generate an array of default month labels for a year
  function generateDateLabels() {
    const dateLabels = [];
    const startDate = new Date("01/01/2003");
    const endDate = new Date("12/01/2003");

    let currentDate = startDate;

    while (currentDate <= endDate) {
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      dateLabels.push(formattedDate);
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return dateLabels;
  }

  // Example usage:
  const [chartData, setChartData] = React.useState([]);
  const [chartLabels, setChartLabels] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("https://ecommerce-lxo3.onrender.com/api"); // Replace with your API endpoint

        // Extract data from the API response and set it in the state
        const data = res.data;

        // Modify data and labels as needed to match your API response
        const modifiedData = [
          {
            name: "Total Orders",
            type: "column",
            fill: "solid",
            data: data.map((item) => chartData.length),
          },
          {
            name: "Amount",
            type: "area",
            fill: "gradient",
            data: data.map((item) => 10),
          },
          {
            name: "Months",
            type: "line",
            fill: "solid",
            data: data.map((item) => 3),
          },
        ];

        const modifiedLabels = data.map((item) => item.label);

        setChartData(modifiedData);
        setChartLabels(modifiedLabels);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl" >
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back {user.name}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}  >
           {/* {users.map((mary)=>{
            return(
              <>
              {new Date}
              </>
            )
           })} */}
            <AppWidgetSummary className="cardsdash" style={{backgroundColor:"#FE0000"}}
         
         title="Total amount" total={`$${totalPrice}`}

         
          icon={'ant-design:aroid-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary className="cardsdash" style={{backgroundColor:"#FEC400"}}
             title="New Users" total={orders.length} color="info" icon={'ant-design:ape-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary className="cardsdash"
            style={{backgroundColor:"#00D247"}}
            title="Item Orders" total={users.length} color="warning" icon={'ant-design:winws-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            
            <AppWidgetSummary  className="cardsdash"
             style={{backgroundColor:"#2669FE"}}
            title=" Toal Products " total={products.length} color="error" icon={'ant-design:g-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Orders "
              subheader="(+43%) than last year"
              chartLabels={generateDateLabels}
              chartData={[
                {
                  name: "Amount",
                  type: "column",
                  fill: "solid",
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: "Orders",
                  type: "area",
                  fill: "gradient",
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: "Months",
                  type: "line",
                  fill: "solid",
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits 
              title="amounts"
              chartData={[
                { label: "Amount", value: totalPrice },
                { label: "Users", value: orders.length },
                { label: "Orders", value: users.length },
                // { label: 'Time', value: 2927 },
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
              title="Yearly analysis"
              subheader="Monthhs analysis"
              chartData={[
                { label: 'january', value: totalPrice },
                { label: 'february', value: totalPrice },
                { label: 'march', value: totalPrice },
                { label: 'april', value: totalPrice },
                { label: 'may', value: totalPrice },
                { label: 'june', value: totalPrice },
                { label: 'july', value: totalPrice },
                { label: 'august', value: totalPrice },
                { label: 'september', value: totalPrice },
                { label: 'octomber', value: totalPrice },
                { label: 'november', value: totalPrice },
                { label: 'december', value: totalPrice },
              ]}
            />
          </Grid> 
         
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject 
              title="Current Subject"
              chartLabels={['Monday', 'Tuesday', 'Wenesday', 'Thursday', 'Friday', 'Saturday','Friday']}
              chartData={[
                { name: 'Amount', data: [TotalDay,TotalDay,TotalDay] },
                { name: 'Amount', data: [TotalDay,TotalDay,TotalDay] },
                { name: 'Amount', data: [TotalDay,TotalDay,TotalDay] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

           {/* <div className='cardppl'>
  <MDBTable className='table'>
    <caption>List of users</caption>
    <MDBTableHead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Address</th>
        <th>Handle</th>
      </tr>
    </MDBTableHead>
    <MDBTableBody>
      {users.map((user) => (
        <tr key={user.id}> 
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.address}</td>
          <td>1</td>
        </tr>
      ))}
    </MDBTableBody>
  </MDBTable>
</div>  */}


<div className='cardppl'>
  <div className='table-wrapper'>
  List of Orders

    <MDBTable className='table'>
      <MDBTableHead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Amount</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.address}</td>
            <td> ${user.cartTotalAmount}</td>
            
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  </div>
</div>






          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={week.map((i, index) => ({
                id: faker.datatype.uuid(),
                title:i.email,
                amount:i.cartTotalAmount,
                name:i.createdAt,
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: "FaceBook",
                  value: 323234,
                  icon: (
                    <Iconify
                      icon={"eva:facebook-fill"}
                      color="#1877F2"
                      width={32}
                    />
                  ),
                },
                {
                  name: "Google",
                  value: 341212,
                  icon: (
                    <Iconify
                      icon={"eva:google-fill"}
                      color="#DF3E30"
                      width={32}
                    />
                  ),
                },
                {
                  name: "Linkedin",
                  value: 411213,
                  icon: (
                    <Iconify
                      icon={"eva:linkedin-fill"}
                      color="#006097"
                      width={32}
                    />
                  ),
                },
                {
                  name: "Twitter",
                  value: 443232,
                  icon: (
                    <Iconify
                      icon={"eva:twitter-fill"}
                      color="#1C9CEA"
                      width={32}
                    />
                  ),
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
          <AppOrderTimeline
              title="Say Hii to news"
              list={week.map((i, index) => ({
              id: faker.datatype.uuid(),
              amount:i.email,
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
