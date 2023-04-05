
ReactDOM.render(
    <CalendarGrid indices={ [...Array(7*6).keys()] } />,
    document.getElementById('main')
);


function CalendarGrid(props) {
    const cells = props.indices.map( (i) =>
        <CalendarCell id={ i }></CalendarCell>
    );
    return <div id='grid'>
        { cells }
    </div>
}

function CalendarCell(props) {
    return <div id={ `cell-${ props.id }` } class='cell'>
        { props.id }
    </div>
}