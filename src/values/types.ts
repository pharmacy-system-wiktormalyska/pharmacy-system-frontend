export interface User {
    id: string;
    firstName: string;
    lastName: string;
    token: string;
    post: string;
    roles : string[];
}

export interface RoleAndAccess {
    role: string;
    panelKey: string[];
}