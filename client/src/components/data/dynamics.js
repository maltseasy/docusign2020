let AccessKey = require('../data/access_key.json')
let baseUrl = "https://org60ab6.api.crm3.dynamics.com/api/data/v9.1/";

export async function getCompanyList(options) {
    if (options) {
        return "something";
    } else {
        let url = baseUrl + "accounts?$filter=fsc_organizationtype ne null";

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + AccessKey.data.access_token
            }
        });
        ////console.log(response.body);
        ////console.log(AccessKey.data);
        return response.json();
    }
}

export async function getOrganizationRequirements(id) {
    let url = baseUrl + `new_organization_requirements?$filter=_new_fsc_organization_value eq '${id}'`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + AccessKey.data.access_token
        }
    });
    return response.json();
}

export function getRequirementName(id) {

    let url = baseUrl + `fsc_requirment_type_per_coc_scenario_stds?$filter=fsc_requirment_type_per_coc_scenario_stdid eq '${id}'`

    var result = fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + AccessKey.data.access_token
        }
    }).then(response => {
        return response.json();
    }).then(data => {
        let standardId = data.value[0]._fsc_std_element_id_value;
        let url = baseUrl + `fsc_standards_elementses?$filter=fsc_standards_elementsid eq '${standardId}'`;
        return fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + AccessKey.data.access_token
            }
        })
    }).then(response => {
        return response.json();
    }).then(data => {
        let standardId = data.value[0]._fsc_standard_id_value;
        let url = baseUrl + `fsc_standardses?$filter=fsc_standardsid eq '${standardId}'`;
        return fetch(url, {
            method: 'GET',
            headers:  {
                'Authorization': 'Bearer ' + AccessKey.data.access_token
            }
        })
    }).then(response => {
        return response.json();
    }).catch(error => console.log(error))

    return result;   
}

export async function getCompanySites(id) {
    let url = baseUrl + `fsc_sites?$filter=_fsc_coccompany_value eq ${id}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + AccessKey.data.access_token
        }
    });
    return response.json();
}

export function updateDB(id, flag, notes) {
    let url = baseUrl + `new_organization_requirements(${id})`;
    var raw = JSON.stringify({"new_requirement_flag":flag,"new_requirement_notes":notes});
    fetch(url, {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + AccessKey.data.access_token,
            "Content-Type": "application/json"
        },
        body: raw
    })
}

export function organizationType(type) {
    if (type === 1) {
        return "Certificate Holder";
    } else if (type === 2) {
        return "Certification Body";
    } else if (type === 3) {
        return "ASI";
    } else if (type === 4) {
        return "Applicant";
    } else {
        return "Invalid Organization Type";
    }
}