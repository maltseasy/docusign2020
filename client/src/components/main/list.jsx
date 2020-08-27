import React, {useState} from 'react';

import PreAssessment from './pre_assessment';

const List = () => {

    const [companies, setCompanies] = useState([
        {name:"ABC"},
        {name:"DEF"},
        {name:"GHJ"}
    ]);


    return (
        <>
            {/*companies.map(company => <>
                {company.name}
            </>)*/}
            <PreAssessment />
        </>
    )
}

export default List;