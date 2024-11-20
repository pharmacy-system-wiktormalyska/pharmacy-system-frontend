interface Color {
    hex: string;
}

const colorPalette: { [key in 'background' | 'windowBackground' | 'sidebar' | 'header' | 'inputBox' | 'button' | 'buttonHover' | 'text' | 'darkText' | 'lightBackground' | 'lightBackgroundShadow']: Color } = {
    background: { hex: "#00051f" },
    windowBackground: { hex: "#f1f2f6"},
    sidebar: { hex: "#000833"},
    header: { hex: "#001E6F"},
    inputBox: { hex: '#dee2e6'},                // light gray input
    button: { hex: '#00296b'},                  // blue button color
    buttonHover: { hex: '#003f88'},             // lighter blue button hover
    text: { hex: '#f1f2f6'},                    // white text
    darkText: { hex: '#00072d'},
    lightBackground: { hex: '#f1f2f6'},
    lightBackgroundShadow: { hex: '#e0e0e0'}
};

export default colorPalette;