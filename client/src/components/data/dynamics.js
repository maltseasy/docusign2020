export async function getCompanyList(options) {
    let baseUrl = "https://org60ab6.api.crm3.dynamics.com/api/data/v9.1/";
    
    if (options) {
        return "something";
    } else {
        let url = baseUrl + "accounts?$filter=fsc_organizationtype ne null";

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyIsImtpZCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyJ9.eyJhdWQiOiJodHRwczovL29yZzYwYWI2LmFwaS5jcm0zLmR5bmFtaWNzLmNvbSIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2Q0NjA2NWYxLWRkZTctNDg2My1hMjE1LTY1OGYzYTM1M2U3Ni8iLCJpYXQiOjE1OTg3MjA4NjMsIm5iZiI6MTU5ODcyMDg2MywiZXhwIjoxNTk4NzI0NzYzLCJhY3IiOiIxIiwiYWlvIjoiQVNRQTIvOFFBQUFBOVd3QjJpNm42US9BMnVhNGQ3ZFozRTRYNmZnVjJzNXd6eDRYRG95M2grbz0iLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiZWRhMDNkNzAtZDhhMS00N2Y2LWFjMWYtNTBiNWU1ODI1NzE2IiwiYXBwaWRhY3IiOiIxIiwiZmFtaWx5X25hbWUiOiJNaXNyYSIsImdpdmVuX25hbWUiOiJBcnlhbiIsImlwYWRkciI6IjE4NC4xNDcuNTEuMjMxIiwibmFtZSI6IkFyeWFuIE1pc3JhIiwib2lkIjoiZmVjNjE2MzMtY2RjOS00MjUxLTg4ZDctOTMxM2FlNTUxMjJiIiwicHVpZCI6IjEwMDMyMDAwRDlDNkRGMkQiLCJyaCI6IjAuQUFBQThXVmcxT2ZkWTBpaUZXV1BPalUtZG5BOW9PMmgyUFpIckI5UXRlV0NWeFp2QU5NLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6IkV6TFpBakZaOHF6alRwUmtXc1VRUEdFaVBQbkpPcFp4bUlSMjhLanVueHciLCJ0aWQiOiJkNDYwNjVmMS1kZGU3LTQ4NjMtYTIxNS02NThmM2EzNTNlNzYiLCJ1bmlxdWVfbmFtZSI6ImFyeWFubWlzcmFAYXJ5YW5taXNyYS5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJhcnlhbm1pc3JhQGFyeWFubWlzcmEub25taWNyb3NvZnQuY29tIiwidXRpIjoiTzF3cW04b2JoMGFTd0xfT1F5WkhBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIl19.t6NOB3laundlwIiapDr5NckO6yPpDAPC0rJBUmG_Pfsb3cu_prJt1taBpfTUw5MiqxZ84G-sfWf7YStqTa9OYFp9zBLbOaIIqWZfuDQKDd2tw_5XjABk4QQu73CcjzCJnZXXIXpICkJoEXSjrYv5mMYglApO2yZ_auosJYuehgA13ftTt9snAKa2T_-Y-Dg3l5PDPszFMNWmi2v5EoRfkRvIXF8CSEyIgXbYZuzf7VbKSLJRVYwgR2OEHNjZoe3aFNBysRXsDDOZr_b1kZw6vuKl-R-pyU2Jvcx1sIwQ83vr5kuVmKJw6PpwPslR2qQhEDUBq6riCCevGnAuNscIEw'
            }
        });
        console.log(response);
        return response;
    }
}

export async function getOrganizationRequirements(id) {
    let baseUrl = "https://org60ab6.api.crm3.dynamics.com/api/data/v9.1/";

    let url = baseUrl + `new_organization_requirements?$filter=new_fsc_organization eq ${id}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + ''
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
            'Authorization': 'Bearer ' + ''
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