import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {

  constructor() {
    super();
    this.headToStore = this.goToStore.bind(this); // Defines 'this' inside of goToStore() function
  }

  myInput = React.createRef();

  goToStore = (event) => {
    // Stop form from submitting
    event.preventDefault();
    // Get text from input
    const storeName = this.myInput.current.value;
    console.log(storeName);
    // Change page to /store/input/
    this.props.history.push(`/store/${storeName}`);
  }

  headToStore(event) {
    console.log(this); // Alt syntax of above without needing the constructor.
  }

  render() {
    return (
      <> { /* Blank container tags, won't render */}
        <p>Hey</p>
        <form className="store-selector" onSubmit={this.goToStore}>
          { /* comment */ }
          <h2>Please Enter A Store</h2>
          <input
            type="text"
            ref={this.myInput}
            required
            placeholder="Store Name"
            defaultValue={getFunName()}
          />
          <button type="submit">Visit Store →</button>
        </form>
      </>
    )
  }
}

export default StorePicker;
