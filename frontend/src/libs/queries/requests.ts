import axios from "axios";

export const fetchMaterialRequests = async (userId: string) => {
const url = `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`;
const query = `
query{
rentRequests(filters: { material: { owner: { id: { eq: ${userId} } } } }){
    data{
        id
    attributes{
        status
        renter{
        data{
            id
            attributes{
            username
            }
        }
        }
    }
    attributes{
        material{
        data{
            attributes{
            title
            owner{
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
    }
    }
}
}
`;



try {
    const response = await axios.post(url, { query });
    return response.data.data.rentRequests.data;
    
} catch (error) {
    console.log(error);
    return null;
}
};

export const fetchUserRequests = async (userId: string) => {
  const url = `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`;
  const query = `
  query{
  rentRequests(filters: { renter: { id: { eq: ${userId} } } }){
      data{
          id
      attributes{
          status
          renter{
          data{
              id
              attributes{
              username
              }
          }
          }
      }
      attributes{
          material{
          data{
          id
              attributes{
              title
              owner{
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
      }
      }
  }
  }
  `;
  
  
  
  try {
      const response = await axios.post(url, { query });
      return response.data.data.rentRequests.data;
      
  } catch (error) {
      console.log(error);
      return null;
  }
  };

export const UpdateMaterialRequests = async (request: RentRequest, newStatus: string) => {
    const url = `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`;
    const query = `
      mutation {
        updateRentRequest(
          id: ${request.id},
          data: {
            status: ${newStatus}
          }
        ) {
          data {
            id
            attributes {
              status
              renter {
                data {
                  id
                  attributes {
                    username
                  }
                }
              }
            }
            attributes {
              material {
                data {
                  attributes {
                    title
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
            }
          }
        }
      }
    `;
  
    try {
      const response = await axios.post(url, { query });
      console.log(query);
      return response.data.data.updateRentRequests.data;
    } catch (error) {
      console.log(error);
      return null;
    }
};

export const CreateMaterialRequest = async (userId: string, id:number ) => {
  const url = `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`;
  const query = `
    mutation {
      createRentRequest(
        data: {
          material: ${id},
          renter:${userId},
          status:requested
      }) {
        data {
          id
          attributes {
            status
            renter {
              data {
                id
                attributes {
                  username
                }
              }
            }
          }
          attributes {
            material {
              data {
                attributes {
                  title
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
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(url, { query });
    console.log(query);
    return response.data.data.createRentRequests.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteRequest = async (requestId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;
  const query = `
      mutation{
      deleteRentRequest(id: ${requestId}){
        data{
          id
          attributes{
            material{
              data{
                attributes{
                  title
                }
              }
            }
          }
      }
      }
  }`
      console.log(query);
  try {
      const response = await axios.post(url, { query });
      return response.data.data.deleteRentRequest.data;
  }
  catch (error) {
      console.log(error);
      return null;
  }
}