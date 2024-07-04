

const fetchApiData = async (url, method = "GET", body = null, token = null) => {
  // Crear el objeto de headers inicialmente solo con el content type
  const headers = new Headers({
    "Content-Type": "application/json"
  });

  // Añadir condicionalmente el token Bearer solo si el token está presente
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  const options = {
    method: method,
    headers: headers,
    mode: "cors",
    body: body ? JSON.stringify(body) : null,
    redirect: 'follow',
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      return Promise.reject(response.status);
    }
    const payload = await response.json();
    return (payload);
  } catch (error) {
    return error;
  }
};

export async function getAllData() {
  const url = process.env.NEXT_PUBLIC_API_URL + "data/all";
  return await fetchApiData(url);
}


export  async function getCategories () {
    const url = process.env.NEXT_PUBLIC_API_URL +  "categories/all";
    const resCategories =  fetchApiData(url);
    return await fetchApiData(url);
}

export  async function getSizes () {
  const url = process.env.NEXT_PUBLIC_API_URL +  "sizes/all";
  return await fetchApiData(url);
}

export  async function getColors () {
  const url = process.env.NEXT_PUBLIC_API_URL +  "colors/all";
  return  await fetchApiData(url);
}


export  async function getProductsBySubcategory (id) {
    const url = process.env.NEXT_PUBLIC_API_URL + "products/getBySubCategory/" + id;
    return await fetchApiData(url);
  };

  export  async function getNovelties () {
    const url = process.env.NEXT_PUBLIC_API_URL + "novelties/all";
    return await fetchApiData(url);
  };

  export  async function getOutlets () {
    const url = process.env.NEXT_PUBLIC_API_URL + "outlet/all";
    return await fetchApiData(url);
  };

  export  async function getDiscounts () {
    const url = process.env.NEXT_PUBLIC_API_URL + "products/discounts/all";
    return await fetchApiData(url);
  };

  export  async function getOutletProducts () {
    const url = process.env.NEXT_PUBLIC_API_URL + "products/outlet/all";
    return await fetchApiData(url);
  };

  export  async function getSubcategory (id) {
    const url = process.env.NEXT_PUBLIC_API_URL + "subcategories/getById/" + id;
    return await fetchApiData(url);
  };

  export  async function getProductById (id) {
    const url = process.env.NEXT_PUBLIC_API_URL + "products/" + id;
    return await fetchApiData(url);
  };

  export  async function getProducts () {
    const url = process.env.NEXT_PUBLIC_API_URL + "products/all";
    return await fetchApiData(url);
  };

  export  async function getProductsStock () {
    const url = process.env.NEXT_PUBLIC_API_URL + "products/allStock";
    return await fetchApiData(url);
  };


  export  async function getSubcategories () {
    const url = process.env.NEXT_PUBLIC_API_URL + "subcategories/all";
    return await fetchApiData(url);
  };

  export  async function getOrders () {
    const url = process.env.NEXT_PUBLIC_API_URL + "orders/all";
    return await fetchApiData(url);
  };

  export  async function getOrdersById (id) {
    const url = process.env.NEXT_PUBLIC_API_URL + "orders/" + id;
    return await fetchApiData(url);
  };

  export  async function getcustomers () {
    const url = process.env.NEXT_PUBLIC_API_URL + "customers/all";
    return await fetchApiData(url);
  };

  export  async function login ( formData ) {
    const body = {
     email: formData.email,
     password: formData.password
     }
     const url = process.env.NEXT_PUBLIC_API_URL +  "login";
   return fetchApiData(url, "POST", body);
 }

 export  async function createProduct (data, checkedListArray, uploadPhotoArray, token) {
  console.log(token)
  const body = {
    name: data.name,
    description: data.description,  
    price: data.price,
    subcategory_id: data.subcategory_id,
    images: uploadPhotoArray,
    novelty: data.novelty ? data.novelty : false,
    sizes: checkedListArray,
    outlet: data.outlet ? data.outlet : false,
    discount: data.discount ? data.discount : false,
    reduced_price: data.reduced_price ? data.reduced_price : 0,
  };
   const url = process.env.NEXT_PUBLIC_API_URL +  "products/create";
 return await fetchApiData(url, "POST", body, token);
}

export  async function updateProduct (data, checkedListArray, uploadPhotoArray, token, id) {
  console.log(token)
  const body = {
    name: data.name,
    description: data.description,  
    price: data.price,
    subcategory_id: data.subcategory_id,
    images: uploadPhotoArray,
    novelty: data.novelty ? data.novelty : false,
    sizes: checkedListArray,
    outlet: data.outlet ? data.outlet : false,
    discount: data.discount ? data.discount : false,
    reduced_price: data.reduced_price ? data.reduced_price : 0,
    product_id:id
  };
   const url = process.env.NEXT_PUBLIC_API_URL +  "products/update";
 return await fetchApiData(url, "POST", body, token);
}

export  async function stockCreate ( formData, token ) {
  const body = formData;
   const url = process.env.NEXT_PUBLIC_API_URL +  "stock/create";
 return await fetchApiData(url, "POST", body, token);
}


export  async function colorCreate ( formData, token ) {
  const body = formData;
   const url = process.env.NEXT_PUBLIC_API_URL +  "colors/create";
 return await fetchApiData(url, "POST", body, token);
}


