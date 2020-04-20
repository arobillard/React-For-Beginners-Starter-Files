import React from 'react';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishFrom from './EditFishForm';
import LogIn from './LogIn';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {

    state = {
        uid: null,
        owner: null
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({ user });
            }
        }); // this will check if someone is logged into Firebase and then if so pass it into our authHandler() and auto-log in
    }

    authHandler = async (authData) => {
        // 1. look up current store in database
        const store = await base.fetch(this.props.storeId, {context: this});
        console.log(store);
        // 2. Claim if no owner
        if(!store.owner) {
            // save it as our store
            await base.post(`${this.props.storeId}/owner`, {data: authData.user.uid})
        }
        // 3. Set state of inventory to reflect user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })
        console.log(authData);
    }

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`](); // A way to dynamically name functions
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    }

    logOut = async () => {
        console.log('Logging Out!');
        await firebase.auth().signOut();
        this.setState({ uid: null });
    }

    render() {
        const logout = <button onClick={this.logOut}>Log OUt</button>
        // 1. check if they are logged in
        if (!this.state.uid) {
            return <LogIn authenticate={this.authenticate} />
        }

        // 2. check if they are not the owner of the store
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry not the owner</p>
                    {logout}
                </div>
            )
        }
        // 3. They must be the owner, render the inventory
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => (
                    <EditFishFrom
                        key={key} // this reassigns the key so react can find it faster, important for performance, must always be there
                        index={key}
                        fish={this.props.fishes[key]}
                        updateFish={this.props.updateFish}
                        deleteFish={this.props.deleteFish}
                    />
                ))}
                <AddFishForm
                    addFish={this.props.addFish}
                />
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        );
    }
}

export default Inventory;