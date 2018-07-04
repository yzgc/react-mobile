import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../store/actions/actions'
import ApiQuest from '../../utils/http'
import Api from '../../config/api'
import { link } from '../../utils/common'

class Login extends React.Component {
    componentDidMount() {
        this.getTest()
        this.props.actions.setPersonal()
        console.log(this.props.user)
        setTimeout(() => {
            console.log(this.props.user)
        },3000)
        // test
        link("1")
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

export default connect(
    state => ({
        user: state.user
    }),
    dispatch => ({
        actions: bindActionCreators(Actions, dispatch)
    })
)(Login)

