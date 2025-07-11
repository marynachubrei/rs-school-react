const BASE_URL = 'https://dummyjson.com';

export const getAll = async () => {
  const response = await fetch(`${BASE_URL}/users`, {});
  const data = await response.json();
  return data.users;
};

export const searchAll = async (query) => {
  const response = await fetch(
    `${BASE_URL}/users/search?q=${encodeURIComponent(query)}`,
    {}
  );
  const data = await response.json();
  return data.users;
};
