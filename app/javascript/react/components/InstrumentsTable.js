import React, { Component } from 'react'
import ReactTable from "react-table";

class InstrumentsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {}
   }

   render() {
     const data = this.props.instruments;
     return (
       <div>
         <ReactTable
           data={data}
           showPagination={false}
           defaultPageSize={this.props.length}
           columns={[
             {
               Header: "Fixture",
               accessor: "fixture.name"
             },
             {
               Header: "Channel",
               accessor: "channel",
               Cell: this.props.renderEditable
             },
             {
               Header: "Address",
               accessor: "address",
               Cell: this.props.renderEditable
             }
           ]}
           className="-striped -highlight"
         />
       </div>
     );
   }
 }

export default InstrumentsTable;
