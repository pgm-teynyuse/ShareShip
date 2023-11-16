type MaterialAttributes = {
    id:number;
    title: string;
    description: string;
    available: boolean;
    amount: number;
    dayPrice: number;

    owner:{
    data:{
        id:any;
        attributes:{
        id: any;
        username: string;
        };
    };
    
    }

    cover?: {
    data: {
        id:any;
        attributes: {
        url: string;
        };
    }[];

    };
    category: {
    data: {
        id:any;
        attributes: {
        name: string;
        };
    };
    };
};

type Material = {
id: string;
attributes: MaterialAttributes;
};

type Materials = Material[];

type RentRequestAttributes = {
status:string;
renter: {
    data: {
    id: any;
    attributes: {
        username: string;
    };
    };
};
material: {
    data : Material
} 
};

type RentRequest = {
id: string;
attributes: RentRequestAttributes;
};

type RentRequests = RentRequest[];



