class Apires {
    constructor(statusCode,data,message="success"){
        this.statusCode = statuscode;
        this.data = data;
        this.message = message; 
        this.success = statusCode<400;
    }

}