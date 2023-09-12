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
import Message from '../components/Message';

function Messenger(props) {
    //   const params = useParams();
    //   const idParam = params.idUser;
    //   const [data, setData] = React.useState("");

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
        <div className="responsive_messenger">
            <Sidebar id="2" />
            <DeleteModal />
            <div className="messenger">
                <div className='box-post'>
                    <p className="post-other">Prénom Nom le <Moment format="DD/MM/YYYY hh:mm">{"07/09/2023 16:16"}</Moment></p>
                    <ReactMarkdown className="post-other" children={"Ceci est un message à caractère informatif."} components={{
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
                </div>
                <div className='box-post'>
                    <p className="post-self">Moi le <Moment format="DD/MM/YYYY hh:mm">{"07/09/2023 16:16"}</Moment></p>
                    <ReactMarkdown className="post-self" children={"Je sais poto."} components={{
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
                </div>
                <div className='box-post'>
                    <p className="post-other">Prénom Nom le <Moment format="DD/MM/YYYY hh:mm">{"07/09/2023 16:16"}</Moment></p>
                    <ReactMarkdown className="post-other" children={"Ceci est un message à caractère informatif."} components={{
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
                </div>
                <div className='box-post'>
                    <p className="post-self">Moi le <Moment format="DD/MM/YYYY hh:mm">{"07/09/2023 16:16"}</Moment></p>
                    <ReactMarkdown className="post-self" children={"Je sais poto."} components={{
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
                </div>
                <div className='box-post'>
                    <p className="post-other">Prénom Nom le <Moment format="DD/MM/YYYY hh:mm">{"07/09/2023 16:16"}</Moment></p>
                    <ReactMarkdown className="post-other" children={"Ceci est un message à caractère informatif."} components={{
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
                </div>
                <div className='box-post'>
                    <p className="post-self">Moi le <Moment format="DD/MM/YYYY hh:mm">{"07/09/2023 16:16"}</Moment></p>
                    <ReactMarkdown className="post-self" children={"Je sais poto."} components={{
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
                </div>
                <div className='box-post'>
                    <p className="post-other">Prénom Nom le <Moment format="DD/MM/YYYY hh:mm">{"07/09/2023 16:16"}</Moment></p>
                    <ReactMarkdown className="post-other" children={"Ceci est un message à caractère informatif."} components={{
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
                </div>
                <div className='box-post'>
                    <p className="post-self">Moi le <Moment format="DD/MM/YYYY hh:mm">{"07/09/2023 16:16"}</Moment></p>
                    <ReactMarkdown className="post-self" children={"Je sais poto."} components={{
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
                </div>
                <div className='box-post'>
                    <p className="post-other">Prénom Nom le <Moment format="DD/MM/YYYY hh:mm">{"07/09/2023 16:16"}</Moment></p>
                    <ReactMarkdown className="post-other" children={"Ceci est un message à caractère informatif."} components={{
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
                </div>
                <div className='box-post'>
                    <p className="post-self">Moi le <Moment format="DD/MM/YYYY hh:mm">{"07/09/2023 16:16"}</Moment></p>
                    <ReactMarkdown className="post-self" children={"Je sais poto."} components={{
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
                </div>
                <Message />
            </div>
        </div>
    );
}

export default Messenger;