class EntryList extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      filter: 'date'
    }
  }

  onFilterClick(e) {
    //this.setState({filter: e.target.text.toLowerCase()})
    this.props.getFilterEntries(e.target.text)
  }

  render () {
    return (
    <tbody className='container-fluid entryList'>
      <tr className='row'>
        <th className='col-md-1'>
          <h5>Date</h5>
        </th>
        <th className='col-md-1'><h5>Album</h5></th>
        <th className='col-md-2'></th>
        <th className='rating col-md-3'><h5>Rating</h5></th>
        <th className='impression col-md-6'><h5>Impression</h5></th>
        <th>
          <td>
            <div className="dropdown">
              <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                Filter
                <span className="caret"></span>
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li onClick={this.onFilterClick.bind(this)}><a style={{cursor: 'pointer'}}>Date</a></li>
                <li onClick={this.onFilterClick.bind(this)}><a style={{cursor: 'pointer'}}>Stars</a></li>
                <li onClick={this.onFilterClick.bind(this)}><a style={{cursor: 'pointer'}}>Album Name</a></li>
              </ul>
            </div>
          </td>
        </th>

      </tr>
      {this.props.allEntries.map((entry) => {
        {console.log('entry', entry)}
        return (
          <Entry date={entry.date.slice(0,10)}
                 title={entry.title}
                 collection_id={entry.collection_id}
                 artist={entry.name}
                 genre={entry.genre}
                 year={entry.year}
                 rating={entry.rating}
                 impression={entry.impression}
                 art_url60={entry.art_url60}
                 art_url100={entry.art_url100}
                 impressionId={entry.id}
                 updateUserEntries={this.props.updateUserEntries}
                 getUserEntries={this.props.getUserEntries}
                 getFilterEntries={this.props.getFilterEntries}
                 deleteUserEntries={this.props.deleteUserEntries}
                 key={entry.date + entry.id}
            />
        )})
      }
    </tbody>
    );
  }
};

window.EntryList = EntryList;
