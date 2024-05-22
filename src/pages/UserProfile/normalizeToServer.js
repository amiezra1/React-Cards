const normalizeToServer = (data) =>{
  return {
    name: {
      first: data.first,
      middle: data.middle,
      last: data.last,
    },
    phone: data.phone,
    image: {
      url: data.url,
      alt: data.alt,
    },
    address: {
      state: data.state,
      country: data.country,
      city: data.city,
      street: data.street,
      houseNumber: data.houseNumber,
      zip: data.zip,
    },
  };
}
export default normalizeToServer;