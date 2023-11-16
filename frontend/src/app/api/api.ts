import axios from "axios";

export const fetchMaterials = async () => {
    const url = `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`;
    const query = `
    query {
        materials {
            data {
                id
                attributes {
                    title
                    description
                    amount
                    available
                    dayPrice
                    cover {
                    data {
                    attributes {
                        url
                    }
                    }
                }
                owner{
                data{
                    id
                    attributes{username}
                }
                }
                    category {
                    data {
                        id
                    attributes {
                        name
                    }
                    }
                }
            }
        }
    }
}`;

try {
    const response = await axios.post(url, { query });
    return response.data.data.materials.data;
} catch (error) {
    console.log(error);
    return null;
}
};

export const fetchMaterial = async (id: number) => {
const url = `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`;
const query = `
    query {
        material(id: "${id}") {
            data {
                id
                attributes {
                    title
                    description
                    amount
                    available
                    dayPrice
                    cover {
                    data {
                    attributes {
                        url
                    }
                    }
                }
                owner{
                data{
                    id
                    attributes{
                        username
                    }
                }
                }
                    category {
                    data {
                        id
                    attributes {
                        name
                    }
                    }
                }
            }
        }
    }
}`;

try {
    const response = await axios.post(url, { query });
    return response.data.data.material.data;
} catch (error) {
    console.log(error);
    return null;
}
};

export const fetchUserMaterial = async (userId: string) => {
    const url = `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`;
    const query = `
    query {
        materials(filters: { owner: { id: { eq: ${userId} } } }) {
          data {
            id
            attributes {
              title
              dayPrice
              available
              description
              cover {
                data {
                attributes {
                    url
                }
                }
            }
              category {
                data {
                    id
                attributes {
                    name
                }
                }
            }
              owner {
                data {
                  id
                  attributes {
                    username
                  }
                }
              }
            }
          }
        }
      }`;
        console.log(query);
    try {
        const response = await axios.post(url, { query });
        console.log(response);
        return response.data.data.materials.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const fetchCategory = async (id: number) => {
    const url = `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`;
    const query = `
      query {
        category(id: "${id}") {
          data {
            attributes {
              name
              materials {
                data {
                    id
                    attributes {
                        title
                        description
                        amount
                        available
                        dayPrice
                        cover {
                        data {
                        attributes {
                            url
                        }
                        }
                    }
                    owner{
                    data{
                        attributes{username}
                    }
                    }
                        category {
                        data {
                        attributes {
                            name
                        }
                        }
                    }
                }
            }
        }
            }
          }
        }
      }`;
  
    try {
      const response = await axios.post(url, { query });

      return response.data.data.category.data;
    } catch (error) {
      console.log(error);
      return null;
    }
};

export const fetchCategories = async () => {
    const url = `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`;
    const query = `
    query {
    categories{
        data {
        id
        attributes {
            name
        }
        }
    }
    }`;

try {
    const response = await axios.post(url, { query });
    return response.data.data.categories.data;
} catch (error) {
    console.log(error);
    return null;
}
};

export const deleteMaterial = async (materialId: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;
    const query = `
        mutation{
        deleteMaterial(id: ${materialId}){
        data{
            id
            attributes{
                title
            }
        }
        }
    }`
        console.log(query);
    try {
        const response = await axios.post(url, { query });
        return response.data.data.deleteMaterial.data;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export const updateMaterial = async (material: MaterialAttributes) => {
    const url = `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`;
    const query = `
      mutation {
        updateMaterial(
          id:${material.id},
          data:{ 
            title: "${material.title}",
            description: "${material.description}",
            amount: ${material.amount},
            available: ${material.available},
            dayPrice: ${material.dayPrice},
            category: ${material.category.data.id},
          }
        ) {
          data {
            attributes {
              title
              description
              amount
              available
              dayPrice
              owner {
                data {
                  id
                  attributes {
                    username
                  }
                }
              }
              category {
                data {
                  id
                  attributes {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `;
      
    try {
      console.log('GraphQL Query:', query); // Log the GraphQL query
      const response = await axios.post(url, { query });
      console.log('Response from server:', response.data); // Log the response from the server
      return response.data.data.updateMaterial.data;
    } catch (error) {
      console.log('Error:', error);
      console.log('GraphQL Query:', query);
      return null;
    }
};

export const fetchUsers = async () => {
  const url = `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`;
  const query = `
  query{
    usersPermissionsUsers{
      data{
        attributes{
          username
          email
          avatar{
            data{
              attributes{
                url
              }
            }
          }
        }
      }
    }
  }`;

try {
  const response = await axios.post(url, { query });
  return response.data.data.usersPermissionsUsers.data;
} catch (error) {
  console.log(error);
  return null;
}
};

export const fetchUser = async (id:number) => {
  const url = `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`;
  const query = `
  query{
    userPermissionsUser(id:${id}){
      data{
        attributes{
          username
          avatar{
            data{
              attributes{
                url
              }
            }
          }
        }
      }
    }
  }`;

try {
  const response = await axios.post(url, { query });
  return response.data.data.userPermissionsUser.data;
} catch (error) {
  console.log(error);
  return null;
}
};
  


