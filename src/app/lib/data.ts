

const fetchApiData = async (url, method = "GET", body = null) => {
  const options = {
    method: method,
    headers: new Headers({
      "Content-type": "application/json",
    }),
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
   return fetchApiData(url, "POST",body);
 }

