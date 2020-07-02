// The below script will create a google form and will add the data to some of the fields programmatically

function test() {
  var rows = [];
  var sheetName = 'Source Sheet';
  // Get the values from another sheet called Source Sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sub = ss.getSheetByName(sheetName);
  var subsData = sub.getDataRange().getValues();

  for (var s = 1; s < subsData.length; s++) {
    var test = subsData[s];
    var name = test[0];
    var email =test[1];    
       
      var form = FormApp.create('Survey ' + email + ' ' + invoice);
      form
        .setTitle('Form Tiltle')
        .setDescription('Form Description')
        .setConfirmationMessage('Foorter')
        .setAllowResponseEdits(false)
        .setRequireLogin(false)
        .setAcceptingResponses(true);

     // display an image in the form from drive  replace IMG-ID with the id of the file
      var img = DriveApp.getFileById('IMG-ID');
      var imageItem = form.addImageItem();
      imageItem.setImage(img).setTitle('IMG-TITLE');

      var check = form.addCheckboxItem();
      check
        .setTitle("Checkbox To display the data")
        .setChoices([
          check.createChoice(number),
          check.createChoice('Choice 2')
        ])
        .showOtherOption(false)
        .setRequired(true);
      var checkBoxValidation = FormApp.createCheckboxValidation()
        .requireSelectExactly(2)
        .build();
      check.setValidation(checkBoxValidation);

      var item = form.addScaleItem();
      item
        .setTitle('Rate Title')
        .setBounds(1, 10)
        .setLabels('Not Likely To Recommend', 'Extremely Likely');
      var reason = form.addParagraphTextItem();
      reason.setTitle('Reason');

      // Update the form's response destination.
      form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
      
      //set sheet notification value to yes 
      rows.push({
        range: sheetName + '!' + 'C' + (s + 1),
        values: [['yes']],
      });
      //set the url value in the same sheet
      rows.push({
        range: sheetName + '!' + 'D' + (s + 1),
        values: [[form.getPublishedUrl()]],
      });
      //send the form in an email to the email
      var message = form.getPublishedUrl();
      var subject = 'Url';
      MailApp.sendEmail(email, subject, message);
    }
  }
  // Update rows
  var resource = {
    valueInputOption: 'USER_ENTERED',
    data: rows,
  };
  Sheets.Spreadsheets.Values.batchUpdate(resource, ss.getId());
}
