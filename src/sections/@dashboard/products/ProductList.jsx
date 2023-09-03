import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ products, ...other }) {
const[users,setUsers]=useState([])
  function compare(a, b) {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  }
  
  const excerpt = (str) => {
      if (str.length > 20) {
        str = str.substring(0, 15) + " .";
      }
      return str;
    };
  
  
  

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://ecommerce-lxo3.onrender.com/api/products`
        );
        res.data.sort(compare);
        // const result = res.data.filter((_, index) => index < 50);
        setUsers(res.data);
        console.log(users);
       
      } catch (error) {
        console.error(error);
      
      }
    }
    fetchData();
  }, []);

  return (
    <Grid container spacing={3} {...other}>
      {users.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
