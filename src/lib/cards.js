export async function retrieveCards(setCards, accessToken, navigate) {
    console.log('FETCH');
    console.log(accessToken);
    // accessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQHRlc3QuY29tIiwiaWF0IjoxNzE2NzE1MTgwLCJleHAiOjE3MTY3MTg3ODAsInN1YiI6IjEifQ.mcn7nBpzS2jWhdkBE4HT7wxZRDI9E5eTABZaPQZLZ4Q`

    const response = await fetch("http://localhost:3000/cards", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: `application/json`
      },
    });


    const cardsFromServer = await response.json();
  
    if (response.ok) {
      setCards(cardsFromServer);
    }
  
    if (response.status === 401) {
      navigate('/login')
    }
  }