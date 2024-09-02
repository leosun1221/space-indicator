import React, { useState, useEffect } from 'react';
import './SpaceIndicator.css'; // Ensure you have this CSS file or use a CSS-in-JS solution

const SpaceIndicator = () => {
    const [showFontSize, setShowFontSize] = useState(false);
    const [showSpacing, setShowSpacing] = useState(false);
    const [showPadding, setShowPadding] = useState(false);

    useEffect(() => {
        applyIndicators();

        return () => {
            clearIndicators();
        };
    }, [showFontSize, showSpacing, showPadding]);

    const clearIndicators = () => {
        document.querySelectorAll('.space-indicator, .font-size-indicator').forEach(el => el.remove());
    };

    const applyIndicators = () => {
        clearIndicators();
        const allElements = document.querySelectorAll('body *:not(.not-calculate)');
        console.log("allElements :", allElements);
        allElements.forEach((element) => {
            const computedStyle = window.getComputedStyle(element);

            if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden') return;

            const rect = element.getBoundingClientRect();

            if (showSpacing) {
                addMarginIndicators(element, rect, computedStyle);
                addSpaceBetweenElements(element, rect);
            }

            if (showPadding) {
                addPaddingIndicators(element, rect, computedStyle);
            }

            if (showFontSize && grabPureTextContent(element)) {
                addFontSizeIndicator(element, computedStyle);
            }
        });
    };

    const addMarginIndicators = (element, rect, computedStyle) => {
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
    };

    const addPaddingIndicators = (element, rect, computedStyle) => {
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
    };

    const addSpaceBetweenElements = (element, rect) => {
        const nextElement = element.nextElementSibling;
        if (nextElement) {
            const nextRect = nextElement.getBoundingClientRect();

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
    };

    const addFontSizeIndicator = (element, computedStyle) => {
        const fontSize = computedStyle.fontSize;
        const fontSizeIndicator = document.createElement('div');
        fontSizeIndicator.className = 'font-size-indicator';
        fontSizeIndicator.innerText = `${fontSize}`;

        element.style.position = 'relative';
        element.appendChild(fontSizeIndicator);
    };

    const hasTextContent = (element) => {
        return element.textContent.trim().length > 0;
    };
    const grabPureTextContent = (element) => {
        console.log("element.childNodes : ", element, element.childNodes)
        let hasContent = false;
        for (let childText of element.childNodes) {
            console.log("childText : ", childText, childText.constructor,childText.constructor.name)
            if (childText.constructor.name == 'Text') {
                hasContent = true;
            }
        }
        return hasContent;
    }

    return (
        <div className="button-container not-calculate">
            <button className="toggle-button not-calculate" onClick={() => setShowFontSize(!showFontSize)}>
                Toggle Font Size
            </button>
            <button className="toggle-button not-calculate" onClick={() => setShowSpacing(!showSpacing)}>
                Toggle Spacing
            </button>
            <button className="toggle-button not-calculate" onClick={() => setShowPadding(!showPadding)}>
                Toggle Padding
            </button>
        </div>
    );
};

export default SpaceIndicator;
