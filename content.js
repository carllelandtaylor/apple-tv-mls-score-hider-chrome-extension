// content.js

// WARNING! This is a pretty bad implementation since it runs the DOM query any time any
// new element is added by any web page!

const CLASS_SEARCH_STRINGS = [
  '[class="lockup-overlay__sports-score__score__team"]',
  '[class="epic-stage-metadata-title__score"]',
  '[class*="scoreboard__score"]'
];
const REPLACEMENT_TEXT = '?';

const queryString = CLASS_SEARCH_STRINGS.join(", ");

function hideScores() {
  const elementsWithScoreClass = document.querySelectorAll(queryString);

  // Change the text content of each selected element to a question mark
  elementsWithScoreClass.forEach(element => {
    element.textContent = REPLACEMENT_TEXT;
  });
}

// Execute the function when the page loads
window.addEventListener('load', hideScores);

// Function to be called when new elements are added
function handleNewElements(mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      hideScores();
    }
  }
}

// Create a new MutationObserver
const observer = new MutationObserver(handleNewElements);

// Define the options for the observer (we want to observe childList changes)
const observerOptions = {
  childList: true, // Watch for changes in the child nodes of the target
  subtree: true,   // Include all descendants of the target
};

// Start observing the DOM
observer.observe(document.body, observerOptions); // You can observe any DOM element by changing document.body to your target element

