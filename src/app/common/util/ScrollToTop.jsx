// Snippets directly import from react router for location the page to the top
// after loading a new page

import { Component } from 'react';
import { withRouter } from 'react-router-dom';
class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }

    render() {
        return this.props.children
    }
}

export default withRouter(ScrollToTop)