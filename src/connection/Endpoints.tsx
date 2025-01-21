import {HttpRequestMethods} from "./fetchBackend.tsx";

export interface Endpoint {
    url: string;
    method: HttpRequestMethods;
}

export const APIEndpoints: {
    drugOrders: {
        getAll: Endpoint;
        getById: Endpoint;
        add: Endpoint;
        update: Endpoint;
        remove: Endpoint;
    },
    administrator: {
        getAll: Endpoint
        getById: Endpoint
        add: Endpoint
        update: Endpoint
        remove: Endpoint
    },
    pharmacy: {
        getAll: Endpoint;
        getById: Endpoint;
        add: Endpoint;
        update: Endpoint;
        remove: Endpoint;
    };
    pharmacist: {
        getAll: Endpoint;
        getById: Endpoint;
        add: Endpoint;
        update: Endpoint;
        remove: Endpoint;
    };
    drug: {
        getAll: Endpoint;
        getById: Endpoint;
        add: Endpoint;
        update: Endpoint;
        remove: Endpoint;
    };
    manager: {
        getAll: Endpoint;
        getById: Endpoint;
        add: Endpoint;
        update: Endpoint;
        remove: Endpoint;
    };
} = {
    drugOrders: {
        getAll: {
            url: "drug/order/get/all",
            method: HttpRequestMethods.GET,
        },
        getById: ({
            url: `drug/order/get`,
            method: HttpRequestMethods.GET,
        }),
        add: {
            url: "drug/order/add",
            method: HttpRequestMethods.POST,
        },
        update: ({
            url: `drug/order/update`,
            method: HttpRequestMethods.PUT,
        }),
        remove: ({
            url: `drug/order/remove/id`,
            method: HttpRequestMethods.DELETE,
        }),
    },
    administrator: {
        getAll: {
            url: "administrator/get/all",
            method: HttpRequestMethods.GET,
        },
        getById: ({
            url: `administrator/get`,
            method: HttpRequestMethods.GET,
        }),
        add: {
            url: "administrator/add",
            method: HttpRequestMethods.POST,
        },
        update: ({
            url: `administrator/update`,
            method: HttpRequestMethods.PUT,
        }),
        remove: ({
            url: `administrator/remove/id`,
            method: HttpRequestMethods.DELETE,
        }),
    },
    pharmacy: {
        getAll: {
            url: "pharmacy/get/all",
            method: HttpRequestMethods.GET,
        },
        getById: ({
            url: `pharmacy/get`,
            method: HttpRequestMethods.GET,
        }),
        add: {
            url: "pharmacy/add",
            method: HttpRequestMethods.POST,
        },
        update: ({
            url: `pharmacy/update`,
            method: HttpRequestMethods.PUT,
        }),
        remove: ({
            url: `pharmacy/remove/id`,
            method: HttpRequestMethods.DELETE,
        }),
    },
    pharmacist: {
        getAll: {
            url: "pharmacist/get/all",
            method: HttpRequestMethods.GET,
        },
        getById: ({
            url: `pharmacist/get`,
            method: HttpRequestMethods.GET,
        }),
        add: {
            url: "pharmacist/add",
            method: HttpRequestMethods.POST,
        },
        update: ({
            url: `pharmacist/update`,
            method: HttpRequestMethods.PUT,
        }),
        remove: ({
            url: `pharmacist/remove/id`,
            method: HttpRequestMethods.DELETE,
        }),
    },
    drug: {
        getAll: {
            url: "drug/get/all",
            method: HttpRequestMethods.GET,
        },
        getById: ({
            url: `drug/get`,
            method: HttpRequestMethods.GET,
        }),
        add: {
            url: "drug/add",
            method: HttpRequestMethods.POST,
        },
        update: ({
            url: `drug/update`,
            method: HttpRequestMethods.PUT,
        }),
        remove: ({
            url: `drug/remove/id`,
            method: HttpRequestMethods.DELETE,
        }),
    },
    manager: {
        getAll: {
            url: "manager/get/all",
            method: HttpRequestMethods.GET,
        },
        getById: ({
            url: `manager/get`,
            method: HttpRequestMethods.GET,
        }),
        add: {
            url: "manager/add",
            method: HttpRequestMethods.POST,
        },
        update: ({
            url: `manager/update`,
            method: HttpRequestMethods.PUT,
        }),
        remove: ({
            url: `manager/remove/id`,
            method: HttpRequestMethods.DELETE,
        }),
    },
};
