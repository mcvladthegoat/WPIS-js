import React from "react";
import { render } from "react-dom";
import { Panel } from 'react-bootstrap';
import ReactTable from "react-table";
import "react-table/react-table.css";

export class WorkersTable extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { data, jobs } = this.props;
        return (
            <Panel id="workers-table" defaultExpanded>
                <Panel.Heading>
                    <Panel.Title toggle>
                        <h2>Workers</h2>
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>
                        <ReactTable
                            data={data}
                            columns={[
                                {
                                    Header: "Name",
                                    id: "name",
                                    accessor: d => d.name
                                },
                                {
                                    Header: "Level",
                                    id: "level",
                                    accessor: d => d.level
                                },
                                {
                                    Header: "Job",
                                    id: "jobId",
                                    accessor: d => jobs[d.jobId]
                                }]}
                            defaultPageSize={10}
                            className="-striped -highlight"
                        />
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
        );
    }
}
