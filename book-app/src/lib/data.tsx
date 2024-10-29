export const MyBooks = async () => {
  const response = await fetch("http://localhost:8080/mybooks");

  return response.json();
};
