export const getGreeting = async () => {
  const res = await fetch("/api/hello");
  return res.json();
};

export const getDogs = async () => {
  const res = await fetch("/api/dogs");
  return res.json();
}

export const getCities = async () => {
  const res = await fetch("/api/cities");
  return res.json();
}

export const getCity = async (id) => {
  const res = await fetch(`/api/cities/${id}`)
  return res.json();
}

export const addCity = async (city) => {
  await fetch("/api/cities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(city)
  });
}