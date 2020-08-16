import React from 'react';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
const API = 'https://www.breakingbadapi.com/api/quote/random';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: undefined,
      author: undefined,
    };

    this.getQuote = this.getQuote.bind(this);
  }

  componentDidMount() {
    // call the API
    this.getQuote();
  }

  getQuote() {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          quote: res[0].quote,
          author: res[0].author,
        });
      });
  }

  render() {
    const { quote, author } = this.state;
    const tweet_url = `https://twitter.com/intent/tweet?text="${quote}" - ${author}, Breaking Bad`;

    return (
      <div className='wrapper'>
        <div id='quote-box'>
          <span id='header'>Breaking Bad Quotes</span>
          <small>
            [<a href='https://github.com/timbiles/Breaking-Bad--API/'>API</a>] [
            <a href='https://github.com/vimturtle/'>GITHUB</a>]
          </small>
          <FontAwesomeIcon icon={faQuoteLeft} />
          <p id='text'>{quote}</p>
          <p id='author'>
            {'- '}
            {author}
          </p>
          <div>
            <button>
              <a href={tweet_url} id='tweet-quote'>
                Twitter
              </a>
            </button>
            <button id='new-quote' onClick={this.getQuote}>
              New Quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
