import React, { createContext, ReactNode, useContext, useState } from "react";

interface PopoverContextType {
    isVisible: boolean;
    content: ReactNode;
    showPopover: (content: ReactNode) => void;
    hidePopover: () => void;
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

export const PopoverProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [content, setContent] = useState<ReactNode>(null);

    const showPopover = (content: ReactNode) => {
        setContent(content);
        setIsVisible(true);
    };

    const hidePopover = () => {
        setIsVisible(false);
        setContent(null);
    };

    return (
        <PopoverContext.Provider value={{ isVisible, content, showPopover, hidePopover }}>
            {children}
        </PopoverContext.Provider>
    );
};

export const usePopover = (): PopoverContextType => {
    const context = useContext(PopoverContext);
    if (!context) {
        throw new Error("usePopover must be used within a PopoverProvider");
    }
    return context;
};
