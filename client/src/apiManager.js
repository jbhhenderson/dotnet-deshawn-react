export const getGreeting = async () => {
  const res = await fetch("/api/hello");
  return res.json();
};

export const getDogs = async () => {
  const res = await fetch("/api/dogs");
  return res.json();
};

export const getDog = async (id) => {
  const res = await fetch(`/api/dogs/${id}`);
  return res.json();
}

export const addDog = async (newDog) => {
  await fetch("/api/dogs", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(newDog)
  })
};

export const getCities = async () => {
  const res = await fetch("/api/cities");
  return res.json();
};

export const getCity = async (id) => {
  const res = await fetch(`/api/cities/${id}`);
  return res.json();
};

export const addCity = async (city) => {
  await fetch("/api/cities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(city)
  });
};

export const getWalkers = async () => {
  const res = await fetch(`/api/walkers`);
  return res.json();
};

export const getWalker = async (id) => {
  const res = await fetch(`/api/walker/${id}`);
  return res.json();
};

export const getWalkersByCity = async (cityName) => {
  const res = await fetch(`/api/walkers/${cityName}`);
  return res.json();
};