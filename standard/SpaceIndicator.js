import React, { useState, useEffect } from 'react';
import './SpaceIndicator.css'; // Import the CSS file

const SpaceIndicator = () => {
    const [showFontSize, setShowFontSize] = useState(false);
    const [showSpacing, setShowSpacing] = useState(false);
    const [showPadding, setShowPadding] = useState(false);
    const [showDimensions, setShowDimensions] = useState(false);

    useEffect(() => {
        // Apply indicators on component mount and state change
        applyIndicators();
    }, [showFontSize, showSpacing, showPadding, showDimensions]);

    const applyIndicators = () => {
        clearIndicators();
        const allElements = document.querySelectorAll('body *:not(.not-calculate)');

        allElements.forEach((element) => {
            const computedStyle = window.getComputedStyle(element);

            // Skip invisible elements
            if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden') return;

            const rect = element.getBoundingClientRect();

            // Apply margin indicators if spacing is toggled on
            if (showSpacing) {
                addMarginIndicators(element, rect, computedStyle);
                addSpaceBetweenElements(element, rect);
            }

            // Apply padding indicators if padding is toggled on
            if (showPadding) {
                addPaddingIndicators(element, rect, computedStyle);
            }

            // Apply font size indicator if font size is toggled on and element has text content
            if (showFontSize && hasTextContent(element)) {
                addFontSizeIndicator(element, computedStyle);
            }

            // Apply dimension indicators if dimensions are toggled on
            if (showDimensions) {
                addDimensionIndicator(element, rect);
            }
        });
    };

    const clearIndicators = () => {
        document.querySelectorAll('.space-indicator, .font-size-indicator, .dimension-indicator').forEach(el => el.remove());
        document.querySelectorAll('.element-outline').forEach(el => el.classList.remove('element-outline'));
    };

    const addMarginIndicators = (element, rect, computedStyle) => {
        const margins = ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'];
        const marginColors = ['rgba(0, 0, 255, 0.3)', 'rgba(0, 255, 0, 0.3)', 'rgba(255, 0, 0, 0.3)', 'rgba(255, 255, 0, 0.3)'];

        margins.forEach((margin, index) => {
            const value = Math.round(parseInt(computedStyle[margin], 10));
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
    };

    const addPaddingIndicators = (element, rect, computedStyle) => {
        const paddings = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'];

        paddings.forEach((padding, index) => {
            const value = Math.round(parseInt(computedStyle[padding], 10));
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
    };

    const addSpaceBetweenElements = (element, rect) => {
        const nextElement = element.nextElementSibling;
        if (nextElement) {
            const nextRect = nextElement.getBoundingClientRect();

            // Vertical space
            if (nextRect.top > rect.bottom) {
                const verticalSpace = Math.round(nextRect.top - rect.bottom);
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
                const horizontalSpace = Math.round(nextRect.left - rect.right);
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
    };

    const addFontSizeIndicator = (element, computedStyle) => {
        const fontSize = Math.round(parseFloat(computedStyle.fontSize));
        const fontSizeIndicator = document.createElement('div');
        fontSizeIndicator.className = 'font-size-indicator';
        fontSizeIndicator.innerText = `${fontSize}px`;

        element.style.position = 'relative';
        element.appendChild(fontSizeIndicator);
    };

    const addDimensionIndicator = (element, rect) => {
        const width = Math.round(rect.width);
        const height = Math.round(rect.height);

        const dimensionIndicator = document.createElement('div');
        dimensionIndicator.className = 'dimension-indicator';
        dimensionIndicator.innerText = `${width}px x ${height}px`;
        dimensionIndicator.style.top = `${rect.top}px`;
        dimensionIndicator.style.left = `${rect.left}px`;
        dimensionIndicator.style.width = `${width}px`;
        dimensionIndicator.style.height = `${height}px`;

        document.body.appendChild(dimensionIndicator);
    };

    const hasTextContent = (element) => {
        return element.textContent.trim().length > 0;
    };

    return (
        <div className="button-container not-calculate">
            <button
                className={`toggle-button not-calculate ${showFontSize ? 'active' : ''}`}
                onClick={() => setShowFontSize(prev => !prev)}
            >
                Toggle Font Size
            </button>
            <button
                className={`toggle-button not-calculate ${showSpacing ? 'active' : ''}`}
                onClick={() => setShowSpacing(prev => !prev)}
            >
                Toggle Spacing
            </button>
            <button
                className={`toggle-button not-calculate ${showPadding ? 'active' : ''}`}
                onClick={() => setShowPadding(prev => !prev)}
            >
                Toggle Padding
            </button>
            <button
                className={`toggle-button not-calculate ${showDimensions ? 'active' : ''}`}
                onClick={() => setShowDimensions(prev => !prev)}
            >
                Toggle Dimensions
            </button>
        </div>
    );
};

export default SpaceIndicator;
