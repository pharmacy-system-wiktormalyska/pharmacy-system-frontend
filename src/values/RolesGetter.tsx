interface role {
    name: string,
    id: number,
    allowedPanels: string[]
}

//TODO: Stworzone do mockowania i brać z backendu
export const rolesGetter: role[] = [
    {
        name:"Owner",
        id: 0,
        allowedPanels: ["*"]
    },
    {
        name: "Pharmacist",
        id: 1,
        allowedPanels: ["prescription", "sell", "order", "warehouse_view"]
    },
    {
        name: "Warehouse Manager",
        id: 2,
        allowedPanels: ["warehouse_edit"]
    },
    {
        name: "Department Manager",
        id: 3,
        allowedPanels: ["prescription", "sell", "order", "warehouse_view", "warehouse_edit"]
    }
]

export const getRoleByID = (id : number):role | undefined => {
    return rolesGetter.find(role => role.id === id);
}

export const roleHasAccess = (role: role, panelName: string): boolean => {
    return role.allowedPanels.includes(panelName) || role.allowedPanels.includes("*");
};