export const fetchData = () => {
  return fetch('https://651305918e505cebc2e9779f.mockapi.io/api/temperature')
    .then((res) => res.json())
    .then((data) => data);
};