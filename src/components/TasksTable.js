import React from "react";
import { render } from "react-dom";
import { Panel } from 'react-bootstrap';
import ReactTable from "react-table";
import "react-table/react-table.css";

export class TasksTable extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { data, jobs } = this.props;
        return (
            <Panel id="tasks-table" defaultExpanded>
                <Panel.Heading>
                    <Panel.Title toggle>
                        <h2>Tasks</h2>
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>
                        <ReactTable
                            data={data}
                            columns={[
                                {
                                    Header: "Task ID",
                                    id: "id",
                                    accessor: d => d.taskId
                                },
                                {
                                    Header: "Title",
                                    id: "name",
                                    accessor: d => d.name
                                },
                                {
                                    Header: "Timing",
                                    columns: [
                                        {
                                            Header: 'Expected',
                                            id: 'time',
                                            accessor: d => d.time
                                        },
                                        {
                                            Header: 'Real',
                                            id: 'realTime',
                                            accessor: d => d.report.realTime,
                                            Cell: row => (
                                                <span>
                                                    <span style={{
                                                        color: row.original.report.realTime < row.original.time ? '#57d500'
                                                            : row.original.report.realTime > row.original.time ? '#ff2e00'
                                                                : '#ffbf00',
                                                        transition: 'all .3s ease'
                                                    }}>
                                                      &#x25cf;
                                                    </span>
                                                    <span>{row.original.report.realTime}</span>
                                                </span>
                                            )
                                        }
                                    ],
                                },
                                {
                                    Header: "Job",
                                    id: "jobId",
                                    accessor: d => jobs[d.jobId]
                                }]}
                            defaultPageSize={20}
                            className="-striped -highlight"
                        />
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
        );
    }
}
