import React, { useState, useEffect } from 'react';
import './SpaceIndicator.css'; // Import CSS file for styles

const SpaceIndicator = () => {
    const [showFontSize, setShowFontSize] = useState(false);
    const [showSpacing, setShowSpacing] = useState(false);
    const [showPadding, setShowPadding] = useState(false);

    useEffect(() => {
        applyIndicators();
    }, [showFontSize, showSpacing, showPadding]);

    const applyIndicators = () => {
        const elements = document.querySelectorAll('*:not(.toggle-button)');

        elements.forEach((element) => {
            const computedStyle = window.getComputedStyle(element);
            const rect = element.getBoundingClientRect();

            if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden') return;

            clearIndicators(element);

            if (showSpacing) {
                addMarginIndicators(element, rect, computedStyle);
                addSpaceBetweenElements(element, rect);
            }

            if (showPadding) {
                addPaddingIndicators(element, rect, computedStyle);
            }

            if (showFontSize && hasTextContent(element)) {
                addFontSizeIndicator(element, computedStyle);
            }
        });
    };

    const clearIndicators = (element) => {
        element.querySelectorAll('.space-indicator, .font-size-indicator').forEach(el => el.remove());
    };

    const addMarginIndicators = (element, rect, computedStyle) => {
        // Add margin indicators logic here (similar to the original code)
    };

    const addPaddingIndicators = (element, rect, computedStyle) => {
        // Add padding indicators logic here (similar to the original code)
    };

    const addSpaceBetweenElements = (element, rect) => {
        // Add space between elements logic here (similar to the original code)
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

    return (
        <div className="button-container">
            <button className="toggle-button" onClick={() => setShowFontSize(!showFontSize)}>
                Toggle Font Size
            </button>
            <button className="toggle-button" onClick={() => setShowSpacing(!showSpacing)}>
                Toggle Spacing
            </button>
            <button className="toggle-button" onClick={() => setShowPadding(!showPadding)}>
                Toggle Padding
            </button>
        </div>
    );
};

export default SpaceIndicator;
