import React, { Component } from 'react'
import ReactTable from "react-table";

class ChannelsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      length: this.props.length
    }
   }

   componentWillReceiveProps(nextProps) {
     this.setState({ length: nextProps.length })
   }

   render() {
     const data = this.props.instruments;

     return (
      <div>
        <h3 className="table-header">{this.props.title}</h3>
         <ReactTable
          data={data}
          showPagination={false}
          pageSize={this.state.length}
          columns={[
            {
              Header: "Chan",
              accessor: "channel",
              Cell: this.props.renderEditable,
              maxWidth: 60,
              className: "cell-right channel",
              type: "tel"
            },
            {
              Header: "Addr",
              accessor: "address",
              Cell: this.props.renderEditable,
              maxWidth: 60,
              className: "cell-right address",
              type: "tel"
            },
            {
              Header: () => (
                  <div style={{textAlign:"left"}}>Fixture</div>
                ),
              accessor: "fixture.name",
              className: "cell-left fixture"
            },
            {
              Header: () => (
                  <div style={{textAlign:"left"}}>Purpose</div>
                ),
              accessor: "purpose",
              Cell: this.props.renderEditable,
              className: "cell-left purpose"
            },
            {
              Header: () => (
                  <div style={{textAlign:"left"}}>Position</div>
                ),
              accessor: "position",
              Cell: this.props.renderEditable,
              className: "cell-left position",
            },
           {
             Header: "Unit",
             accessor: "unit_number",
             Cell: this.props.renderEditable,
             maxWidth: 60,
             className: "cell-right unit_number",
             type: "tel"
           },
           {
             Header: () => (
                 <div style={{textAlign:"left"}}>Ckt</div>
               ),
             accessor: "circuit",
             Cell: this.props.renderEditable,
             maxWidth: 60,
             className: "cell-left circuit"
           },
           {
             Header: () => (
                 <div style={{textAlign:"left"}}>Color</div>
               ),
             accessor: "color",
             Cell: this.props.renderEditable,
             className: "cell-left color"
           },
           {
             Header: () => (
                 <div style={{textAlign:"left"}}>Gobo</div>
               ),
             accessor: "gobo",
             Cell: this.props.renderEditable,
             className: "cell-left gobo"
           },
           {
             Header: () => (
                 <div style={{textAlign:"left"}}>Accessories</div>
               ),
             accessor: "accessory",
             Cell: this.props.renderEditable,
             minWidth: 150,
             className: "cell-left accessory"
           },
           {
              Header: '',
              Cell: row => (
                <div>
                  <i onClick={() => this.props.handleDelete(row.original)} className="fas fa-times x-delete"></i>
                </div>
              )
            }
          ]}
          defaultSorted={[
            {
              id: 'channel',
              desc: false
            }
          ]}
          className="-striped -highlight"
         />
       </div>
     );
   }
 }

export default ChannelsTable;
