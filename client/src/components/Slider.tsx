import React from 'react';
import ReactDOM from 'react-dom';
import Flickity from 'flickity';
import 'flickity/dist/flickity.min.css';

// type Props = () => {
//   showTasksModal: (day) => void;
//   children: ReactNode[];
//   today: number;
//   options: any;
// }

//TODO: refactor to modern react and pass types.

export default class Slider extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      flickityReady: false,
    };
    this.refreshFlickity = this.refreshFlickity.bind(this);
  }

  flickity;
  flickityNode;

  componentDidMount() {
    this.flickity = new Flickity(this.flickityNode, this.props.options || {});

    this.setState({
      flickityReady: true,
    });

    var flkty = new Flickity('.timeline') as any;

    flkty.on('change', index => {
      this.props.showTasksModal(this.props.children[index].props.engDay)
    });
  }

  refreshFlickity() {
    this.flickity.reloadCells();
    this.flickity.resize();
    this.flickity.updateDraggable();
    this.flickity.selectCell(this.props.today);
  }

  componentWillUnmount() {
    this.flickity.destroy();
  }

  componentDidUpdate(prevProps, prevState) {
    const flickityDidBecomeActive = !prevState.flickityReady && this.state.flickityReady;
    const childrenDidChange = prevProps.children.length !== 7;

    if (flickityDidBecomeActive || childrenDidChange) {
      this.refreshFlickity();
    }

    //var flkty = new Flickity('.timeline')
    //flkty.selectCell(3)

    // props.children.forEach( child => {
    //   if(child.props.today === true){
    //     this.props.showTasksModal(child.props.engDay)
    //   }
    // })
  }

  renderPortal(): any {
    if (!this.flickityNode) {
      return null;
    }

    const mountNode = this.flickityNode.querySelector('.flickity-slider');

    if (mountNode) {
      return ReactDOM.createPortal(this.props.children, mountNode);
    }
  }

  render() {
    return [
      <div className='timeline animated slideInUp'
           key="flickityBase"
           ref={node => (this.flickityNode = node)} />,
      this.renderPortal(),
    ].filter(Boolean);
  }
}