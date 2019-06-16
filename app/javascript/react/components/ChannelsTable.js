import React, { Component } from 'react'
import ReactTable from "react-table";

class ChannelsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      length: this.props.length,
      showAccessories: false
    }
   }

   componentWillReceiveProps(nextProps) {
     this.setState({
       length: nextProps.length,
       showAccessories: nextProps.showAccessories
     })
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
              Header: "Univ",
              accessor: "universe",
              Cell: this.props.renderEditable,
              maxWidth: 60,
              className: "cell-right universe",
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
                 <div style={{textAlign:"left"}}>Ckt Name</div>
               ),
             accessor: "circuit_name",
             Cell: this.props.renderEditable,
             maxWidth: 100,
             className: "cell-left circuit_name"
           },
           {
             Header: () => (
                 <div style={{textAlign:"left"}}>Ckt#</div>
               ),
             accessor: "circuit_number",
             Cell: this.props.renderEditable,
             maxWidth: 60,
             className: "cell-left circuit_number",
             type: "tel"
           },
           {
             Header: () => (
                 <div style={{textAlign:"left"}}>Color</div>
               ),
             accessor: "color",
             show: this.state.showAccessories,
             Cell: this.props.renderEditable,
             className: "cell-left color"
           },
           {
             Header: () => (
                 <div style={{textAlign:"left"}}>Gobo</div>
               ),
             accessor: "gobo",
             show: this.state.showAccessories,
             Cell: this.props.renderEditable,
             className: "cell-left gobo"
           },
           {
             Header: () => (
                 <div style={{textAlign:"left"}}>Accessories</div>
               ),
             accessor: "accessory",
             show: this.state.showAccessories,
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
