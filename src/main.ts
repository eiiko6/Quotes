import './default.css'
import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container') as HTMLElement;
  const quoteText = document.getElementById('quote-text') as HTMLElement;
  const quoteAuthor = document.getElementById('quote-author') as HTMLElement;

  async function fetchImage() {
      try {
          const response = await fetch('https://source.unsplash.com/random/1920x1080/?landscape');
          return response.url;
      } catch (error) {
          console.error('Error fetching image:', error);
      }
  }

  async function fetchQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        return { quote: data.content, author: data.author }; // Include author's name in the returned object
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
}

  async function updateContent() {
    const newImageUrl = await fetchImage();
    const quoteData = await fetchQuote();
    if (newImageUrl && quoteData) {
      container.style.backgroundImage = `url(${newImageUrl})`;
      quoteText.innerText = quoteData.quote;
      quoteAuthor.innerText = quoteData.author; // Populate author's name
  }
  }

  container.addEventListener('click', updateContent);
  document.addEventListener('keydown', (event) => {
      if (event.code === 'Space') {
          updateContent();
      }
  });

  // Initial content
  updateContent();
});
