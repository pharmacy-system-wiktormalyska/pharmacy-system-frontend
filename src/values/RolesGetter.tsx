interface role {
    name: string,
    id: number,
    allowedPanels: string[]
}

//TODO: Stworzone do mockowania i brać z tokenu jaki ma
export const rolesGetter: role[] = [
    {
        name:"ADMINISTRATOR",
        id: 0,
        allowedPanels: ["*"]
    },
    {
        name: "PHARMACIST",
        id: 1,
        allowedPanels: ["prescription", "sell", "order", "warehouse_view"]
    },
    {
        name: "Warehouse Manager",
        id: 2,
        allowedPanels: ["warehouse_edit"]
    },
    {
        name: "MANAGER",
        id: 3,
        allowedPanels: ["prescription", "sell", "order", "warehouse_view", "warehouse_edit"]
    }
]

export const roleHasAccess = (role: role, panelName: string): boolean => {
    return role.allowedPanels.includes(panelName) || role.allowedPanels.includes("*");
};