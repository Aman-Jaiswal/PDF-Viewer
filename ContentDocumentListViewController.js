({
    init: function ( component, event, helper ) {
        var actions = [
            { label: 'View', name: 'view' } ];
        
        component.set('v.columns', [
            { label: 'Title', fieldName: 'Title', type: 'text'},
            { label: 'Owner', fieldName: 'Owner.Name', type: 'text' },
            { label: 'Last Modifed', fieldName: 'LastModifiedDate', type: 'date' },
            {
                type: "button",label: 'View', typeAttributes: {
                    name: 'view',
                    title: 'View',
                    value: 'view',
                    iconPosition: 'left',
                    iconName:'utility:preview',
                }
            },
            //{ type: 'action', typeAttributes: { rowActions: actions } } 
        ] );
        helper.getRelatedFilesRecord(component, event);
           
    },
    dorefresh : function (component, event, helper) {
         helper.getRelatedFilesRecord(component, event); 
         setTimeout(function(){
            $A.get('e.force:refreshView').fire(); 
          },1000);
       
    },
    refreshEvent:function (component, event, helper) {
        helper.getRelatedFilesRecord(component, event); 
   },
    handleRowAction: function ( component, event, helper ) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        var recId = row.Id;
        switch (action.name) {
            case 'view':
                let tabNum = component.get('v.tabNum');
                tabNum++;
                var workspaceAPI = component.find("workspace");
                workspaceAPI.getFocusedTabInfo().then(function (response) {
                    var focusedTabId = response.tabId;
                    workspaceAPI.openSubtab({ 
                        parentTabId: focusedTabId,
                        pageReference: {
                            "type": "standard__component",
                            "attributes": {
                                "componentName": "c__ContentDocumentViewer"
                            },
                            "state": {
                                "uid": '"'+tabNum+'"',
                                "c__pdfUrl": row.VersionDataUrl
                            }
                        }
                    }).then(function(subtabId) {
                        component.set('v.tabNum',tabNum);
                        workspaceAPI.setTabLabel({
                            tabId: subtabId,
                            label: row.Title
                        });
                        workspaceAPI.setTabIcon({
                            tabId: subtabId,
                            icon: "standard:document_preview",
                            iconAlt: "document preview"
                        });
                    })
                })
                .catch(function(error) {
                    console.log(error);
                });   
        }
    },
            
})
