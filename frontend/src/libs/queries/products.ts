import axios from 'axios';

export const uploadFile = async (file) => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL;

  const formData = new FormData();
  formData.append('operations', JSON.stringify({
    query: `
      mutation($file: Upload!) {
        upload(file: $file) {
            data {
              id
            }
          }
        }
    `,
    variables: {
      file: null,
    },
  }));
  formData.append('map', JSON.stringify({ '0': ['variables.file'] }));
  formData.append('0', file, file.name);

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('GraphQL Upload Respons:', response.data);
    console.log('ImageId:', response.data.data.upload.data.id);

    const imageId = response.data.data.upload.data.id;

    return imageId;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

export const createMaterial = async (material:MaterialAttributes) => {
    const url = `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`;
    const query = `
    mutation {
        createMaterial(data: { 
        title: "${material.title}",
        description: "${material.description}",
        amount: ${material.amount},
        available: ${material.available},
        dayPrice: ${material.dayPrice},
        owner: ${material.owner.data.id},
        category: ${material.category.data.id},
        cover: ${material.cover.data.id}
        }) {
        data {
            attributes {
                title
                description
                amount
                available
                dayPrice
                cover {
                    data {
                        id
                    attributes {
                        url
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
        const response = await axios.post(url, { query });
        return response.data.data.createMaterial.data;
    } catch (error) {
        console.log(error);
        console.log(query)
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






