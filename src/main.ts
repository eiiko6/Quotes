import './default.css'
import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container') as HTMLElement;
  const quoteCard = document.getElementById('quote-card') as HTMLElement;
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
    const backgroundContainer = document.getElementById('background')!;
    const newImageUrl = await fetchImage();
    const nextImageUrl = await fetchImage();
    const quoteData = await fetchQuote();

    if (newImageUrl && quoteData) {
        document.body.style.backgroundImage = `url(${newImageUrl})`; // Set new background image

        container.style.animation = 'fadeOutBackground 0.5s forwards'; // Fade out current background
        quoteCard.style.animation = 'slideOutQuoteCard 0.5s forwards'; // Slide out current quote card

        setTimeout(() => {
            container.style.backgroundImage = `url(${newImageUrl})`; // Update current background image
            container.style.animation = 'fadeInBackground 0.3s forwards'; // Fade in new background
            quoteText.innerText = quoteData.quote; // Update quote text
            quoteAuthor.innerText = `${quoteData.author}`; // Update author text
            quoteCard.style.animation = 'slideInQuoteCard 0.3s forwards'; // Slide in new quote card
        },300); // Wait for fade-out and slide-out animations to complete
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
