import React, { Component} from 'react';
import './main-page.css';
import Header from './header';
import FeaturedHouse from './featured-house';
import HouseFilter from './house-filter';
import SearchResults from '../search-results';
import HouseDetail from '../house';

class App extends Component {

  state = {} //This way not used to call a constructor

  componentDidMount() {
    this.fetchHouses();
  }

  fetchHouses = () => {
    fetch('/houses.json')
    .then(rsp => rsp.json())
    .then(allHouses => {
      this.allHouses = allHouses;
      this.determineFeaturedHouse();
      this.determineUniqueCountries();
    })
  }

  filterHouses = (country) => {
    this.setState({ activeHouse: null });
    const filteredHouses = this.allHouses.filter((h) => h.country === country);
    this.setState({ filteredHouses });
    this.setState({ country });
  }

  determineUniqueCountries = () => {
    const countries = this.allHouses
      ? Array.from(new Set(this.allHouses.map(h => h.country)))
      : [];
    countries.unshift(null);
    this.setState({ countries });
  }

  filterHouses = (country) => {
    this.setState({ activeHouse: null });
    const filteredHouses = this.allHouses.filter((h) => h.country === country);
    this.setState({ filteredHouses });
    this.setState({ country });
  }

  setActiveHouse = (house) => {
    this.setState({ activeHouse: house });
  }

  determineFeaturedHouse = () => {
    if (this.allHouses) {
      const randomIndex = Math.floor(Math.random() * this.allHouses.length);
      const featuredHouse =  this.allHouses[randomIndex];
      this.setState({ featuredHouse });
    };
  }

  render(){
    let activeComponent = null;
    if (this.state.country)
    activeComponent = <SearchResults country={this.state.country} 
      filteredHouses={this.state.filteredHouses} setActiveHouse={this.setActiveHouse} />;
    if (this.state.activeHouse)
      activeComponent = <HouseDetail house={this.state.activeHouse}/>;
    if (!activeComponent)
      activeComponent = <FeaturedHouse house={this.state.featuredHouse} />;
    return (
      <div className="container">
        <Header subtitle="Providing houses all over the world"/>
        <HouseFilter countries={this.state.countries} filterHouses={this.filterHouses} />
        {activeComponent}
      </div>
    );  
  }
}



export default App;
