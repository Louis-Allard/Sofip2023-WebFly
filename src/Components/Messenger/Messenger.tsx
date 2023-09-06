import React from "react";
import axios from 'axios'


const Messenger = () => {

const [data, setData] = React.useState(null);
React.useEffect(() => {
  axios.get('http://localhost:3001/messages/messages/3').then((res) => {
    console.log(res.data);
    setData(res.data);
  });
}, []);
if (!data) return '?';


  return <div>Messenger</div>;

};

export default Messenger;