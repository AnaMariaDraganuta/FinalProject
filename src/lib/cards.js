export async function retrieveCards(setCards, accessToken, navigate) {
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