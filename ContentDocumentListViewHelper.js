({
	getRelatedFilesRecord : function(component,event) {
		var action = component.get("c.getRelatedFilesByRecordId");
        action.setParams({
            recId:component.get('v.recordId'),
            objName:component.get('v.sObjName')
        });
        action.setCallback(this, function( response ) {
            var state = response.getState();
            if ( state === "SUCCESS" ) {
            	if(response.getReturnValue().length>0){
            		component.set('v.showTable',true);
                    component.set( "v.lstContentVersion", response.getReturnValue() );
            	}else{
            	component.set('v.showTable',false)
            	};
            	            	
            }
            component.set('v.isRefresh',false);
        });
        $A.enqueueAction( action );
	}
})
