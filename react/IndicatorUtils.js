// IndicatorUtils.js

export const clearIndicators = () => {
    document.querySelectorAll('.space-indicator, .font-size-indicator, .dimension-indicator').forEach(el => el.remove());
    document.querySelectorAll('.element-outline').forEach(el => el.classList.remove('element-outline'));
};

export const addMarginIndicators = (element, rect, computedStyle) => {
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

export const addPaddingIndicators = (element, rect, computedStyle) => {
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

export const addSpaceBetweenElements = (element, rect) => {
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

export const addFontSizeIndicator = (element, computedStyle) => {
    const fontSize = Math.round(parseFloat(computedStyle.fontSize));
    const fontSizeIndicator = document.createElement('div');
    fontSizeIndicator.className = 'font-size-indicator';
    fontSizeIndicator.innerText = `${fontSize}px`;

    element.style.position = 'relative';
    element.appendChild(fontSizeIndicator);
};

export const addDimensionIndicator = (element, rect) => {
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

export const hasTextContent = (element) => {
    return element.textContent.trim().length > 0;
};
