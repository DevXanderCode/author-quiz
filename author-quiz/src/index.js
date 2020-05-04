import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, route } from "react-router-dom";
import "./index.css";
import AuthorQuiz from "./AuthorQuiz";
import * as serviceWorker from "./serviceWorker";
import { shuffle, sample } from "underscore";

const authors = [
  {
    name: "Mark Twain",
    imageUrl: "images/authors/marktwain.jpg",
    imageSource: "Wikimedia Commons",
    books: [
      "The Adventures of Huckleberry Finn",
      "Life on the Mississippi",
      "Roughing it",
    ],
  },
  {
    name: "Joseph Conrad",
    imageUrl: "images/authors/josephconrad.png",
    imageSource: "wikipedia Commons",
    books: ["Heart Of Darkness"],
  },
  {
    name: "J.K Rowling",
    imageUrl: "images/authors/jkrowling.jpg",
    imageSource: "wikipedia Commons",
    imageAttribution: "Daniel Orgen",
    books: ["Harry Potter and  the Sorcerers Stone"],
  },
  {
    name: "Stephen King",
    imageUrl: "images/authors/stephenking.jpg",
    imageSource: "wikipedia Commons",
    imageAttribution: "Pinguino",
    books: ["The Shining", "IT"],
  },
  {
    name: "Charles Dickens",
    imageUrl: "images/authors/charlesdickens.jpg",
    imageSource: "wikipedia Commons",
    books: ["David Copperfield", "A Tale of two city "],
  },
  {
    name: "William Shakespeare",
    imageUrl: "images/authors/williamshakespeare.jpg",
    imageSource: "wikipedia Commons",
    imageAttribution: "Daniel Orgen",
    books: ["Hamlet", "Macbeth", "Romeo And Juliet"],
  },
];
function getTurnData(authors) {
  const allBooks = authors.reduce((p, c, i) => p.concat(c.books), []);
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find((author) =>
      author.books.some((title) => title === answer)
    ),
  };
}

const state = {
  turnData: getTurnData(authors),
  highlight: "",
};

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? "correct" : "wrong";
  render();
}

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />
    </React.StrictMode>,
    document.getElementById("root")
  );
}
render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
