import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getEventsClusterFromList } from '../../../../data/utils/scheduler';

export default class Scheduler extends Component {
    constructor(props) {
        super(props);
        let events = getEventsClusterFromList(props.events);
        this.state = {
            events: events.length > 0 ? events : []
        };
    }

    render() {
        const { events } = this.state;
        return (
            <div className="schedulerContainer flex-row flex-ac full-flex">
                <div className="leftTimeBar full-height flex-column flex-jsb pad-10 bg-lighter">
                    <span>09:00 AM</span>
                    {/* <span>10:30 AM</span>
                    <span>12:00 PM</span> */}
                    <span>03:00 PM</span>
                    {/* <span>06:00 PM</span>
                    <span>08:30 PM</span> */}
                    <span>09:00 PM</span>
                </div>

                <div className="is-bordered scheduleListContainer bg-default lr-pad-10">
                    <div className="scheduleList full-width full-height is-relative">
                        {event.length === 0 &&
                            <div className="is-absolute full-width flex-row flex-center pad-20" style={{ top: 350 }}>No schedules to display</div>
                        }
                        {events.map((cluster, index) => {
                            return (
                                <div className="cluster" key={index}>
                                    {new Array(cluster.widthFactor).fill(1).map((col, colIdx) => {
                                        return (
                                            cluster.events.map((row, rowIdx) => {
                                                let event = row[colIdx];
                                                if (event) {
                                                    let itemWidth = (600 / cluster.widthFactor);
                                                    return (
                                                        <div className="eventItem bg-white is-b-bordered is-absolute flex-row flex-center"
                                                            style={{
                                                                left: colIdx * itemWidth,
                                                                width: itemWidth,
                                                                top: event.start,
                                                                height: event.height
                                                            }}
                                                            key={rowIdx}
                                                        >
                                                            {event.text}
                                                        </div>
                                                    );
                                                }
                                            })
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

Scheduler.propTypes = {
    events: PropTypes.array
};

