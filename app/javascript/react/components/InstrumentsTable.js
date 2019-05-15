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
        <h3>{this.props.layer}</h3>
         <ReactTable
          data={data}
          showPagination={false}
          defaultPageSize={length}
          columns={[
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
                 <div style={{textAlign:"left"}}>Ckt</div>
               ),
             accessor: "circuit",
             Cell: this.props.renderEditable,
             maxWidth: 60,
             className: "cell-left circuit"
           },
           {
             Header: () => (
                 <div style={{textAlign:"left"}}>Accessories</div>
               ),
             accessor: "accessory",
             Cell: this.props.renderEditable,
             className: "cell-left accessory"
           },
           {
              Header: '',
              Cell: row => (
                <div>
                  <i onClick={() => this.props.handleDelete(row.original)} className="fas fa-times"></i>
                </div>
              )
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
