import React from 'react';
import ReactDOM from 'react-dom';
import Flickity from 'flickity';
import 'flickity/dist/flickity.min.css';



export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flickityReady: false,
    };

    this.refreshFlickity = this.refreshFlickity.bind(this);
  }

  componentDidMount() {
    this.flickity = new Flickity(this.flickityNode, this.props.options || {});

    this.setState({
      flickityReady: true,
    });

    var flkty = new Flickity('.timeline')

    flkty.on('change', index => {
      this.props.showTasksModal(this.props.children[index].props.engDay)
    });
  }

  refreshFlickity() {
    this.flickity.reloadCells();
    this.flickity.resize();
    this.flickity.updateDraggable();
    this.flickity.selectCell(this.props.today);
    console.log(this.props.today)
  }

  componentWillUnmount() {
    this.flickity.destroy();
  }

  componentDidUpdate(prevProps, prevState) {
    const flickityDidBecomeActive = !prevState.flickityReady && this.state.flickityReady;
    const childrenDidChange = prevProps.children.length !== this.props.children.length;

    if (flickityDidBecomeActive || childrenDidChange) {
      this.refreshFlickity();
    }

    //var flkty = new Flickity('.timeline')
    //flkty.selectCell(3)

    /*this.props.children.forEach( child => {
      if(child.props.today === true){
        this.props.showTasksModal(child.props.engDay)
      }
    })*/

    
  }

  renderPortal() {
    if (!this.flickityNode) {
      return null;
    }

    const mountNode = this.flickityNode.querySelector('.flickity-slider');

    if (mountNode) {
      return ReactDOM.createPortal(this.props.children, mountNode);
    }
  }

  render() {
    console.log(this.props)
    return [
      <div className='timeline animated slideInUp'
           key="flickityBase"
           ref={node => (this.flickityNode = node)} />,
      this.renderPortal(),
    ].filter(Boolean);
  }
}