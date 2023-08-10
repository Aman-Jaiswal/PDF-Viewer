({
    init: function(component, event, helper) {
        let myPageRef = component.get("v.pageReference");
        let name = myPageRef && myPageRef.state ? myPageRef.state.c__pdfUrl : "World";
        component.set("v.pdfUrl", name);
    },
    handlePageChange: function(component, event, helper) {
        let myPageRef = component.get("v.pageReference");
        let name = myPageRef && myPageRef.state ? myPageRef.state.c__pdfUrl : "World";
        component.set("v.pdfUrl", name);
    }
})
