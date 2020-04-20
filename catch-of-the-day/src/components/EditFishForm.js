import React from 'react';

class EditFishFrom extends React.Component {
    handleChange = (e) => {
        // update that fish
        // 1. Take a copy of the current fish
        const updatedFish = {
            ...this.props.fish,
            [e.currentTarget.name]: e.currentTarget.value
        };
        this.props.updateFish(this.props.index, updatedFish);
    }
    render() {
        return (
            <div className="fish-edit">
                <input
                    onChange={this.handleChange} // required by React to avoid competing states
                    value={this.props.fish.name}
                    name="name"
                    type="text" 
                />
                <input
                    onChange={this.handleChange} // required by React to avoid competing states
                    value={this.props.fish.price}
                    name="price"
                    type="text"
                />
                <select
                    onChange={this.handleChange} // required by React to avoid competing states
                    value={this.props.fish.status}
                    name="status"
                >
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea
                    onChange={this.handleChange} // required by React to avoid competing states
                    value={this.props.fish.desc}
                    name="desc"
                    placeholder="Desc"
                />
                <input
                    onChange={this.handleChange} // required by React to avoid competing states
                    value={this.props.fish.image}
                    name="image"
                    type="text"
                />
                <button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
            </div>
        )
    }
}

export default EditFishFrom;