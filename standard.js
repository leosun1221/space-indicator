class SpaceIndicator {
    constructor() {
        this.showFontSize = false; // Default is hidden
        this.showSpacing = false;  // Default is hidden
        this.showPadding = false;  // Default is hidden
        this.init();
    }

    init() {
        this.addGlobalStyles();
        this.createToggleButtons();
        this.applyIndicators();
    }

    // Add global styles for the indicators and buttons
    addGlobalStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            .space-indicator {
                position: absolute;
                background-color: rgba(255, 255, 0, 0.8); /* Yellow background for better visibility */
                color: black; /* Black text color for contrast */
                font-size: 10px;
                font-weight: bold;
                padding: 2px;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                pointer-events: none;
                box-sizing: border-box;
                border: 1px dashed red;
            }
            .font-size-indicator {
                position: absolute;
                color: red;
                font-size: 12px;
                font-weight: bold;
                z-index: 10000;
                pointer-events: none;
                background-color: rgba(255, 255, 255, 0.8); /* White background for better visibility */
                padding: 2px 4px;
            }
            .toggle-button {
                position: sticky ;
                bottom: 20px;
                background-color: black;
                color: white;
                font-size: 14px;
                padding: 10px;
                margin: 5px;
                cursor: pointer;
                z-index: 10001;
                border: none;
                border-radius: 5px;
                display: inline-block;
                width: auto;
            }
            .button-container {
                position: fixed;
                bottom: 20px;
                left: 20px;
                display: flex;
                flex-direction: column;
            }
        `;
        document.head.appendChild(style);
    }

    // Create toggle buttons
    createToggleButtons() {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        const toggleFontSizeButton = this.createButton('Toggle Font Size', () => {
            this.showFontSize = !this.showFontSize;
            this.applyIndicators();
        });

        const toggleSpacingButton = this.createButton('Toggle Spacing', () => {
            this.showSpacing = !this.showSpacing;
            this.applyIndicators();
        });

        const togglePaddingButton = this.createButton('Toggle Padding', () => {
            this.showPadding = !this.showPadding;
            this.applyIndicators();
        });

        buttonContainer.appendChild(toggleFontSizeButton);
        buttonContainer.appendChild(toggleSpacingButton);
        buttonContainer.appendChild(togglePaddingButton);
        document.body.appendChild(buttonContainer);
    }

    // Create a single button with text and click handler
    createButton(text, onClick) {
        const button = document.createElement('button');
        button.className = 'toggle-button';
        button.innerText = text;
        button.addEventListener('click', onClick);
        return button;
    }

    // Clear existing indicators before applying new ones
    clearIndicators() {
        document.querySelectorAll('.space-indicator, .font-size-indicator').forEach(el => el.remove());
    }

    // Apply space indicators to all elements on the page
    applyIndicators() {
        this.clearIndicators();
        const allElements = document.querySelectorAll('*:not(.toggle-button)');

        allElements.forEach((element) => {
            const computedStyle = window.getComputedStyle(element);

            // Skip invisible elements
            if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden') return;

            // Get element dimensions and position
            const rect = element.getBoundingClientRect();

            // Apply margin indicators if spacing is toggled on
            if (this.showSpacing) {
                this.addMarginIndicators(element, rect, computedStyle);
                this.addSpaceBetweenElements(element, rect);
            }

            // Apply padding indicators if padding is toggled on
            if (this.showPadding) {
                this.addPaddingIndicators(element, rect, computedStyle);
            }

            // Apply font size indicator if font size is toggled on and element has text content
            if (this.showFontSize && this.hasTextContent(element)) {
                this.addFontSizeIndicator(element, computedStyle);
            }
        });
    }

    // Add margin indicators
    addMarginIndicators(element, rect, computedStyle) {
        const margins = ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'];
        const marginColors = ['rgba(0, 0, 255, 0.3)', 'rgba(0, 255, 0, 0.3)', 'rgba(255, 0, 0, 0.3)', 'rgba(255, 255, 0, 0.3)'];
        
        margins.forEach((margin, index) => {
            const value = parseInt(computedStyle[margin], 10);
            if (value > 0) {
                const indicator = document.createElement('div');
                indicator.className = 'space-indicator';
                indicator.style.backgroundColor = marginColors[index];

                if (index === 0) { // Top margin
                    indicator.style.top = `${rect.top - value}px`;
                    indicator.style.left = `${rect.left}px`;
                    indicator.style.width = `${rect.width}px`;
                    indicator.style.height = `${value}px`;
                } else if (index === 1) { // Right margin
                    indicator.style.top = `${rect.top}px`;
                    indicator.style.left = `${rect.right}px`;
                    indicator.style.width = `${value}px`;
                    indicator.style.height = `${rect.height}px`;
                } else if (index === 2) { // Bottom margin
                    indicator.style.top = `${rect.bottom}px`;
                    indicator.style.left = `${rect.left}px`;
                    indicator.style.width = `${rect.width}px`;
                    indicator.style.height = `${value}px`;
                } else if (index === 3) { // Left margin
                    indicator.style.top = `${rect.top}px`;
                    indicator.style.left = `${rect.left - value}px`;
                    indicator.style.width = `${value}px`;
                    indicator.style.height = `${rect.height}px`;
                }

                indicator.innerText = `${value}px`;
                document.body.appendChild(indicator);
            }
        });
    }

    // Add padding indicators
    addPaddingIndicators(element, rect, computedStyle) {
        const paddings = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'];
        
        paddings.forEach((padding, index) => {
            const value = parseInt(computedStyle[padding], 10);
            if (value > 0) {
                const indicator = document.createElement('div');
                indicator.className = 'space-indicator';

                if (index === 0) { // Top padding
                    indicator.style.top = `${rect.top}px`;
                    indicator.style.left = `${rect.left}px`;
                    indicator.style.width = `${rect.width}px`;
                    indicator.style.height = `${value}px`;
                    indicator.style.borderBottom = '1px solid blue';
                } else if (index === 1) { // Right padding
                    indicator.style.top = `${rect.top}px`;
                    indicator.style.left = `${rect.right - value}px`;
                    indicator.style.width = `${value}px`;
                    indicator.style.height = `${rect.height}px`;
                    indicator.style.borderLeft = '1px solid blue';
                } else if (index === 2) { // Bottom padding
                    indicator.style.top = `${rect.bottom - value}px`;
                    indicator.style.left = `${rect.left}px`;
                    indicator.style.width = `${rect.width}px`;
                    indicator.style.height = `${value}px`;
                    indicator.style.borderTop = '1px solid blue';
                } else if (index === 3) { // Left padding
                    indicator.style.top = `${rect.top}px`;
                    indicator.style.left = `${rect.left}px`;
                    indicator.style.width = `${value}px`;
                    indicator.style.height = `${rect.height}px`;
                    indicator.style.borderRight = '1px solid blue';
                }

                indicator.innerText = `${value}px`;
                document.body.appendChild(indicator);
            }
        });
    }

    // Add indicators for space between adjacent elements
    addSpaceBetweenElements(element, rect) {
        const nextElement = element.nextElementSibling;
        if (nextElement) {
            const nextRect = nextElement.getBoundingClientRect();

            // Vertical space
            if (nextRect.top > rect.bottom) {
                const verticalSpace = nextRect.top - rect.bottom;
                const indicator = document.createElement('div');
                indicator.className = 'space-indicator';
                indicator.style.top = `${rect.bottom}px`;
                indicator.style.left = `${rect.left}px`;
                indicator.style.width = `${rect.width}px`;
                indicator.style.height = `${verticalSpace}px`;
                indicator.innerText = `${verticalSpace}px`;
                document.body.appendChild(indicator);
            }

            // Horizontal space
            if (nextRect.left > rect.right) {
                const horizontalSpace = nextRect.left - rect.right;
                const indicator = document.createElement('div');
                indicator.className = 'space-indicator';
                indicator.style.top = `${rect.top}px`;
                indicator.style.left = `${rect.right}px`;
                indicator.style.width = `${horizontalSpace}px`;
                indicator.style.height = `${rect.height}px`;
                indicator.innerText = `${horizontalSpace}px`;
                document.body.appendChild(indicator);
            }
        }
    }

    // Add font size indicator for elements with text content
    addFontSizeIndicator(element, computedStyle) {
        const fontSize = computedStyle.fontSize;
        const fontSizeIndicator = document.createElement('div');
        fontSizeIndicator.className = 'font-size-indicator';
        fontSizeIndicator.innerText = `${fontSize}`;

        element.style.position = 'relative'; // Ensure the element is positioned relatively
        element.appendChild(fontSizeIndicator);
    }

    // Check if an element contains text content
    hasTextContent(element) {
        return element.textContent.trim().length > 0;
    }
}

// Initialize the SpaceIndicator library when the document is ready
new SpaceIndicator();
