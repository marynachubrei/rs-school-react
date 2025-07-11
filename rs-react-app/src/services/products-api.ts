const BASE_URL = 'https://dummyjson.com/products';

// export const getAllProducts = async () => {
//   const response = await fetch(`${BASE_URL}`, {});
//   const data = await response.json();
//   return data.products;
// };

export const getAllProducts = async (query: string) => {
  const response = await fetch(
    `${BASE_URL}/search?q=${encodeURIComponent(query)}`,
    {}
  );
  const data = await response.json();
  return data.products;
};
