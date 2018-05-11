import React from 'react'
import ApiQuest from '../../utils/http'
import Api from '../../config/api'

class Login extends React.Component {
    componentDidMount() {
        this.getTest()
    }

    getTest() {
        let params = {
            type: 1
        }
        ApiQuest.http(Api.center.getTest, params, (res) => {
            console.log(res)
        })
    }

    render() {
        return (
            <div className="login">
                {/*<ul>*/}
                    {/*<li className="li">*/}
                        {/*<p>888</p>*/}
                    {/*</li>*/}
                {/*</ul>*/}
                {/*<div className="login__div"></div>*/}
            </div>
        )
    }
}

export default Login

