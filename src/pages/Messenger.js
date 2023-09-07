import React from 'react';
// import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
import '../scss/_messenger.scss'
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Moment from 'react-moment';
import Sidebar from '../components/Sidebar';
import DeleteModal from '../components/DeleteModal';
import { useDispatch } from 'react-redux';
import { setModal } from '../reducers';

function Messenger(props) {
//   const params = useParams()
//   const idParam = params.idUser
  const [data, setData] = React.useState("")

//   React.useEffect(() => {
//     axios.get('http://localhost:3001/post').then((res) => {
//       console.log(res.data);
//       setData(res.data);
//     });
//     axios.get(`http://localhost:3001/profil/${idParam}`)
//       .then((response) => {
//         console.log(response.data)
//         setData(response.data);
//       });
//   }, [idParam]);
//   if (!data) return 'bruh';

  return (
    <div className="messenger">
        <Sidebar id="2"/>
        <DeleteModal />
      <div className='box-post'>
          <div>
            {/* <Link to={`http://localhost:3001/profil/${data[0].ID}`}><span>{data[0].FIRSTNAME} {data[0].NAME}</span></Link> */}
        </div>

        <ReactMarkdown children={"Test."} components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={dark} // à tester
                language={match[1]}
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
        />
        <p><Moment format="DD/MM/YYYY hh:mm">{"07/09/2023 16:16"}</Moment></p>
        </div>
    </div>
  );
}

export default Messenger;