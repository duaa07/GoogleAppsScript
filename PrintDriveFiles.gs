// will Log the name of every file in the user's Drive that modified after the date specified
function PrintDriveFiles() {
   var files = DriveApp.searchFiles('modifiedDate > "2014-07-23"');
   while (files.hasNext()) {
   var file = files.next();
   Logger.log(file.getName());
 }
};
