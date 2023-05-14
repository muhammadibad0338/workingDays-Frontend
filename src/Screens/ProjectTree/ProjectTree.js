import React from 'react';
import Tree from 'react-d3-tree';
import { orgChart } from "../../State/ProjectData"

import { Box } from '@mui/material';
import Graph from "vis-react";
// import { getObjects } from '../../../Utils';;

const graph = {
    nodes: [
        { id: 1, label: "Node 1" },
        { id: 2, label: "Node 2" },
        { id: 3, label: "Node 3" },
        { id: 4, label: "Node 4" },
        { id: 5, label: "Node 5" },
        { id: 6, label: "Node 6" }
    ],
    edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 }
    ]
};

const options = {
    layout: {
        hierarchical: true
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

const getNodes = () => {
    return graph.nodes;
};

const getEdges = () => {
    return graph.edges;
};


const ProjectTree = () => {
    // console.log(orgChart,"orgChart")
    return (
        <Box sx={{width:'90vw',height:'90vh',}} >
            <Graph
                graph={graph}
                options={options}
                events={events}
                style={{ width: "100%", height: "100%" ,cursor:'crosshair'}}
                getNetwork={getNetwork}
                getNodes={getNodes}
                getEdges={getEdges}
            />
        </Box>
    )
}

export default ProjectTree