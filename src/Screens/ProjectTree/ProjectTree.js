import React from 'react';
import Tree from 'react-d3-tree';
import { orgChart } from "../../State/ProjectData"


const ProjectTree = () => {
    // console.log(orgChart,"orgChart")
    return (
        <div>
            <div id="treeWrapper" style={{ width: '100em', height: '50em' }}>
                <Tree data={orgChart} orientation="Vertical" />
            </div>
        </div>
    )
}

export default ProjectTree