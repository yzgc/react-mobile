import React from 'react'
import index from '../../static/images/two.jpg'
class Home extends React.Component {
    render() {
        const style = {
            backgroundColor: 'red'
        }
        return (
            <div>
                <div className="home"></div>
                <div style={style}>
                    <img src={index} alt=""/>
                </div>
            </div>
        )
    }
}
export default Home
