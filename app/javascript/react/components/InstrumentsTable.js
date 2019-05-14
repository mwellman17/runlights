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
        <h3>{this.props.position}</h3>
         <ReactTable
           data={data}
           showPagination={false}
           defaultPageSize={this.props.length}
           columns={[
             {
               Header: "Unit",
               accessor: "unitNumber",
               Cell: this.props.renderEditable,
               maxWidth: 50,
               className: "cell-right"
             },
             {
               Header: () => (
                   <div style={{textAlign:"left"}}>Fixture</div>
                 ),
               accessor: "fixture.name",
               className: "cell-left"
             },
             {
               Header: () => (
                   <div style={{textAlign:"left"}}>Purpose</div>
                 ),
               accessor: "purpose",
               Cell: this.props.renderEditable
             },
             {
               Header: "Chan",
               accessor: "channel",
               Cell: this.props.renderEditable,
               maxWidth: 50,
               className: "cell-right"
             },
             {
               Header: "Addr",
               accessor: "address",
               Cell: this.props.renderEditable,
               maxWidth: 50,
               className: "cell-right"
             },
             {
               Header: () => (
                   <div style={{textAlign:"left"}}>Ckt</div>
                 ),
               accessor: "circuit",
               Cell: this.props.renderEditable,
               maxWidth: 50
             },
             {
               Header: () => (
                   <div style={{textAlign:"left"}}>Accessories</div>
                 ),
               accessor: "accessory",
               Cell: this.props.renderEditable
             }
           ]}
           className="-striped -highlight"
           defaultSorted={[
             {
              id: 'channel'
             }
           ]}
         />
       </div>
     );
   }
 }

export default InstrumentsTable;
