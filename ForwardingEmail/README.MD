<!DOCTYPE html>
<html>
<body>
  <h2>Automated Email Forwarding Script</h2>
  <p>The script is designed to run automatically every 30 minutes using a time-based trigger. Its purpose is to forward certain emails that couldn't be filtered and keep specific recipients in CC or BCC in all emails.</p>

  <h2>How the Script Works</h2>
  <ol>
    <li>The <code>recipient</code> variable is set to the email address where the emails will be forwarded.</li>
    <li>The <code>threads</code> variable uses the <code>GmailApp.search()</code> method to search for threads with the label "sent-forwarded". These are the threads that contain the emails to be forwarded.</li>
    <li>The <code>myLabel</code> variable represents the label "Sent Label 2 Back", which is the label applied to the threads after they have been forwarded.</li>
    <li>The <code>myLabel2</code> variable represents the label "Sent Forwarded", which indicates the original label the threads had before forwarding.</li>
    <li>The script loops through each thread using a <code>for</code> loop.</li>
    <li>Inside the loop, it retrieves the messages within the current thread using <code>thisThread.getMessages()</code>. It also gets the total message count in the thread using <code>thisThread.getMessageCount()</code>.</li>
    <li>The last message in the thread is obtained using <code>messages[messageCount-1]</code>, and then it is forwarded to the specified recipient using <code>.forward(recipient)</code>.</li>
    <li>After forwarding the email, the script adds the "Sent Label 2 Back" label to the thread using <code>thisThread.addLabel(myLabel)</code> to indicate that it has been forwarded.</li>
    <li>The script also removes the "Sent Forwarded" label from the thread using <code>thisThread.removeLabel(myLabel2)</code> since it has been forwarded.</li>
  </ol>

  <p>This way, the script automatically forwards the specified emails, updates the labels on the threads, and repeats this process every 30 minutes based on the time-based trigger.</p>
</body>
</html>
