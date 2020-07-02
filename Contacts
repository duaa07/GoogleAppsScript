//Delete all contacts in a specifc Group-Label
function UpdateMobileContacts() { 
  var groups = People.ContactGroups.get("contactGroups/2fe9c138fad4f62", {"maxMembers":"500"}).memberResourceNames;
  if(groups!=null)
  {
    for(var i=0;i<groups.length;i++)
    {
      // var member = People.ContactGroups.Members.modify({"resourceNamesToRemove":groups[i]}, "contactGroups/2fe9c138fad4f62");
      var member = People.People.deleteContact(groups[i]);
    }
  }
  
  //Read the values of a sheet and then Create them as contacts using PEOPLE API
  var sheet = SpreadsheetApp.getActiveSheet();  
  var data = sheet.getDataRange().getValues();
  for (var i = 0; i < data.length; i++) 
  {    
    if (data[i][0].toString() == "")    
    {    
      break;      
    }  
    else
    {     
      
      try {
        var phone = data[i][2];
        var contactP = People.People.createContact(body={"names": [{"givenName": data[i][0],"familyName": data[i][1]}],"phoneNumbers": [{"type":"work","value": phone.toString()}],"memberships": [{"contactGroupMembership":{"contactGroupResourceName":"contactGroups/2fe9c138fad4f62"}}]});
    
  }
  catch (e)
  {
    Logger.log(e);
  }
  
}              
}
}
