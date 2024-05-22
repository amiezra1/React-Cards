const normalizeCreat = (dataToServer) => {
  return {
    title: dataToServer.title,
    subtitle: dataToServer.subtitle,
    description: dataToServer.description,
    phone: dataToServer.phone,
    email: dataToServer.email,
    web: dataToServer.web,
    image: {
      url: dataToServer.url,
      alt: dataToServer.alt,
    },
    address: {
      state: dataToServer.state,
      country: dataToServer.country,
      city: dataToServer.city,
      street: dataToServer.street,
      houseNumber: dataToServer.houseNumber,
      zip: dataToServer.zip,
    },
  };
};
export { normalizeCreat };
