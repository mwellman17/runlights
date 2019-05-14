import React, { Component } from 'react'
import ReactTable from "react-table";

class InstrumentsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {}
   }

   render() {
     const data = this.props.instruments;
     const length = this.props.length;

     return (
      <div>
        <h3>{this.props.position}</h3>
         <ReactTable
          data={data}
          showPagination={false}
          defaultPageSize={length}
          columns={[
           {
             Header: "Unit",
             accessor: "unit_number",
             Cell: this.props.renderEditable,
             maxWidth: 50,
             className: "cell-right",
             type: "tel"
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
             className: "cell-right",
             type: "tel"
           },
           {
             Header: "Addr",
             accessor: "address",
             Cell: this.props.renderEditable,
             maxWidth: 50,
             className: "cell-right",
             type: "tel"
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