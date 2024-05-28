

const fetchApiData = async (url, method = "GET", body = null, token = null) => {
  // Crear el objeto de headers inicialmente solo con el content type
  const headers = new Headers({
    "Content-Type": "application/json"
  });

  // Añadir condicionalmente el token Bearer solo si el token está presente
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
    console.log("Enviando token: ", `Bearer ${token}`);  // Puedes comentar o eliminar esta línea después de la depuración
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
    return payload;
  } catch (error) {
    return error;
  }
};


export  async function getCategories () {
    const url = process.env.NEXT_PUBLIC_API_URL +  "categories/all";
    const resCategories = fetchApiData(url);
    return resCategories;
}

export  async function getSizes () {
  const url = process.env.NEXT_PUBLIC_API_URL +  "sizes/all";
  const resSizes = fetchApiData(url);
  return resSizes;
}

export  async function getColors () {
  const url = process.env.NEXT_PUBLIC_API_URL +  "colors/all";
  const resColors = fetchApiData(url);
  return resColors;
}


export  async function getProductsBySubcategory (id) {
    const url = process.env.NEXT_PUBLIC_API_URL + "products/getBySubCategory/" + id;
    return fetchApiData(url);
  };

  export  async function getNovelties () {
    const url = process.env.NEXT_PUBLIC_API_URL + "products/novelties/all";
    return fetchApiData(url);
  };

  export  async function getDiscounts () {
    const url = process.env.NEXT_PUBLIC_API_URL + "products/discounts/all";
    return fetchApiData(url);
  };

  export  async function getOutletProducts () {
    const url = process.env.NEXT_PUBLIC_API_URL + "products/outlet/all";
    return fetchApiData(url);
  };

  export  async function getSubcategory (id) {
    const url = process.env.NEXT_PUBLIC_API_URL + "subcategories/getById/" + id;
    return fetchApiData(url);
  };

  export  async function getProductById (id) {
    const url = process.env.NEXT_PUBLIC_API_URL + "products/" + id;
    return fetchApiData(url);
  };

  export  async function getProducts () {
    const url = process.env.NEXT_PUBLIC_API_URL + "products/all";
    return fetchApiData(url);
  };

  export  async function getProductsStock () {
    const url = process.env.NEXT_PUBLIC_API_URL + "products/allStock";
    return fetchApiData(url);
  };


  export  async function getSubcategories () {
    const url = process.env.NEXT_PUBLIC_API_URL + "subcategories/all";
    return fetchApiData(url);
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
 return fetchApiData(url, "POST", body, token);
}

export  async function stockCreate ( formData ) {
  const body = formData;
   const url = process.env.NEXT_PUBLIC_API_URL +  "stock/create";
 return fetchApiData(url, "POST", body);
}

 