

ReactDOM.render(
    <CalendarGrid indices={ [...Array(7*6).keys()] } />,
    document.getElementById('main')
);

function CalendarGrid(props) {
    const layout = {
        'display': 'grid',
        'grid-template': 'repeat(6, min-content) / repeat(7, min-content)'
    };
    const cells = props.indices.map( (i) =>
        <CalendarCell id={ i }></CalendarCell>
    );
    return <div class='container grid' style={ layout }>
        { cells }
    </div>
}

function CalendarCell(props) {
    const layout = {
        'display': 'flex',
        'background-color': 'cyan',
        'border': '2px solid black'
    };
    return <div id={ `cell-${ props.id }` } style={ layout }>
        { props.id }
    </div>
}