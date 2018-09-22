const EventItem = function (eventItem) {
    this.id = eventItem.id;
    this.text = eventItem.text;
    this.start = eventItem.start;
    this.end = eventItem.end;
    this.height = eventItem.end - eventItem.start;
    this.top = null;
    this.left = 0;

    this.setLeft = left => {
        this.left = left;
    };

    this.setTop = top => {
        this.top = top;
    };

    this.isOverlapingWith = (previousEvent) => {
        return this.start > previousEvent.start && this.start < previousEvent.end;
    };
};

const EventCluster = function (events) {
    this.raw_events = events;
    this.widthFactor = 1;

    let acc = {
        end: events[0].end,
        result: [[]],
        currRowIndex: 0
    };

    // calcute the start and end of clusters to position them in timeline
    acc = events.reduce((acc, item, currIndex) => {
        let completeOverlap = true;
        for (let i = 0; i < currIndex; i++) {
            if (!item.isOverlapingWith(events[i])) {
                completeOverlap = false;
                break;
            }
        }
        if (!completeOverlap) {
            acc.currRowIndex++;
            acc.result[acc.currRowIndex] = [];
        }
        acc.result[acc.currRowIndex].push(item);
        acc.end = acc.end > item.end ? acc.end : item.end;

        // width factor will be the lengthiest row
        let rowLength = acc.result[acc.currRowIndex].length;
        this.widthFactor = this.widthFactor > rowLength ? this.widthFactor : rowLength;

        return acc;
    }, acc);

    this.start = events[0].start;
    this.end = acc.end;
    this.height = this.end - this.start;
    this.events = acc.result;
};

export const getEventsClusterFromList = (events) => {
    events = events.sort((a, b) => a.start - b.start).map(item => new EventItem(item));
    let overlappingEventClusturs = [];
    overlappingEventClusturs[0] = [events[0]];

    let len = events.length;
    let currentClusterIndex = 0;
    //cluster the events together
    for (let index = 1; index < len; index++) {
        let currentEvent = events[index];
        let previousEvent = events[index - 1];
        if (!currentEvent.isOverlapingWith(previousEvent)) { // events overlaps
            currentClusterIndex++;
            overlappingEventClusturs[currentClusterIndex] = [];
        }
        overlappingEventClusturs[currentClusterIndex].push(currentEvent);
    }

    overlappingEventClusturs = overlappingEventClusturs.map(cluster => new EventCluster(cluster));
    return overlappingEventClusturs;
};
