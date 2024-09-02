import React, { useState, useEffect } from 'react';
import './SpaceIndicator.css'; // Import the CSS file
import {
    clearIndicators,
    addMarginIndicators,
    addPaddingIndicators,
    addSpaceBetweenElements,
    addFontSizeIndicator,
    addDimensionIndicator,
    hasTextContent
} from './IndicatorUtils';

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

            if (showDimensions) {
                addDimensionIndicator(element, rect);
            }
        });
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
