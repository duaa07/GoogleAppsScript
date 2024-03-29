// Change this to your calendar ID (should look like an email address)
const CALENDAR_ID = 'duaa@duaa.com';

// Change these to your own message and subject
const VACATION_MESSAGE = 'I am currently out of office.';
const VACATION_SUBJECT = 'Out of Office';

function setVacationResponseToOOO() {
  // Get today's date
  const today = new Date();
  
  // Get the end of the day (11:59:59pm)
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
  
  // Get the events for today
  const events = Calendar.Events.list(CALENDAR_ID, {
    timeMin: today.toISOString(),
    timeMax: endOfDay.toISOString(),
    singleEvents: true,
    orderBy: 'startTime'
  }).items;
    
  const isOOO = events.some(event => {
    return event.summary.includes('Out of Office')|| event.eventType==="outOfOffice";
  });

  // Set the vacation responder if we are out of office
  if (isOOO) {
   // const currentSettings = Gmail.Users.Settings.getVacation({ userId: 'duaa@duaa.com' });
    const updatedSettings = {
      responseSubject: 'Out Of Office',
      responseBodyHtml: 'Hello,<br><br>\n\nThank you for your email.<br><br>\n\nI’m on a leave.<br><br>\n\nIf you need immediate assistance during my absence, please Contact SOMEONE ELSE ! :D.\n\n<br><br>Otherwise I will respond to your emails upon my return.<br><br>\n\nHave a nice day.',
      enableAutoReply: true
    };
    Gmail.Users.Settings.updateVacation(updatedSettings, 'me');
  } else {
    const updatedSettings = {
      enableAutoReply: false,
      responseSubject: '',
      responseBodyHtml: ''
    };
    Gmail.Users.Settings.updateVacation(updatedSettings, 'me');
  }
}
