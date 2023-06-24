//Search root folder for google sheets and append the value of that sheet into another sheet 
//once we get the values and append in the other sheet , move the sheet in root folder to another folder
//so that it isn't copied again
//done in 1 sheet at a time
function getFolders() {
  var my_id = "Root-Folder-ID";
  var parentFolder = DriveApp.getFolderById(my_id);
  var files = parentFolder.getFilesByType(MimeType.GOOGLE_SHEETS);
  while (files.hasNext()) {
    var file = files.next();
    readSheet(file.getId());
  }
}

function readSheet(sheetId)
{
  var ss2 = SpreadsheetApp.openById(sheetId);
  var sub2 = ss2.getActiveSheet().getRange(2, 1, ss2.getLastRow(), ss2.getLastColumn());
  var newData = sub2.getValues();  
  var sheetName = 'SubSheetName';
  var ss = SpreadsheetApp.openById("Destination-Sheet-ID");
  var sheetm = ss.getSheetByName(sheetName)
  var sub = sheetm.getRange(sheetm.getLastRow()+1, 1, ss2.getLastRow(), ss2.getLastColumn()).setValues(newData);
  moveFiles(sheetId,"Destination-Folder-After-sheetiscopied");
}

function moveFiles(sourceFileId, targetFolderId) {
  var file = DriveApp.getFileById(sourceFileId);
  file.getParents().next().removeFile(file);
  DriveApp.getFolderById(targetFolderId).addFile(file);
}
