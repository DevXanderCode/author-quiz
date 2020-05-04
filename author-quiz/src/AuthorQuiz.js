import React from "react";
import ProTypes from "prop-types";
import "./App.css";
import "./bootstrap.min.css";

function Hero() {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>Select a book written by the author shown</p>
      </div>
    </div>
  );
}

function Book({ title, onClick }) {
  return (
    <div className="answer" onClick={() => onClick(title)}>
      <h4>{title}</h4>
    </div>
  );
}

function Turn({ author, books, highlight, onAnswerSelected }) {
  function highlightToBgColor(highlight) {
    const mapping = {
      none: "",
      wrong: "red",
      correct: "green",
    };
    return mapping[highlight];
  }
  return (
    <div
      className="row  turn"
      style={{ backgroundColor: highlightToBgColor(highlight) }}
    >
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="authorimage" alt="Author" />
      </div>
      <div className="col-6">
        {books.map((title) => (
          <Book title={title} key={title} onClick={onAnswerSelected} />
        ))}
      </div>
    </div>
  );
}

Turn.ProTypes = {
  author: ProTypes.shape({
    name: ProTypes.string.isRequired,
    imageUrl: ProTypes.string.isRequired,
    imagesource: ProTypes.string.isRequired,
    books: ProTypes.arrayOf(ProTypes.string).isRequired,
  }),
  books: ProTypes.arrayOf(ProTypes.string).isRequired,
  highlight: ProTypes.string.isRequired,
  onAnswerSelected: ProTypes.func.isRequired,
};

function Continue() {
  return <div />;
}

function Footer() {
  return (
    <div className="row" id="footer">
      <div className="col-12">
        <p className="text-muted credit">
          All image are from{" "}
          <a href="http://commons.m.wikimedia.org/wiki/Main_Page">
            wikimedia commons
          </a>{" "}
          and are in a common plubic domain.
        </p>
      </div>
    </div>
  );
}

function AuthorQuiz({ turnData, highlight, onAnswerSelected }) {
  return (
    <div className="container-fluid">
      <Hero />
      <Turn
        {...turnData}
        highlight={highlight}
        onAnswerSelected={onAnswerSelected}
      />
      <Continue />
      <Footer />
    </div>
  );
}

export default AuthorQuiz;
