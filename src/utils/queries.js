const baseURL = 'https://quiz-constructor.firebaseio.com/' 

export const sendRequest = async (method, url, data = null) => {
  const headers = { 'Content-Type': 'application/json' } 
  const requestURL = baseURL + url 

  if (method === 'POST') {
    try {
      const response = await fetch(requestURL, {
        method: method,
        body: JSON.stringify(data),
        headers: headers,
      }) 
      return response.json() 
    } catch (e) {
      console.log(e) 
    }
  } else {
    try {
      const response = await fetch(requestURL, {
        method: method,
        headers: headers,
      }) 
      return response.json() 
    } catch (e) {
      console.log(e) 
    }
  }
} 
