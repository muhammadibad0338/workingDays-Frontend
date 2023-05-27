import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';

import { Box, CircularProgress } from '@mui/material';
import Graph from "vis-react";

import { getProjectsTaskTree, setProjectTaskTree, } from '../../Redux/Task/TaskAction';
import { getProjectDetails } from '../../Redux/Project/ProjectAction';


const options = {
    layout: {
        hierarchical:true
    },
    edges: {
        color: "#000000"
    },
    interaction: { hoverEdges: true }
};

const events = {
    select: function (event) {
        const { nodes, edges } = event;
    }
};

const getNetwork = (network) => {
    // You can access the vis.js network object through this callback function
    console.log(network);
};

// const getNodes = () => {
//     return graph.nodes;
// };

// const getEdges = () => {
//     return graph.edges;
// };



const ProjectTree = ({ }) => {
    // console.log(orgChart,"orgChart")

    const [graphLoading, setGraphLoading] = useState(true)

    const dispatch = useDispatch()
    const projectTaskTree = useSelector((state) => state.task.projectTaskTree)

    let { id } = useParams();

    useEffect(() => {

        dispatch(getProjectDetails(id))
        dispatch(getProjectsTaskTree(id)).then((res) => {
            if (res) {

                setGraphLoading(false)
                // console.log(res?.data, "projectTaskTree")
            }
        })


    }, [])

    if (graphLoading || Object.keys(projectTaskTree).length == 0) {
        return (
            <Box sx={{ width: '90vw', height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                <CircularProgress sx={{ color: "#0096FF" }} />
            </Box>
        )
    }
    else {

        return (
            <Box sx={{ width: '90vw', height: '90vh', }} >
                <Graph
                    graph={projectTaskTree}
                    options={options}
                    events={events}
                    style={{ width: "100%", height: "100%", cursor: 'crosshair' }}
                // getNetwork={() => console.log("network") }
                // getNodes={() => projectTaskTree.nodes}
                // getEdges={() => projectTaskTree.edges}
                // getNetwork={getNetwork}
                // getNodes={getNodes}
                // getEdges={getEdges}
                />
            </Box>
        )
    }
}

export default ProjectTree