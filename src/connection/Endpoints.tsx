import {HttpRequestMethods} from "./fetchBackend.tsx";

export interface Endpoint {
    url: string;
    method: HttpRequestMethods;
}

export const APIEndpoints: {
    drugOrders: {
        getAll: Endpoint;
        getById: (id: number) => Endpoint;
        add: Endpoint;
        update: (id: number) => Endpoint;
        remove: (id: number) => Endpoint;
    },
    auth: {
        login: Endpoint
    },
    administrator: {
        getAll: Endpoint
        getById: (id: number) => Endpoint
        add: Endpoint
        update: (id: number) => Endpoint
        remove: (id: number) => Endpoint
    },
    pharmacy: {
        getAll: Endpoint;
        getById: (id: number) => Endpoint;
        add: Endpoint;
        update: (id: number) => Endpoint;
        remove: (id: number) => Endpoint;
    };
    pharmacist: {
        getAll: Endpoint;
        getById: (id: number) => Endpoint;
        add: Endpoint;
        update: (id: number) => Endpoint;
        remove: (id: number) => Endpoint;
    };
    drug: {
        getAll: Endpoint;
        getById: (id: number) => Endpoint;
        add: Endpoint;
        update: (id: number) => Endpoint;
        remove: (id: number) => Endpoint;
    };
} = {
    auth: {
      login: {
          url: "auth/login",
          method: HttpRequestMethods.POST
      }
    },
    drugOrders: {
        getAll: {
            url: "drug/order/get/all",
            method: HttpRequestMethods.GET,
        },
        getById: (id: number) => ({
            url: `drug/order/get/${id}`,
            method: HttpRequestMethods.GET,
        }),
        add: {
            url: "drug/order/add",
            method: HttpRequestMethods.POST,
        },
        update: (id: number) => ({
            url: `drug/order/update/${id}`,
            method: HttpRequestMethods.PUT,
        }),
        remove: (id: number) => ({
            url: `drug/order/delete/${id}`,
            method: HttpRequestMethods.DELETE,
        }),
    },
    administrator: {
        getAll: {
            url: "administrator/get/all",
            method: HttpRequestMethods.GET,
        },
        getById: (id: number) => ({
            url: `administrator/get/${id}`,
            method: HttpRequestMethods.GET,
        }),
        add: {
            url: "administrator/add",
            method: HttpRequestMethods.POST,
        },
        update: (id: number) => ({
            url: `administrator/update/${id}`,
            method: HttpRequestMethods.PUT,
        }),
        remove: (id: number) => ({
            url: `administrator/delete/${id}`,
            method: HttpRequestMethods.DELETE,
        }),
    },
    pharmacy: {
        getAll: {
            url: "pharmacy/get/all",
            method: HttpRequestMethods.GET,
        },
        getById: (id: number) => ({
            url: `pharmacy/get/${id}`,
            method: HttpRequestMethods.GET,
        }),
        add: {
            url: "pharmacy/add",
            method: HttpRequestMethods.POST,
        },
        update: (id: number) => ({
            url: `pharmacy/update/${id}`,
            method: HttpRequestMethods.PUT,
        }),
        remove: (id: number) => ({
            url: `pharmacy/delete/${id}`,
            method: HttpRequestMethods.DELETE,
        }),
    },
    pharmacist: {
        getAll: {
            url: "pharmacist/get/all",
            method: HttpRequestMethods.GET,
        },
        getById: (id: number) => ({
            url: `pharmacist/get/${id}`,
            method: HttpRequestMethods.GET,
        }),
        add: {
            url: "pharmacist/add",
            method: HttpRequestMethods.POST,
        },
        update: (id: number) => ({
            url: `pharmacist/update/${id}`,
            method: HttpRequestMethods.PUT,
        }),
        remove: (id: number) => ({
            url: `pharmacist/delete/${id}`,
            method: HttpRequestMethods.DELETE,
        }),
    },
    drug: {
        getAll: {
            url: "drug/get/all",
            method: HttpRequestMethods.GET,
        },
        getById: (id: number) => ({
            url: `drug/get/${id}`,
            method: HttpRequestMethods.GET,
        }),
        add: {
            url: "drug/add",
            method: HttpRequestMethods.POST,
        },
        update: (id: number) => ({
            url: `drug/update/${id}`,
            method: HttpRequestMethods.PUT,
        }),
        remove: (id: number) => ({
            url: `drug/delete/${id}`,
            method: HttpRequestMethods.DELETE,
        }),
    },
};
