import React, { useState, useEffect } from 'react';
import Api from '../../api/index';

const milestone = ({ milestones }) => (

  const [milestone, setMilestone] = useState();

const loadData = async () => {
    const res = await Promise.all([Api.getMilestone()]);
    setMilestone(res[0].data.data);
};

useEffect(async () => {
    loadData();
}, []);


return (

    <div>

    </div>
);
 };
export default milestone;
