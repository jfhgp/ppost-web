import React from 'react';
import { render } from 'react-dom';
import _ from "lodash";
import { Button } from '@material-ui/core';
import RLDD from 'react-list-drag-and-drop/lib/RLDD';
import RequestCard from '../features/requests/components/RequestCard';
import { getPrimaryColors } from '../utils/functions';

export default class DragDropListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
    this.itemRenderer = this.itemRenderer.bind(this);
    this.handleRLDDChange = this.handleRLDDChange.bind(this);

  }




  componentWillReceiveProps(nextprops) {
    
    const { alreadySchedule, handleScheduleUpdate } = nextprops
    const requests = _.filter(nextprops.requests, function (p) {
      return _.includes(['accepted', 'onmyway', 'picked'], p.status);
    });
    const finalRequests = _.uniqBy([...alreadySchedule, ...requests], '_id')
    const items = finalRequests || [];
    var id = 1;
    items.forEach(element => {
      element.id = id;
      id += 1;
    });
    this.setState({ items })

  }


  render() {

    return (
      <div>

        <div style={{ textAlign: 'right', margin: '1rem 2rem' }}>
          {!this.props.activity ? (
            <Button
              disabled={this.props.activity}
              onClick={() => this.props.handleSetSchedule(this.state.items)
              }
              style={{ background: '#fa7816', color: 'white', margin: '5px 0px' }}
            >
              Save Schedule
        </Button>

          ) : null}
        </div>
        <div style={{ margin: '1rem 2rem' }}>
          <h4
            style={{
              color: getPrimaryColors('secondary'),
              fontFamily: 'Exo2-Medium'
            }}
          >
            Drag and Drop Cards to setup your pickup priorities
            </h4>
        </div>
        <RLDD
          cssClasses="list-container"
          items={this.state.items}
          itemRenderer={this.itemRenderer}
          onChange={this.handleRLDDChange}
        />
      </div >
    );
  }

  itemRenderer(item, index) {
    return (
      <div
        key={item.id}
        // className=""
        style={
          this.props.veryLargeWidth
            ? { padding: '1rem', width: `${100 / 4}%` }
            : this.props.mobileWidth
              ? { padding: '0.5rem' }
              : { padding: '1rem' }
        }
      >
        <RequestCard
          request={item}
          user={this.props.user}
          spaceSearch={this.props.spaceSearch}
        />
      </div>

      // {
      // fetched && requests[status].length && pageCount > 1 ? (
      //   <Paginate pageCount={pageCount} handlePageClick={handlePageClick} />
      // ) : null
      // }

    );
  }

  handleRLDDChange(reorderedItems) {
    this.setState({ items: reorderedItems });

  }
}

render(<DragDropListComponent />, document.getElementById('root'));
