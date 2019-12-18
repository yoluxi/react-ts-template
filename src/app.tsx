import * as React from 'react'
import Router from './router'

console.log(1)
class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Router/>
            </div>
        )
    }
}

export default App