var global = {};
global.settings = {
    site: "http://localhost:49865/",
    service: "http://localhost:3000/",
    getSiteUrl: function () { return this.site; },
    getServiceUrl: function () { return this.service + "api/shared"; },
    getDataSetServiceUrl: function () { return this.service + "api/dataset"; },
    getMultiServiceUrl: function () { return this.service + "api/upload"; },
    getMailServiceUrl: function () { return this.service + "api/Mail?prcid="; },
    getImageBaseUrl: function () { return "WebContent/" },
    getDefaultUserImageUrl: function () { return "http://www.picks4me.com/Images/Pick4.jpg" },

    getDefaultLoadImageUrl: function () { return "images/ajax-loader.gif" },

    getProductImageURl: function () { return "http://demo.ithours.com/smews/webcontent/"; },
    getSupplierImageURl: function () { return "http://demo.ithours.com/smews/webcontent/"; },
    getAdvisorImageURl: function () { return "http://demo.ithours.com/smews/webcontent/"; },

    getIconImageURl: function () { return "http://demo.ithours.com/smews/webcontent/"; },
    
    authId: "AuthId",
    userName: "userName"
};