// шаблон запроса фильмов (для первичного отображения, инпута, пагинации):
export const getData = (query, page, f1, f2, f3, f4, f5) => {
  try {
  f5(query);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=fd06d5416750783ab58fbff6f1dd3e18&language=en-US&query=${query}&page=${page}&include_adult=false`;
    fetch(url)
    .then(response => {
      if (response.status === 200) {
       return response.json()
      } else {
        throw new Error('test error in getData')
      }
    })
    .then(res => {
      f1(false);
      f4(res.total_pages);
      f2(res.results);
    })
  } catch (error) {
    f1(false);
    f3(error);
    console.log(`${error} in getData`)
  }
};

// шаблон получения гостевой сессии = guest_session_id:
export const getGuestSessionId = async () => {
  try {
    const url = 'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=fd06d5416750783ab58fbff6f1dd3e18';
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error in url: ${url}`);
    }
    return response.json();
  } catch (error) {
    console.log('Error in getGuestSessionId', error);
  }
};

export const saveGuestSessionId = () => {
  const availableToken = localStorage.getItem('guest_session_id');
  if (!availableToken) {
    getGuestSessionId()
      .then((res) =>{ 
        let guestSessionId = res.guest_session_id;
        return guestSessionId
      })
      .then(res => localStorage.setItem('guest_session_id', res))
        .catch((err) => console.error(err));
  }
};

// post-запрос на установку рейтинга фильму
export const onPostRate = async (movieId, value) => {
try {
  const token = localStorage.getItem('guest_session_id');
  const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=fd06d5416750783ab58fbff6f1dd3e18&guest_session_id=${token}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      'content-type': 'application/json;charset=utf-8' 
    },
    body: JSON.stringify( {
      "value": value,
    })
  });
 
  return response;
} catch (error) {
  console.log('Error in onPostRate', error)
}
}

// delete-запрос на удаление рейтинга к фильму
export const onDeleteRate = async (movieId) => {
try {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=fd06d5416750783ab58fbff6f1dd3e18`;

  const stars = JSON.parse(localStorage.getItem('stars'));
  if (stars.match(`${movieId}`)) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error in url: ${url}`);
    }
    return response.json();
  } else {
    return;
  }   
} catch (error) {
  console.log('Error in onDeleteRate', error)
}
}

// шаблон для вытягивания фильмов с рейтингом во вкладку Rated
export const getRatedMovies = async (func) => {
  try {
    const token = localStorage.getItem('guest_session_id');
    const url = `https://api.themoviedb.org/3/guest_session/${token}/rated/movies?api_key=fd06d5416750783ab58fbff6f1dd3e18&language=en-US&sort_by=created_at.asc`;

    fetch(url)
    .then(response => {
      if (response.status === 200) {
      return response.json()
      } else {
        throw new Error('test error in getRatedMovies')
      }
    })
    .then(res => {
      console.log(`ratedfilm in getRated>>`, res.results);
      func(res.results)
    })
  } catch (error) {
    console.log(`${error} in getData`)
  }
}

// шаблон для вытягивания рейтингов - для дальнейшего использования в React.Context:
export const getGenres = async (func) => {
  try {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=fd06d5416750783ab58fbff6f1dd3e18&language=en-US`;
 
    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('test error in getGenres')
      } else {
        return response.json();
      }
    })
    .then(res => {
      func(res.genres)
    })
  } catch (error) {
    console.log(`${error} in getData`)
  }
}

// это то, что нужно сделать внутри movieCard - найти совпадения вытянутых жанров и вытянутых фильмов, 
// используя MovieContext.Consumer:
export const findMatchedGenres = (movieGenresId, apiGenres) => {
  try {
    let matchedGenres = []; //  <= собираем сюда все совпавшие жанры

  for (let id in movieGenresId) {
    for ( let i in apiGenres ) {
      if (apiGenres[i].id === movieGenresId[id]) {
        matchedGenres.push(apiGenres[i])
      }
    }
  }

  return matchedGenres;
  } catch (error) {
    console.log('Error in findMatchedGenres', error);
  }
};

// export const getToken= async () => {
//   try {
//     const url = 'https://api.themoviedb.org/3/authentication/token/new?api_key=fd06d5416750783ab58fbff6f1dd3e18';
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Error in url: ${url}`);
//     }
//     return response.json();
//   } catch (error) {
//     console.log('Error in getToken', error);
//   }
// };

