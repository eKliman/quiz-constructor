const baseURL = 'https://quiz-constructor.firebaseio.com/' 

export const sendRequest = async (method, url, data = null, useBaseURL = true) => {
  const headers = { 'Content-Type': 'application/json' } 
  const requestURL = useBaseURL ? baseURL + url : url 

  if (method === 'POST') {
    try {
      const response = await fetch(requestURL, {
        method: method,
        body: JSON.stringify(data),
        headers: headers,
      }) 
      return response.json() 
    } catch(err) {
      console.log(err.message) 
    }
  } else {
    try {
      const response = await fetch(requestURL, {
        method: method,
        headers: headers,
      }) 
      return response.json() 
    } catch(e) {
      console.log(e.message) 
    }
  }
} 
