// Snippets directly import from react router for location the page to the top
// after loading a new page
import { Component } from 'react';
import { withRouter } from 'react-router-dom';


class ScrollToTop extends Component {
    /**
     *
     * @param prevProps
     */
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }

    /**
     *
     * @returns {*}
     */
    render() {
        return this.props.children
    }
}

export default withRouter(ScrollToTop)