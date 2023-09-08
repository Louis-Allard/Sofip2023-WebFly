import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';
import Collapsible from 'react-collapsible';
import { Link } from 'react-router-dom';
import '../scss/_message.scss';

const Message = (props) => {
  const [message, setMessage] = useState('');

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Insérer la valeur dans la base de données ici
    const data = {
      v1: message,
      idUser: localStorage.getItem('id')
    };

    if (data) {
      // Envoyer une requête POST à votre endpoint d'insertion
      axios.post('http://localhost:3001/post', data)
        .then(response => {
          console.log('Insertion réussie');
          setMessage('');
        })
        .catch(error => {
          setMessage('');
          console.error('Erreur lors de l\'insertion', error);
        })
        .finally(() => {
          setMessage('');
          fetchPostConnected();
        })
    } else {
      console.error('Erreur : valeur non définie');
    }
  };

  /********************************NICO*************************************** */
  const [dataPost, setDataPost] = useState('');
  const [connected, setConnected] = useState(true);
  const token = localStorage.getItem('token');

  // useEffect(() => {
  //   axios.get('http://localhost:3001/verify-token', {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then(response => {
  //       localStorage.setItem('id', response.data.userID);
  //       setConnected(true);
  //       fetchPostConnected();
  //     })
  //     .catch(error => {
  //       setConnected(false);
  //       fetchPost();
  //       // Token invalide ou expiré, l'utilisateur n'est pas authentifié
  //     });
  //   // fin import token 
  //   // --------------------------------------

  // }, [token])

  const fetchPost = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getPost');
      console.log(response.data);
      setDataPost(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données d\' utilisateur hors-ligne :', error);
    }
  };

  const fetchPostConnected = async () => {
    try {
      const [articlesResponse, commentsResponse, likesResponse, thanksResponse] = await Promise.all([
        axios.post('http://localhost:3001/getPostConnected', { id: localStorage.getItem('id') }),
        axios.get('http://localhost:3001/getcomments'),
        axios.get('http://localhost:3001/getLikes'),
        axios.get('http://localhost:3001/getThanks'),
      ]);

      const articles = articlesResponse.data;
      const comments = commentsResponse.data;
      const likes = likesResponse.data;
      const thanks = thanksResponse.data;

      const combinedData = articles.map((article) => ({
        ...article,
        comments: comments.filter((comment) => comment.ID_ARTICLE === article.ID_ARTICLE),
        likes: likes.filter((like) => like.ID_ARTICLELIKE === article.ID_ARTICLE),
        thanks: thanks.filter((thank) => thank.ID_ARTICLETHANK === article.ID_ARTICLE),
      }));

      const combinedDataWithCount = combinedData.map((item) => ({
        ...item,
        numberOfComments: item.comments.length,
        numberOfLikes: item.likes.length,
        numberOfThanks: item.thanks.length
      }));

      setDataPost(combinedDataWithCount);
      console.log(combinedDataWithCount);

    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };

  const handleClickComment = (id) => { //AFFICHER ET CACHER PARTIE COMMENTAIRE
    const com = document.getElementById('comment-' + id);

    if (getComputedStyle(com).display !== "none") {
      com.style.display = "none";
    } else {
      com.style.display = "block";
    }
  }

  const handleSubmitCom = (id) => {
    let input = document.getElementById('inputCom-' + id);
    let value = input.value;

    const data = {
      idUser: localStorage.getItem('id'),
      com: value,
      idArticle: id
    };
    console.log(data);

    if (data) {
      // Envoyer une requête POST à votre endpoint d'insertion
      axios.post('http://localhost:3001/createComments', data)
        .then(response => {
          console.log('Insertion réussie');
          input.value = "";
          fetchPostConnected();
        })
        .catch(error => {
          console.error('Erreur lors de l\'insertion', error);
        })
    } else {
      console.error('Erreur : valeur non définie');
    }
  }


  const handleClickLike = (id) => {
    if (connected) {
      const data = {
        idUser: localStorage.getItem('id'),
        idArticle: id
      };
      axios.post('http://localhost:3001/addLikes', data)
        .then(response => {
          console.log('Like ajouté');
          fetchPostConnected();
        })
        .catch(error => {
          console.error('Echec Like', error);
        })
    }
  }

  const handleClickThanks = (id) => {
    if (connected) {
      const data = {
        idUser: localStorage.getItem('id'),
        idArticle: id
      };
      axios.post('http://localhost:3001/addThanks', data)
        .then(response => {
          console.log('Thanks ajouté');
          fetchPostConnected();
        })
        .catch(error => {
          console.error('Echec Thanks', error);
        })
    }
  }

  return (
    <div className="message_background">
      <div className="message_box">
        {connected ? (
          <form action="/post" method="post" onSubmit={handleSubmit} className="message">
            <div className="mainPost">
              <TextareaAutosize id="postContent" name="postContent" onChange={handleChangeMessage} required />
            </div>
            <div className="sendPost">
              <div className='posBtnPost'>
                <input type="submit" value="Envoyer" name="postContent" className="postContent" />
              </div>
            </div>
          </form>
        ) : (
          <div className='disconnect-home-post'>
            <p>Rejoignez-nous</p>
            <div className='btn-disconnect-post'>
              <Link to='/login'><button className='btn-connect'>Se connecter</button></Link>
              <Link to='/signup'><button className='btn-signUp'>S'inscrire</button></Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;