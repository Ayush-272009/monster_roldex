import { Component, component } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchfield: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((respose) => respose.json())
      .then((users) =>
        this.setState(() => {
          return { monsters: users };
        })
      );
  }

  onsearchchange = (event) => {
    console.log(event.target.value);
    const searchfield = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchfield };
    });
  };

  render() {
    const { monsters, searchfield } = this.state;
    const { onsearchchange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchfield);
    });
    return (
      <div className="App">
        <h1 className="app-title">Monster Roldex</h1>
        <SearchBox
          className="monster-search-box"
          onChangeHandler={onsearchchange}
          placeholder="Search monsters"
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
