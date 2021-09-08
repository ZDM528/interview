import React from './react'  // 将 jsx 转换为 js 对象
import ReactDOM from './react-dom/index'

const ele = (
    <div className="active" title="124" style={{ width: '20px' }} key="1">
        <a key="2">adf</a>
    </div>
)


// function Home() {
//     return (
//         <div className="active" title="123">
//             hello,<span>react</span>
//         </div>
//     )
// }



class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 0
        }
    }
    componentWillMount() {
        console.log('组件将要加载')
    }
    componentWillReceiveProps(props) {
        console.log("props")
    }
    componentWillUpdate() {
        console.log("组件将要更新")

    }
    componentDidUpdate() {
        console.log("组件更新完成")
    }
    componentDidMount() {
        console.log('组件加载完成')
        for (let i = 0; i < 10; i++) {
            this.setState((prevState, prevProps) => {
                return {
                    num: prevState.num + 1
                }
            })
        }
    }
    handleClick() {
        this.setState({
            num: this.state.num + 1
        })
    }
    render() {
        return (
            <div>
                <span>{this.state.num}</span>
                <button onClick={this.handleClick.bind(this)}>点击更新</button>
            </div>

        )
    }
}
ReactDOM.render(<Home />, document.querySelector("#root"))