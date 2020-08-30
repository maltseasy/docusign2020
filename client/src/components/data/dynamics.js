let AccessKey = require('../data/access_key.json')

export async function getCompanyList(options) {
    let baseUrl = "https://org60ab6.api.crm3.dynamics.com/api/data/v9.1/";
    
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
        console.log(response.body);
        console.log(AccessKey.data);
        return response.json();
    }
}

export async function getOrganizationRequirements(id) {
    let baseUrl = "https://org60ab6.api.crm3.dynamics.com/api/data/v9.1/";

    let url = baseUrl + `new_organization_requirements?$filter=new_fsc_organization eq ${id}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + AccessKey.data.access_token
        }
    });
    return response.json();
}

export async function getCompanySites(id) {
    let baseUrl = "https://org60ab6.api.crm3.dynamics.com/api/data/v9.1/";

    let url = baseUrl + `fsc_sites?$filter=fsc_coccompany eq ${id}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + AccessKey.data.access_token
        }
    });
    return response.json();
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