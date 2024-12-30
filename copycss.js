(function() {
  // Utility function to check if a style is inherited or has default value
  function isDefaultStyle(style, value) {
    // Some common default CSS values to ignore
    const defaultStyles = {
      'font-size': '16px',
      'font-family': 'Arial, sans-serif',
      'background-color': 'transparent',
      'color': 'rgb(0, 0, 0)',
      'border': 'none',
      'padding': '0',
      'margin': '0',
      'display': 'inline',
      'width': 'auto',
      'height': 'auto',
      'box-sizing': 'border-box',
    };
    return defaultStyles[style] === value;
  }

  // Function to get computed styles for an element, ignoring defaults and inherited styles
  function getComputedStyles(element) {
    const styles = window.getComputedStyle(element);
    let cssText = '';

    // Loop through all computed style properties
    for (let i = 0; i < styles.length; i++) {
      const property = styles[i];
      const value = styles.getPropertyValue(property);

      // Exclude inherited/default styles that are irrelevant
      if (!isDefaultStyle(property, value)) {
        cssText += `${property}: ${value};\n`;
      }
    }

    return cssText;
  }

  // Function to copy text to clipboard
  function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Usable CSS copied to clipboard!');
  }

  // Function to recursively get styles for all elements within a parent
  function getAllStylesForElement(element) {
    const styles = getComputedStyles(element);
    let allStyles = `.${element.className.replace(/\s+/g, '.')} {\n${styles}\n}`;

    // Recursively collect styles for all child elements
    const children = element.children;
    for (let i = 0; i < children.length; i++) {
      allStyles += getAllStylesForElement(children[i]); // Recursively add child element styles
    }

    return allStyles;
  }

  // Select the parent div (consolidated-hero)
  const parentDiv = document.querySelector('.consolidated-hero');

  if (parentDiv) {
    // Collect all styles from the parent div and its children
    const allStyles = getAllStylesForElement(parentDiv);

    // Copy the styles to the clipboard
    copyToClipboard(allStyles);
  } else {
    alert('The .consolidated-hero div was not found!');
  }
})();
