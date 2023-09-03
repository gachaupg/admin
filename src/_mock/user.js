// import faker from '@faker-js/faker';
import axios from 'axios';
import { sample } from 'lodash';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------


const usersData = () => {

  const [users, setUsers] = useState([]);
  function compare(a, b) {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  }
  // const { user } = useSelector((state) => ({ ...state.auth }));
  const[loading, setLoading]=useState(true)
  console.log(loading);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tour ?")) {
      dispatch(deleteUser({ id, toast }));
    }
  };
  
  // const id = user?.result?._id;
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://ecommerce-lxo3.onrender.com/api/users/stats/all`
        );
        res.data.sort(compare);
        const result = res.data.filter((_, index) => index < 30);
        setUsers(result);
        setLoading(false)
        console.log("usergtttt", users);
      } catch (error) {
        console.log(error);
        setLoading(false)
  
      }
    }
    fetchData();
  }, []);



  const user = users.map((_, index) => ({
    id: faker.datatype.uuid(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    name: faker.name.fullName(),
    company: faker.company.name(),
    isVerified: faker.datatype.boolean(),
    status: sample(['active', 'banned']),
    role: sample([
      'Leader',
      'Hr Manager',
      'UI Designer',
      'UX Designer',
      'UI/UX Designer',
      'Project Manager',
      'Backend Developer',
      'Full Stack Designer',
      'Front End Developer',
      'Full Stack Developer',
    ]),
  }));

  return user;
}

export default usersData;
