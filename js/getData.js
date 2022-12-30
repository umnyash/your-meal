// export const getData = (url) => {
//   const response = fetch(url).then(response => console.log(response));
//   console.log(response)
// };

export const getData = async (url) => {
  const response = await fetch(url);
  
  if (response.ok) {
    return response.json();
  }
};