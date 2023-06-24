<p><b>This Apps Script performs the following tasks:</b></p>

<p>The <code>getFolders()</code> function searches for Google Sheets files within a specified root folder. It retrieves the folder using its ID (<code>my_id</code>) and then uses the <code>getFilesByType()</code> method to get all the files of type <code>MimeType.GOOGLE_SHEETS</code> within that folder.</p>

<p>Inside the loop, each file is passed to the <code>readSheet()</code> function.</p>

<p>The <code>readSheet(sheetId)</code> function opens the Google Sheet using the provided <code>sheetId</code> and retrieves the active sheet using <code>getActiveSheet()</code>.</p>

<p>It then gets the range of values starting from row 2 (<code>getRange(2, 1, ss2.getLastRow(), ss2.getLastColumn())</code>) and reads the values into the <code>newData</code> variable using <code>getValues()</code>.</p>

<p>The function identifies a destination sheet (<code>sheetm</code>) within a specified destination spreadsheet using its ID ("Destination-Sheet-ID") and a sheet name (<code>sheetName</code>).</p>

<p>It gets the range to which the data will be appended in the destination sheet using <code>getRange(sheetm.getLastRow()+1, 1, ss2.getLastRow(), ss2.getLastColumn())</code>.</p>

<p>The <code>setValues(newData)</code> method is then used to set the retrieved values in the destination sheet.</p>

<p>Finally, the <code>moveFiles(sourceFileId, targetFolderId)</code> function is called to move the sheet file from the root folder to a specified destination folder. It retrieves the file using its ID (<code>sourceFileId</code>), removes it from its current parent folder using <code>removeFile(file)</code>, and adds it to the target folder using <code>addFile(file)</code>.</p>

<p>Overall, this script searches for Google Sheets within a root folder, reads the values from each sheet, appends them to a designated destination sheet, and then moves the sheet file to another folder to prevent duplication. These operations are performed one sheet at a time.</p>
