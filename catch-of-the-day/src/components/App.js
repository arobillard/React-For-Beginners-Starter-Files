import React from 'react';
import Header from './Header';
import Order from './Order';
import Fish from './Fish';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes'; // name doesn't seem to need to match object from file???
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId); //first reinstate localstorage
    if(localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
  }

  componentWillUnmount() {
    console.log('umount')
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    // 1. Take a copy of existing state
    const fishes = {...this.state.fishes};
    // 2. Add New fish to fishes
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set new fishes object to state
    this.setState({
      fishes: fishes
    });
    console.log('Adding a fish!');
  }

  updateFish = (key, updatedFish) => {
    // 1. take a copy of the current state
    const fishes = {...this.state.fishes };
    // 2. update that state
    fishes[key] = updatedFish;
    // 3. Set that to state
    this.setState({ fishes })
  }

   deleteFish = key => {
    // 1. take a copy of state
    const fishes = { ...this.state.fishes };
    // 2. update the state
    fishes[key] = null;
    // 3.  update state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  addToOrder = (key) => {
    // 1. Copy current order state
    const order = { ...this.state.order };
    // 2. Either add to or update the order
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update state
    this.setState({
      order: order
    });
  }

  removeFromOrder = (key) => {
    // 1. Copy current order state
    const order = { ...this.state.order };
    // 2. update the order state
    delete order[key];
    // 3. update state
    this.setState({ order })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
            <Fish
              key={key}
              index={key}
              details={this.state.fishes[key]}
              addToOrder={this.addToOrder}
            />
            ))}
          </ul>
        </div>
        <Order
        //{...this.state} // Adds everything from state into props, something to be careful with because you might add unnecessary stuff
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          storeId={this.props.match.params.storeId}
        />
      </div>
    )
  }
}

export default App;
