import Ipconfig from '../IpConfig';

const AllServices = {
    // login page
    LOGIN: () => {
        return `${Ipconfig.BACKEND_IP()}/weblogin`;
    },
    GET_BRANCH_NAME: (branch_id) =>{
        return `${Ipconfig.BACKEND_IP()}/branch/${branch_id}`;
    },
    // managers
    // get employees
    GET_EMPLOYEE: (branch_id) => {
        return `${Ipconfig.BACKEND_IP()}/getemp/${branch_id}`;
    },
    // update employee data
    UPDATE_EMPLOYEE: () => {
        return `${Ipconfig.BACKEND_IP()}/updateemp`;
    },
    // add employee
    ADD_EMPLOYEE: () => {
        return `${Ipconfig.BACKEND_IP()}/addemp`;
    },
    // delete employee
    DELETE_EMPLOYEE: (id) =>{
        return `${Ipconfig.BACKEND_IP()}/deleteemp/${id}`;
    },
    SEARCH_BRANCH_BILLS: () => {
        return `${Ipconfig.BACKEND_IP()}/getbranchbills`;
    },
    TOTAL_BILLS_COUNT: (branch_id) => {
        return `${Ipconfig.BACKEND_IP()}/totalbillscount/${branch_id}`;
    },
    MONTH_BILLS_COUNT: (branch_id, month) => {
        return `${Ipconfig.BACKEND_IP()}/monthbillscount/${branch_id}/${month}`;
    },
    PENDING_BILLS_COUNT: (branch_id) => {
        return `${Ipconfig.BACKEND_IP()}/totalpendingcount/${branch_id}`;
    },
    TODAY_BILLS_COUNT: (branch_id) => {
        return `${Ipconfig.BACKEND_IP()}/todaybillscount/${branch_id}`;
    },
    RECIEVED_BILLS_COUNT: (branch_id) => {
        return `${Ipconfig.BACKEND_IP()}/totalrecievedcount/${branch_id}`;
    },
    COMPLETED_BILLS_COUNT: (branch_id) => {
        return `${Ipconfig.BACKEND_IP()}/totalcompletedcount/${branch_id}`;
    },
    
    // admin
    GET_MANAGERS: (adminid) => {
        return `${Ipconfig.BACKEND_IP()}/getmanagers/${adminid}`;
    },
    ADD_MANAGER: () => {
        return `${Ipconfig.BACKEND_IP()}/addmanager`;
    },
    UPDATE_MANAGER: () =>{
        return `${Ipconfig.BACKEND_IP()}/updatemanager`;
    },
    GET_ALL_BRANCHES: () => {
        return `${Ipconfig.BACKEND_IP()}/allbranchs`;
    },
    DELETE_MANAGER: (manager_id) => {
        return `${Ipconfig.BACKEND_IP()}/delmanager/${manager_id}`;
    },

    // add branch
    ADD_BRANCH: () => {
        return `${Ipconfig.BACKEND_IP()}/addbranch`;
    },

    SEARCH_BILLS: () => {
        return `${Ipconfig.BACKEND_IP()}/allbills`;
    },
    // get machine details
    GET_MACHINE: (billid) => {
        return `${Ipconfig.BACKEND_IP()}/getmachinedetails/${billid}`;
    },

    // update payment status
    UPDATE_PAYMENT_STATUS: (billid) => {
        return `${Ipconfig.BACKEND_IP()}/paymentstatus/${billid}`;
    },
    UPDATE_BILL: (billid) => {
        return `${Ipconfig.BACKEND_IP()}/billpayment/${billid}`;
    },

    UPDATE_BRANCH: () =>{
        return `${Ipconfig.BACKEND_IP()}/updatebranch`;
    },
    DELETE_BRANCH: (branch_id) => {
        return `${Ipconfig.BACKEND_IP()}/delbranch/${branch_id}`;
    },

    // deleteBill
    DELETE_BILL: (billid) => {
        return `${Ipconfig.BACKEND_IP()}/delbill/${billid}`;
    },

    // get employee total bills and amount
    GET_EMP_TOTAL_BILLS: (branch_id) => {
        return `${Ipconfig.BACKEND_IP()}/getempamounts/${branch_id}`;
    },
    GET_ALL_EMP_TOTAL_BILLS: () => {
        return `${Ipconfig.BACKEND_IP()}/getallempamounts`;
    },


    GET_BILL: () => {
        return `${Ipconfig.BACKEND_IP()}/getadminbill`;
    },
    GET_SER_SIGN: (billid) => {
        return `${Ipconfig.BACKEND_IP()}/getsersign/${billid}`;
    },
    // get c_sign
    GET_CUS_SIGN: (billid) => {
        return `${Ipconfig.BACKEND_IP()}/getcussign/${billid}`;
    },
    GET_MACHINE_DATA: (billid) => {
        return `${Ipconfig.BACKEND_IP()}/getmachinedetails/${billid}`;
    },
    // get Sign image from s3 bucket
    GET_SIGN_IMAGE: (keyName) => {
        return `${Ipconfig.BACKEND_IP()}/images/${keyName}`;
    },
}

export default AllServices;